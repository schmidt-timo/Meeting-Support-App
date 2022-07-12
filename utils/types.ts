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
};

export type User = {
  id: string;
  name: string;
  color: string;
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
};
