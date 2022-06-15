import { MeetingAgendaItem, MeetingParticipant } from "./types";

// Format Date to "Weekday, XX.XX.XXXX"
export function formatMeetingDate(date: Date) {
  const weekday = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
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

// Format Meeting Time to "XX:XX - XX:XX Uhr"
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
  })} Uhr (${formatMeetingDuration(durationInMilliseconds)})`;
}

export function formatNumberOfParticipants(participants: MeetingParticipant[]) {
  return participants.length === 1
    ? `${participants.length} Teilnehmende/r`
    : `${participants.length} Teilnehmende`;
}

export function formatAgendaText(agendaItems: MeetingAgendaItem[]) {
  return agendaItems.length === 0 ? "Keine Agenda" : "Agenda bearbeiten";
}
