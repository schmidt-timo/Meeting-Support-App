import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NewMeetingPage, {
  NewMeetingInputs,
} from "../components/pages/NewMeetingPage";
import ManageAgenda from "../components/pages/ManageAgenda";
import { Meeting, MeetingAgendaItem, MeetingParticipant } from "../utils/types";
import ManageParticipants from "../components/pages/ManageParticipants";
import { exampleParticipant } from "../utils/exampleData";
import { generateMeetingId } from "../utils/functions";

type Views = "CREATE_MEETING" | "MANAGE_AGENDA" | "MANAGE_PARTICIPANTS";

const NewMeeting: NextPage = () => {
  const currentUserId = "timoschmidt"; //TODO: Get current user id
  const router = useRouter();
  const [currentView, setCurrentView] = useState<Views>("CREATE_MEETING");
  const [meetingData, setMeetingData] = useState<NewMeetingInputs>();
  const [agendaItems, setAgendaItems] = useState<MeetingAgendaItem[]>([]);
  const [participants, setParticipants] = useState<MeetingParticipant[]>([]);

  useEffect(() => {
    setParticipants([...participants, exampleParticipant]); // TODO: add current registered user automatically to participants list
  }, []);

  return (
    <>
      {currentView === "CREATE_MEETING" && (
        <NewMeetingPage
          meetingData={meetingData}
          buttonText="Next"
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
          buttonText="Next"
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
          buttonText="Create Meeting"
          onBack={(participants) => {
            setParticipants(participants);
            setCurrentView("MANAGE_AGENDA");
          }}
          onCreate={(participants) => {
            setParticipants(participants);
            const meeting: Meeting = {
              id: generateMeetingId(),
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
              description: meetingData?.meetingDescription,
              createdBy: currentUserId,
              completed: false,
              agenda: agendaItems,
              participants: participants,
            };
            console.log(meeting);
            // TODO: Add meeting and go back to overview page
          }}
          onClose={() => router.push("/")}
        />
      )}
    </>
  );
};

export default NewMeeting;
