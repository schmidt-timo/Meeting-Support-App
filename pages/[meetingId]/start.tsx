import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import MeetingInfo from "../../components/pages/meeting/MeetingInfo";
import { DatabaseSyncStatus } from "../../components/pages/meeting/MeetingNotes";
import MeetingViewPage from "../../components/pages/meeting/MeetingViewPage";
import { useAuth } from "../../lib/auth";
import {
  createMeetingNote,
  fetchMeetingNote,
  fetchSingleMeeting,
  getMeetingCreator,
  updateMeetingNote,
} from "../../lib/supabase/meetings";
import { generateRandomID } from "../../utils/functions";
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
      meeting: meeting,
      meetingCreator,
    },
  };
};

type Props = {
  meeting: Meeting;
  meetingCreator: MeetingParticipant;
};

type Views = "MEETING" | "INFO" | "QUESTIONS" | "PARTICIPANTS";

const MeetingView: NextPage<Props> = ({
  meeting: initialMeeting,
  meetingCreator,
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const [view, setView] = useState<Views>("MEETING");

  if (!initialMeeting || !meetingCreator) {
    return <LoadingScreen />;
  }

  const meeting = {
    ...initialMeeting,
    startDate: new Date(initialMeeting.startDate),
    endDate: new Date(initialMeeting.endDate),
  };

  const [meetingNoteText, setMeetingNoteText] = useState<string>("");
  const [meetingNoteId, setMeetingNoteId] = useState<string | null>(null);
  const [dbSyncStatus, setDbSyncStatus] = useState<DatabaseSyncStatus>("NONE");
  const [isLoading, setIsLoading] = useState(false);

  const createNewMeetingNote = async () => {
    const { data, error } = await createMeetingNote({
      id: generateRandomID(),
      meetingId: meeting.id,
      createdBy: user!.id,
      content: meetingNoteText,
    });

    if (data) {
      setMeetingNoteId(data[0].id);
    }

    if (error) {
      throw error;
    }
  };

  var newMeetingNote = (function () {
    var executed = false;
    return function () {
      if (!executed) {
        executed = true;
        createNewMeetingNote();
      }
    };
  })();

  useEffect(() => {
    // check if note for this user already exist
    const getMeetingNote = async () => {
      const { data, error } = await fetchMeetingNote(meeting.id, user!.id);

      if (data) {
        setMeetingNoteId(data.id);
        setMeetingNoteText(data.content);
      }

      if (error) {
        // if not, create
        newMeetingNote();
      }
    };
    getMeetingNote().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {view === "INFO" && (
        <MeetingInfo
          meeting={meeting}
          onClose={() => setView("MEETING")}
          meetingCreator={meetingCreator}
        />
      )}

      <MeetingViewPage
        meeting={meeting}
        onShowMeetingInfo={() => setView("INFO")}
        databaseStatus={dbSyncStatus}
        onClose={() => {
          //TODO: Ask if meeting should be ended for everyone?
          // Meeting should disappear from overview and go into reports
          // Go back
          router.push("/");
        }}
        meetingNote={meetingNoteText}
        onChangeNote={(text) => {
          setMeetingNoteText(text);
          setDbSyncStatus("SYNCHING");
          const updateNotes = async () => {
            return await updateMeetingNote(meetingNoteId!, text);
          };

          if (meetingNoteId) {
            setTimeout(() => {
              updateNotes()
                .then(({ status }) => {
                  if (status === 200) {
                    setDbSyncStatus("SYNCHED");
                  }
                })
                .catch((error) => {
                  setDbSyncStatus("ERROR");
                  throw error;
                });
            }, 5000);
          }
        }}
      />
    </>
  );
};

export default MeetingView;
