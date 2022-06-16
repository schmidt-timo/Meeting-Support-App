import type { NextPage } from "next";
import MeetingCategory from "../components/MeetingCategory/MeetingCategory";
import MeetingInfoBox from "../components/MeetingInfoBox/MeetingInfoBox";
import { exampleMeetings } from "../utils/exampleData";

// get all meetings
const meetings = exampleMeetings;

const Home: NextPage = () => {
  // filter meetings
  const createdByMe = meetings.filter(
    (meeting) => meeting.createdBy === "timoschmidt"
  );
  const invited = meetings.filter(
    (meetings) => meetings.createdBy !== "timoschmidt"
  );

  return (
    <>
      <h1 className="p-3 font-bold text-2xl">Meetings</h1>
      <div className="px-3 space-y-3">
        <MeetingCategory title="Created by you">
          {createdByMe.map((m) => (
            <MeetingInfoBox meeting={m} />
          ))}
        </MeetingCategory>
        <MeetingCategory title="Invited">
          {invited.map((m) => (
            <MeetingInfoBox meeting={m} />
          ))}
        </MeetingCategory>
      </div>
    </>
  );
};

export default Home;
