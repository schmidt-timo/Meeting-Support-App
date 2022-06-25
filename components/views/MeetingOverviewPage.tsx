import { useRouter } from "next/router";
import { MdQrCodeScanner, MdOutlineAdd } from "react-icons/md";
import { MEETING_CATEGORY_LABELS, NAVIGATION_IDS } from "../../utils/constants";
import {
  filterMeetingsCreatedByUserId,
  filterMeetingsNotCreatedByUserId,
} from "../../utils/filtering";
import { Meeting } from "../../utils/types";
import InfoTextBox from "../InfoTextBox/InfoTextBox";
import MeetingCategory from "../MeetingCategory/MeetingCategory";
import MeetingInfoBox from "../MeetingInfoBox/MeetingInfoBox";
import ViewBuilder from "../ViewBuilder/ViewBuilder";

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
    <ViewBuilder
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
          <InfoTextBox title="New here?">
            Add new meetings by using the QR code scanner with the button on the
            top or add them manually by entering the meeting ID. You can also
            create your own meetings by using the plus button.
          </InfoTextBox>
        )}
        {!!ownMeetings.length && (
          <MeetingCategory title={MEETING_CATEGORY_LABELS.yourMeetings}>
            {ownMeetings.map((m) => (
              <MeetingInfoBox
                meeting={m}
                key={m.id}
                onEdit={() => router.push(`${m.id}/edit`)}
                onManageAgenda={() => router.push(`${m.id}/agenda`)}
                onManageParticipants={() => router.push(`${m.id}/participants`)}
              />
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

export default MeetingOverviewPage;
