import { MdMode, MdDelete } from "react-icons/md";

type Props = {
  title: string;
  description?: string;
  duration?: number;
};

const MeetingAgendaItem = ({ title, description, duration }: Props) => {
  return (
    <div className="bg-white rounded-xl px-3 pb-3 pt-2.5 space-y-1">
      <div className="flex justify-between space-x-3">
        <h1 className="font-bold truncate">{title}</h1>
        <span className="flex flex-shrink-0 items-center justify-center text-xs font-medium text-white bg-gray-700 rounded-xl h-5 px-2">
          {duration} min
        </span>
      </div>

      <p className="text-xs">{description}</p>

      <div className="space-x-2 flex justify-end pt-2">
        <button className="bg-blue-200 rounded-full w-7 h-7 flex justify-center items-center">
          <MdMode className="text-blue-600 h-4 w-4" />
        </button>
        <button className="bg-red-200 rounded-full w-7 h-7 flex justify-center items-center">
          <MdDelete className="text-red-600 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default MeetingAgendaItem;
