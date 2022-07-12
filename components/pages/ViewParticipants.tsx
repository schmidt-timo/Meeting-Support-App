import { MeetingParticipant } from "../../utils/types";
import Button from "../formElements/Button";
import Label from "../formElements/Label";
import ParticipantItem from "../ParticipantItem/ParticipantItem";
import SubPageTemplate from "../templates/SubPageTemplate";

type Props = {
  userId: string;
  participants: MeetingParticipant[];
  onClose: () => void;
  onDeclineMeeting: () => void;
};

const ViewParticipants = ({
  userId,
  participants,
  onClose,
  onDeclineMeeting,
}: Props) => {
  return (
    <SubPageTemplate title="View participants" onClose={onClose}>
      <div className="space-y-5">
        <div className="space-y-2">
          <Label>Your participation</Label>
          <Button variant="red" onClick={onDeclineMeeting}>
            Decline participation
          </Button>
        </div>
        <div className="space-y-2">
          <Label>{`All Participants (${participants.length})`}</Label>
          {participants.map((p) => (
            <ParticipantItem userId={userId} key={p.id} participant={p} />
          ))}
        </div>
      </div>
    </SubPageTemplate>
  );
};

export default ViewParticipants;
