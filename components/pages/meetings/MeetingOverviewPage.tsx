import { useRouter } from "next/router";
import { MdQrCodeScanner, MdOutlineAdd } from "react-icons/md";
import {
  MEETING_CATEGORY_LABELS,
  NAVIGATION_IDS,
} from "../../../utils/constants";
import {
  filterMeetingsCreatedByUserId,
  filterMeetingsNotCreatedByUserId,
} from "../../../utils/filtering";
import { Meeting } from "../../../utils/types";
import InfoTextBox from "../../InfoTextBox/InfoTextBox";
import Accordion from "../../Accordion/Accordion";
import MeetingInfoBox from "../../MeetingInfoBox/MeetingInfoBox";
import PageLayout from "../layouts/PageLayout";

type Props = {
  userId: string;
  meetings: Meeting[];
  onAddMeeting: () => void;
  onCreateMeeting: () => void;
};

const MeetingOverviewPage = ({
  userId,
  meetings,
  onAddMeeting,
  onCreateMeeting,
}: Props) => {
  const router = useRouter();
  const ownMeetings = filterMeetingsCreatedByUserId(meetings, userId);
  const otherMeetings = filterMeetingsNotCreatedByUserId(meetings, userId);

  return (
    <PageLayout
      header={{
        title: "Meetings",
        buttons: [
          {
            id: "HEADER_BTN_QR",
            icon: <MdQrCodeScanner className="w-6 h-6" />,
            onClick: onAddMeeting,
          },
          {
            id: "HEADER_BTN_NEWMEETING",
            icon: <MdOutlineAdd className="w-8 h-8" />,
            onClick: onCreateMeeting,
          },
        ],
      }}
      activeNavItemId={NAVIGATION_IDS.meetings}
    >
      <div className="px-3 space-y-3">
        {meetings.length === 0 && (
          <InfoTextBox title="No meetings found">
            Add new meetings by using the QR code scanner with the button on the
            top or add them manually by entering the meeting ID. You can also
            create your own meetings by using the plus button.
          </InfoTextBox>
        )}
        {!!ownMeetings.length && (
          <Accordion
            title={`${MEETING_CATEGORY_LABELS.yourMeetings} (${ownMeetings.length})`}
          >
            {ownMeetings.map((m) => (
              <MeetingInfoBox
                key={m.id}
                userId={userId}
                meeting={m}
                onEdit={() => router.push(`${m.id}/edit`)}
                onManageAgenda={() => router.push(`${m.id}/agenda`)}
                onManageParticipants={() => router.push(`${m.id}/participants`)}
                onStartMeeting={() => router.push(`${m.id}/start`)}
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
                key={m.id}
                userId={userId}
                meeting={m}
                onManageParticipants={() => router.push(`${m.id}/participants`)}
                onViewDetails={() => router.push(`${m.id}/details`)}
                // onStartMeeting={() => router.push(`${m.id}/start`)} TODO:
              />
            ))}
          </Accordion>
        )}
      </div>
    </PageLayout>
  );
};

export default MeetingOverviewPage;
