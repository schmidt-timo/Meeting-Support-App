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
import { useState } from "react";
import Modal from "../../Modal/Modal";
import Button from "../../formElements/Button";
import { is10MinutesBeforeMeetingOrLater } from "../../../utils/functions";

type Props = {
  userId: string;
  userEmail: string;
  meetings: Meeting[];
  onAddMeeting: () => void;
  onCreateMeeting: () => void;
};

const MeetingOverviewPage = ({
  userId,
  meetings,
  onAddMeeting,
  onCreateMeeting,
  userEmail,
}: Props) => {
  const router = useRouter();
  const ownMeetings = filterMeetingsCreatedByUserId(meetings, userId);
  const otherMeetings = filterMeetingsNotCreatedByUserId(
    meetings,
    userId,
    userEmail
  );

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Modal
          title="Meeting has not started yet"
          onClose={() => setShowModal(false)}
        >
          <div className="space-y-5">
            <p className="text-sm">
              Meetings can be joined at the earliest 10 minutes before the
              official start time.
            </p>
            <Button onClick={() => setShowModal(false)} variant="highlighted">
              OK
            </Button>
          </div>
        </Modal>
      )}

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
          {!meetings ||
            (ownMeetings.length < 1 && otherMeetings.length < 1 && (
              <InfoTextBox title="No meetings found">
                Add new meetings by using the QR code scanner with the button on
                the top or add them manually by entering the meeting ID. You can
                also create your own meetings by using the plus button.
              </InfoTextBox>
            ))}
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
                  onManageParticipants={() =>
                    router.push(`${m.id}/participants`)
                  }
                  onStartMeeting={() => {
                    if (
                      is10MinutesBeforeMeetingOrLater(new Date(m.startDate))
                    ) {
                      router.push(`${m.id}/start`);
                    } else {
                      setShowModal(true);
                    }
                  }}
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
                  onManageAgenda={() => router.push(`${m.id}/agenda`)}
                  onManageParticipants={() =>
                    router.push(`${m.id}/participants`)
                  }
                  onViewDetails={() => router.push(`${m.id}/details`)}
                  onStartMeeting={() => {
                    if (
                      is10MinutesBeforeMeetingOrLater(new Date(m.startDate))
                    ) {
                      router.push(`${m.id}/start`);
                    } else {
                      setShowModal(true);
                    }
                  }}
                />
              ))}
            </Accordion>
          )}
        </div>
      </PageLayout>
    </>
  );
};

export default MeetingOverviewPage;
