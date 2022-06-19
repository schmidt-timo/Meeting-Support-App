export type MeetingAgendaItem = {
  id: string;
  title: string;
  description?: string;
  duration?: number;
};

export type MeetingParticipant = {
  id: string;
  name: string;
  email: string;
};

export type Meeting = {
  id: string; // meeting ID
  name: string;
  createdBy: string; // user ID
  completed: boolean;
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
