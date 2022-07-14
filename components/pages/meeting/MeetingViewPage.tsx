import {
  MdQrCodeScanner,
  MdOutlineClose,
  MdFileUpload,
  MdPeople,
  MdQuestionAnswer,
  MdFullscreen,
} from "react-icons/md";
import { Meeting, MeetingAgendaStatus } from "../../../utils/types";
import Label from "../../formElements/Label";
import NotificationLabel from "../../formElements/NotificationLabel";
import AgendaController from "./AgendaController";
import MeetingCounter from "./MeetingCounter";
import MeetingNotes, { DatabaseSyncStatus } from "./MeetingNotes";

type MeetingViewPageProps = {
  meeting: Meeting;
  onShowMeetingInfo: () => void;
  onClose: () => void;
  meetingNote: string;
  onChangeNote: (note: string) => void;
  databaseStatus: DatabaseSyncStatus;
  setCurrentAgendaItem: (newIndex: number) => void;
  currentAgendaStatus: MeetingAgendaStatus;
  onShowFullAgenda: () => void;
};

const MeetingViewPage = ({
  meeting,
  onShowMeetingInfo,
  onClose,
  onChangeNote,
  meetingNote,
  databaseStatus,
  setCurrentAgendaItem,
  currentAgendaStatus,
  onShowFullAgenda,
}: MeetingViewPageProps) => {
  return (
    <div className="p-5 space-y-3">
      <div className="w-full flex items-center justify-between">
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
            onClick={onShowMeetingInfo}
            className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0"
          >
            <MdQrCodeScanner className="w-5 h-5" />
          </button>
          <button
            className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0"
            onClick={onClose}
          >
            <MdOutlineClose className="w-7 h-7" />
          </button>
        </span>
      </div>
      <div className="border border-black rounded-xl aspect-video bg-gray-300 p-2">
        <button className="flex items-center justify-center rounded-full w-7 h-7 bg-black text-white flex-shrink-0">
          <MdFullscreen className="w-5 h-5" />
        </button>
        <p>Hier steht Text</p>
      </div>

      {meeting.agenda.length > 0 ? (
        <AgendaController
          agendaStatus={currentAgendaStatus}
          agendaItems={meeting.agenda}
          setCurrentAgendaItem={setCurrentAgendaItem}
          onShowFullAgenda={onShowFullAgenda}
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
          onChangeNote={onChangeNote}
          databaseStatus={databaseStatus}
        />
      </div>
      <div className="flex items-center justify-between space-x-1">
        <button className="w-full p-3 bg-gray-300 rounded-xl flex flex-col items-center">
          <MdFileUpload className="w-4 h-4" />
          <p className="text-xs">Upload</p>
        </button>
        <button className="w-full p-3 bg-gray-300 rounded-xl flex flex-col items-center">
          <MdPeople className="w-4 h-4" />
          <p className="text-xs">Participants</p>
        </button>
        <button className="w-full p-3 bg-gray-300 rounded-xl flex flex-col items-center">
          <MdQuestionAnswer className="w-4 h-4" />
          <p className="text-xs">Questions</p>
        </button>
        <button className="w-full p-3 bg-gray-300 rounded-xl flex flex-col items-center">
          <MdQuestionAnswer className="w-4 h-4" />
          <p className="text-xs">Shared Notes</p>
        </button>
      </div>
    </div>
  );
};

export default MeetingViewPage;
