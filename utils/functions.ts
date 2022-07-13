import { customAlphabet } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import { DatabaseParticipant, MeetingParticipant } from "./types";

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
