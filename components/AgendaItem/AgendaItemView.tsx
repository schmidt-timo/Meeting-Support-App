import { useState, useRef, useEffect } from "react";
import { MdInsertDriveFile, MdRemoveRedEye } from "react-icons/md";
import { getFileNameFromUrl } from "../../utils/functions";
import { MeetingAgendaItem } from "../../utils/types";

type Props = {
  agendaItem: MeetingAgendaItem;
};

const AgendaItemView = ({ agendaItem }: Props) => {
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
      </div>
    </>
  );
};

export default AgendaItemView;
