import {
  MEETING_CATEGORY_LABELS,
  NAVIGATION_IDS,
} from "../../../utils/constants";
import { Meeting } from "../../../utils/types";
import Accordion from "../../Accordion/Accordion";
import MeetingInfoBox from "../../MeetingInfoBox/MeetingInfoBox";
import PageLayout from "../layouts/PageLayout";

type Props = {
  ownMeetings: Meeting[];
  otherMeetings: Meeting[];
  userId: string;
  onViewReport: (meetingId: string) => void;
  onViewFeedback: (meetingId: string) => void;
  onGiveFeedback: (meetingId: string) => void;
  submittedFeedback: string[];
};

const MeetingReportsPage = ({
  ownMeetings,
  otherMeetings,
  userId,
  onViewReport,
  onViewFeedback,
  onGiveFeedback,
  submittedFeedback,
}: Props) => {
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
                onViewReport={() => onViewReport(m.id)}
                onViewFeedback={() => onViewFeedback(m.id)}
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
                onViewReport={() => onViewReport(m.id)}
                onGiveFeedback={() => onGiveFeedback(m.id)}
                showGiveFeedbackButton={!submittedFeedback.includes(m.id)}
              />
            ))}
          </Accordion>
        )}
      </div>
    </PageLayout>
  );
};

export default MeetingReportsPage;
