import React from "react";

export type MeetingAgendaItem = {
  id: string;
  title: string;
  description?: string;
  duration?: number;
};

export type MeetingParticipant = {
  id: string;
  name?: string;
  email: string;
};

export type Meeting = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  agenda?: MeetingAgendaItem[];
  participants?: MeetingParticipant[];
  createdBy: string;
  completed: boolean;
};

export type HeaderButton = {
  id: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export type User = {
  id: string;
  name: string;
  email: string;
  knownParticipants: MeetingParticipant[];
};
