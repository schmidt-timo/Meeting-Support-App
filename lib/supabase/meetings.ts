import { supabase } from ".";
import {
  Meeting,
  MeetingAgendaItem,
  MeetingParticipant,
} from "../../utils/types";

export const fetchAllMeetings = async () => {
  return await supabase.from("meetings").select("*");
};

export const fetchSingleMeeting = async (meetingId: string) => {
  return await supabase.from("meetings").select("*").eq("id", meetingId);
};

export const createMeeting = async (meeting: Meeting) => {
  return await supabase.from("meetings").insert([
    {
      ...meeting,
      agenda: meeting.agenda?.map((a) => JSON.stringify(a)),
      participants: meeting.participants?.map((p) => JSON.stringify(p)),
    },
  ]);
};

export const updateAgenda = async (
  meetingId: string,
  agenda: MeetingAgendaItem[]
) => {
  return await supabase
    .from("meetings")
    .update({
      agenda: agenda.map((a) => JSON.stringify(a)),
    })
    .match({ id: meetingId });
};

export const updateParticipants = async (
  meetingId: string,
  participants: MeetingParticipant[]
) => {
  return await supabase
    .from("meetings")
    .update({
      participants: participants.map((p) => JSON.stringify(p)),
    })
    .match({ id: meetingId });
};
