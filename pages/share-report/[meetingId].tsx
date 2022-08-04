import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Accordion from "../../components/Accordion/Accordion";
import AgendaItemView from "../../components/AgendaItem/AgendaItemView";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import DetailsLine from "../../components/MeetingDetails/DetailsLine";
import SubPageLayout from "../../components/pages/layouts/SubPageLayout";
import QuestionViewItem from "../../components/QuestionItem/QuestionViewItem";
import { fetchSingleMeeting } from "../../lib/supabase/meetings";
import { usePublicMeeting } from "../../lib/supabase/publicMeeting";
import {
  filterAnsweredQuestions,
  filterOpenQuestions,
} from "../../utils/filtering";
import { formatMeetingDate, formatMeetingTime } from "../../utils/formatting";
import { isTheSameDay } from "../../utils/functions";
import { Meeting } from "../../utils/types";

interface Params extends ParsedUrlQuery {
  meetingId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params as Params;

  const { data: meeting, error } = await fetchSingleMeeting(params.meetingId);

  if (error) {
    throw error;
  }

  return {
    props: {
      meeting,
    },
  };
};

type Props = {
  meeting: Meeting;
};

const PublicMeetingReport: NextPage<Props> = ({
  meeting: initialMeeting,
}: Props) => {
  // Fix dates
  const meeting = {
    ...initialMeeting,
    startDate: new Date(initialMeeting.startDate),
    endDate: new Date(initialMeeting.endDate),
  };

  const { sharedNotes, meetingQuestions, participants } =
    usePublicMeeting(meeting);

  if (!sharedNotes || !meetingQuestions || !participants) {
    return <LoadingScreen />;
  }

  const openQuestions = filterOpenQuestions(meetingQuestions);
  const answeredQuestions = filterAnsweredQuestions(meetingQuestions);

  return (
    <SubPageLayout title={meeting.title}>
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
              <DetailsLine symbol="participants">
                <div className="flex items-center space-x-1">
                  <p>
                    {participants.length}{" "}
                    {participants.length === 1 ? "Participant" : "Participants"}
                  </p>
                </div>
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

export default PublicMeetingReport;
