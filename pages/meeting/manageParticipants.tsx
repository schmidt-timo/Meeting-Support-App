import type { NextPage } from "next";
import Button from "../../components/formElements/Button";
import ParticipantItem from "../../components/ParticipantItem/ParticipantItem";
import SubviewBuilder from "../../components/SubviewBuilder/SubviewBuilder";
import { exampleParticipants } from "../../utils/exampleData";
import { MeetingParticipant } from "../../utils/types";

const participants: MeetingParticipant[] = exampleParticipants;

const ManageParticipants: NextPage = () => {
  return (
    <SubviewBuilder
      title="Manage participants"
      backButtonPath="/meeting/createMeeting"
      variant="ARROW"
    >
      <div className="space-y-3 pb-3">
        {participants.map((p) => (
          <ParticipantItem
            participant={p}
            onDelete={() => {}} // TODO: Add onDelete method
            key={p.id}
          />
        ))}
      </div>
      <div>
        <Button highlighted onClick={() => {}}>
          Add participant
        </Button>
      </div>
    </SubviewBuilder>
  );
};

export default ManageParticipants;
