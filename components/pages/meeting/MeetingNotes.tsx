import { useState } from "react";
import { MdCheck } from "react-icons/md";
import { MeetingNote } from "../../../utils/types";

export type DatabaseSyncStatus = "SAVING" | "SAVED" | "NONE" | "NOT_SAVED";

type Props = {
  meetingNote: MeetingNote;
  onChangeNote: (noteText: string) => Promise<MeetingNote>;
  databaseStatus: DatabaseSyncStatus;
  setDatabaseStatus: (status: DatabaseSyncStatus) => void;
};

const MeetingNotes = ({
  meetingNote,
  onChangeNote,
  databaseStatus,
  setDatabaseStatus,
}: Props) => {
  const [value, setValue] = useState(meetingNote.content);

  return (
    <div className="flex flex-col relative">
      <textarea
        className={`w-full rounded-t-xl bg-white px-3 py-2 border-x border-t outline-0 resize-none text-sm min-h-150 focus:outline-none
        ${databaseStatus === "NOT_SAVED" && "border-red-500"}
        ${databaseStatus === "SAVED" && "border-green-500"}
        ${databaseStatus === "SAVING" && "border-yellow-500"}
        `}
        value={value}
        placeholder="Your notes"
        onChange={(e) => {
          setDatabaseStatus("NOT_SAVED");
          setValue(e.target.value);
        }}
      />
      <DatabaseSyncStatus
        databaseStatus={databaseStatus}
        onSave={() => {
          setDatabaseStatus("SAVING");
          onChangeNote(value).then((data) => {
            if (data) {
              setDatabaseStatus("SAVED");
            }
          });
        }}
      />
    </div>
  );
};

export default MeetingNotes;

type DatabaseSyncStatusProps = {
  databaseStatus: DatabaseSyncStatus;
  onSave: () => void;
};

const DatabaseSyncStatus = ({
  databaseStatus,
  onSave,
}: DatabaseSyncStatusProps) => {
  return (
    <div
      className={`flex w-full items-center justify-between p-2 border-l border-r border-b rounded-b-xl
        ${databaseStatus === "NOT_SAVED" && "border-red-500"}
        ${databaseStatus === "SAVED" && "border-green-500"}
        ${databaseStatus === "SAVING" && "border-yellow-500"}
    `}
    >
      <button
        onClick={onSave}
        className={`text-white text-xs px-3 py-1 rounded-xl
        ${databaseStatus === "NOT_SAVED" && "bg-red-500"}
        ${databaseStatus === "SAVED" && "bg-green-500"}
        ${databaseStatus === "SAVING" && "bg-yellow-500"}
        `}
      >
        Save to database
      </button>
      <div className="text-xs font-medium pr-2">
        {databaseStatus === "SAVING" && (
          <div className="text-yellow-500">Saving ...</div>
        )}
        {databaseStatus === "SAVED" && (
          <div className="text-green-500 flex items-center space-x-1">
            <MdCheck className="w-4 h-4 flex-shrink-0" />
            <p>Saved</p>
          </div>
        )}
        {databaseStatus === "NOT_SAVED" && (
          <div className="text-red-500">Not saved yet</div>
        )}
      </div>
    </div>
  );
};
