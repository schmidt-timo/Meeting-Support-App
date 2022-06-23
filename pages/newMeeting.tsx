import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NewMeetingPage, {
  NewMeetingInputs,
} from "../components/views/NewMeetingPage";
import ManageAgenda from "../components/views/ManageAgenda";
import { Meeting, MeetingAgendaItem, MeetingParticipant } from "../utils/types";
import ManageParticipants from "../components/views/ManageParticipants";
import { exampleParticipant } from "../utils/exampleData";
import { v4 as uuid } from "uuid";

type Views = "CREATE_MEETING" | "MANAGE_AGENDA" | "MANAGE_PARTICIPANTS";

const NewMeeting: NextPage = () => {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<Views>("CREATE_MEETING");
  const [meetingData, setMeetingData] = useState<NewMeetingInputs>();
  const [agendaItems, setAgendaItems] = useState<MeetingAgendaItem[]>([]);
  const [participants, setParticipants] = useState<MeetingParticipant[]>([]);

  // TODO: Delete
  useEffect(() => {
    setParticipants([...participants, exampleParticipant]);
  }, []);

  return (
    <>
      {currentView === "CREATE_MEETING" && (
        <NewMeetingPage
          meetingData={meetingData}
          onNext={(data) => {
            setMeetingData(data);
            setCurrentView("MANAGE_AGENDA");
          }}
          onClose={() => router.push("/")}
        />
      )}
      {currentView === "MANAGE_AGENDA" && (
        <ManageAgenda
          agendaItems={agendaItems}
          onBack={(items) => {
            setAgendaItems(items);
            setCurrentView("CREATE_MEETING");
          }}
          onNext={(items) => {
            setAgendaItems(items);
            setCurrentView("MANAGE_PARTICIPANTS");
          }}
          onClose={() => router.push("/")}
        />
      )}
      {currentView === "MANAGE_PARTICIPANTS" && (
        <ManageParticipants
          participants={participants}
          onBack={(participants) => {
            setParticipants(participants);
            setCurrentView("MANAGE_AGENDA");
          }}
          onCreate={(participants) => {
            setParticipants(participants);
            const meeting: Meeting = {
              id: uuid(),
              title: meetingData!!.meetingTitle,
              startDate: new Date(
                `${meetingData!!.meetingStartDate}T${
                  meetingData!!.meetingStartTime
                }`
              ),
              endDate: new Date(
                `${meetingData!!.meetingEndDate}T${
                  meetingData!!.meetingEndTime
                }`
              ),
              location: meetingData?.meetingLocation,
              createdBy: "timoschmidt", // TODO: User ID
              completed: false,
            };
            console.log(meeting);
            // TODO: Add meeting
          }}
          onClose={() => router.push("/")}
        />
      )}
    </>
  );
};

export default NewMeeting;
