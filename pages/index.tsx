import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import MeetingOverviewPage from "../components/pages/meetings/MeetingOverviewPage";
import { useAuth } from "../lib/auth";
import { fetchOpenMeetings } from "../lib/supabase/meetings";
import { Meeting } from "../utils/types";

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: meetings, error } = await fetchOpenMeetings();

  if (error) {
    throw error;
  }

  return {
    props: {
      meetings,
    },
  };
};

type Props = {
  meetings: Meeting[];
};

const MeetingOverview: NextPage<Props> = ({ meetings }) => {
  const router = useRouter();
  const { user } = useAuth();

  if (!meetings) {
    return <LoadingScreen />;
  }

  return (
    <MeetingOverviewPage
      meetings={meetings}
      userId={user!.id}
      userEmail={user!.email!}
      onAddMeeting={() => router.push("/addMeeting")}
      onCreateMeeting={() => router.push("/newMeeting")}
    />
  );
};

export default MeetingOverview;
