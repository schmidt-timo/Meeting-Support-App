import { useEffect, useState } from "react";
import {
  Meeting,
  MeetingNote,
  MeetingParticipant,
  MeetingQuestion,
} from "../../utils/types";
import { getServiceSupabase, supabase } from "./config";
import { checkParticipants, fetchMeetingQuestions } from "./meeting";

export const usePublicMeeting = (meeting: Meeting) => {
  const [sharedNotes, setSharedNotes] = useState<MeetingNote>();
  const [meetingQuestions, setMeetingQuestions] = useState<MeetingQuestion[]>(
    []
  );
  const [participants, setParticipants] = useState<MeetingParticipant[]>(
    meeting.participants
  );

  const checkParticipantsInfo = async (
    participantsToCheck: MeetingParticipant[]
  ) => {
    checkParticipants(participantsToCheck).then((updatedParticipants) => {
      setParticipants(updatedParticipants);
    });
  };

  useEffect(() => {
    // get shared notes if available
    fetchSharedMeetingNotes(meeting.id, setSharedNotes).catch((error) => {
      throw error;
    });

    fetchMeetingQuestions(meeting.id, setMeetingQuestions).catch((error) => {
      throw error;
    });

    checkParticipantsInfo(participants);

    const supabaseServer = getServiceSupabase();

    const questionSubscription = supabaseServer
      .from("meeting_questions")
      .on("*", (payload) => {
        fetchMeetingQuestions(meeting.id, setMeetingQuestions);
      })
      .subscribe();

    return () => {
      questionSubscription.unsubscribe();
    };
  }, []);

  return {
    sharedNotes,
    participants,
    meetingQuestions,
  };
};

export const fetchSharedMeetingNotes = async (
  meetingId: string,
  setState: (meetingNote: MeetingNote) => void
) => {
  const { data, error } = await supabase
    .from("meeting_notes")
    .select("*")
    .eq("meetingId", meetingId)
    .eq("createdBy", "shared")
    .single();

  if (error) {
    throw error;
  }

  if (data) {
    setState(data);
    return data;
  }
};
