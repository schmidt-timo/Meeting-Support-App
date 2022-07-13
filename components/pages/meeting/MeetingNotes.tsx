import { useEffect, useState } from "react";
import { MeetingNote } from "../../../utils/types";
import Button from "../../formElements/Button";
import Textarea from "../../formElements/Textarea";

type Props = {
  meetingNote?: MeetingNote;
  onCreateNote: (noteText: string) => void;
  onSaveNote: (noteText: string) => void;
};

const MeetingNotes = ({ meetingNote, onCreateNote, onSaveNote }: Props) => {
  const [databaseStatus, setDatabaseStatus] = useState<{
    text: string;
    color: string;
  }>({
    text: "",
    color: "#FF0000",
  });

  const [text, setText] = useState(meetingNote?.content ?? "");

  useEffect(() => {
    if (meetingNote) {
      setDatabaseStatus({
        text: "Found in database",
        color: "rgb(234 179 8)",
      });
    }
  }, []);

  function error() {
    setDatabaseStatus({
      text: "Error! Couldn't be saved",
      color: "rgb(239 68 68)",
    });
  }

  function changed() {
    setDatabaseStatus({
      text: "Saving to database",
      color: "rgb(34 197 94)",
    });
  }

  function synchronized() {
    setTimeout(() => {
      setDatabaseStatus({
        text: "Saved!",
        color: "rgb(239 68 68)",
      });
    }, 3000);
  }

  return (
    <>
      <Textarea
        value={text}
        placeholder="Your notes"
        onFocus={() => {
          if (!meetingNote) {
            onCreateNote(text);
          }
        }}
        onChange={(e) => {
          setText(e.target.value);
          //   changed();
          //   setTimeout(() => {
          //     onSaveNote(text!)
          //       .then(() => {
          //         synchronized();
          //       })
          //       .catch(() => {
          //         error();
          //       });
          //   }, 3000);
        }}
      />

      <div className="">
        <Button onClick={() => onSaveNote(text)}>Save</Button>
        <p
          className="text-xs w-full"
          style={{
            color: databaseStatus.color,
          }}
        >
          {databaseStatus.text}
        </p>
      </div>
    </>
  );
};

export default MeetingNotes;
