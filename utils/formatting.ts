import { MeetingAgendaItem, MeetingParticipant } from "./types";

export function formatMeetingDate(date: Date) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${weekday[date.getDay()]}, ${date.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })}`;
}

function formatMeetingDuration(duration: number) {
  const minutes = Math.floor(duration / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes - hours * 60;

  if (hours < 1) {
    return `${minutes}min`;
  } else if (remainingMinutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${remainingMinutes}min`;
  }
}

export function formatMeetingTime(startDate: Date, endDate: Date) {
  const durationInMilliseconds = Math.abs(
    startDate.getTime() - endDate.getTime()
  );

  return `${startDate.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${endDate.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  })} (${formatMeetingDuration(durationInMilliseconds)})`;
}

export function formatAgendaText(agendaItems: MeetingAgendaItem[]) {
  return agendaItems.length === 0 ? "Add agenda" : "Edit agenda";
}

export function formatParticipantsText(participants: MeetingParticipant[]) {
  return participants.length === 1
    ? `${participants.length} Participant`
    : `${participants.length} Participants`;
}

export function formatWithLeadingZeros(value: number) {
  return value < 10 ? `0${value}` : value;
}

export function formatAgendaItemDuration(totalSeconds: number) {
  const hours = Math.floor((totalSeconds / 3600) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${formatWithLeadingZeros(hours)}:${formatWithLeadingZeros(
      minutes
    )}:${formatWithLeadingZeros(seconds)}`;
  } else {
    return `${formatWithLeadingZeros(minutes)}:${formatWithLeadingZeros(
      seconds
    )}`;
  }
}
