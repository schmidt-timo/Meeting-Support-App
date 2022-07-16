import React from "react";

// For components

export type HeaderButton = {
  id: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export type MeetingAgendaItem = {
  id: string;
  title: string;
  description?: string;
  duration?: number;
};

export type MeetingParticipant = {
  id: string;
  email: string;
  name?: string;
  color?: string;
};

export type Meeting = {
  id: string;
  createdBy: string;
  title: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  description?: string;
  agenda: MeetingAgendaItem[];
  participants: MeetingParticipant[];
  completed: boolean;
  agendaStatus?: MeetingAgendaStatus;
};

export type User = {
  id: string;
  name: string;
  color: string;
};

export type MeetingNote = {
  id: string;
  meetingId: string;
  createdBy: string;
  content: string;
};

export type MeetingQuestion = {
  id: string;
  createdAt: Date;
  meetingId: string;
  question: string;
  upvotes: string[];
  answered: boolean;
};

export type MeetingAgendaStatus = {
  currentItemIndex: number;
  startedAt?: Date;
};

// FOR DATABASE

export type DatabaseParticipant = {
  id: string;
  email: string;
};

export type DatabaseMeeting = {
  id: string;
  createdBy: string;
  title: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  description?: string;
  agenda: MeetingAgendaItem[];
  participants: DatabaseParticipant[];
  completed: boolean;
  currentAgendaItem?: MeetingAgendaStatus;
};
