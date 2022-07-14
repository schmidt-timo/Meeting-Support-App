import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import FullAgenda from "../../components/pages/meeting/FullAgenda";
import MeetingInfo from "../../components/pages/meeting/MeetingInfo";
import MeetingViewPage from "../../components/pages/meeting/MeetingViewPage";
import {
  updateAgendaStatus,
  updateMeetingNote,
  useMeeting,
} from "../../lib/supabase/meeting";
import {
  fetchSingleMeeting,
  getMeetingCreator,
} from "../../lib/supabase/meetings";
import { Meeting, MeetingParticipant } from "../../utils/types";

interface Params extends ParsedUrlQuery {
  meetingId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params as Params;

  const { data: meeting, error } = await fetchSingleMeeting(params.meetingId);

  if (error) {
    throw error;
  }

  const { data: meetingCreator, error: meetingCreatorError } =
    await getMeetingCreator(meeting.createdBy);

  if (meetingCreatorError) {
    throw meetingCreatorError;
  }

  return {
    props: {
      meeting,
      meetingCreator,
    },
  };
};

type Props = {
  meeting: Meeting;
  meetingCreator: MeetingParticipant;
};

type Views = "MEETING" | "INFO" | "QUESTIONS" | "PARTICIPANTS" | "AGENDA";

const MeetingView: NextPage<Props> = ({
  meeting: initialMeeting,
  meetingCreator,
}) => {
  const router = useRouter();
  const [view, setView] = useState<Views>("MEETING");

  const { agendaStatus, meetingNote, databaseStatus, setDatabaseStatus } =
    useMeeting(initialMeeting.id);

  if (!agendaStatus || !meetingNote || !initialMeeting) {
    return <LoadingScreen />;
  }

  // fix dates
  const meeting = {
    ...initialMeeting,
    startDate: new Date(initialMeeting.startDate),
    endDate: new Date(initialMeeting.endDate),
  };

  return (
    <>
      {view === "INFO" && (
        <MeetingInfo
          meeting={meeting}
          onClose={() => setView("MEETING")}
          meetingCreator={meetingCreator}
        />
      )}

      {view === "AGENDA" && <FullAgenda onClose={() => setView("MEETING")} />}

      {view === "MEETING" && (
        <MeetingViewPage
          meeting={meeting}
          onShowInfo={() => setView("INFO")}
          onExitMeeting={() => {
            // TODO: Ask before leaving
            router.push("/");
          }}
          agendaStatus={agendaStatus}
          onShowFullAgenda={() => setView("AGENDA")}
          onAgendaItemChange={async (newIndex) => {
            updateAgendaStatus(meeting.id, {
              currentItemIndex: newIndex,
              startedAt: new Date(),
            });
          }}
          onMeetingNoteChange={async (newText) => {
            return updateMeetingNote(meetingNote.id, newText);
          }}
          meetingNote={meetingNote}
          databaseStatus={databaseStatus}
          setDatabaseStatus={setDatabaseStatus}
        />
      )}
    </>
  );
};

export default MeetingView;
