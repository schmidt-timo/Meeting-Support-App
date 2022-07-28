import { useState, useRef, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { MdInsertDriveFile, MdRemoveRedEye } from "react-icons/md";
import { getFileNameFromUrl } from "../../utils/functions";
import { MeetingAgendaItem } from "../../utils/types";

type Props = {
  agendaItem: MeetingAgendaItem;
};

const AgendaItemView = ({ agendaItem }: Props) => {
  const [isCollapsible, setIsCollapsible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      if (descriptionRef.current.clientHeight > 112) {
        setIsCollapsible(true);
      }
    }
  }, []);

  return (
    <>
      <div
        onClick={() => {
          if (isCollapsible) {
            setIsCollapsed(!isCollapsed);
          }
        }}
        className={`bg-white rounded-xl px-3 pb-3 pt-2.5 space-y-1 ${
          isCollapsible && "cursor-pointer"
        }`}
      >
        <div className="flex justify-between space-x-3 pb-1">
          <h1
            className="font-bold truncate-3-lines"
            style={{ lineHeight: "1.3rem" }}
          >
            {agendaItem.title}
          </h1>
          {agendaItem.duration && (
            <span className="flex flex-shrink-0 items-center justify-center text-xs font-medium text-white bg-gray-700 rounded-xl h-5 px-2.5">
              {agendaItem.duration} min
            </span>
          )}
        </div>
        {agendaItem.description && (
          <div className="relative">
            <p
              ref={descriptionRef}
              className={`text-xs whitespace-pre-wrap
              ${isCollapsible && isCollapsed && "max-h-28 overflow-hidden"}
              ${agendaItem.fileUrl && "pb-2"}
              `}
            >
              {agendaItem.description}
            </p>
            {isCollapsible && isCollapsed && (
              <div className="w-full h-32 absolute bg-gradient-to-t from-white bottom-0 right-0 z-20 flex items-end justify-center text-xs font-medium text-gray-800 cursor-pointer">
                {isMobile
                  ? "Tap to reveal full description"
                  : "Click to reveal full description"}
              </div>
            )}
          </div>
        )}
        {agendaItem.fileUrl && (
          <div className="w-full flex flex-col flex-shrink-0 text-sm pl-2 pr-3 rounded-xl bg-gray-200 p-2 space-x-1 space-y-2 truncate">
            <span className="flex space-x-1 items-center px-1">
              <MdInsertDriveFile className="flex-shrink-0 text-gray-900" />
              <p className="text-sm truncate">
                {getFileNameFromUrl(agendaItem.fileUrl)}
              </p>
            </span>
            <div className="flex space-x-2 text-black text-sm font-medium">
              <a href={agendaItem.fileUrl} target="_blank" rel="noreferrer">
                <button className="px-2.5 py-0.5 rounded-xl bg-white flex items-center justify-center space-x-1.5">
                  <MdRemoveRedEye className="h-4 w-4" />
                  <p>View PDF</p>
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AgendaItemView;
