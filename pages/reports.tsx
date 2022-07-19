import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import MeetingReportsPage from "../components/pages/reports/MeetingReportsPage";
import { useAuth } from "../lib/auth";
import {
  fetchCompletedMeetings,
  fetchFeedbackForMeeting,
} from "../lib/supabase/meetings";
import {
  filterMeetingsCreatedByUserId,
  filterMeetingsNotCreatedByUserId,
} from "../utils/filtering";
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

  const [submittedFeedback, setSubmittedFeedback] = useState<string[]>();

  const ownMeetings = filterMeetingsCreatedByUserId(meetings, user!.id);
  const otherMeetings = filterMeetingsNotCreatedByUserId(
    meetings,
    user!.id,
    user!.email!
  );

  useEffect(() => {
    async function checkMeetings() {
      let feedback: string[] = [];

      for (const meeting of otherMeetings) {
        const { data } = await fetchFeedbackForMeeting(meeting.id);

        if (data) {
          feedback.push(meeting.id);
        }
      }

      setSubmittedFeedback(feedback);
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
