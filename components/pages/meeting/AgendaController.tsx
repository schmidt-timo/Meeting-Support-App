import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { formatAgendaItemDuration } from "../../../utils/formatting";
import { MeetingAgendaItem, MeetingAgendaStatus } from "../../../utils/types";
import MeetingCounter from "./MeetingCounter";

type Props = {
  agendaStatus: MeetingAgendaStatus;
  agendaItems: MeetingAgendaItem[];
  setCurrentAgendaItem: (newIndex: number) => void;
  onShowFullAgenda: () => void;
};

const AgendaController = ({
  agendaStatus: status,
  agendaItems,
  setCurrentAgendaItem,
  onShowFullAgenda,
}: Props) => {
  const [remainingItems, setRemainingItems] = useState<MeetingAgendaItem[]>([]);

  useEffect(() => {
    setRemainingItems(
      agendaItems.slice(status.currentItemIndex + 1, agendaItems.length)
    );
  }, [status]);

  return (
    <div className="border border-black rounded-xl">
      <div
        className={`text-white bg-black flex flex-col text-center px-3 pt-2 pb-3 space-y-1 ${
          !!remainingItems.length ? "rounded-t-xl" : "rounded-xl"
        }`}
      >
        {agendaItems[status.currentItemIndex] && (
          <div className="flex justify-between text-sm font-medium">
            <p className="w-full truncate px-1">
              {agendaItems[status.currentItemIndex].title}
            </p>
          </div>
        )}
        {status.startedAt && agendaItems[status.currentItemIndex].duration && (
          <MeetingCounter
            startDate={new Date(status.startedAt)}
            endDate={
              new Date(
                new Date(status.startedAt).getTime() +
                  agendaItems[status.currentItemIndex].duration! * 60 * 1000
              )
            }
            className="justify-center pb-1"
            onReachingEndTime={() => {}}
          />
        )}
        <span className="flex justify-between space-x-2">
          <button
            disabled={!agendaItems[status.currentItemIndex - 1]}
            onClick={() => setCurrentAgendaItem(status.currentItemIndex - 1)}
            className="py-1 px-4 bg-white text-black text-xs rounded-xl disabled:bg-transparent"
          >
            <MdKeyboardArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={onShowFullAgenda}
            className="w-full py-1 px-4 bg-white text-black text-xs rounded-xl"
          >
            Show full agenda
          </button>
          <button
            disabled={!agendaItems[status.currentItemIndex + 1]}
            onClick={() => setCurrentAgendaItem(status.currentItemIndex + 1)}
            className="py-1 px-4 bg-white text-black text-xs rounded-xl disabled:bg-transparent"
          >
            <MdKeyboardArrowRight className="w-5 h-5" />
          </button>
        </span>
      </div>
      {!!remainingItems.length && (
        <div className="p-3 text-gray-500 text-sm">
          {remainingItems.slice(0, 3).map((item) => (
            <span className="flex justify-between" key={item.id}>
              <p className="truncate pr-2">{item.title}</p>
              {item.duration && (
                <p>{formatAgendaItemDuration(item.duration * 60)}</p>
              )}
            </span>
          ))}
          {remainingItems.length > 3 && (
            <span className="flex justify-between">
              <p className="font-medium">...</p>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AgendaController;
