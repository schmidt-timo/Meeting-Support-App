import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ViewDetailsPage from "../../components/pages/meetings/ViewDetailsPage";
import { useAuth } from "../../lib/auth";
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

  if (!meeting || !meetingCreator) {
    return <LoadingScreen />;
  }

  return (
    <ViewDetailsPage
      userId={user!.id}
      meetingCreator={meetingCreator}
      meeting={meeting}
      onClose={() => router.push("/")}
    />
  );
};

export default EditMeeting;
