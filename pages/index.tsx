import type { NextPage } from "next";
import { MdQrCodeScanner, MdOutlineAdd } from "react-icons/md";
import MeetingCategory from "../components/MeetingCategory/MeetingCategory";
import MeetingInfoBox from "../components/MeetingInfoBox/MeetingInfoBox";
import { exampleMeetings } from "../utils/exampleData";
import ViewBuilder from "../components/ViewBuilder/ViewBuilder";
import { NAVIGATION_IDS } from "../utils/constants";

// get all meetings
const meetings = exampleMeetings;

const Home: NextPage = () => {
  // filter meetings
  const createdByMe = meetings.filter(
    (meeting) => meeting.createdBy === "timoschmidt" // TODO: Replace timoschmidt with current user id
  );
  const invited = meetings.filter(
    (meetings) => meetings.createdBy !== "timoschmidt" // TODO: Replace timoschmidt with current user id
  );

  return (
    <ViewBuilder
      header={{
        title: "Meetings",
        buttons: [
          {
            id: "HEADER_BTN_QR",
            icon: <MdQrCodeScanner className="w-6 h-6" />,
            href: "",
          },
          {
            id: "HEADER_BTN_NEWMEETING",
            icon: <MdOutlineAdd className="w-8 h-8" />,
            href: "",
          },
        ],
      }}
      nav={{
        activeItemId: NAVIGATION_IDS.meetings,
        onSelect: (id) => console.log(`Nav item ${id} was clicked`),
      }}
    >
      <div className="px-3 space-y-3">
        <MeetingCategory title="Created by you">
          {createdByMe.map((m) => (
            <MeetingInfoBox meeting={m} key={m.id} />
          ))}
        </MeetingCategory>
        <MeetingCategory title="Invited">
          {invited.map((m) => (
            <MeetingInfoBox meeting={m} key={m.id} />
          ))}
        </MeetingCategory>
      </div>
    </ViewBuilder>
  );
};

export default Home;
