import { MdDelete, MdMoreHoriz } from "react-icons/md";
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
          {participant.name ?? "Participant"}
        </p>
        <p className="text-extrasmall text-gray-500 truncate">
          {participant.email}
        </p>
      </span>
      {/* <span className="flex space-x-1"> */}
      {/* <button
          className="bg-gray-300 hover:bg-gray-400 rounded-full w-7 h-7 flex justify-center items-center flex-shrink-0 "
          onClick={onDelete}
        >
          <MdMoreHoriz className="text-black h-4 w-4" />
        </button> */}
      <button
        className="bg-red-200 hover:bg-red-300 rounded-full w-7 h-7 flex justify-center items-center flex-shrink-0 "
        onClick={onDelete}
      >
        <MdDelete className="text-red-600 h-4 w-4" />
      </button>
      {/* </span> */}
    </div>
  );
};

export default ParticipantItem;
