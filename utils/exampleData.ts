import { Meeting } from "./types";

export const exampleMeeting1: Meeting = {
  id: "example-meeting-1",
  createdBy: "timoschmidt",
  name: "Team-Meeting",
  startDate: new Date("June 1, 2022, 09:00:00"),
  endDate: new Date("June 1, 2022, 10:30:00"),
  location: "Besprechungsraum A",
  agenda: [
    {
      title: "1. Tagespunkt",
      description: "Beschreibung für den ersten Tagespunkt",
      duration: 15,
    },
    {
      title: "2. Tagespunkt",
      description: "Beschreibung für den zweiten Tagespunkt",
      duration: 30,
    },
  ],
  participants: [
    {
      name: "Max Mustermann",
      email: "maxmustermann@email.com",
    },
    {
      name: "Erika Mustermann",
      email: "erikamustermann@email.com",
    },
  ],
};

export const exampleMeeting2: Meeting = {
  id: "example-meeting-2",
  createdBy: "timoschmidt",
  name: "Kreativ-Meeting (Projekt XYZ)",
  startDate: new Date("June 2, 2022, 12:00:00"),
  endDate: new Date("June 2, 2022, 14:00:00"),
  agenda: [],
  participants: [
    {
      name: "Max Mustermann",
      email: "maxmustermann@email.com",
    },
  ],
  location: "Besprechungsraum B",
};

export const exampleMeeting3: Meeting = {
  id: "example-meeting-1",
  createdBy: "maxmustermann",
  name: "Weekly",
  startDate: new Date("June 3, 2022, 09:00:00"),
  endDate: new Date("June 3, 2022, 09:30:00"),
  agenda: [],
  participants: [
    {
      name: "Max Mustermann",
      email: "maxmustermann@email.com",
    },
  ],
};

export const exampleMeetings: Meeting[] = [
  exampleMeeting1,
  exampleMeeting2,
  exampleMeeting3,
];
