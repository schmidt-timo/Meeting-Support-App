import { MdDelete } from "react-icons/md";
import { getNameInitials } from "../../utils/functions";
import { MeetingParticipant } from "../../utils/types";

type Props = {
  userId: string;
  participant: MeetingParticipant;
  onDelete: (participantId: string) => void;
};

const ParticipantItem = ({ userId, participant, onDelete }: Props) => {
  return (
    <div className="flex p-2 bg-white rounded-xl items-center justify-between">
      <div className="flex space-x-2 items-center truncate">
        <span className="rounded-full w-9 h-9 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold bg-gray-500">
          {getNameInitials(participant.name ?? participant.email)}
        </span>
        <div className="flex flex-col truncate pr-3">
          {participant.name && (
            <h1 className="font-bold truncate">{participant.name}</h1>
          )}
          <p className="text-sm truncate">{participant.email}</p>
        </div>
      </div>
      {participant.id !== userId && (
        <button
          onClick={() => onDelete(participant.id)}
          className="bg-red-200 rounded-full w-7 h-7 flex justify-center items-center flex-shrink-0"
        >
          <MdDelete className="text-red-600 h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default ParticipantItem;
