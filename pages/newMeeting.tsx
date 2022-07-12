import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NewMeetingPage, {
  MeetingDataInputs,
} from "../components/pages/NewMeetingPage";
import ManageAgenda from "../components/pages/ManageAgenda";
import {
  DatabaseMeeting,
  MeetingAgendaItem,
  MeetingParticipant,
} from "../utils/types";
import ManageParticipants from "../components/pages/ManageParticipants";
import {
  convertParticipantsForDatabase,
  convertStringsToDate,
  generateRandomID,
} from "../utils/functions";
import { createMeeting } from "../lib/supabase/meetings";
import { useAuth } from "../lib/auth";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import {
  getParticipantInfo,
  getParticipantInfoIfEmailIsRegistered,
} from "../lib/supabase/users";

type Views = "CREATE_MEETING" | "MANAGE_AGENDA" | "MANAGE_PARTICIPANTS";

const NewMeeting: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const initialParticipant = {
    id: user!.id,
    email: user!.email!,
  };

  const [currentView, setCurrentView] = useState<Views>("CREATE_MEETING");
  const [meetingData, setMeetingData] = useState<MeetingDataInputs>();
  const [agendaItems, setAgendaItems] = useState<MeetingAgendaItem[]>([]);
  const [participants, setParticipants] = useState<MeetingParticipant[]>([
    initialParticipant,
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // retrieve current user data and replace initial participant
    getParticipantInfo(user!.id).then((p) => {
      setParticipants([p]);
    });
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}

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
          onAddAgendaItem={(item) => {
            return new Promise((resolve, reject) => {
              setAgendaItems([...agendaItems, item]);
              resolve();
            });
          }}
          onUpdateAgendaItem={(item) => {
            const index = agendaItems.findIndex((el) => el.id === item.id);
            const updatedItems = agendaItems;
            updatedItems[index] = item;
            setAgendaItems(updatedItems);
          }}
          onDeleteAgendaItem={(itemId) => {
            setAgendaItems(agendaItems.filter((item) => item.id !== itemId));
          }}
        />
      )}
      {currentView === "MANAGE_PARTICIPANTS" && (
        <ManageParticipants
          userId={user!.id}
          participants={participants}
          buttonText="Create Meeting"
          onBack={(updatedParticipants) => {
            setParticipants(updatedParticipants);
            setCurrentView("MANAGE_AGENDA");
          }}
          onAddParticipant={async (participantToAdd) => {
            const { data, error } = await getParticipantInfoIfEmailIsRegistered(
              participantToAdd.email
            );

            if (data) {
              setParticipants([...participants, data]);
              return data;
            }

            if (error) {
              setParticipants([...participants, participantToAdd]);
              return participantToAdd;
            }
          }}
          onDeleteParticipant={(participantId) =>
            setParticipants(participants.filter((p) => p.id !== participantId))
          }
          onCreate={async (updatedParticipants) => {
            setParticipants(updatedParticipants);
            const meeting: DatabaseMeeting = {
              id: generateRandomID(),
              createdBy: user!.id,
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
              agenda: agendaItems,
              participants: convertParticipantsForDatabase(updatedParticipants),
              completed: false,
            };

            setLoading(true);
            const { data, error } = await createMeeting(meeting);

            if (error) {
              setLoading(false);
              throw error;
            }

            if (data) {
              setLoading(false);
              router.push("/");
            }
          }}
          onClose={() => router.push("/")}
        />
      )}
    </>
  );
};

export default NewMeeting;
