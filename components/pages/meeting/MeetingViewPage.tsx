import {
  MdOutlineClose,
  MdPeople,
  MdQrCodeScanner,
  MdQuestionAnswer,
} from "react-icons/md";
import {
  Meeting,
  MeetingAgendaStatus,
  MeetingNote,
} from "../../../utils/types";
import Label from "../../formElements/Label";
import NotificationLabel from "../../formElements/NotificationLabel";
import AgendaController from "./AgendaController";
import MeetingCounter from "./MeetingCounter";
import MeetingNotes, { DatabaseSyncStatus } from "./MeetingNotes";
import PresentationView from "./PresentationView";

type MeetingViewPageProps = {
  meeting: Meeting;
  onShowInfo: () => void;
  onExitMeeting: () => void;
  agendaStatus: MeetingAgendaStatus;
  onShowFullAgenda: () => void;
  onAgendaItemChange: (newIndex: number) => Promise<void>;
  onMeetingNoteChange: (newText: string) => Promise<MeetingNote>;
  meetingNote: MeetingNote;
  databaseStatus: DatabaseSyncStatus;
  setDatabaseStatus: (status: DatabaseSyncStatus) => void;
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
  onMeetingNoteChange,
  meetingNote,
  databaseStatus,
  setDatabaseStatus,
  onManageParticipants,
  onManageQuestions,
}: MeetingViewPageProps) => {
  return (
    <>
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

      <div className="px-4 space-y-3 overflow-y-scroll pb-24">
        {!!meeting.agenda.length && (
          <PresentationView
            currentAgendaIndex={agendaStatus.currentItemIndex}
            agendaItem={meeting.agenda[agendaStatus.currentItemIndex]}
            agendaTimerStartDate={agendaStatus.startedAt}
            meetingTimer={{
              start: meeting.startDate,
              end: meeting.endDate,
            }}
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
        <div className="space-y-2">
          <Label>Your Notes (only visible for you)</Label>
          <MeetingNotes
            meetingNote={meetingNote}
            onChangeNote={onMeetingNoteChange}
            databaseStatus={databaseStatus}
            setDatabaseStatus={setDatabaseStatus}
          />
        </div>
      </div>

      <div className="w-full text-xs flex justify-between fixed bottom-0 left-0 p-4 bg-white space-x-2">
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
        <button className="w-full py-3 bg-gray-200 rounded-xl flex flex-col items-center justify-center">
          <MdQuestionAnswer className="w-4 h-4" />
          <p>Shared Notes</p>
        </button>
      </div>
    </>
  );
};

export default MeetingViewPage;
