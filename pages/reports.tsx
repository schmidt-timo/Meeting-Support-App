import type { NextPage } from "next";
import { exampleMeetings } from "../utils/exampleData";
import MeetingReportsPage from "../components/pages/reports/MeetingReportsPage";
import { filterCompletedMeetings } from "../utils/filtering";

// TODO: REPLACE: Get userId and load meetings
const meetings = exampleMeetings;
const userId = "timoschmidt";

const Reports: NextPage = () => {
  const filteredMeetings = filterCompletedMeetings(meetings);

  return <MeetingReportsPage userId={userId} meetings={filteredMeetings} />;
};

export default Reports;
