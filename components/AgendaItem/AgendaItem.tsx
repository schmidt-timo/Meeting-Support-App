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
  onEdit: (editModeActive: boolean) => void;
};

const AgendaItem = ({
  agendaItem,
  onDelete,
  onChange,
  onRemoveFile,
  onEdit,
}: Props) => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [fileIsUploading, setFileIsUploading] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      if (descriptionRef.current.clientHeight > 112) {
        setIsCollapsible(true);
      }
    }
  }, [isInEditMode]);

  return (
    <>
      {isInEditMode ? (
        <AgendaItemInput
          agendaItem={agendaItem}
          onAbort={() => {
            setIsInEditMode(false);
            onEdit(false);
          }}
          onSave={async (item, file) => {
            if (file) {
              setFileIsUploading(true);
            }
            onChange(item, file).then(() => {
              setIsInEditMode(false);
              onEdit(false);
              setFileIsUploading(false);
            });
          }}
          onRemoveFile={onRemoveFile}
          isUploading={fileIsUploading}
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
              className="font-bold truncate-3-lines text-mblue-500"
              style={{ lineHeight: "1.3rem" }}
            >
              {agendaItem.title}
            </h1>
            {agendaItem.duration && (
              <span className="flex flex-shrink-0 items-center justify-center text-xs font-medium text-white bg-mblue-500 rounded-xl h-5 px-2.5">
                {agendaItem.duration} min
              </span>
            )}
          </div>
          {agendaItem.description && (
            <div className="relative">
              <p
                ref={descriptionRef}
                className={`text-xs whitespace-pre-wrap text-mblue-500
              ${isCollapsible && isCollapsed && "max-h-28 overflow-hidden"}
              ${agendaItem.fileUrl && "pb-2"}
              `}
              >
                {agendaItem.description}
              </p>
              {isCollapsible && isCollapsed && (
                <div className="w-full h-32 absolute bg-gradient-to-t from-white bottom-0 right-0 z-20 flex items-end justify-center text-xs font-medium text-mblue-500 cursor-pointer">
                  {isMobile
                    ? "Tap to reveal full description"
                    : "Click to reveal full description"}
                </div>
              )}
            </div>
          )}
          {agendaItem.fileUrl && (
            <div className="w-full flex flex-col flex-shrink-0 text-sm pl-2 pr-3 rounded-xl bg-mblue-100 p-2 space-x-1 space-y-2 truncate">
              <span className="flex space-x-1 items-center px-1">
                <MdInsertDriveFile className="flex-shrink-0 text-mblue-500" />
                <p className="text-sm truncate text-mblue-500">
                  {getFileNameFromUrl(agendaItem.fileUrl)}
                </p>
              </span>
              <div className="flex space-x-2 text-sm font-medium">
                <a href={agendaItem.fileUrl} target="_blank" rel="noreferrer">
                  <button className="px-2.5 py-1 rounded-xl bg-white flex items-center justify-center space-x-1.5 text-mblue-500">
                    <MdRemoveRedEye className="h-4 w-4" />
                    <p className="text-xs">View PDF</p>
                  </button>
                </a>
              </div>
            </div>
          )}
          <div className="space-x-2 flex justify-end pt-2">
            <button
              onClick={() => {
                setIsInEditMode(true);
                onEdit(true);
              }}
              className="bg-mblue-200 rounded-full w-7 h-7 flex justify-center items-center flex-shrink-0 bg-mblue-200 bg-opacity-80 text-mblue-500 hover:mblue-200 hover:bg-opacity-100"
            >
              <MdMode className="text-mblue-500 h-4 w-4" />
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
