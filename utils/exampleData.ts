import { Meeting, MeetingAgendaItem, MeetingParticipant } from "./types";

export const exampleMeetings: Meeting[] = [
  {
    id: "example-meeting-1",
    completed: true,
    createdBy: "timoschmidt",
    name: "Team Meeting",
    startDate: new Date("June 1, 2022, 09:00:00"),
    endDate: new Date("June 1, 2022, 10:30:00"),
    location: "Conference Room A",
    agenda: [
      {
        id: "MEETING1_AGENDA_ITEM_01",
        title: "1. Tagespunkt",
        description: "Beschreibung für den ersten Tagespunkt",
        duration: 15,
      },
      {
        id: "MEETING1_AGENDA_ITEM_02",
        title: "2. Tagespunkt",
        description: "Beschreibung für den zweiten Tagespunkt",
        duration: 30,
      },
    ],
    participants: [
      {
        id: "PARTICIPANT_1",
        firstName: "Max",
        lastName: "Mustermann",
        email: "maxmustermann@email.com",
      },
      {
        id: "PARTICIPANT_2",
        firstName: "Erika",
        lastName: "Mustermann",
        email: "erikamustermann@email.com",
      },
    ],
  },
  {
    id: "example-meeting-2",
    completed: false,
    createdBy: "timoschmidt",
    name: "Creative Meeting (Project XYZ)",
    startDate: new Date("June 2, 2022, 12:00:00"),
    endDate: new Date("June 2, 2022, 14:00:00"),
    agenda: [],
    participants: [
      {
        id: "PARTICIPANT_1",
        firstName: "Max",
        lastName: "Mustermann",
        email: "maxmustermann@email.com",
      },
    ],
    location: "Conference Room B",
  },
  {
    id: "example-meeting-3",
    completed: true,
    createdBy: "maxmustermann",
    name: "Weekly",
    startDate: new Date("June 3, 2022, 09:00:00"),
    endDate: new Date("June 3, 2022, 09:30:00"),
    agenda: [],
    participants: [
      {
        id: "PARTICIPANT_1",
        firstName: "Max",
        lastName: "Mustermann",
        email: "maxmustermann@email.com",
      },
    ],
  },
  {
    id: "example-meeting-4",
    completed: false,
    createdBy: "johndoe",
    name: "Team Meeting",
    startDate: new Date("June 20, 2022, 10:00:00"),
    endDate: new Date("June 20, 2022, 11:30:00"),
    agenda: [
      {
        id: "MEETING2_AGENDA_ITEM_01",
        title: "1. Tagespunkt",
        description: "Beschreibung für den ersten Tagespunkt",
        duration: 15,
      },
      {
        id: "MEETING2_AGENDA_ITEM_02",
        title: "2. Tagespunkt",
        description: "Beschreibung für den zweiten Tagespunkt",
        duration: 30,
      },
    ],
    participants: [
      {
        id: "PARTICIPANT_1",
        firstName: "Max",
        lastName: "Mustermann",
        email: "maxmustermann@email.com",
      },
      {
        id: "PARTICIPANT_2",
        firstName: "Erika",
        lastName: "Mustermann",
        email: "erikamustermann@email.com",
      },
      {
        id: "PARTICIPANT_3",
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@email.com",
      },
    ],
    location: "Conference Room B",
  },
];

export const exampleAgendaItems: MeetingAgendaItem[] = [
  {
    id: "AGENDA_ITEM_01",
    title: "1. First agenda item",
    description:
      "Here is a description for the first item. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.",
    duration: 15,
  },
  {
    id: "AGENDA_ITEM_02",
    title: "2. Second agenda item",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    duration: 30,
  },
  {
    id: "AGENDA_ITEM_03",
    title: "3. Third agenda item",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam.",
    duration: 25,
  },
];

export const exampleParticipants: MeetingParticipant[] = [
  {
    id: "PARTICIPANT_1",
    firstName: "Max",
    lastName: "Mustermann",
    email: "maxmustermann@email.com",
  },
  {
    id: "PARTICIPANT_2",
    firstName: "Erika",
    lastName: "Mustermann",
    email: "erikamustermann@email.com",
  },
  {
    id: "PARTICIPANT_3",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@email.com",
  },
];
