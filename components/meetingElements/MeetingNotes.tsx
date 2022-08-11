import { useEffect, useState } from "react";
import { MeetingNote } from "../../utils/types";
import NoteSyncStatusBar, { DatabaseSyncStatus } from "./NoteSyncStatusBar";

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
    // upload notes to database every 10 seconds after change
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
        className={`w-full rounded-t-xl bg-white px-3 py-2 border-x border-t outline-0 resize-none text-sm min-h-150 focus:outline-none border-mblue-200 text-mblue-500 placeholder-mblue-500 placeholder-opacity-40
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
