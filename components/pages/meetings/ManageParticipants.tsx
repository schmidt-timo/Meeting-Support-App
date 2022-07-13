import { useState } from "react";
import { MeetingParticipant } from "../../../utils/types";
import Button from "../../formElements/Button";
import Label from "../../formElements/Label";
import ParticipantItemInput from "../../ParticipantItem/ParticipantItemInput";
import ParticipantItem from "../../ParticipantItem/ParticipantItem";
import SubPageLayout from "../layouts/SubPageLayout";
import { ERROR_MESSAGES } from "../../../utils/constants";

type ManageParticipantsContentProps = {
  userId: string;
  participants: MeetingParticipant[];
  buttonText: string;
  onCreate: (participants: MeetingParticipant[]) => void;
  onAddParticipant: (
    participant: MeetingParticipant
  ) => Promise<MeetingParticipant>;
  onDeleteParticipant: (participantId: string) => void;
};

const ManageParticipantsContent = ({
  userId,
  participants,
  buttonText,
  onCreate,
  onAddParticipant,
  onDeleteParticipant,
}: ManageParticipantsContentProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <div className="space-y-5 pb-5">
        <ParticipantItemInput
          errorMessage={errorMessage}
          onAdd={(newParticipant) => {
            const participantAlreadyExists =
              participants.findIndex(
                (pa) => pa.email === newParticipant.email
              ) !== -1;

            if (participantAlreadyExists) {
              setErrorMessage(ERROR_MESSAGES.PARTICIPANT_ALREADY_EXISTS);
              setTimeout(() => {
                setErrorMessage("");
              }, 3000);
            } else {
              onAddParticipant(newParticipant);
            }
          }}
        />
        <div className="space-y-2">
          <Label>{`Participant List (${participants.length})`}</Label>
          {participants.map((p) => (
            <ParticipantItem
              userId={userId}
              key={p.id}
              participant={p}
              onDelete={onDeleteParticipant}
            />
          ))}
        </div>
      </div>
      <Button variant="highlighted" onClick={() => onCreate(participants)}>
        {buttonText}
      </Button>
    </>
  );
};

type Props = {
  userId: string;
  participants: MeetingParticipant[];
  buttonText: string;
  onBack?: (participants: MeetingParticipant[]) => void;
  onCreate: (participants: MeetingParticipant[]) => Promise<void>;
  onClose: () => void;
  onAddParticipant: (
    participant: MeetingParticipant
  ) => Promise<MeetingParticipant>;
  onDeleteParticipant: (participantId: string) => void;
};

const ManageParticipants = ({
  userId,
  participants,
  onBack,
  buttonText,
  onCreate,
  onClose,
  onAddParticipant,
  onDeleteParticipant,
}: Props) => {
  return (
    <>
      {onBack ? (
        <SubPageLayout
          title="Manage participants"
          onClose={onClose}
          onBack={() => onBack(participants)}
        >
          <ManageParticipantsContent
            userId={userId}
            participants={participants}
            buttonText={buttonText}
            onCreate={onCreate}
            onAddParticipant={onAddParticipant}
            onDeleteParticipant={onDeleteParticipant}
          />
        </SubPageLayout>
      ) : (
        <SubPageLayout title="Manage participants" onClose={onClose}>
          <ManageParticipantsContent
            userId={userId}
            participants={participants}
            buttonText={buttonText}
            onCreate={onCreate}
            onAddParticipant={onAddParticipant}
            onDeleteParticipant={onDeleteParticipant}
          />
        </SubPageLayout>
      )}
    </>
  );
};

export default ManageParticipants;
