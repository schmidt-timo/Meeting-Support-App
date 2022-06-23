import { useState } from "react";
import { MeetingParticipant } from "../../utils/types";
import Button from "../formElements/Button";
import Label from "../formElements/Label";
import ParticipantItemInput from "../ParticipantItem/ParticipantItemInput";
import ParticipantItem from "../ParticipantItem/ParticipantItem";
import SubviewBuilder from "../SubviewBuilder/SubviewBuilder";

type Props = {
  participants: MeetingParticipant[];
  onBack: (items: MeetingParticipant[]) => void;
  onCreate: (items: MeetingParticipant[]) => void;
  onClose: () => void;
};

const ManageParticipants = ({
  participants: initialParticipants,
  onBack,
  onCreate,
  onClose,
}: Props) => {
  const [participants, setParticipants] =
    useState<MeetingParticipant[]>(initialParticipants);

  return (
    <SubviewBuilder
      title="Manage participants"
      onClose={onClose}
      onBack={() => onBack(participants)}
    >
      <div className="space-y-5">
        <ParticipantItemInput
          onAdd={(p) => {
            // TODO: Look up in address book and add with name
            // also make sure participants can't be added twice
            // else show name field
            setParticipants([...participants, p]);
          }}
        />
        <div className="space-y-2">
          <Label>{`Participant List (${participants.length})`}</Label>
          {participants.map((p) => (
            <ParticipantItem
              key={p.id}
              participant={p}
              onDelete={(participantId) => {
                const updatedParticipants = participants.filter(
                  (p) => p.id !== participantId
                );
                setParticipants(updatedParticipants);
              }}
            />
          ))}
        </div>
      </div>
      <Button highlighted onClick={() => onCreate(participants)}>
        Create Meeting
      </Button>
    </SubviewBuilder>
  );
};

export default ManageParticipants;
