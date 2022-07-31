import { MeetingParticipant } from "../../../utils/types";
import Button from "../../formElements/Button";
import Label from "../../formElements/Label";
import ParticipantItem from "../../ParticipantItem/ParticipantItem";
import SubPageLayout from "../layouts/SubPageLayout";

type Props = {
  userId: string;
  participants: MeetingParticipant[];
  onClose: () => void;
  onDeclineMeeting: () => void;
  viewOnly?: boolean;
};

const ViewParticipants = ({
  userId,
  participants,
  onClose,
  onDeclineMeeting,
  viewOnly,
}: Props) => {
  return (
    <SubPageLayout title="View participants" onClose={onClose}>
      <div className={viewOnly ? "" : "space-y-5"}>
        <div className={`space-y-2 ${viewOnly && "hidden"}`}>
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
    </SubPageLayout>
  );
};

export default ViewParticipants;
