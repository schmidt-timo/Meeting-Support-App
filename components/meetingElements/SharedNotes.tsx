import { useEffect, useState } from "react";
import { compareStringsAndGetDifference } from "../../utils/functions";
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
  const [unsubmittedText, setUnsubmittedText] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (meetingNote.content !== noteText && unsubmittedText.length > 0) {
      setShowModal(true);
    } else {
      setNoteText(meetingNote.content);
      setUnsubmittedText("");
    }
  }, [meetingNote]);

  return (
    <div className="flex flex-col relative">
      {showModal && (
        <div className="absolute w-full h-full bg-black rounded-xl bg-opacity-60 flex justify-center items-center p-5">
          <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center space-y-3 max-w-2xl">
            <p className="text-xs">
              The shared notes have been modified by another person in the
              meantime. Select whether you want to keep or discard your unsaved
              changes.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setNoteText(
                    `${meetingNote.content}

${unsubmittedText}`
                  );
                  setShowModal(false);
                }}
                className="bg-black text-white rounded-xl py-1 px-3 text-xs"
              >
                Keep my changes
              </button>
              <button
                onClick={() => {
                  setNoteText(meetingNote.content);
                  setShowModal(false);
                }}
                className="bg-red-500 text-white rounded-xl py-1 px-3 text-xs"
              >
                Discard my changes
              </button>
            </div>
          </div>
        </div>
      )}
      <textarea
        id="sharedNotes"
        className={`w-full rounded-t-xl bg-white px-3 py-2 border-x border-t outline-0 resize-none text-sm min-h-150 focus:outline-none border-mblue-200 text-mblue-600 placeholder-mblue-500 placeholder-opacity-40
        ${databaseStatus === "NOT_SAVED" && "border-red-500"}
        ${databaseStatus === "SAVED" && "border-green-500"}
        ${databaseStatus === "SAVING" && "border-yellow-500"}
        `}
        value={noteText}
        placeholder="Write here ..."
        onChange={(e) => {
          setNoteText(e.target.value);
          setDatabaseStatus("NOT_SAVED");
          const unsubmitted = compareStringsAndGetDifference(
            meetingNote.content,
            e.target.value
          );
          if (unsubmitted !== undefined) {
            setUnsubmittedText(unsubmitted);
          }
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
