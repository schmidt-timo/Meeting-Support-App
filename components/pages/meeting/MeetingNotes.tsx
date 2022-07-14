import { MdCheck } from "react-icons/md";
import Textarea from "../../formElements/Textarea";

export type DatabaseSyncStatus = "SYNCHING" | "SYNCHED" | "NONE" | "ERROR";

type Props = {
  meetingNote: string;
  databaseStatus: DatabaseSyncStatus;
  onChangeNote: (noteText: string) => void;
};

const MeetingNotes = ({ meetingNote, onChangeNote, databaseStatus }: Props) => {
  return (
    <div className="flex flex-col relative">
      <Textarea
        value={meetingNote}
        placeholder="Your notes"
        onChange={(e) => {
          onChangeNote(e.target.value);
        }}
      />
      <DatabaseSyncStatus status={databaseStatus} />
    </div>
  );
};

export default MeetingNotes;

type DatabaseSyncStatusProps = {
  status: DatabaseSyncStatus;
};

const DatabaseSyncStatus = ({ status }: DatabaseSyncStatusProps) => {
  return (
    <div
      className={`text-extrasmall py-0.5 px-2 text-center absolute bottom-1 right-1 rounded-xl
    ${status === "SYNCHING" && "bg-yellow-100"}
    ${status === "SYNCHED" && "bg-green-100"}
    ${status === "ERROR" && "bg-red-100"}
    `}
    >
      {status === "SYNCHING" && (
        <div className="text-yellow-500">Synching ...</div>
      )}
      {status === "SYNCHED" && (
        <div className="text-green-500 flex items-center space-x-1">
          <MdCheck className="w-3 h-3 flex-shrink-0" />
          <p>Synched</p>
        </div>
      )}
      {status === "ERROR" && <div className="text-red-500">Error</div>}
    </div>
  );
};
