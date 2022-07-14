import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import FullAgenda from "../../components/pages/meeting/FullAgenda";
import MeetingInfo from "../../components/pages/meeting/MeetingInfo";
import { DatabaseSyncStatus } from "../../components/pages/meeting/MeetingNotes";
import MeetingViewPage from "../../components/pages/meeting/MeetingViewPage";
import { useAuth } from "../../lib/auth";
import { supabase } from "../../lib/supabase/config";
import {
  createMeetingNote,
  fetchMeetingNote,
  fetchSingleMeeting,
  getAgendaStatusForMeeting,
  getMeetingCreator,
  updateAgendaStatus,
  updateMeetingNote,
} from "../../lib/supabase/meetings";
import { generateRandomID } from "../../utils/functions";
import {
  Meeting,
  MeetingAgendaStatus,
  MeetingParticipant,
} from "../../utils/types";

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

type Views = "MEETING" | "INFO" | "QUESTIONS" | "PARTICIPANTS" | "AGENDA";

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

  const [currentAgendaStatus, setCurrentAgendaStatus] =
    useState<MeetingAgendaStatus>({
      currentItemIndex: 0,
      startedAt: new Date(),
    });

  useEffect(() => {
    console.log(currentAgendaStatus);
  }, [currentAgendaStatus]);

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
    getMeetingNote();
    getCurrentAgendaStatus();
  }, []);

  useEffect(() => {
    const currentAgendaItemListener = supabase
      .from("meetings")
      .on("UPDATE", (payload) => {
        setCurrentAgendaStatus(payload.new.agendaStatus);
      })
      .subscribe();

    return () => {
      currentAgendaItemListener.unsubscribe();
    };
  }, []);

  const getCurrentAgendaStatus = async () => {
    const { data, error } = await getAgendaStatusForMeeting(meeting.id);

    if (error) {
      throw error;
    }

    if (data) {
      if (Object.keys(data.agendaStatus).length !== 0) {
        setCurrentAgendaStatus(data.agendaStatus);
      }
    }
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
          setCurrentAgendaItem={async (newIndex) => {
            const startedAt = new Date();
            await updateAgendaStatus(meeting.id, newIndex, startedAt)
              .then(() => {
                setCurrentAgendaStatus({
                  currentItemIndex: newIndex,
                  startedAt,
                });
              })
              .catch((error) => {
                throw error;
              });
          }}
          currentAgendaStatus={currentAgendaStatus}
          onShowFullAgenda={() => setView("AGENDA")}
        />
      )}
    </>
  );
};

export default MeetingView;
