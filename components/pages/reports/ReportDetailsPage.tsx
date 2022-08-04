import { useMeeting } from "../../../lib/supabase/meeting";
import {
  filterAnsweredQuestions,
  filterOpenQuestions,
} from "../../../utils/filtering";
import {
  formatMeetingDate,
  formatMeetingTime,
} from "../../../utils/formatting";
import { isTheSameDay } from "../../../utils/functions";
import { Meeting } from "../../../utils/types";
import Accordion from "../../Accordion/Accordion";
import AgendaItemView from "../../AgendaItem/AgendaItemView";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import DetailsLine from "../../MeetingDetails/DetailsLine";
import DetailsParticipantItem from "../../MeetingDetails/DetailsParticipantItem";
import QuestionViewItem from "../../QuestionItem/QuestionViewItem";
import SubPageLayout from "../layouts/SubPageLayout";

type Props = {
  userId: string;
  meeting: Meeting;
  meetingCreator: any;
  onClose: () => void;
};

const ReportDetailsPage = ({
  meeting: initialMeeting,
  onClose,
  meetingCreator,
}: Props) => {
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
                  <DetailsLine symbol="date">
                    {`from ${formatMeetingDate(meeting.startDate)}`}
                  </DetailsLine>
                  <DetailsLine symbol="time">
                    {meeting.startDate.toLocaleTimeString("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </DetailsLine>
                  <DetailsLine symbol="date">
                    {`to ${formatMeetingDate(meeting.endDate)}`}
                  </DetailsLine>
                  <DetailsLine symbol="time">
                    {meeting.endDate.toLocaleTimeString("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </DetailsLine>
                </>
              )}
              {meeting.location && (
                <DetailsLine symbol="location">{meeting.location}</DetailsLine>
              )}
              <DetailsLine symbol="meeting">
                <div className="flex items-center space-x-1">
                  <p className="text-xs text-gray-500">Meeting ID:</p>
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
                  <p className="text-xs text-gray-500">
                    ({meetingCreator.email})
                  </p>
                )}
              </DetailsLine>
            </div>
          </Accordion>
        </div>
        <Accordion title="Description">
          <div className="w-full rounded-xl p-3 bg-white space-y-1">
            <p className="text-xs whitespace-pre-wrap">
              {!!meeting.description?.length
                ? meeting.description
                : "No description available"}
            </p>
          </div>
        </Accordion>
        <Accordion title={`Participants (${participants.length})`}>
          <div className="space-y-1.5">
            {participants.map((p) => (
              <DetailsParticipantItem participant={p} key={p.id} />
            ))}
          </div>
        </Accordion>
        <Accordion title="Agenda">
          {!!meeting.agenda.length ? (
            <div className="space-y-1.5">
              {meeting.agenda.map((item) => (
                <AgendaItemView agendaItem={item} key={item.id} />
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
              <p className="whitespace-pre-wrap">{meetingNote?.content}</p>
            </div>
          </Accordion>
        )}
        {sharedNotes?.content && (
          <Accordion title="Shared notes">
            <div className="space-y-1.5 bg-white rounded-xl p-3 text-xs">
              <p className="whitespace-pre-wrap">
                {sharedNotes?.content as string}
              </p>
            </div>
          </Accordion>
        )}
        <Accordion title="Questions">
          {!!meetingQuestions.length ? (
            <div className="space-y-1.5">
              {openQuestions.map((question) => (
                <QuestionViewItem
                  meetingQuestion={question}
                  key={question.id}
                />
              ))}
              {answeredQuestions.map((question) => (
                <QuestionViewItem
                  meetingQuestion={question}
                  key={question.id}
                />
              ))}
            </div>
          ) : (
            <div className="w-full rounded-xl p-3 bg-white space-y-1">
              <p className="text-xs">No questions available</p>
            </div>
          )}
        </Accordion>
      </div>
    </SubPageLayout>
  );
};

export default ReportDetailsPage;
