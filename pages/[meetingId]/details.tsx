import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ViewDetailsPage from "../../components/pages/meetings/ViewDetailsPage";
import { useAuth } from "../../lib/auth";
import {
  changeMeetingQuestionAnsweredStatus,
  createMeetingQuestion,
  updateMeetingNote,
  upvoteMeetingQuestion,
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

  const { data: meetingCreator, error: meetingCreatorError } =
    await getMeetingCreator(meeting.createdBy);

  if (error) {
    throw error;
  }

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

const EditMeeting: NextPage<Props> = ({ meeting, meetingCreator }) => {
  const router = useRouter();
  const { user } = useAuth();

  const {
    meetingNote,
    sharedNotes,
    databaseStatus,
    setDatabaseStatus,
    sharedNotesDatabaseStatus,
    setSharedNotesDatabaseStatus,
    meetingQuestions,
  } = useMeeting(meeting);

  if (
    !meeting ||
    !meetingCreator ||
    !meetingNote ||
    !sharedNotes ||
    !meetingQuestions
  ) {
    return <LoadingScreen />;
  }

  return (
    <ViewDetailsPage
      userId={user!.id}
      meetingCreator={meetingCreator}
      meeting={meeting}
      onClose={() => router.push("/")}
      meetingNote={meetingNote}
      sharedNotes={sharedNotes}
      databaseStatus={databaseStatus}
      setDatabaseStatus={setDatabaseStatus}
      sharedNotesDatabaseStatus={sharedNotesDatabaseStatus}
      setSharedNotesDatabaseStatus={setSharedNotesDatabaseStatus}
      onMeetingNoteChange={async (newText) => {
        return updateMeetingNote(meetingNote.id, newText);
      }}
      onSharedNotesChange={async (newText) => {
        return updateMeetingNote(sharedNotes.id, newText);
      }}
      meetingQuestions={meetingQuestions}
      onAddQuestion={(question) => {
        createMeetingQuestion(meeting.id, question);
      }}
      onUpvote={async (question) => {
        const alreadyUpvoted = question.upvotes.includes(user!.id);
        if (alreadyUpvoted) {
          // remove upvote
          const removeUpvote = question.upvotes.filter((u) => u !== user!.id);
          upvoteMeetingQuestion(question.id, removeUpvote);
        } else {
          console.log([...question.upvotes, user!.id]);

          const newUpvotes = [...question.upvotes, user!.id];
          upvoteMeetingQuestion(question.id, newUpvotes);
        }
      }}
      onMarkAsAnswered={async (question) => {
        changeMeetingQuestionAnsweredStatus(question.id, !question.answered);
      }}
    />
  );
};

export default EditMeeting;
