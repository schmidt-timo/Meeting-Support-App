import {
  DatabaseMeeting,
  DatabaseParticipant,
  MeetingAgendaItem,
  MeetingFeedback,
} from "../../utils/types";
import { supabase } from "./config";

export const fetchAllMeetings = async () => {
  return await supabase
    .from("meetings")
    .select("*")
    .order("startDate", { ascending: true });
};

export const fetchOpenMeetings = async () => {
  return await supabase
    .from("meetings")
    .select("*")
    .eq("completed", false)
    .order("startDate", { ascending: true });
};

export const fetchCompletedMeetings = async () => {
  return await supabase
    .from("meetings")
    .select("*")
    .eq("completed", true)
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

export const uploadFileToAgendaItem = async (
  file: File,
  agendaItemId: string,
  meetingId: string
) => {
  let { data, error: uploadError } = await supabase.storage
    .from("files")
    .upload(`${meetingId}/${agendaItemId}/${file.name}`, file);

  if (uploadError) {
    throw uploadError;
  }

  if (data) {
    return data;
  }
};

export const getSignedUrlForAgendaItemFile = async (
  fileName: string,
  agendaItemId: string,
  meetingId: string
) => {
  const { signedURL, error } = await supabase.storage
    .from("files")
    .createSignedUrl(`${meetingId}/${agendaItemId}/${fileName}`, 31560000); // valid for 1 year

  if (error) {
    throw error;
  }

  if (signedURL) {
    return signedURL;
  }
};

export const deleteFileFromAgendaItem = async (filePath: string) => {
  const { data, error } = await supabase.storage
    .from("files")
    .remove([filePath]);

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
};

export const submitFeedback = async (feedback: MeetingFeedback) => {
  const { data, error } = await supabase
    .from("meeting_feedback")
    .insert([feedback]);

  if (error) {
    throw error;
  }

  if (data) {
    return data;
  }
};

export const fetchFeedbackForMeeting = async (meetingId: string) => {
  return await supabase
    .from("meeting_feedback")
    .select("*")
    .eq("meetingId", meetingId);
};
