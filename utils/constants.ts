export const NAVIGATION_IDS = {
  meetings: "NAV_MEETINGS",
  reports: "NAV_REPORTS",
  profile: "NAV_PROFILE",
};

export const MEETING_CATEGORY_LABELS = {
  yourMeetings: "Created by you",
  otherMeetings: "Other meetings",
};

export const ERROR_MESSAGES = {
  IS_REQUIRED: "This field is required",
  NOT_EMAIL_REGEX: "This is not an email address",
  NOT_NUMBER_REGEX: "This is not a number",
  PASSWORD: {
    MIN_LENGTH: "Passwords must to have at least 6 characters",
    NO_MATCH: "Passwords do not match",
  },
  PARTICIPANT_ALREADY_EXISTS: "This participant already exists",
  START_DATE: {
    IS_REQUIRED: "Start date is required",
    NOT_IN_PAST: "Start date cannot be before today",
  },
  START_TIME: {
    IS_REQUIRED: "Start time is required",
    NOT_IN_PAST: "Start time cannot be in the past",
  },
  END_DATE: {
    IS_REQUIRED: "End date is required",
    NOT_IN_PAST: "End date cannot be before the start date",
  },
  END_TIME: {
    IS_REQUIRED: "End time is required",
    NOT_IN_PAST: "End time cannot be before the start time",
  },
};

export const COLORS = [
  "#F94144",
  "#F3722C",
  "#F8961E",
  "#F9844A",
  "#F9C74F",
  "#90BE6D",
  "#43AA8B",
  "#4D908E",
  "#577590",
  "#277DA1",
];

export const MEETING_FEEDBACK_QUESTIONS = [
  "How did you like the meeting overall?",
  "Was your presence required?",
  "How could the meeting have been improved?",
];
