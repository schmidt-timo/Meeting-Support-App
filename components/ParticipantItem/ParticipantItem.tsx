import { MdDelete } from "react-icons/md";
import { getNameInitials } from "../../utils/functions";
import { MeetingParticipant } from "../../utils/types";

type Props = {
  participant: MeetingParticipant;
  userId?: string;
  onDelete?: (participantId: string) => void;
};

const ParticipantItem = ({ userId, participant, onDelete }: Props) => {
  return (
    <div className="flex p-2 bg-white rounded-xl items-center justify-between h-12">
      <div className="flex space-x-2 items-center truncate">
        <span
          className="rounded-full w-9 h-9 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold"
          style={{
            backgroundColor: participant.color ?? "#0c406e",
          }}
        >
          {!!participant.name?.length
            ? getNameInitials(participant.name)
            : getNameInitials(participant.email)}
        </span>
        <div className="flex flex-col truncate pr-3 -space-y-0.5">
          {!!participant.name?.length ? (
            <>
              <h1 className="font-bold truncate text-sm text-mblue-600">
                {participant.name}
              </h1>
              <p className="text-sm truncate text-mblue-500 text-opacity-60">
                {participant.email}
              </p>
            </>
          ) : (
            <p className="text-sm truncate text-mblue-600">
              {participant.email}
            </p>
          )}
        </div>
      </div>
      {onDelete && participant.id !== userId && (
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
