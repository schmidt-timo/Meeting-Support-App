import {
  DatabaseMeeting,
  DatabaseParticipant,
  MeetingAgendaItem,
} from "../../utils/types";
import { supabase } from "./config";

export const fetchAllMeetings = async () => {
  return await supabase
    .from("meetings")
    .select("*")
    .order("startDate", { ascending: true });
};

export const fetchSingleMeeting = async (meetingId: string) => {
  return await supabase
    .from("meetings")
    .select("*")
    .eq("id", meetingId)
    .single();
};

export const getMeetingCreator = async (creatorId: string) => {
  return await supabase
    .from("existing_users")
    .select("*")
    .eq("id", creatorId)
    .single();
};

export const createMeeting = async (meeting: DatabaseMeeting) => {
  return await supabase.from("meetings").insert([meeting]);
};

export const deleteMeeting = async (meetingId: string) => {
  return await supabase.from("meetings").delete().match({ id: meetingId });
};

export const updateMeetingDetails = async (meeting: DatabaseMeeting) => {
  return await supabase
    .from("meetings")
    .update({
      title: meeting.title,
      startDate: meeting.startDate,
      endDate: meeting.endDate,
      location: meeting.location,
      description: meeting.description,
    })
    .match({ id: meeting.id });
};

export const updateAgenda = async (
  meetingId: string,
  agendaItems: MeetingAgendaItem[]
) => {
  return await supabase
    .from("meetings")
    .update({
      agenda: agendaItems,
    })
    .match({ id: meetingId });
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

export const markMeetingAsComplete = async (meetingId: string) => {
  return await supabase
    .from("meetings")
    .update({ completed: true })
    .eq("id", meetingId);
};
