import { useEffect, useState } from "react";
import { DatabaseSyncStatus } from "../../components/meetingElements/NoteSyncStatusBar";
import { generateRandomID } from "../../utils/functions";
import {
  DatabaseParticipant,
  Meeting,
  MeetingAgendaStatus,
  MeetingNote,
  MeetingParticipant,
  MeetingQuestion,
} from "../../utils/types";
import { useAuth } from "../auth";
import { getServiceSupabase, supabase } from "./config";
import { getParticipantInfoIfEmailIsRegistered } from "./users";

export const useMeeting = (meeting: Meeting) => {
  const [meetingNote, setMeetingNote] = useState<MeetingNote>();
  const [sharedNotes, setSharedNotes] = useState<MeetingNote>();

  const [databaseStatus, setDatabaseStatus] =
    useState<DatabaseSyncStatus>("NONE");

  const [sharedNotesDatabaseStatus, setSharedNotesDatabaseStatus] =
    useState<DatabaseSyncStatus>("NONE");

  const [meetingQuestions, setMeetingQuestions] = useState<MeetingQuestion[]>(
    []
  );

  const [agendaStatus, setAgendaStatus] = useState<MeetingAgendaStatus>();

  const [participants, setParticipants] = useState<MeetingParticipant[]>(
    meeting.participants
  );

  const { user } = useAuth();

  var createNewMeetingNote = (function async() {
    // make sure note create function only gets called once
    var executed = false;
    return function () {
      if (!executed) {
        executed = true;
        createMeetingNote({
          id: generateRandomID(),
          meetingId: meeting.id,
          createdBy: user!.id,
          content: "",
        }).then((note) => {
          setMeetingNote(note);
        });
      }
    };
  })();

  var createNewMeetingNoteForSharedNotes = (function async() {
    // make sure note create function only gets called once
    var executed = false;
    return function () {
      if (!executed) {
        executed = true;
        createMeetingNote({
          id: generateRandomID(),
          meetingId: meeting.id,
          createdBy: "shared",
          content: "",
        }).then((note) => {
          setSharedNotes(note);
        });
      }
    };
  })();

  const checkParticipantsInfo = async (
    participantsToCheck: MeetingParticipant[]
  ) => {
    checkParticipants(participantsToCheck).then((updatedParticipants) => {
      setParticipants(updatedParticipants);
    });
  };

  useEffect(() => {
    // get meeting note if available
    fetchMeetingNote(meeting.id, user!.id, setMeetingNote).catch((error) => {
      if (error.code === "PGRST116") {
        // if does not exist, create empty note
        createNewMeetingNote();
      }
    });

    // get shared notes if available
    fetchMeetingNote(meeting.id, "shared", setSharedNotes).catch((error) => {
      if (error.code === "PGRST116") {
        // if does not exist, create empty note
        createNewMeetingNoteForSharedNotes();
      }
    });

    fetchAgendaStatus(meeting.id, setAgendaStatus).catch((error) => {
      if (error.message === "isEmpty") {
        updateAgendaStatus(meeting.id, {
          currentItemIndex: 0,
          startedAt: new Date(),
        });
      }
    });

    fetchMeetingQuestions(meeting.id, setMeetingQuestions).catch((error) => {
      console.log(error);
    });

    checkParticipantsInfo(participants);

    const supabaseServer = getServiceSupabase();

    const meetingSubscription = supabaseServer
      .from("meetings")
      .on("*", (payload) => {
        setAgendaStatus(payload.new.agendaStatus);
        setParticipants(payload.new.participants);
        checkParticipantsInfo(payload.new.participants);
      })
      .subscribe();

    const noteSubscription = supabaseServer
      .from("meeting_notes")
      .on("UPDATE", (payload) => {
        console.log("Change detected");
        console.log(payload);

        if (payload.new.createdBy === "shared") {
          setSharedNotes(payload.new);
        } else {
          setMeetingNote(payload.new);
        }
      })
      .subscribe();

    const questionSubscription = supabaseServer
      .from("meeting_questions")
      .on("*", (payload) => {
        console.log(payload);
        fetchMeetingQuestions(meeting.id, setMeetingQuestions);
      })
      .subscribe();

    return () => {
      meetingSubscription.unsubscribe();
      noteSubscription.unsubscribe();
      questionSubscription.unsubscribe();
    };
  }, []);

  return {
    meetingNote,
    sharedNotes,
    databaseStatus,
    setDatabaseStatus,
    sharedNotesDatabaseStatus,
    setSharedNotesDatabaseStatus,
    agendaStatus,
    setAgendaStatus,
    participants,
    setParticipants,
    meetingQuestions,
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
        currentPresentationPage: newStatus.currentPresentationPage,
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

const checkParticipants = async (participants: MeetingParticipant[]) => {
  let temp: MeetingParticipant[] = [];
  for (const p of participants) {
    const { data, error } = await getParticipantInfoIfEmailIsRegistered(
      p.email
    );

    if (data) {
      temp = [...temp, data];
    } else {
      temp = [...temp, p];
    }
  }
  return temp;
};

export const updateParticipants = async (
  meetingId: string,
  newParticipants: DatabaseParticipant[]
) => {
  return await supabase
    .from("meetings")
    .update({
      participants: newParticipants,
    })
    .match({ id: meetingId });
};

export const fetchMeetingQuestions = async (
  meetingId: string,
  setState: (meetingQuestions: MeetingQuestion[]) => void
) => {
  const { data, error } = await supabase
    .from("meeting_questions")
    .select("*")
    .eq("meetingId", meetingId)
    .order("createdAt", { ascending: false });

  if (error) {
    throw error;
  }

  if (data) {
    setState(data);
    return data;
  }
};

export const createMeetingQuestion = async (
  meetingId: string,
  question: string
) => {
  const { data, error } = await supabase
    .from("meeting_questions")
    .insert([
      {
        meetingId,
        question,
      },
    ])
    .single();

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
};

export const upvoteMeetingQuestion = async (
  questionId: string,
  upvotes: string[]
) => {
  const { data, error } = await supabase
    .from("meeting_questions")
    .update({
      upvotes,
    })
    .match({
      id: questionId,
    });

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
};

export const changeMeetingQuestionAnsweredStatus = async (
  questionId: string,
  answered: boolean
) => {
  const { data, error } = await supabase
    .from("meeting_questions")
    .update({
      answered,
    })
    .match({
      id: questionId,
    })
    .single();

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
};

export const createPresentationStorage = async () => {
  const { data, error } = await supabase.storage.createBucket("presentations", {
    public: false,
  });

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
};
