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
  PARTICIPANT_ALREADY_EXISTS: "This participant already exists",
  START_DATE: {
    IS_REQUIRED: "Start date is required",
    NOT_IN_PAST: "Start date cannot be in the past",
  },
  START_TIME: {
    IS_REQUIRED: "Start time is required",
    NOT_IN_PAST: "Start time cannot be in the past",
  },
  END_DATE: {
    IS_REQUIRED: "End date is required",
    NOT_IN_PAST: "Select end date after start date",
  },
  END_TIME: {
    IS_REQUIRED: "End time is required",
    NOT_IN_PAST: "Select end time after start time",
  },
};
