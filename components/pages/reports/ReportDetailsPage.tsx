import { useState } from "react";
import { MdCheck, MdContentCopy, MdIosShare } from "react-icons/md";
import { useMeeting } from "../../../lib/supabase/meeting";
import {
  filterAnsweredQuestions,
  filterOpenQuestions,
} from "../../../utils/filtering";
import {
  formatMeetingDate,
  formatMeetingTime,
} from "../../../utils/formatting";
import { getDomain, isTheSameDay } from "../../../utils/functions";
import { Meeting } from "../../../utils/types";
import Accordion from "../../Accordion/Accordion";
import AgendaItem from "../../AgendaItem/AgendaItem";
import Button from "../../formElements/Button";
import NotificationLabel from "../../formElements/NotificationLabel";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import DetailsLine from "../../MeetingDetails/DetailsLine";
import Modal from "../../Modal/Modal";
import ParticipantItem from "../../ParticipantItem/ParticipantItem";
import QuestionItem from "../../QuestionItem/QuestionItem";
import SubPageLayout from "../layouts/SubPageLayout";

type Props = {
  meeting: Meeting;
  meetingCreator: any;
  onClose: () => void;
};

const ReportDetailsPage = ({
  meeting: initialMeeting,
  onClose,
  meetingCreator,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [wasCopiedToClipboard, setWasCopiedToClipboard] = useState(false);

  // Fix dates
  const meeting = {
    ...initialMeeting,
    startDate: new Date(initialMeeting.startDate),
    endDate: new Date(initialMeeting.endDate),
  };

  const { meetingNote, sharedNotes, meetingQuestions, participants } =
    useMeeting(meeting);

  if (!meetingNote || !sharedNotes || !meetingQuestions || !participants) {
    return <LoadingScreen />;
  }

  const openQuestions = filterOpenQuestions(meetingQuestions);
  const answeredQuestions = filterAnsweredQuestions(meetingQuestions);

  return (
    <>
      {showModal && (
        <Modal title="Share report" onClose={() => setShowModal(false)}>
          <div className="space-y-3">
            <p className="text-sm">
              You can share a public version of this report that is accessible
              to everyone, even without an account.
            </p>
            <NotificationLabel variant="yellow">
              The public version does not include private information such as
              your personal notes and the participants list.
            </NotificationLabel>
            <Button
              variant="highlighted"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${getDomain()}/share-report/${meeting.id}`
                );
                setWasCopiedToClipboard(true);
                setTimeout(() => {
                  setWasCopiedToClipboard(false);
                }, 2000);
              }}
            >
              <div className="flex items-center justify-center space-x-2">
                {wasCopiedToClipboard ? (
                  <>
                    <MdCheck className="w-3.5 h-3.5 flex-shrink-0" />
                    <p>Copied to clipboard</p>
                  </>
                ) : (
                  <>
                    <MdContentCopy className="w-3.5 h-3.5 flex-shrink-0" />
                    <p>Copy Link to Public Version</p>
                  </>
                )}
              </div>
            </Button>
          </div>
        </Modal>
      )}

      <SubPageLayout title={meeting.title} onClose={onClose}>
        <div className="space-y-3">
          <div className="w-full">
            <Accordion title="General info">
              <div className="p-2 space-y-1 bg-white rounded-xl">
                {isTheSameDay(meeting.startDate, meeting.endDate) ? (
                  <>
                    <DetailsLine symbol="date">
                      {formatMeetingDate(meeting.startDate)}
                    </DetailsLine>
                    <DetailsLine symbol="time">
                      {formatMeetingTime(meeting.startDate, meeting.endDate)}
                    </DetailsLine>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <DetailsLine symbol="date">
                        {`from ${formatMeetingDate(meeting.startDate)}`}
                      </DetailsLine>
                      <DetailsLine symbol="time">
                        {meeting.startDate.toLocaleTimeString("de-DE", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </DetailsLine>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DetailsLine symbol="date">
                        {`to ${formatMeetingDate(meeting.endDate)}`}
                      </DetailsLine>
                      <DetailsLine symbol="time">
                        {meeting.endDate.toLocaleTimeString("de-DE", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </DetailsLine>
                    </div>
                  </>
                )}
                {meeting.location && (
                  <DetailsLine symbol="location">
                    {meeting.location}
                  </DetailsLine>
                )}
                <DetailsLine symbol="meeting">
                  <div className="flex items-center space-x-1">
                    <p className="text-xs text-mblue-500 text-opacity-60">
                      Meeting ID:
                    </p>
                    <p>{meeting.id}</p>
                  </div>
                </DetailsLine>
                <DetailsLine symbol="author">
                  <p>
                    {`Created by ${
                      meetingCreator.name
                        ? meetingCreator.name
                        : `user with email address ${meetingCreator.email}`
                    }`}
                  </p>
                  {meetingCreator.name && (
                    <p className="text-xs text-mblue-500 text-opacity-60">
                      ({meetingCreator.email})
                    </p>
                  )}
                </DetailsLine>
              </div>
            </Accordion>
          </div>
          <Accordion title="Description">
            <div className="w-full rounded-xl p-3 bg-white space-y-1">
              <p className="text-xs whitespace-pre-wrap text-mblue-600">
                {!!meeting.description?.length
                  ? meeting.description
                  : "No description available"}
              </p>
            </div>
          </Accordion>
          <Accordion title={`Participants (${participants.length})`}>
            <div className="space-y-1.5">
              {participants.map((p) => (
                <ParticipantItem participant={p} key={p.id} />
              ))}
            </div>
          </Accordion>
          <Accordion title="Agenda">
            {!!meeting.agenda.length ? (
              <div className="space-y-1.5">
                {meeting.agenda.map((item) => (
                  <AgendaItem agendaItem={item} key={item.id} viewOnly />
                ))}
              </div>
            ) : (
              <div className="w-full rounded-xl p-3 bg-white space-y-1">
                <p className="text-xs">No agenda available</p>
              </div>
            )}
          </Accordion>
          {meetingNote?.content && (
            <Accordion title="Your notes">
              <div className="space-y-1.5 bg-white rounded-xl p-3 text-xs">
                <p className="whitespace-pre-wrap text-mblue-600">
                  {meetingNote?.content}
                </p>
              </div>
            </Accordion>
          )}
          {sharedNotes?.content && (
            <Accordion title="Shared notes">
              <div className="space-y-1.5 bg-white rounded-xl p-3 text-xs">
                <p className="whitespace-pre-wrap text-mblue-600">
                  {sharedNotes?.content as string}
                </p>
              </div>
            </Accordion>
          )}
          <Accordion title="Questions">
            {!!meetingQuestions.length ? (
              <div className="space-y-1.5">
                {openQuestions.map((question) => (
                  <QuestionItem meetingQuestion={question} key={question.id} />
                ))}
                {answeredQuestions.map((question) => (
                  <QuestionItem meetingQuestion={question} key={question.id} />
                ))}
              </div>
            ) : (
              <div className="w-full rounded-xl p-3 bg-white space-y-1">
                <p className="text-xs">No questions available</p>
              </div>
            )}
          </Accordion>
          <Button variant="highlighted" onClick={() => setShowModal(true)}>
            <div className="flex items-center justify-center space-x-2">
              <MdIosShare className="w-4 h-4" />
              <p>Share report</p>
            </div>
          </Button>
        </div>
      </SubPageLayout>
    </>
  );
};

export default ReportDetailsPage;
