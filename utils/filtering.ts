import { Meeting } from "./types";

export function filterPendingMeetings(meetings: Meeting[]) {
  return meetings.filter((m) => !m.completed);
}

export function filterCompletedMeetings(meetings: Meeting[]) {
  return meetings.filter((m) => m.completed);
}

export function filterMeetingsCreatedByUserId(
  meetings: Meeting[],
  userId: string
) {
  return meetings.filter((m) => m.createdBy === userId);
}

export function filterMeetingsNotCreatedByUserId(
  meetings: Meeting[],
  userId: string
) {
  const meetingsNotCreatedByMe = meetings.filter((m) => m.createdBy !== userId);
  return meetingsNotCreatedByMe.filter((m) =>
    m.participants.find((p) => p.id === userId)
  );
}
