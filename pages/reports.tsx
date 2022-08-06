import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import MeetingReportsPage from "../components/pages/reports/MeetingReportsPage";
import { useAuth } from "../lib/auth";
import { getServiceSupabase } from "../lib/supabase/config";
import {
  fetchCompletedMeetings,
  fetchSubmittedFeedback,
} from "../lib/supabase/meetings";
import {
  filterMeetingsCreatedByUserId,
  filterMeetingsNotCreatedByUserId,
} from "../utils/filtering";
import { Meeting } from "../utils/types";

export const getServerSideProps: GetServerSideProps = async () => {
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

  const [submittedFeedback, setSubmittedFeedback] = useState<string[]>();

  const ownMeetings = filterMeetingsCreatedByUserId(meetings, user!.id);
  const otherMeetings = filterMeetingsNotCreatedByUserId(
    meetings,
    user!.id,
    user!.email!
  );

  useEffect(() => {
    const supabaseServer = getServiceSupabase();
    const meetingSubscription = supabaseServer
      .from("meetings")
      .on("*", (payload) => {
        router.replace(router.asPath);
      })
      .subscribe();

    return () => {
      meetingSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function checkMeetings() {
      const { data } = await fetchSubmittedFeedback(user!.id);

      if (data) {
        let allFeedback: string[] = [];
        if (data.length > 0) {
          for (const feedback of data) {
            allFeedback.push(feedback.meetingId);
          }
        }
        setSubmittedFeedback(allFeedback);
      }
    }

    checkMeetings();
  }, []);

  if (!submittedFeedback) {
    return <LoadingScreen />;
  }

  return (
    <MeetingReportsPage
      submittedFeedback={submittedFeedback}
      ownMeetings={ownMeetings}
      otherMeetings={otherMeetings}
      userId={user!.id}
      onViewReport={(meetingId) => router.push(`${meetingId}/report`)}
      onViewFeedback={(meetingId) => router.push(`${meetingId}/feedback`)}
      onGiveFeedback={(meetingId) => router.push(`${meetingId}/giveFeedback`)}
    />
  );
};

export default Reports;
