import React from "react";

export type MeetingAgendaItem = {
  title: string;
  description?: string;
  duration?: number;
};

export type MeetingParticipant = {
  name: string;
  email: string;
};

export type Meeting = {
  id: string; // meeting ID
  createdBy: string; // user ID
  // passcode: string
  name: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  agenda?: MeetingAgendaItem[];
  participants?: MeetingParticipant[];
};

export type HeaderButton = {
  id: string;
  icon: React.ReactNode;
  href: string;
};
