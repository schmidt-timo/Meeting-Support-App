var uniqid = require("uniqid");

export function getNameInitials(name: string) {
  const nameParts = name.split(" ");
  var result = nameParts[0].substring(0, 1).toUpperCase();
  if (nameParts.length > 1) {
    result += nameParts[nameParts.length - 1].substring(0, 1).toUpperCase();
  }
  return result;
}

export function generateUserId() {
  return uniqid("user-");
}

export function generateParticipantId() {
  return uniqid("participant-");
}

export function generateMeetingId() {
  return uniqid("meeting-");
}

export function generateAgendaItemId() {
  return uniqid("ai-");
}
