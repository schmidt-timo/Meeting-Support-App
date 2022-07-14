import { useEffect, useState } from "react";
import { DatabaseSyncStatus } from "../../components/pages/meeting/MeetingNotes";
import { generateRandomID } from "../../utils/functions";
import { MeetingAgendaStatus, MeetingNote } from "../../utils/types";
import { useAuth } from "../auth";
import { getServiceSupabase, supabase } from "./config";

export const useMeeting = (meetingId: string) => {
  const [meetingNote, setMeetingNote] = useState<MeetingNote>();
  const [databaseStatus, setDatabaseStatus] =
    useState<DatabaseSyncStatus>("NONE");

  const [agendaStatus, setAgendaStatus] = useState<MeetingAgendaStatus>();

  const { user } = useAuth();

  var createNewMeetingNote = (function async() {
    // make sure note create function only gets called once
    var executed = false;
    return function () {
      if (!executed) {
        executed = true;
        createMeetingNote({
          id: generateRandomID(),
          meetingId,
          createdBy: user!.id,
          content: "",
        }).then((note) => {
          setMeetingNote(note);
        });
      }
    };
  })();

  useEffect(() => {
    // get meeting note if available
    fetchMeetingNote(meetingId, user!.id, setMeetingNote).catch((error) => {
      if (error.code === "PGRST116") {
        // if does not exist, create empty note
        createNewMeetingNote();
      }
    });
    fetchAgendaStatus(meetingId, setAgendaStatus).catch((error) => {
      if (error.message === "isEmpty") {
        updateAgendaStatus(meetingId, {
          currentItemIndex: 0,
          startedAt: new Date(),
        });
      }
    });

    const supabaseServer = getServiceSupabase();

    const meetingSubscription = supabaseServer
      .from("meetings")
      .on("UPDATE", (payload) => {
        setAgendaStatus(payload.new.agendaStatus);
      })
      .subscribe();
    const noteSubscription = supabaseServer
      .from("meeting_notes")
      .on("UPDATE", (payload) => {
        setMeetingNote(payload.new);
      })
      .subscribe();
    return () => {
      meetingSubscription.unsubscribe();
      noteSubscription.unsubscribe();
    };
  }, []);

  return {
    meetingNote,
    databaseStatus,
    setDatabaseStatus,
    agendaStatus,
    setAgendaStatus,
  };
};

export const fetchMeetingNote = async (
  meetingId: string,
  participantId: string,
  setState: (meetingNote: MeetingNote) => void
) => {
  const { data, error } = await supabase
    .from("meeting_notes")
    .select("*")
    .eq("meetingId", meetingId)
    .eq("createdBy", participantId)
    .single();

  if (error) {
    throw error;
  }

  if (data) {
    setState(data);
    return data;
  }
};

export const createMeetingNote = async (meetingNote: MeetingNote) => {
  const { data, error } = await supabase
    .from("meeting_notes")
    .insert([meetingNote])
    .single();

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
};

export const fetchAgendaStatus = async (
  meetingId: string,
  setState: (agendaStatus: MeetingAgendaStatus) => void
) => {
  const { data, error } = await supabase
    .from("meetings")
    .select("agendaStatus")
    .eq("id", meetingId)
    .single();

  if (error) {
    throw error;
  }

  if (data) {
    if (Object.keys(data.agendaStatus).length !== 0) {
      setState(data.agendaStatus);
    } else {
      throw new Error("isEmpty");
    }
    return data;
  }
};

export const updateAgendaStatus = async (
  meetingId: string,
  newStatus: MeetingAgendaStatus
) => {
  const { data, error } = await supabase
    .from("meetings")
    .update({
      agendaStatus: {
        currentItemIndex: newStatus.currentItemIndex,
        startedAt: newStatus.startedAt,
      },
    })
    .eq("id", meetingId)
    .single();

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
};

export const updateMeetingNote = async (
  meetingNoteId: string,
  updatedText: string
) => {
  const { data, error } = await supabase
    .from("meeting_notes")
    .update({
      content: updatedText,
    })
    .match({
      id: meetingNoteId,
    })
    .single();

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
};
