import type { NextPage } from "next";
import { exampleMeetings } from "../utils/exampleData";
import { filterPendingMeetings } from "../utils/filtering";
import { useRouter } from "next/router";
import MeetingOverviewPage from "../components/views/MeetingOverviewPage";

// TODO: REPLACE: Get userId and load meetings
const meetings = exampleMeetings;
const userId = "timoschmidt";

const Home: NextPage = () => {
  const router = useRouter();
  const filteredMeetings = filterPendingMeetings(meetings);

  return (
    <MeetingOverviewPage
      userId={userId}
      meetings={filteredMeetings}
      onAddMeeting={
        () => {} // TODO: Add onClick
      }
      onCreateMeeting={() => router.push("/newMeeting")}
    />
  );
};

export default Home;
