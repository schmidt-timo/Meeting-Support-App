import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import MeetingInfo from "../../components/pages/meeting/MeetingInfo";
import MeetingViewPage from "../../components/pages/meeting/MeetingViewPage";
import { fetchSingleMeeting } from "../../lib/supabase/meetings";
import { Meeting } from "../../utils/types";

interface Params extends ParsedUrlQuery {
  meetingId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params as Params;

  const { data: meeting, error } = await fetchSingleMeeting(params.meetingId);

  if (error) {
    throw error;
  }

  return {
    props: {
      meeting,
    },
  };
};

type Props = {
  meeting: Meeting;
};

type Views = "MEETING" | "INFO" | "QUESTIONS" | "PARTICIPANTS";

const MeetingView: NextPage<Props> = ({ meeting: initialMeeting }) => {
  const [view, setView] = useState<Views>("MEETING");

  const meeting = {
    ...initialMeeting,
    startDate: new Date(initialMeeting.startDate),
    endDate: new Date(initialMeeting.endDate),
  };

  if (view === "INFO") {
    return <MeetingInfo meeting={meeting} onClose={() => setView("MEETING")} />;
  }

  const router = useRouter();
  return (
    <MeetingViewPage
      meeting={meeting}
      onShowMeetingInfo={() => setView("INFO")}
      onClose={() => {
        //TODO: Ask if meeting should be ended for everyone?
        // Meeting should disappear from overview and go into reports
        // Go back
        router.push("/");
      }}
    />
  );
};

export default MeetingView;
