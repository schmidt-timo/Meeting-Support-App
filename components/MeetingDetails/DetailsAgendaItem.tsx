import { MeetingAgendaItem } from "../../utils/types";

type Props = {
  agendaItem: MeetingAgendaItem;
};

const DetailsAgendaItem = ({ agendaItem }: Props) => {
  return (
    <div className="bg-white rounded-xl px-3 pb-3 pt-2.5 space-y-2">
      <div className="flex justify-between space-x-3">
        <h1 className="font-bold truncate text-sm">{agendaItem.title}</h1>
        {agendaItem.duration && (
          <span className="flex flex-shrink-0 items-center justify-center text-xs font-medium text-white bg-gray-700 rounded-xl h-5 px-2">
            {agendaItem.duration} min
          </span>
        )}
      </div>
      <p className="text-xs">{agendaItem.description}</p>
    </div>
  );
};

export default DetailsAgendaItem;
