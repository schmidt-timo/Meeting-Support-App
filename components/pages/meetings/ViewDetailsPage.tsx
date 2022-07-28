import {
  filterOpenQuestions,
  filterAnsweredQuestions,
} from "../../../utils/filtering";
import {
  formatMeetingDate,
  formatMeetingTime,
} from "../../../utils/formatting";
import { isTheSameDay } from "../../../utils/functions";
import { Meeting, MeetingNote, MeetingQuestion } from "../../../utils/types";
import Accordion from "../../Accordion/Accordion";
import Label from "../../formElements/Label";
import DetailsLine from "../../MeetingDetails/DetailsLine";
import MeetingNotes from "../../meetingElements/MeetingNotes";
import { DatabaseSyncStatus } from "../../meetingElements/NoteSyncStatusBar";
import SharedNotes from "../../meetingElements/SharedNotes";
import QuestionItem from "../../QuestionItem/QuestionItem";
import QuestionItemInput from "../../QuestionItem/QuestionItemInput";
import SubPageLayout from "../layouts/SubPageLayout";

type Props = {
  userId: string;
  meeting: Meeting;
  meetingCreator: any;
  onClose: () => void;
  meetingNote: MeetingNote;
  sharedNotes: MeetingNote;
  databaseStatus: DatabaseSyncStatus;
  setDatabaseStatus: (status: DatabaseSyncStatus) => void;
  sharedNotesDatabaseStatus: DatabaseSyncStatus;
  setSharedNotesDatabaseStatus: (status: DatabaseSyncStatus) => void;
  onMeetingNoteChange: (newText: string) => Promise<MeetingNote>;
  onSharedNotesChange: (newText: string) => Promise<MeetingNote>;
  meetingQuestions: MeetingQuestion[];
  onAddQuestion: (question: string) => void;
  onUpvote: (meetingQuestion: MeetingQuestion) => void;
  onMarkAsAnswered: (meetingQuestion: MeetingQuestion) => void;
};

const ViewDetailsPage = ({
  userId,
  meeting: initialMeeting,
  onClose,
  meetingCreator,
  meetingNote,
  sharedNotes,
  databaseStatus,
  sharedNotesDatabaseStatus,
  setDatabaseStatus,
  setSharedNotesDatabaseStatus,
  onMeetingNoteChange,
  onSharedNotesChange,
  meetingQuestions,
  onAddQuestion,
  onUpvote,
  onMarkAsAnswered,
}: Props) => {
  // Fix dates
  const meeting = {
    ...initialMeeting,
    startDate: new Date(initialMeeting.startDate),
    endDate: new Date(initialMeeting.endDate),
  };

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
              {meeting.description
                ? meeting.description
                : "No description available"}
            </p>
          </div>
        </Accordion>

        <Accordion title="Your Notes (only visible to you)">
          <div className="bg-white rounded-xl">
            <MeetingNotes
              meetingNote={meetingNote}
              onChangeNote={onMeetingNoteChange}
              databaseStatus={databaseStatus}
              setDatabaseStatus={setDatabaseStatus}
            />
          </div>
        </Accordion>

        <Accordion title="Shared Notes (visible to everyone)">
          <div className="bg-white rounded-xl">
            <SharedNotes
              meetingNote={sharedNotes}
              onChangeNote={onSharedNotesChange}
              databaseStatus={sharedNotesDatabaseStatus}
              setDatabaseStatus={setSharedNotesDatabaseStatus}
            />
          </div>
        </Accordion>

        <Accordion title="Questions">
          <div className="space-y-5">
            <QuestionItemInput onAdd={onAddQuestion} />
            <div className="space-y-2">
              {!!openQuestions.length && (
                <>
                  <Label>{`Open Questions (${openQuestions.length})`}</Label>
                  {openQuestions.map((q) => (
                    <QuestionItem
                      key={q.id}
                      meetingQuestion={q}
                      onUpvote={() => onUpvote(q)}
                      onMarkAsAnswered={() => onMarkAsAnswered(q)}
                      upvoted={q.upvotes.includes(userId)}
                    >
                      {q.question}
                    </QuestionItem>
                  ))}
                </>
              )}
              {!!answeredQuestions.length && (
                <>
                  <Label>{`Answered Questions (${answeredQuestions.length})`}</Label>
                  {answeredQuestions.map((q) => (
                    <QuestionItem
                      key={q.id}
                      meetingQuestion={q}
                      onUpvote={() => onUpvote(q)}
                      onMarkAsAnswered={() => onMarkAsAnswered(q)}
                      upvoted={q.upvotes.includes(userId)}
                    >
                      {q.question}
                    </QuestionItem>
                  ))}
                </>
              )}
            </div>
          </div>
        </Accordion>
      </div>
    </SubPageLayout>
  );
};

export default ViewDetailsPage;
