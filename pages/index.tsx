import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import MeetingOverviewPage from "../components/pages/MeetingOverviewPage";
import { Meeting } from "../utils/types";
import { useAuth } from "../lib/auth";
import { fetchAllMeetings } from "../lib/supabase/meetings";

export const getStaticProps: GetStaticProps = async () => {
  const { data: meetingData, error } = await fetchAllMeetings();

  let meetings: Meeting[] = [];

  if (meetingData) {
    meetingData.map((meeting) =>
      meetings.push({
        ...meeting,
        agenda: meeting.agenda.map((agendaItem: any) => JSON.parse(agendaItem)),
        participants: meeting.participants.map((participant: any) =>
          JSON.parse(participant)
        ),
      })
    );
  }

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

const Home: NextPage<Props> = ({ meetings }) => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <MeetingOverviewPage
      meetings={meetings}
      userId={user!.id}
      onAddMeeting={
        () => {} // TODO: Add onClick
      }
      onCreateMeeting={() => router.push("/newMeeting")}
    />
  );
};

export default Home;
