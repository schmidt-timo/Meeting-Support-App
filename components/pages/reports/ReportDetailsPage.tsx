import { useState, useEffect } from "react";
import { useMeeting } from "../../../lib/supabase/meeting";
import { getParticipantInfoIfEmailIsRegistered } from "../../../lib/supabase/users";
import {
  formatMeetingDate,
  formatMeetingTime,
} from "../../../utils/formatting";
import { isTheSameDay } from "../../../utils/functions";
import { Meeting, MeetingParticipant } from "../../../utils/types";
import Accordion from "../../Accordion/Accordion";
import AgendaItemView from "../../AgendaItem/AgendaItemView";
import Button from "../../formElements/Button";
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

  const [isLoading, setIsLoading] = useState(false);

  const { meetingNote, sharedNotes, meetingQuestions, participants } =
    useMeeting(meeting);

  if (isLoading) {
    return <LoadingScreen />;
  }

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
        {meeting.description && (
          <Accordion title="Description">
            <div className="w-full rounded-xl p-3 bg-white space-y-1">
              <p className="text-xs">{meeting.description}</p>
            </div>
          </Accordion>
        )}
        <Accordion title={`Participants (${participants.length})`}>
          <div className="space-y-1.5">
            {participants.map((p) => (
              <DetailsParticipantItem participant={p} key={p.id} />
            ))}
          </div>
        </Accordion>
        {meeting.agenda && (
          <Accordion title="Agenda">
            <div className="space-y-1.5">
              {meeting.agenda.map((item) => (
                <AgendaItemView agendaItem={item} key={item.id} />
              ))}
            </div>
          </Accordion>
        )}
        {meetingNote?.content && (
          <Accordion title="Your notes">
            <div className="space-y-1.5 bg-white rounded-xl p-3 text-xs">
              <p>{meetingNote?.content}</p>
            </div>
          </Accordion>
        )}
        {sharedNotes?.content && (
          <Accordion title="Shared notes">
            <div className="space-y-1.5 bg-white rounded-xl p-3 text-xs">
              <p>{sharedNotes?.content}</p>
            </div>
          </Accordion>
        )}
        {meetingQuestions && (
          <Accordion title="Questions">
            <div className="space-y-1.5">
              {meetingQuestions.map((question) => (
                <QuestionViewItem
                  meetingQuestion={question}
                  key={question.id}
                />
              ))}
            </div>
          </Accordion>
        )}
        <Button variant="highlighted">Share report</Button>
        {/* //TODO: Share */}
      </div>
    </SubPageLayout>
  );
};

export default ReportDetailsPage;
