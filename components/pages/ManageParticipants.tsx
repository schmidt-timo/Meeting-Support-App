import { useState } from "react";
import { MeetingParticipant } from "../../utils/types";
import Button from "../formElements/Button";
import Label from "../formElements/Label";
import ParticipantItemInput from "../ParticipantItem/ParticipantItemInput";
import ParticipantItem from "../ParticipantItem/ParticipantItem";
import SubPageTemplate from "../templates/SubPageTemplate";

type ManageParticipantsContentProps = {
  participants: MeetingParticipant[];
  buttonText: string;
  onCreate: (items: MeetingParticipant[]) => void;
};

const ManageParticipantsContent = ({
  participants: initialParticipants,
  buttonText,
  onCreate,
}: ManageParticipantsContentProps) => {
  const [participants, setParticipants] =
    useState<MeetingParticipant[]>(initialParticipants);

  return (
    <>
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
        {buttonText}
      </Button>
    </>
  );
};

type Props = {
  participants: MeetingParticipant[];
  buttonText: string;
  onBack?: (items: MeetingParticipant[]) => void;
  onCreate: (items: MeetingParticipant[]) => void;
  onClose: () => void;
};

const ManageParticipants = ({
  participants,
  onBack,
  buttonText,
  onCreate,
  onClose,
}: Props) => {
  return (
    <>
      {onBack ? (
        <SubPageTemplate
          title="Manage participants"
          onClose={onClose}
          onBack={() => onBack(participants)}
        >
          <ManageParticipantsContent
            participants={participants}
            buttonText={buttonText}
            onCreate={onCreate}
          />
        </SubPageTemplate>
      ) : (
        <SubPageTemplate title="Manage participants" onClose={onClose}>
          <ManageParticipantsContent
            participants={participants}
            buttonText={buttonText}
            onCreate={onCreate}
          />
        </SubPageTemplate>
      )}
    </>
  );
};

export default ManageParticipants;
