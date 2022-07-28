import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import {
  MdDelete,
  MdInsertDriveFile,
  MdMode,
  MdRemoveRedEye,
} from "react-icons/md";
import { getFileNameFromUrl } from "../../utils/functions";
import { MeetingAgendaItem } from "../../utils/types";
import AgendaItemInput from "./AgendaItemInput";

type Props = {
  agendaItem: MeetingAgendaItem;
  onDelete: (itemId: string) => void;
  onChange: (agendaItem: MeetingAgendaItem, file?: File) => Promise<void>;
  onRemoveFile: (fileUrl: string, itemId: string) => void;
};

const AgendaItem = ({
  agendaItem,
  onDelete,
  onChange,
  onRemoveFile,
}: Props) => {
  const [isInEditMode, setIsInEditMode] = useState<Boolean>(false);
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
      {isInEditMode ? (
        <AgendaItemInput
          agendaItem={agendaItem}
          onAbort={() => setIsInEditMode(false)}
          onSave={async (item, file) => {
            onChange(item, file).then(() => {
              setIsInEditMode(false);
            });
          }}
          onRemoveFile={onRemoveFile}
        />
      ) : (
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
          <div className="space-x-2 flex justify-end pt-2">
            <button
              onClick={() => setIsInEditMode(true)}
              className="bg-blue-200 rounded-full w-7 h-7 flex justify-center items-center flex-shrink-0"
            >
              <MdMode className="text-blue-600 h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(agendaItem.id)}
              className="bg-red-200 rounded-full w-7 h-7 flex justify-center flex-shrink-0 items-center"
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
