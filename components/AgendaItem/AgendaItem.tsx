import { useState } from "react";
import { MdDelete, MdMode } from "react-icons/md";
import { MeetingAgendaItem } from "../../utils/types";
import AgendaItemInput from "./AgendaItemInput";

type Props = {
  agendaItem: MeetingAgendaItem;
  onDelete: (itemId: string) => void;
  onChange: (agendaItem: MeetingAgendaItem) => void;
};

const AgendaItem = ({ agendaItem: initialItem, onDelete, onChange }: Props) => {
  const [agendaItem, setAgendaItem] = useState<MeetingAgendaItem>(initialItem);
  const [isInEditMode, setIsInEditMode] = useState<Boolean>(false);

  return (
    <>
      {isInEditMode ? (
        <AgendaItemInput
          agendaItem={agendaItem}
          onAbort={() => setIsInEditMode(false)}
          onSave={(item) => {
            onChange(item);
            setAgendaItem(item);
            setIsInEditMode(false);
          }}
        />
      ) : (
        <div className="bg-white rounded-xl px-3 pb-3 pt-2.5 space-y-1">
          <div className="flex justify-between space-x-3">
            <h1 className="font-bold truncate">{agendaItem.title}</h1>
            {agendaItem.duration && (
              <span className="flex flex-shrink-0 items-center justify-center text-xs font-medium text-white bg-gray-700 rounded-xl h-5 px-2">
                {agendaItem.duration} min
              </span>
            )}
          </div>
          <p className="text-xs">{agendaItem.description}</p>
          <div className="space-x-2 flex justify-end pt-2">
            <button
              onClick={() => setIsInEditMode(true)}
              className="bg-blue-200 rounded-full w-7 h-7 flex justify-center items-center"
            >
              <MdMode className="text-blue-600 h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(agendaItem.id)}
              className="bg-red-200 rounded-full w-7 h-7 flex justify-center items-center"
            >
              <MdDelete className="text-red-600 h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AgendaItem;
