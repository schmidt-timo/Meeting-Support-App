import { customAlphabet } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import { MEETING_FEEDBACK_QUESTIONS } from "./constants";
import {
  DatabaseParticipant,
  MeetingFeedback,
  MeetingFeedbackResponse,
  MeetingParticipant,
} from "./types";

export function getNameInitials(name: string) {
  const nameParts = name.split(" ");
  var result = nameParts[0].substring(0, 1).toUpperCase();
  if (nameParts.length > 1) {
    result += nameParts[nameParts.length - 1].substring(0, 1).toUpperCase();
  }
  return result;
}

export function generateRandomID() {
  return uuidv4();
}

// Generate shorter IDs for meetings
export function generateMeetingID() {
  return customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10)();
}

export function convertStringsToDate(date: string, time: string) {
  return new Date(`${date}T${time}`);
}

export function dateAsStringIsTodayOrLater(dateString: string) {
  return Date.parse(dateString) >= Date.parse(new Date().toDateString());
}

export function isTheSameDay(date1: Date, date2: Date) {
  return (
    date1.toLocaleDateString("de-DE") === date2.toLocaleDateString("de-DE")
  );
}

export function objectsAreEqual(obj1: any, obj2: any) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function arraysAreEqual(arr1: any[], arr2: any[]) {
  if (arr1 === arr2) {
    return true;
  }
  if (arr1 == null || arr2 == null) {
    return false;
  }
  if (arr1.length !== arr2.length) {
    return false;
  }
  return true;
}

export function convertParticipantsForDatabase(
  participants: MeetingParticipant[]
): DatabaseParticipant[] {
  let databaseParticipants: DatabaseParticipant[] = [];

  participants.forEach((p) => {
    databaseParticipants.push({
      id: p.id,
      email: p.email,
    });
  });

  return databaseParticipants;
}

export function calculateTotalTime(startDate: Date, endDate: Date) {
  const totalSeconds =
    Math.floor(endDate.getTime() - startDate.getTime()) / 1000;

  return {
    total: Math.floor(totalSeconds),
    hours: Math.floor((totalSeconds / 3600) % 24),
    minutes: Math.floor((totalSeconds / 60) % 60),
    seconds: Math.floor(totalSeconds % 60),
  };
}

export function calculatePassedTime(startDate: Date) {
  const totalSeconds =
    Math.floor(new Date().getTime() - startDate.getTime()) / 1000;

  return {
    total: Math.floor(totalSeconds),
    hours: Math.floor((totalSeconds / 3600) % 24),
    minutes: Math.floor((totalSeconds / 60) % 60),
    seconds: Math.floor(totalSeconds % 60),
  };
}

export function getFileNameFromUrl(url: string) {
  const removeSignedParams = url.split(".pdf")[0];
  const splitted = removeSignedParams.split("/");
  return `${splitted[splitted.length - 1]}.pdf`;
}

export function mapFeedbackToQuestions(feedback: MeetingFeedback[]) {
  let question1: MeetingFeedbackResponse[] = [];
  let question2: MeetingFeedbackResponse[] = [];
  let question3: MeetingFeedbackResponse[] = [];

  feedback.forEach((f) => {
    f.responses.forEach((r) => {
      if (r.question === MEETING_FEEDBACK_QUESTIONS[0]) {
        question1.push(r);
      }
      if (r.question === MEETING_FEEDBACK_QUESTIONS[1]) {
        question2.push(r);
      }
      if (r.question === MEETING_FEEDBACK_QUESTIONS[2]) {
        question3.push(r);
      }
    });
  });

  return [question1, question2, question3];
}

export function mapEmojisToResponses(responses: MeetingFeedbackResponse[]) {
  let good = 0;
  let neutral = 0;
  let bad = 0;

  responses.forEach((r) => {
    if (r.response === "good") good += 1;
    if (r.response === "neutral") neutral += 1;
    if (r.response === "bad") bad += 1;
  });

  return {
    good,
    neutral,
    bad,
  };
}

export function mapYesNoToResponses(responses: MeetingFeedbackResponse[]) {
  let yes = 0;
  let no = 0;

  responses.forEach((r) => {
    if (r.response === "yes") yes += 1;
    if (r.response === "no") no += 1;
  });

  return {
    yes,
    no,
  };
}
