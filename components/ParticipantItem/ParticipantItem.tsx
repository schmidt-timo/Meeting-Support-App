import { MdDelete } from "react-icons/md";
import { formatParticipantName } from "../../utils/formatting";
import { MeetingParticipant } from "../../utils/types";

type Props = {
  participant: MeetingParticipant;
  onDelete: () => void;
};

const ParticipantItem = ({ participant, onDelete }: Props) => {
  return (
    <div className="py-2 px-3 bg-white rounded-xl flex justify-between items-center">
      <span className="truncate pr-3">
        <p className="font-medium truncate">
          {formatParticipantName(participant.firstName, participant.lastName)}
        </p>
        <p className="text-extrasmall text-gray-500 truncate">
          {participant.email}
        </p>
      </span>
      <button
        className="bg-red-200 rounded-full w-7 h-7 flex justify-center items-center flex-shrink-0 "
        onClick={onDelete}
      >
        <MdDelete className="text-red-600 h-4 w-4" />
      </button>
    </div>
  );
};

export default ParticipantItem;
