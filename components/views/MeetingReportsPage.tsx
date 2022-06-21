import { MEETING_CATEGORY_LABELS, NAVIGATION_IDS } from "../../utils/constants";
import {
  filterMeetingsCreatedByUserId,
  filterMeetingsNotCreatedByUserId,
} from "../../utils/filtering";
import { Meeting } from "../../utils/types";
import MeetingCategory from "../MeetingCategory/MeetingCategory";
import MeetingInfoBox from "../MeetingInfoBox/MeetingInfoBox";
import ViewBuilder from "../ViewBuilder/ViewBuilder";

type Props = {
  userId: string;
  meetings: Meeting[];
};

const MeetingReportsPage = ({ userId, meetings }: Props) => {
  const ownMeetings = filterMeetingsCreatedByUserId(meetings, userId);
  const otherMeetings = filterMeetingsNotCreatedByUserId(meetings, userId);

  return (
    <ViewBuilder
      header={{
        title: "Meeting Reports",
      }}
      activeNavItemId={NAVIGATION_IDS.reports}
    >
      <div className="px-3 space-y-3">
        {!!ownMeetings.length && (
          <MeetingCategory title={MEETING_CATEGORY_LABELS.yourMeetings}>
            {ownMeetings.map((m) => (
              <MeetingInfoBox meeting={m} key={m.id} />
            ))}
          </MeetingCategory>
        )}
        {!!otherMeetings.length && (
          <MeetingCategory title={MEETING_CATEGORY_LABELS.otherMeetings}>
            {otherMeetings.map((m) => (
              <MeetingInfoBox meeting={m} key={m.id} />
            ))}
          </MeetingCategory>
        )}
      </div>
    </ViewBuilder>
  );
};

export default MeetingReportsPage;
