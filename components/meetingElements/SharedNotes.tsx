import { useEffect, useState } from "react";
import { MeetingNote } from "../../utils/types";
import NoteSyncStatusBar, { DatabaseSyncStatus } from "./NoteSyncStatusBar";

type Props = {
  meetingNote: MeetingNote;
  onChangeNote: (noteText: string) => Promise<MeetingNote>;
  databaseStatus: DatabaseSyncStatus;
  setDatabaseStatus: (status: DatabaseSyncStatus) => void;
};

const SharedNotes = ({
  meetingNote,
  onChangeNote,
  databaseStatus,
  setDatabaseStatus,
}: Props) => {
  const [noteText, setNoteText] = useState(meetingNote.content);

  useEffect(() => {
    // listen to updates
    setNoteText(meetingNote.content);
  }, [meetingNote]);

  return (
    <div className="flex flex-col relative">
      <textarea
        className={`w-full rounded-t-xl bg-white px-3 py-2 border-x border-t outline-0 resize-none text-sm min-h-150 focus:outline-none border-gray-400
        ${databaseStatus === "NOT_SAVED" && "border-red-500"}
        ${databaseStatus === "SAVED" && "border-green-500"}
        ${databaseStatus === "SAVING" && "border-yellow-500"}
        `}
        value={noteText}
        placeholder="Write here ..."
        onChange={(e) => {
          setNoteText(e.target.value);
          setDatabaseStatus("NOT_SAVED");
        }}
      />
      <NoteSyncStatusBar
        variant="SHARED"
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

export default SharedNotes;
