import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import ReportDetailsPage from "../../components/pages/reports/ReportDetailsPage";
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

const MeetingReport: NextPage<Props> = ({ meeting, meetingCreator }) => {
  const router = useRouter();

  if (!meeting || !meetingCreator) {
    return <LoadingScreen />;
  }

  return (
    <ReportDetailsPage
      meetingCreator={meetingCreator}
      meeting={meeting}
      onClose={() => router.push("/reports")}
    />
  );
};

export default MeetingReport;
