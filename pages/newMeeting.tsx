import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NewMeetingPage, {
  NewMeetingInputs,
} from "../components/pages/NewMeetingPage";
import ManageAgenda from "../components/pages/ManageAgenda";
import { Meeting, MeetingAgendaItem, MeetingParticipant } from "../utils/types";
import ManageParticipants from "../components/pages/ManageParticipants";
import { convertStringsToDate, generateRandomID } from "../utils/functions";
import { createMeeting } from "../lib/supabase/meetings";
import { useAuth } from "../lib/auth";

type Views = "CREATE_MEETING" | "MANAGE_AGENDA" | "MANAGE_PARTICIPANTS";

const NewMeeting: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [currentView, setCurrentView] = useState<Views>("CREATE_MEETING");
  const [meetingData, setMeetingData] = useState<NewMeetingInputs>();
  const [agendaItems, setAgendaItems] = useState<MeetingAgendaItem[]>([]);
  const [participants, setParticipants] = useState<MeetingParticipant[]>([]);

  useEffect(() => {
    setParticipants([
      ...participants,
      {
        id: user!.id,
        email: user!.email!,
      },
    ]); // TODO: add current registered user automatically to participants list
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
          userId={user!.id}
          participants={participants}
          buttonText="Create Meeting"
          onBack={(participants) => {
            setParticipants(participants);
            setCurrentView("MANAGE_AGENDA");
          }}
          onCreate={(participants) => {
            setParticipants(participants);
            const meeting: Meeting = {
              id: generateRandomID(),
              title: meetingData!!.title,
              startDate: convertStringsToDate(
                meetingData!!.startDate,
                meetingData!!.startTime
              ),
              endDate: convertStringsToDate(
                meetingData!!.endDate,
                meetingData!!.endTime
              ),
              location: meetingData?.location,
              description: meetingData?.description,
              createdBy: user!.id,
              completed: false,
              agenda: agendaItems,
              participants: participants,
            };

            const meetingCreation = async () => {
              const { data, error } = await createMeeting(meeting);

              if (error) {
                throw error;
              }

              if (data) {
                router.push("/");
              }
            };
            meetingCreation();
          }}
          onClose={() => router.push("/")}
        />
      )}
    </>
  );
};

export default NewMeeting;
