import { getNameInitials } from "../../utils/functions";
import { MeetingParticipant } from "../../utils/types";

type Props = {
  participant: MeetingParticipant;
};

const DetailsParticipantItem = ({ participant }: Props) => {
  return (
    <div className="flex p-2 bg-white rounded-xl items-center justify-between h-12">
      <div className="flex space-x-2 items-center truncate">
        <span
          className="rounded-full w-8 h-8 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold"
          style={{
            backgroundColor: participant.color ?? "gray",
          }}
        >
          {!!participant.name?.length
            ? getNameInitials(participant.name)
            : getNameInitials(participant.email)}
        </span>
        <div className="flex flex-col truncate pr-3 -space-y-0.5">
          {!!participant.name?.length && (
            <h1 className="font-bold truncate text-sm">{participant.name}</h1>
          )}
          <p className="text-xs truncate">{participant.email}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsParticipantItem;
