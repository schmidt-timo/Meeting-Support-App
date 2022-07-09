import { useState } from "react";
import { MeetingParticipant } from "../../utils/types";
import Button from "../formElements/Button";
import Label from "../formElements/Label";
import ParticipantItemInput from "../ParticipantItem/ParticipantItemInput";
import ParticipantItem from "../ParticipantItem/ParticipantItem";
import SubPageTemplate from "../templates/SubPageTemplate";
import { ERROR_MESSAGES } from "../../utils/constants";
import NotificationLabel from "../formElements/NotificationLabel";

type ManageParticipantsContentProps = {
  userId: string;
  participants: MeetingParticipant[];
  buttonText: string;
  onCreate: (items: MeetingParticipant[]) => void;
};

const ManageParticipantsContent = ({
  userId,
  participants: initialParticipants,
  buttonText,
  onCreate,
}: ManageParticipantsContentProps) => {
  const [participants, setParticipants] =
    useState<MeetingParticipant[]>(initialParticipants);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <div className="space-y-5">
        <ParticipantItemInput
          errorMessage={errorMessage}
          onAdd={(p) => {
            const participantAlreadyExists =
              participants.findIndex((pa) => pa.id === p.id) !== -1;

            if (participantAlreadyExists) {
              setErrorMessage(ERROR_MESSAGES.PARTICIPANT_ALREADY_EXISTS);
              setTimeout(() => {
                setErrorMessage("");
              }, 3000);
            } else {
              // TODO: Look up in address book and add with name
              // also make sure participants can't be added twice
              // else show name field
              setParticipants([...participants, p]);
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
  userId: string;
  participants: MeetingParticipant[];
  buttonText: string;
  onBack?: (items: MeetingParticipant[]) => void;
  onCreate: (items: MeetingParticipant[]) => void;
  onClose: () => void;
};

const ManageParticipants = ({
  userId,
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
            userId={userId}
            participants={participants}
            buttonText={buttonText}
            onCreate={onCreate}
          />
        </SubPageTemplate>
      ) : (
        <SubPageTemplate title="Manage participants" onClose={onClose}>
          <ManageParticipantsContent
            userId={userId}
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
