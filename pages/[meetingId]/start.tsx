import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import Button from "../../components/formElements/Button";
import NotificationLabel from "../../components/formElements/NotificationLabel";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import StartCountdown from "../../components/meetingElements/StartCountdown";
import Modal from "../../components/Modal/Modal";
import ManageQuestions from "../../components/pages/meeting/ManageQuestions";
import MeetingInfo from "../../components/pages/meeting/MeetingInfo";
import MeetingViewPage from "../../components/pages/meeting/MeetingViewPage";
import MeetingViewPageDesktop from "../../components/pages/meeting/MeetingViewPageDesktop";
import { useAuth } from "../../lib/auth";
import {
  changeMeetingQuestionAnsweredStatus,
  createMeetingQuestion,
  markMeetingAsComplete,
  updateMeetingNote,
  upvoteMeetingQuestion,
  useMeeting,
} from "../../lib/supabase/meeting";
import {
  fetchSingleMeeting,
  getMeetingCreator,
} from "../../lib/supabase/meetings";
import {
  updateAgendaStatus,
  useMeetingStatus,
} from "../../lib/supabase/status";
import { calculateRemainingTime } from "../../utils/functions";
import { Meeting, MeetingParticipant } from "../../utils/types";
import EditAgenda from "./agenda";
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
  // fix dates
  const meeting = {
    ...initialMeeting,
    startDate: new Date(initialMeeting.startDate),
    endDate: new Date(initialMeeting.endDate),
  };

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
    meetingNote,
    sharedNotes,
    databaseStatus,
    setDatabaseStatus,
    sharedNotesDatabaseStatus,
    setSharedNotesDatabaseStatus,
    participants,
    meetingQuestions,
    meetingIsCompleted,
    agendaItems,
  } = useMeeting(meeting);

  const { agendaStatus, isLoading, notStartedYet, startMeetingNow } =
    useMeetingStatus(meeting);

  if (!agendaStatus || !meetingNote || !sharedNotes || !meeting || isLoading) {
    return <LoadingScreen />;
  }

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
        viewOnly
        meetingId={meeting.id}
        createdBy={meetingCreator.id}
        participants={participants}
        onClose={() => setView("MEETING")}
      />
    );
  }

  if (view === "AGENDA") {
    return (
      <EditAgenda
        meetingId={meeting.id}
        agendaItems={agendaItems}
        onClose={() => setView("MEETING")}
        agendaStatus={agendaStatus}
      />
    );
  }

  return (
    <>
      {notStartedYet && (
        <Modal
          title={
            <div className="flex space-x-1 items-center">
              {calculateRemainingTime(new Date(), meeting.startDate).days >
              0 ? (
                <p>{`Meeting is scheduled for ${meeting.startDate.toLocaleDateString(
                  "de-DE",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )} at ${meeting.startDate.toLocaleTimeString("de-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}</p>
              ) : (
                <div className="flex space-x-1 pt-1">
                  <p>Meeting starts in</p>
                  <StartCountdown countDownEndDate={meeting.startDate} />
                </div>
              )}
            </div>
          }
          onClose={() => router.push("/")}
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-sm">
                The meeting has not started yet. Please wait until the start
                time has been reached or the meeting owner has started the
                meeting manually.
              </p>
              <NotificationLabel variant="yellow">
                This window will be closed automatically as soon as the meeting
                starts.
              </NotificationLabel>
              {user!.id === meeting.createdBy && (
                <NotificationLabel variant="green">
                  As the meeting owner, you can already start the meeting now.
                  In this case, however, the start and end times are changed so
                  that the planned meeting duration remains the same.
                </NotificationLabel>
              )}
            </div>
            <div className="space-y-2">
              {meeting.createdBy === user!.id && (
                <Button
                  onClick={() => {
                    startMeetingNow().then(() => {
                      router.reload();
                    });
                  }}
                  variant="highlighted"
                >
                  Start meeting now
                </Button>
              )}
              <Button onClick={() => router.push("/")} variant="red">
                Go back
              </Button>
            </div>
          </div>
        </Modal>
      )}

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
            <NotificationLabel variant="yellow">
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

      {meetingIsCompleted && user!.id !== meeting.createdBy && (
        <Modal title="Meeting was ended" onClose={() => router.push("/")}>
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

      {view === "MEETING" && windowSize < 1000 && (
        <MeetingViewPage
          onAlarm={() => setShowAlarm(true)}
          meeting={meeting}
          onShowInfo={() => setView("INFO")}
          onExitMeeting={() => setShowExitModal(true)}
          agendaItems={agendaItems}
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
          participants={participants}
          questions={meetingQuestions}
        />
      )}

      {view === "MEETING" && windowSize >= 1000 && (
        <MeetingViewPageDesktop
          onAlarm={() => setShowAlarm(true)}
          meeting={meeting}
          onShowInfo={() => setView("INFO")}
          onExitMeeting={() => setShowExitModal(true)}
          agendaItems={agendaItems}
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
          participants={participants}
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
