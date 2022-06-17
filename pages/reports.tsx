import type { NextPage } from "next";
import { MdQrCodeScanner, MdOutlineAdd } from "react-icons/md";
import MeetingCategory from "../components/MeetingCategory/MeetingCategory";
import MeetingInfoBox from "../components/MeetingInfoBox/MeetingInfoBox";
import { exampleMeetings } from "../utils/exampleData";
import ViewBuilder from "../components/ViewBuilder/ViewBuilder";
import { NAVIGATION_IDS } from "../utils/constants";

// get all meetings
const meetings = exampleMeetings;

const Reports: NextPage = () => {
  // filter meetings
  const filteredMeetings = meetings.filter((m) => m.completed);
  const createdByMe = filteredMeetings.filter(
    (meeting) => meeting.createdBy === "timoschmidt" // TODO: Replace timoschmidt with current user id
  );
  const invited = filteredMeetings.filter(
    (meetings) => meetings.createdBy !== "timoschmidt" // TODO: Replace timoschmidt with current user id
  );

  return (
    <ViewBuilder
      header={{
        title: "Meeting Reports",
      }}
      nav={{
        activeItemId: NAVIGATION_IDS.reports,
        onSelect: (id) => console.log(`Nav item ${id} was clicked`),
      }}
    >
      <div className="px-3 space-y-3">
        {!!createdByMe.length && (
          <MeetingCategory title="Created by you">
            {createdByMe.map((m) => (
              <MeetingInfoBox meeting={m} key={m.id} />
            ))}
          </MeetingCategory>
        )}
        {!!invited.length && (
          <MeetingCategory title="Invited">
            {invited.map((m) => (
              <MeetingInfoBox meeting={m} key={m.id} />
            ))}
          </MeetingCategory>
        )}
      </div>
    </ViewBuilder>
  );
};

export default Reports;
