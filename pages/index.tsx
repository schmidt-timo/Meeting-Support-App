import type { NextPage } from "next";
import { exampleMeetings } from "../utils/exampleData";
import MeetingOverviewPage from "../components/views/MeetingOverviewPage";
import { filterPendingMeetings } from "../utils/filtering";

// TODO: REPLACE: Get userId and load meetings
const meetings = exampleMeetings;
const userId = "timoschmidt";

const Home: NextPage = () => {
  const filteredMeetings = filterPendingMeetings(meetings);

  return (
    <MeetingOverviewPage
      userId={userId}
      meetings={filteredMeetings}
      onAddMeeting={
        () => {} // TODO: Add onClick
      }
      onCreateMeeting={
        () => {} // TODO: Add onClick
      }
    />
  );
};

export default Home;
