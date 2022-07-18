import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import MeetingReportsPage from "../components/pages/reports/MeetingReportsPage";
import { useAuth } from "../lib/auth";
import {
  fetchAllMeetings,
  fetchCompletedMeetings,
} from "../lib/supabase/meetings";
import { Meeting } from "../utils/types";

export const getStaticProps: GetStaticProps = async () => {
  const { data: meetings, error } = await fetchCompletedMeetings();

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

const Reports: NextPage<Props> = ({ meetings }) => {
  const router = useRouter();
  const { user } = useAuth();

  return <MeetingReportsPage userId={user!.id} meetings={meetings} />;
};

export default Reports;
