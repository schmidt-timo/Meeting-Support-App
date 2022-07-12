import { Meeting, MeetingParticipant, User } from "./types";

export const exampleMeetings: Meeting[] = [
  {
    id: "example-meeting-1",
    completed: true,
    createdBy: "timoschmidt",
    title: "Team Meeting",
    startDate: new Date("June 1, 2022, 09:00:00"),
    endDate: new Date("June 1, 2022, 10:30:00"),
    location: "Conference Room A",
    agenda: [
      {
        id: "agendaItem1",
        title: "1. Tagespunkt",
        description: "Beschreibung für den ersten Tagespunkt",
        duration: 15,
      },
      {
        id: "agendaItem2",
        title: "2. Tagespunkt",
        description: "Beschreibung für den zweiten Tagespunkt",
        duration: 30,
      },
    ],
    participants: [
      {
        id: "participant1",
        name: "Max Mustermann",
        email: "maxmustermann@email.com",
      },
      {
        id: "participant2",
        name: "Erika Mustermann",
        email: "erikamustermann@email.com",
      },
    ],
  },
  {
    id: "example-meeting-2",
    completed: false,
    createdBy: "timoschmidt",
    title: "Creative Meeting (Project XYZ)",
    startDate: new Date("June 2, 2022, 12:00:00"),
    endDate: new Date("June 2, 2022, 14:00:00"),
    agenda: [],
    participants: [
      {
        id: "participant1",
        name: "Max Mustermann",
        email: "maxmustermann@email.com",
      },
    ],
    location: "Conference Room B",
  },
  {
    id: "example-meeting-3",
    completed: true,
    createdBy: "maxmustermann",
    title: "Weekly",
    startDate: new Date("June 3, 2022, 09:00:00"),
    endDate: new Date("June 3, 2022, 09:30:00"),
    agenda: [],
    participants: [
      {
        id: "participant1",
        name: "Max Mustermann",
        email: "maxmustermann@email.com",
      },
    ],
  },
  {
    id: "example-meeting-4",
    completed: false,
    createdBy: "johndoe",
    title: "Team Meeting",
    startDate: new Date("June 20, 2022, 10:00:00"),
    endDate: new Date("June 20, 2022, 11:30:00"),
    agenda: [
      {
        id: "agendaItem1",
        title: "1. Tagespunkt",
        description: "Beschreibung für den ersten Tagespunkt",
        duration: 15,
      },
      {
        id: "agendaItem2",
        title: "2. Tagespunkt",
        description: "Beschreibung für den zweiten Tagespunkt",
        duration: 30,
      },
    ],
    participants: [
      { id: "participant1", name: "John Doe", email: "johndoe@email.com" },
      {
        id: "participant2",
        name: "Max Mustermann",
        email: "maxmustermann@email.com",
      },
      {
        id: "participant3",
        name: "Erika Mustermann",
        email: "erikamustermann@email.com",
      },
    ],
    location: "Conference Room B",
  },
];

export const exampleUser: User = {
  id: "timoschmidt",
  name: "Timo Schmidt",
  email: "email@address.com",
  color: "#FF0000",
};

export const exampleParticipant: MeetingParticipant = {
  id: "exampleParticipant",
  name: "Max Mustermann",
  email: "maxmustermann@email.com",
  color: "#FF0000",
};
