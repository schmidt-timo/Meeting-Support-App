import { useRouter } from "next/router";
import {
  MEETING_CATEGORY_LABELS,
  NAVIGATION_IDS,
} from "../../../utils/constants";
import {
  filterMeetingsCreatedByUserId,
  filterMeetingsNotCreatedByUserId,
} from "../../../utils/filtering";
import { Meeting } from "../../../utils/types";
import Accordion from "../../Accordion/Accordion";
import MeetingInfoBox from "../../MeetingInfoBox/MeetingInfoBox";
import PageLayout from "../layouts/PageLayout";

type Props = {
  userId: string;
  meetings: Meeting[];
};

const MeetingReportsPage = ({ userId, meetings }: Props) => {
  const ownMeetings = filterMeetingsCreatedByUserId(meetings, userId);
  const otherMeetings = filterMeetingsNotCreatedByUserId(meetings, userId);

  const router = useRouter();

  return (
    <PageLayout
      header={{
        title: "Meeting Reports",
      }}
      activeNavItemId={NAVIGATION_IDS.reports}
    >
      <div className="px-3 space-y-3">
        {!!ownMeetings.length && (
          <Accordion
            title={`${MEETING_CATEGORY_LABELS.yourMeetings} (${ownMeetings.length})`}
          >
            {ownMeetings.map((m) => (
              <MeetingInfoBox
                meeting={m}
                key={m.id}
                userId={userId}
                onViewReport={() => router.push(`${m.id}/report`)}
              />
            ))}
          </Accordion>
        )}
        {!!otherMeetings.length && (
          <Accordion
            title={`${MEETING_CATEGORY_LABELS.otherMeetings} (${otherMeetings.length})`}
          >
            {otherMeetings.map((m) => (
              <MeetingInfoBox
                meeting={m}
                key={m.id}
                userId={userId}
                onViewReport={() => router.push(`${m.id}/report`)}
              />
            ))}
          </Accordion>
        )}
      </div>
    </PageLayout>
  );
};

export default MeetingReportsPage;
