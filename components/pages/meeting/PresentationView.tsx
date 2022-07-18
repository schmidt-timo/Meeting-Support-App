import { useEffect, useRef, useState } from "react";
import { isMobileOnly, isMobileSafari } from "react-device-detect";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {
  MdFullscreen,
  MdFullscreenExit,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdNotificationsActive,
} from "react-icons/md";
import { Document, Page, pdfjs } from "react-pdf";
import { MeetingAgendaItem, MeetingAgendaStatus } from "../../../utils/types";
import MeetingCounter from "./MeetingCounter";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type Props = {
  agendaStatus: MeetingAgendaStatus;
  agendaItem: MeetingAgendaItem;
  meetingTimer: {
    start: Date;
    end: Date;
  };
  onPresentationPageChange: (pageNumber: number) => Promise<void>;
};

const PresentationView = ({
  agendaItem,
  agendaStatus,
  meetingTimer,
  onPresentationPageChange,
}: Props) => {
  const fullscreenHandler = useFullScreenHandle();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [height, setHeight] = useState(0);
  const [showPDF, setShowPDF] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number | null }) {
    setNumPages(numPages);
  }

  const ref = useRef<HTMLDivElement>(null);
  const pageNumber = agendaStatus.currentPresentationPage ?? 1;

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    const handleResizeWindow = () => {
      if (ref.current) {
        setHeight(ref.current.clientHeight);
      }
    };

    window.addEventListener("resize", handleResizeWindow);

    return () => window.removeEventListener("resize", handleResizeWindow);
  });

  useEffect(() => {
    if (agendaItem.fileUrl) {
      setShowPDF(true);
    } else {
      setShowPDF(false);
    }
  }, [agendaItem]);

  return (
    <div>
      <div
        ref={ref}
        className={`w-full h-full border border-gray-500 overflow-hidden aspect-video relative z-10 ${
          agendaItem.fileUrl ? "rounded-t-xl" : "rounded-xl"
        }`}
      >
        <FullScreen
          handle={fullscreenHandler}
          className="w-full h-full bg-gray-300 flex flex-col items-center justify-center"
        >
          {showPDF ? (
            <Document
              loading={
                <p className="text-sm font-medium">PDF is loading ...</p>
              }
              file={agendaItem.fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} height={height + 2} />
            </Document>
          ) : (
            <div
              className={`overflow-y-scroll p-5 space-y-3 ${
                fullscreenHandler.active && "max-w-80"
              }`}
            >
              <h1
                className={`text-center ${
                  fullscreenHandler.active
                    ? "font-bold text-3xl"
                    : "font-medium text-lg"
                }`}
              >
                {`${agendaStatus.currentItemIndex + 1}. ${agendaItem.title}`}
              </h1>
              <p
                className={
                  fullscreenHandler.active ? "text-xl pt-10" : "text-sm"
                }
              >
                {agendaItem.description}
              </p>
            </div>
          )}
          {fullscreenHandler.active && (
            <div className="flex items-center absolute right-2 top-2 justify-center bg-black p-1 px-3 rounded-xl space-x-2">
              {showAlarm && (
                <span className="flex space-x-2 items-center">
                  <MdNotificationsActive className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <h1 className="font-medium text-sm text-white truncate text-red-500">
                    Alarm: Meeting End
                  </h1>
                </span>
              )}
              <MeetingCounter
                startDate={meetingTimer.start}
                endDate={meetingTimer.end}
                onReachingEndTime={() => setShowAlarm(true)}
                className="text-white"
              />
            </div>
          )}
          {fullscreenHandler.active &&
            agendaStatus.startedAt &&
            agendaItem.duration && (
              <div className="flex items-center absolute left-2 top-2 justify-center bg-black p-1 px-3 rounded-xl space-x-2">
                <span className="truncate max-w-xl">
                  <h1 className="font-medium text-sm text-white truncate">
                    {`${agendaStatus.currentItemIndex + 1}. ${
                      agendaItem.title
                    }:`}
                  </h1>
                </span>
                <MeetingCounter
                  startDate={new Date(agendaStatus.startedAt)}
                  endDate={
                    new Date(
                      new Date(agendaStatus.startedAt).getTime() +
                        agendaItem.duration! * 60 * 1000
                    )
                  }
                  className="text-white"
                  onReachingEndTime={() => {}}
                />
              </div>
            )}
          {fullscreenHandler.active && agendaItem.fileUrl && (
            <div className="flex items-center justify-center space-x-2 absolute left-2 bottom-2 flex-shrink-0 bg-black rounded-xl px-1">
              <button
                onClick={() => onPresentationPageChange(pageNumber - 1)}
                className="flex items-center justify-center w-7 h-7 text-white flex-shrink-0 disabled:text-black"
                disabled={pageNumber <= 1}
              >
                <MdKeyboardArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center justify-center text-sm text-white">{`${pageNumber} / ${numPages}`}</div>
              <button
                disabled={pageNumber >= numPages!}
                onClick={() => onPresentationPageChange(pageNumber + 1)}
                className="flex items-center justify-center w-7 h-7 text-white flex-shrink-0 disabled:text-black"
              >
                <MdKeyboardArrowRight className="w-6 h-6" />
              </button>
              <button
                onClick={() => setShowPDF(!showPDF)}
                className="flex items-center justify-center text-sm flex-shrink-0 text-white px-2"
              >
                {showPDF ? "Show description" : "Show presentation"}
              </button>
            </div>
          )}
          <button
            disabled={isMobileOnly && isMobileSafari} // Safari on iPhone does not support fullscreen api
            onClick={
              !fullscreenHandler.active
                ? fullscreenHandler.enter
                : fullscreenHandler.exit
            }
            className="flex items-center justify-center rounded-full w-8 h-8 bg-black text-white flex-shrink-0 absolute bottom-2 right-2 disabled:hidden"
          >
            {!fullscreenHandler.active ? (
              <MdFullscreen className="w-5 h-5" />
            ) : (
              <MdFullscreenExit className="w-5 h-5" />
            )}
          </button>
        </FullScreen>
      </div>
      {agendaItem.fileUrl && (
        <div className="flex py-0.5 px-2 w-full bg-black rounded-b-xl justify-between">
          <button
            className="text-sm text-white px-2.5"
            onClick={() => setShowPDF(!showPDF)}
          >
            {showPDF ? "Show description" : "Show presentation"}
          </button>

          <span className="flex space-x-2">
            <button
              onClick={() => onPresentationPageChange(pageNumber - 1)}
              className="flex items-center justify-center w-7 h-7 text-white flex-shrink-0 disabled:text-black"
              disabled={pageNumber <= 1}
            >
              <MdKeyboardArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-center text-sm text-white">{`${pageNumber} / ${numPages}`}</div>
            <button
              disabled={pageNumber >= numPages!}
              onClick={() => onPresentationPageChange(pageNumber + 1)}
              className="flex items-center justify-center w-7 h-7 text-white flex-shrink-0 disabled:text-black"
            >
              <MdKeyboardArrowRight className="w-6 h-6" />
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default PresentationView;
