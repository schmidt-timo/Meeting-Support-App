import { useState } from "react";
import {
  MdInfo,
  MdOutlineClose,
  MdPeople,
  MdQuestionAnswer,
} from "react-icons/md";
import {
  Meeting,
  MeetingAgendaStatus,
  MeetingNote,
  MeetingParticipant,
  MeetingQuestion,
} from "../../../utils/types";
import NotificationLabel from "../../formElements/NotificationLabel";
import AgendaController from "../../meetingElements/AgendaController";
import MeetingCounter from "../../meetingElements/MeetingCounter";
import MeetingNotes from "../../meetingElements/MeetingNotes";
import { DatabaseSyncStatus } from "../../meetingElements/NoteSyncStatusBar";
import SharedNotes from "../../meetingElements/SharedNotes";
import PresentationView from "./PresentationView";

type MeetingViewPageProps = {
  meeting: Meeting;
  onShowInfo: () => void;
  onExitMeeting: () => void;
  agendaStatus: MeetingAgendaStatus;
  onShowFullAgenda: () => void;
  onAgendaItemChange: (newIndex: number) => Promise<void>;
  onPresentationPageChange: (pageNumber: number) => Promise<void>;
  onMeetingNoteChange: (newText: string) => Promise<MeetingNote>;
  onSharedNotesChange: (newText: string) => Promise<MeetingNote>;
  meetingNote: MeetingNote;
  sharedNotes: MeetingNote;
  databaseStatus: DatabaseSyncStatus;
  setDatabaseStatus: (status: DatabaseSyncStatus) => void;
  sharedNotesDatabaseStatus: DatabaseSyncStatus;
  setSharedNotesDatabaseStatus: (status: DatabaseSyncStatus) => void;
  onManageParticipants: () => void;
  onManageQuestions: () => void;
  onAlarm: () => void;
  participants: MeetingParticipant[];
  questions: MeetingQuestion[];
};

const MeetingViewPage = ({
  meeting,
  onShowInfo,
  onExitMeeting,
  agendaStatus,
  onShowFullAgenda,
  onAgendaItemChange,
  onPresentationPageChange,
  onMeetingNoteChange,
  onSharedNotesChange,
  meetingNote,
  sharedNotes,
  databaseStatus,
  setDatabaseStatus,
  sharedNotesDatabaseStatus,
  setSharedNotesDatabaseStatus,
  onManageParticipants,
  onManageQuestions,
  onAlarm,
  participants,
  questions,
}: MeetingViewPageProps) => {
  const [showSharedNotes, setShowSharedNotes] = useState(false);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full p-4 flex items-center justify-between bg-white z-20 overflow-hidden">
        <span className="w-full truncate pr-2 text-mblue-600">
          <h1 className="font-bold text-base truncate">{meeting.title}</h1>
          <MeetingCounter
            startDate={meeting.startDate}
            endDate={meeting.endDate}
            onReachingEndTime={onAlarm}
          />
        </span>
        <span className="space-x-2 flex">
          <button
            className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0"
            onClick={onExitMeeting}
          >
            <MdOutlineClose className="w-8 h-8" />
          </button>
        </span>
      </div>

      <div className="px-4 space-y-3 h-meetingview overflow-y-scroll pb-4">
        {!!meeting.agenda.length && (
          <PresentationView
            agendaStatus={agendaStatus}
            agendaItem={meeting.agenda[agendaStatus.currentItemIndex]}
            meetingTimer={{
              start: meeting.startDate,
              end: meeting.endDate,
            }}
            onPresentationPageChange={onPresentationPageChange}
          />
        )}
        {!!meeting.agenda.length ? (
          <AgendaController
            agendaStatus={agendaStatus!}
            agendaItems={meeting.agenda}
            onShowFullAgenda={onShowFullAgenda}
            onAgendaItemChange={onAgendaItemChange}
          />
        ) : (
          <NotificationLabel variant="yellow">
            No agenda available for this meeting.
          </NotificationLabel>
        )}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between space-x-1">
            <button
              onClick={() => setShowSharedNotes(false)}
              className={`rounded-l-xl w-full py-1 flex flex-col items-center space-x-1.5 justify-center text-xs ${
                !showSharedNotes
                  ? "bg-mblue-600 text-white"
                  : "bg-mblue-100 text-mblue-600"
              }`}
            >
              <p className="text-xs font-medium">Your Notes</p>
              <p className="text-extrasmall">(only visible to you)</p>
            </button>
            <button
              onClick={() => setShowSharedNotes(true)}
              className={`rounded-r-xl w-full py-1 flex flex-col items-center space-x-1.5 justify-center text-xs ${
                showSharedNotes
                  ? "bg-mblue-600 text-white"
                  : "bg-mblue-100 text-mblue-600"
              }`}
            >
              <p className="text-xs font-medium">Shared Notes</p>
              <p className="text-extrasmall">(visible to everyone)</p>
            </button>
          </div>
        </div>
        {showSharedNotes && (
          <SharedNotes
            meetingNote={sharedNotes}
            onChangeNote={onSharedNotesChange}
            databaseStatus={sharedNotesDatabaseStatus}
            setDatabaseStatus={setSharedNotesDatabaseStatus}
          />
        )}
        {!showSharedNotes && (
          <MeetingNotes
            meetingNote={meetingNote}
            onChangeNote={onMeetingNoteChange}
            databaseStatus={databaseStatus}
            setDatabaseStatus={setDatabaseStatus}
          />
        )}
      </div>
      <div className="w-full bg-mblue-500 flex justify-between mobileXL:justify-center z-10">
        <button
          onClick={onManageParticipants}
          className="w-full p-3 flex flex-col items-center justify-center space-y-1 max-w-lg desktop:max-w-nav text-xs text-white"
        >
          <span className="flex space-x-1 items-center">
            <MdPeople className="w-4 h-4 text-white flex-shrink-0" />
            <p>{participants.length}</p>
          </span>
          <p>Participants</p>
        </button>
        <button
          onClick={onManageQuestions}
          className="w-full p-3 flex flex-col items-center justify-center space-y-1 max-w-lg desktop:max-w-nav text-xs text-white"
        >
          <span className="flex space-x-1 items-center">
            <MdQuestionAnswer className="w-4 h-4 text-white flex-shrink-0" />
            {questions.length > 0 && <p>{questions.length}</p>}
          </span>
          <p>Questions</p>
        </button>
        <button
          onClick={onShowInfo}
          className="w-full p-3 flex flex-col items-center justify-center space-y-1 max-w-lg desktop:max-w-nav text-xs text-white"
        >
          <MdInfo className="w-4 h-4 text-white flex-shrink-0" />
          <p>Info/QR Code</p>
        </button>
      </div>
    </div>
  );
};

export default MeetingViewPage;
