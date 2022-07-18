import { useEffect, useRef, useState } from "react";
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
  const [hasScrollBars, setHasScrollBars] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const handleScroll = (event: any) => {
    const el = event.target;

    if (el.scrollHeight - el.scrollTop > el.clientHeight) {
      setHasScrollBars(true);
    } else {
      setHasScrollBars(false);
    }
  };

  useEffect(() => {
    if (descriptionRef.current) {
      const el = descriptionRef.current;
      if (el.scrollHeight - el.scrollTop > el.clientHeight) {
        setHasScrollBars(true);
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
        <div className="bg-white rounded-xl px-3 pb-3 pt-2.5 space-y-1">
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
                id="agendaDescription"
                onScroll={handleScroll}
                className="text-xs pb-2 max-h-28 overflow-y-scroll"
              >
                {agendaItem.description}
              </p>
              {hasScrollBars && (
                <div className="w-full h-14 absolute bg-gradient-to-t from-white bottom-0 right-0 z-20" />
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
                <a href={agendaItem.fileUrl} target="_blank">
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
