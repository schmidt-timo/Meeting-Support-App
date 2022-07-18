import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import FullAgenda from "../../components/pages/meeting/FullAgenda";
import ManageQuestions from "../../components/pages/meeting/ManageQuestions";
import MeetingInfo from "../../components/pages/meeting/MeetingInfo";
import MeetingViewPage from "../../components/pages/meeting/MeetingViewPage";
import ManageParticipants from "../../components/pages/meetings/ManageParticipants";
import { useAuth } from "../../lib/auth";
import {
  changeMeetingQuestionAnsweredStatus,
  createMeetingQuestion,
  updateAgendaStatus,
  updateMeetingNote,
  updateParticipants,
  upvoteMeetingQuestion,
  useMeeting,
} from "../../lib/supabase/meeting";
import {
  fetchSingleMeeting,
  getMeetingCreator,
} from "../../lib/supabase/meetings";
import { getParticipantInfoIfEmailIsRegistered } from "../../lib/supabase/users";
import { convertParticipantsForDatabase } from "../../utils/functions";
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
  const { user } = useAuth();

  const {
    agendaStatus,
    meetingNote,
    databaseStatus,
    setDatabaseStatus,
    participants,
    setParticipants,
    meetingQuestions,
  } = useMeeting(initialMeeting);

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
          onPresentationPageChange={async (pageNumber) => {
            console.log("CHANGE");
            updateAgendaStatus(meeting.id, {
              currentItemIndex: agendaStatus.currentItemIndex,
              startedAt: agendaStatus.startedAt,
              currentPresentationPage: pageNumber,
            });

            // updateAgendaStatus(meeting.id, {
            //   ...agendaStatus,
            //   currentPresentationPage: pageNumber,
            // });
          }}
          onMeetingNoteChange={async (newText) => {
            return updateMeetingNote(meetingNote.id, newText);
          }}
          meetingNote={meetingNote}
          databaseStatus={databaseStatus}
          setDatabaseStatus={setDatabaseStatus}
          onManageParticipants={() => setView("PARTICIPANTS")}
          onManageQuestions={() => setView("QUESTIONS")}
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
              console.log([...question.upvotes, user!.id]);

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

      {view === "PARTICIPANTS" && (
        <ManageParticipants
          participants={participants}
          userId={user!.id}
          buttonText="Save"
          onClose={() => setView("MEETING")}
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
          onDeleteParticipant={(participantId) => {
            setParticipants(participants.filter((p) => p.id !== participantId));
          }}
          onCreate={async (updatedParticipants) => {
            const newParticipants =
              convertParticipantsForDatabase(updatedParticipants);

            const { data, error } = await updateParticipants(
              meeting.id,
              newParticipants
            );

            if (error) {
              throw error;
            }

            if (data) {
              setView("MEETING");
            }
          }}
        />
      )}
    </>
  );
};

export default MeetingView;
