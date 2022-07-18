import { useState } from "react";
import {
  MdOutlineClose,
  MdPeople,
  MdQrCodeScanner,
  MdQuestionAnswer,
  MdStickyNote2,
} from "react-icons/md";
import {
  Meeting,
  MeetingAgendaStatus,
  MeetingNote,
} from "../../../utils/types";
import Label from "../../formElements/Label";
import NotificationLabel from "../../formElements/NotificationLabel";
import { DatabaseSyncStatus } from "../../meetingElements/NoteSyncStatusBar";
import AgendaController from "./AgendaController";
import MeetingCounter from "./MeetingCounter";
import MeetingNotes from "./MeetingNotes";
import PresentationView from "./PresentationView";
import SharedNotes from "./SharesNotes";

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
}: MeetingViewPageProps) => {
  const [showSharedNotes, setShowSharedNotes] = useState(false);

  return (
    <div className="h-meetingview">
      <div className="w-full p-4 flex items-center justify-between bg-white sticky top-0 z-20">
        <span className="w-full truncate pr-2">
          <h1 className="font-bold text-base truncate">{meeting.title}</h1>
          <MeetingCounter
            startDate={meeting.startDate}
            endDate={meeting.endDate}
            onReachingEndTime={() => {
              console.log("REACHED END");
              // TODO: Alarm function
            }}
          />
        </span>
        <span className="space-x-2 flex">
          <button
            onClick={onShowInfo}
            className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0"
          >
            <MdQrCodeScanner className="w-5 h-5" />
          </button>
          <button
            className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0"
            onClick={onExitMeeting}
          >
            <MdOutlineClose className="w-7 h-7" />
          </button>
        </span>
      </div>

      <div className="flex flex-col justify-between h-full">
        <div className="px-4 space-y-3 overflow-y-scroll">
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
          {showSharedNotes && (
            <div className="space-y-2">
              <Label icon="note">Shared Notes (visible to everyone)</Label>
              <SharedNotes
                meetingNote={sharedNotes}
                onChangeNote={onSharedNotesChange}
                databaseStatus={sharedNotesDatabaseStatus}
                setDatabaseStatus={setSharedNotesDatabaseStatus}
              />
            </div>
          )}
          {!showSharedNotes && (
            <div className="space-y-2">
              <Label icon="note">Your Notes (only visible to you)</Label>
              <MeetingNotes
                meetingNote={meetingNote}
                onChangeNote={onMeetingNoteChange}
                databaseStatus={databaseStatus}
                setDatabaseStatus={setDatabaseStatus}
              />
            </div>
          )}
        </div>

        <div className="w-full text-xs flex justify-between p-4 space-x-2">
          <button
            onClick={onManageParticipants}
            className="w-full py-3 bg-gray-200 rounded-xl flex flex-col items-center justify-center"
          >
            <MdPeople className="w-4 h-4" />
            <p>Participants</p>
          </button>
          <button
            onClick={onManageQuestions}
            className="w-full py-3 bg-gray-200 rounded-xl flex flex-col items-center justify-center"
          >
            <MdQuestionAnswer className="w-4 h-4" />
            <p>Questions</p>
          </button>
          <button
            onClick={() => setShowSharedNotes(!showSharedNotes)}
            className="w-full py-3 bg-gray-200 rounded-xl flex flex-col items-center justify-center"
          >
            <MdStickyNote2 className="w-4 h-4" />
            {showSharedNotes ? <p>Your Notes</p> : <p>Shared Notes</p>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingViewPage;
