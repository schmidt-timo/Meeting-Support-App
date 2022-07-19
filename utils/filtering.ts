import { Meeting, MeetingQuestion } from "./types";

export function filterMeetingsCreatedByUserId(
  meetings: Meeting[],
  userId: string
) {
  return meetings.filter((m) => m.createdBy === userId);
}

export function filterMeetingsNotCreatedByUserId(
  meetings: Meeting[],
  userId: string,
  email: string
) {
  const meetingsNotCreatedByMe = meetings.filter((m) => m.createdBy !== userId);

  return meetingsNotCreatedByMe.filter((m) =>
    m.participants.find((p) => p.email === email)
  );
}

export function filterOpenQuestions(questions: MeetingQuestion[]) {
  return questions.filter((q) => !q.answered);
}

export function filterAnsweredQuestions(questions: MeetingQuestion[]) {
  return questions.filter((q) => q.answered);
}
