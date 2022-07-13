import {
  MdQrCodeScanner,
  MdOutlineClose,
  MdFileUpload,
  MdPeople,
  MdQuestionAnswer,
  MdFullscreen,
} from "react-icons/md";
import { Meeting } from "../../../utils/types";
import Label from "../../formElements/Label";
import Textarea from "../../formElements/Textarea";
import AgendaController from "./AgendaController";
import MeetingCounter from "./MeetingCounter";

type MeetingViewPageProps = {
  meeting: Meeting;
  onShowMeetingInfo: () => void;
  onClose: () => void;
};

const MeetingViewPage = ({
  meeting,
  onShowMeetingInfo,
  onClose,
}: MeetingViewPageProps) => {
  return (
    <div className="p-5 space-y-3">
      <div className="w-full flex items-center justify-between">
        <span className="w-full truncate pr-2">
          <h1 className="font-bold text-base truncate">{meeting.title}</h1>
          <MeetingCounter
            meeting={meeting}
            onReachingEndTime={() => {
              console.log("REACHED END");
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
      <div className="border border-black rounded-xl h-56 bg-gray-300 p-2">
        <button className="flex items-center justify-center rounded-full w-7 h-7 bg-black text-white flex-shrink-0">
          <MdFullscreen className="w-5 h-5" />
        </button>
        <p>Hier steht Text</p>
      </div>
      <div className="space-y-2">
        <Label>Agenda</Label>
        {meeting.agenda.length > 0 ? (
          <AgendaController agendaItems={meeting.agenda} />
        ) : (
          <p className="text-sm">No agenda available for this meeting.</p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Your Notes</Label>
        <Textarea placeholder="Your notes" />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <button className="w-full p-3 bg-gray-300 rounded-xl flex flex-col items-center">
          <MdFileUpload className="w-5 h-5" />
          <p className="text-sm">PDF Upload</p>
        </button>
        <button className="w-full p-3 bg-gray-300 rounded-xl flex flex-col items-center">
          <MdPeople className="w-5 h-5" />
          <p className="text-sm">Participants</p>
        </button>
        <button className="w-full p-3 bg-gray-300 rounded-xl flex flex-col items-center">
          <MdQuestionAnswer className="w-5 h-5" />
          <p className="text-sm">Questions</p>
        </button>
      </div>
    </div>
  );
};

export default MeetingViewPage;
