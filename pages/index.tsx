import type { NextPage } from "next";
import { MdQrCodeScanner, MdOutlineAdd } from "react-icons/md";
import Header from "../components/Header/Header";
import MeetingCategory from "../components/MeetingCategory/MeetingCategory";
import MeetingInfoBox from "../components/MeetingInfoBox/MeetingInfoBox";
import { exampleMeetings } from "../utils/exampleData";
import MobileNavigation from "../components/MobileNavigation/MobileNavigation";

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
    <>
      <Header
        buttons={[
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
        ]}
      >
        Meetings
      </Header>
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
      <div>
        <MobileNavigation
          activeItemId="nav_meetings"
          onSelect={(id) => console.log(`Nav item ${id} was clicked`)}
        />
      </div>
    </>
  );
};

export default Home;
