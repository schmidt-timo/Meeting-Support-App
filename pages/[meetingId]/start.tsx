import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import Button from "../../components/formElements/Button";
import NotificationLabel from "../../components/formElements/NotificationLabel";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import Modal from "../../components/Modal/Modal";
import FullAgenda from "../../components/pages/meeting/FullAgenda";
import ManageQuestions from "../../components/pages/meeting/ManageQuestions";
import MeetingInfo from "../../components/pages/meeting/MeetingInfo";
import MeetingViewPage from "../../components/pages/meeting/MeetingViewPage";
import MeetingViewPageDesktop from "../../components/pages/meeting/MeetingViewPageDesktop";
import { useAuth } from "../../lib/auth";
import {
  changeMeetingQuestionAnsweredStatus,
  createMeetingQuestion,
  markMeetingAsComplete,
  updateAgendaStatus,
  updateMeetingNote,
  upvoteMeetingQuestion,
  useMeeting,
} from "../../lib/supabase/meeting";
import {
  fetchSingleMeeting,
  getMeetingCreator,
} from "../../lib/supabase/meetings";
import { Meeting, MeetingParticipant } from "../../utils/types";
import EditParticipants from "./participants";

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
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const handleResizeWindow = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResizeWindow);

    return () => window.removeEventListener("resize", handleResizeWindow);
  });

  const {
    agendaStatus,
    meetingNote,
    sharedNotes,
    databaseStatus,
    setDatabaseStatus,
    sharedNotesDatabaseStatus,
    setSharedNotesDatabaseStatus,
    participants,
    meetingQuestions,
    meetingIsCompleted,
  } = useMeeting(initialMeeting);

  if (!agendaStatus || !meetingNote || !sharedNotes || !initialMeeting) {
    return <LoadingScreen />;
  }

  // fix dates
  const meeting = {
    ...initialMeeting,
    startDate: new Date(initialMeeting.startDate),
    endDate: new Date(initialMeeting.endDate),
  };

  const endMeeting = async () => {
    markMeetingAsComplete(meeting.id)
      .then((data) => {
        if (data) {
          router.push("/");
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  if (view === "PARTICIPANTS") {
    return (
      <EditParticipants
        meetingId={meeting.id}
        createdBy={meetingCreator.id}
        participants={participants}
        onClose={() => setView("MEETING")}
      />
    );
  }

  return (
    <>
      {showAlarm && (
        <Modal
          variant="ALARM"
          title={
            <div className="flex items-center space-x-2">
              <MdNotificationsActive className="w-5 h-5" />
              <p>Alarm: Meeting End</p>
            </div>
          }
          onClose={() => setShowAlarm(false)}
        >
          <div className="space-y-5">
            <p className="text-sm">
              You have reached your set meeting time. You can continue the
              meeting or end it now for everyone (if you are the meeting owner).
            </p>
            <div className="space-y-2">
              <Button onClick={() => setShowAlarm(false)} variant="highlighted">
                Continue
              </Button>
              {meeting.createdBy === user!.id && (
                <Button onClick={endMeeting} variant="red">
                  End meeting for all participants
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {showExitModal && (
        <Modal title="Leaving Meeting" onClose={() => setShowExitModal(false)}>
          <div className="space-y-3">
            <NotificationLabel variant="red">
              After the meeting owner has ended the meeting for all
              participants, it cannot be resumed.
            </NotificationLabel>
            <div className="space-y-2">
              <Button onClick={() => router.push("/")} variant="highlighted">
                Leave meeting
              </Button>
              {meeting.createdBy === user!.id && (
                <Button onClick={endMeeting} variant="red">
                  End meeting for all participants
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {meetingIsCompleted && (
        <Modal title="Meeting has ended" onClose={() => router.push("/")}>
          <div className="space-y-3">
            <p className="text-sm">
              The meeting was ended for all participants.
            </p>
            <div className="space-y-2">
              <Button onClick={() => router.push("/")} variant="highlighted">
                Leave meeting
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {view === "INFO" && (
        <MeetingInfo
          meeting={meeting}
          onClose={() => setView("MEETING")}
          meetingCreator={meetingCreator}
        />
      )}

      {view === "AGENDA" && (
        <FullAgenda
          agendaItems={meeting.agenda}
          onClose={() => setView("MEETING")}
          onEditAgenda={() => router.push(`/${meeting.id}/agenda`)}
        />
      )}

      {view === "MEETING" && windowSize < 1000 && (
        <MeetingViewPage
          onAlarm={() => setShowAlarm(true)}
          meeting={meeting}
          onShowInfo={() => setView("INFO")}
          onExitMeeting={() => setShowExitModal(true)}
          agendaStatus={agendaStatus}
          onShowFullAgenda={() => setView("AGENDA")}
          onAgendaItemChange={async (newIndex) => {
            updateAgendaStatus(meeting.id, {
              currentItemIndex: newIndex,
              startedAt: new Date(),
            });
          }}
          onPresentationPageChange={async (pageNumber) => {
            updateAgendaStatus(meeting.id, {
              ...agendaStatus,
              currentPresentationPage: pageNumber,
            });
          }}
          onMeetingNoteChange={async (newText) => {
            return updateMeetingNote(meetingNote.id, newText);
          }}
          onSharedNotesChange={async (newText) => {
            return updateMeetingNote(sharedNotes.id, newText);
          }}
          meetingNote={meetingNote}
          sharedNotes={sharedNotes}
          databaseStatus={databaseStatus}
          setDatabaseStatus={setDatabaseStatus}
          sharedNotesDatabaseStatus={sharedNotesDatabaseStatus}
          setSharedNotesDatabaseStatus={setSharedNotesDatabaseStatus}
          onManageParticipants={() => setView("PARTICIPANTS")}
          onManageQuestions={() => setView("QUESTIONS")}
        />
      )}

      {view === "MEETING" && windowSize >= 1000 && (
        <MeetingViewPageDesktop
          onAlarm={() => setShowAlarm(true)}
          meeting={meeting}
          onShowInfo={() => setView("INFO")}
          onExitMeeting={() => setShowExitModal(true)}
          agendaStatus={agendaStatus}
          onShowFullAgenda={() => setView("AGENDA")}
          onAgendaItemChange={async (newIndex) => {
            updateAgendaStatus(meeting.id, {
              currentItemIndex: newIndex,
              startedAt: new Date(),
            });
          }}
          onPresentationPageChange={async (pageNumber) => {
            updateAgendaStatus(meeting.id, {
              ...agendaStatus,
              currentPresentationPage: pageNumber,
            });
          }}
          onMeetingNoteChange={async (newText) => {
            return updateMeetingNote(meetingNote.id, newText);
          }}
          onSharedNotesChange={async (newText) => {
            return updateMeetingNote(sharedNotes.id, newText);
          }}
          meetingNote={meetingNote}
          sharedNotes={sharedNotes}
          databaseStatus={databaseStatus}
          setDatabaseStatus={setDatabaseStatus}
          sharedNotesDatabaseStatus={sharedNotesDatabaseStatus}
          setSharedNotesDatabaseStatus={setSharedNotesDatabaseStatus}
          onManageParticipants={() => setView("PARTICIPANTS")}
          meetingQuestions={meetingQuestions}
        />
      )}

      {view === "QUESTIONS" && (
        <ManageQuestions
          meetingQuestions={meetingQuestions}
          onClose={() => setView("MEETING")}
          onAddQuestion={(question) => {
            createMeetingQuestion(meeting.id, question);
          }}
          onUpvote={async (question) => {
            const alreadyUpvoted = question.upvotes.includes(user!.id);
            if (alreadyUpvoted) {
              // remove upvote
              const removeUpvote = question.upvotes.filter(
                (u) => u !== user!.id
              );
              upvoteMeetingQuestion(question.id, removeUpvote);
            } else {
              const newUpvotes = [...question.upvotes, user!.id];
              upvoteMeetingQuestion(question.id, newUpvotes);
            }
          }}
          onMarkAsAnswered={async (question) => {
            changeMeetingQuestionAnsweredStatus(
              question.id,
              !question.answered
            );
          }}
        />
      )}
    </>
  );
};

export default MeetingView;
