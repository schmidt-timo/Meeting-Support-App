import { useEffect, useState } from "react";
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
  const [noteText, setNoteText] = useState(meetingNote.content);

  var updateNote = (function () {
    // make sure note create function only gets called once
    var executed = false;
    return function () {
      if (!executed) {
        executed = true;
        setDatabaseStatus("SAVING");
        onChangeNote(noteText).then((data) => {
          if (data) {
            setDatabaseStatus("SAVED");
          }
        });
      }
    };
  })();

  useEffect(() => {
    // upload notes to database every 5 seconds after change
    const interval = setInterval(() => {
      if (databaseStatus !== "SAVED") {
        updateNote();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [noteText]);

  return (
    <div className="flex flex-col relative">
      <textarea
        className={`w-full rounded-t-xl bg-white px-3 py-2 border-x border-t outline-0 resize-none text-sm min-h-150 focus:outline-none
        ${databaseStatus === "NOT_SAVED" && "border-red-500"}
        ${databaseStatus === "SAVED" && "border-green-500"}
        ${databaseStatus === "SAVING" && "border-yellow-500"}
        `}
        value={noteText}
        placeholder="Your notes"
        onChange={(e) => {
          setNoteText(e.target.value);
          setDatabaseStatus("NOT_SAVED");
        }}
      />
      <DatabaseSyncBar
        databaseStatus={databaseStatus}
        onSave={() => {
          setDatabaseStatus("SAVING");
          onChangeNote(noteText).then((data) => {
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

type DatabaseSyncBarProps = {
  databaseStatus: DatabaseSyncStatus;
  onSave: () => void;
};

const DatabaseSyncBar = ({ databaseStatus, onSave }: DatabaseSyncBarProps) => {
  return (
    <div
      className={`flex w-full items-center justify-between p-2 border-l border-r border-b rounded-b-xl
        ${databaseStatus === "NOT_SAVED" && "border-red-500"}
        ${databaseStatus === "SAVED" && "border-green-500"}
        ${databaseStatus === "SAVING" && "border-yellow-500"}
    `}
    >
      <button
        disabled={databaseStatus === "SAVED"}
        onClick={onSave}
        className={`text-white text-xs px-3 py-1 rounded-xl disabled:bg-transparent
        ${databaseStatus === "NOT_SAVED" && "bg-red-500"}
        `}
      >
        Save changes manually
      </button>
      <div className="text-xs font-medium pr-2">
        {databaseStatus === "SAVING" && (
          <div className="text-yellow-500">Saving ...</div>
        )}
        {databaseStatus === "SAVED" && (
          <div className="text-green-500 flex items-center space-x-1">
            <MdCheck className="w-4 h-4 flex-shrink-0" />
            <p>Saved to database</p>
          </div>
        )}
        {databaseStatus === "NOT_SAVED" && (
          <div className="text-red-500">Not saved yet</div>
        )}
      </div>
    </div>
  );
};
