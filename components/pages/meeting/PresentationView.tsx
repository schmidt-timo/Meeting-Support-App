import { useEffect, useRef, useState } from "react";
import { isMobileOnly, isMobileSafari } from "react-device-detect";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {
  MdAdd,
  MdFullscreen,
  MdFullscreenExit,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdNotificationsActive,
  MdRemove,
} from "react-icons/md";
import { Document, Page, pdfjs } from "react-pdf";
import { MeetingAgendaItem, MeetingAgendaStatus } from "../../../utils/types";
import MeetingCounter from "../../meetingElements/MeetingCounter";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type Props = {
  isDesktop?: boolean;
  agendaStatus: MeetingAgendaStatus;
  agendaItem: MeetingAgendaItem;
  meetingTimer: {
    start: Date;
    end: Date;
  };
  onPresentationPageChange: (pageNumber: number) => Promise<void>;
};

const PresentationView = ({
  isDesktop,
  agendaItem,
  agendaStatus,
  meetingTimer,
  onPresentationPageChange,
}: Props) => {
  const fullscreenHandler = useFullScreenHandle();
  const [numPages, setNumPages] = useState<number | null>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [scale, setScale] = useState(1.0);
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
      setWidth(ref.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    const handleResizeWindow = () => {
      if (ref.current) {
        setHeight(ref.current.clientHeight);
        setWidth(ref.current.clientWidth);
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
        className={`w-full h-full border border-mblue-600 overflow-hidden aspect-video relative z-10 desktop:aspect-auto desktop:h-presentationDesktop ${
          agendaItem.fileUrl ? "rounded-t-xl" : "rounded-xl"
        }`}
      >
        <FullScreen
          handle={fullscreenHandler}
          className="w-full h-full bg-mblue-100 flex flex-col items-center justify-center"
        >
          {showPDF ? (
            <>
              <div className="desktop:hidden">
                <Document
                  loading={
                    <p className="text-sm font-medium">PDF is loading ...</p>
                  }
                  file={agendaItem.fileUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page
                    pageNumber={pageNumber}
                    height={height + 2}
                    scale={scale}
                  />
                </Document>
              </div>

              <div className="hidden desktop:block">
                <Document
                  loading={
                    <p className="text-sm font-medium">PDF is loading ...</p>
                  }
                  file={agendaItem.fileUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page
                    pageNumber={pageNumber}
                    width={width + 2}
                    scale={scale}
                  />
                </Document>
              </div>
            </>
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
                className={`whitespace-pre-wrap
                    ${
                      fullscreenHandler.active
                        ? "text-xl pt-10"
                        : "text-sm desktop:max-w-desktopXL"
                    }`}
              >
                {agendaItem.description}
              </p>
            </div>
          )}
          {fullscreenHandler.active && (
            <div className="flex items-center absolute right-2 top-2 justify-center bg-mblue-600 p-1 px-3 rounded-xl space-x-2">
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
              <div className="flex items-center absolute left-2 top-2 justify-center bg-mblue-600 p-1 px-3 rounded-xl space-x-2">
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
            <div className="flex items-center justify-center space-x-2 absolute left-2 bottom-2 flex-shrink-0 bg-mblue-600 rounded-xl px-1">
              <button
                onClick={() => onPresentationPageChange(pageNumber - 1)}
                className="flex items-center justify-center w-7 h-7 text-white flex-shrink-0 disabled:text-transparent"
                disabled={pageNumber <= 1}
              >
                <MdKeyboardArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center justify-center text-sm text-white">{`${pageNumber} / ${numPages}`}</div>
              <button
                disabled={pageNumber >= numPages!}
                onClick={() => onPresentationPageChange(pageNumber + 1)}
                className="flex items-center justify-center w-7 h-7 text-white flex-shrink-0 disabled:text-transparent"
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
            className={`flex items-center justify-center rounded-full bg-mblue-600 text-white flex-shrink-0 absolute bottom-2 right-2 disabled:hidden
            ${!isDesktop && !fullscreenHandler.active && "w-8 h-8"}
            ${isDesktop && fullscreenHandler.active && "w-10 h-10"}
            ${isDesktop && !fullscreenHandler.active && "w-10 h-10"}
            `}
          >
            {!fullscreenHandler.active && isDesktop && (
              <MdFullscreen className="w-7 h-7" />
            )}
            {!fullscreenHandler.active && !isDesktop && (
              <MdFullscreen className="w-5 h-5" />
            )}
            {fullscreenHandler.active && (
              <MdFullscreenExit className="w-7 h-7" />
            )}
          </button>
        </FullScreen>
      </div>
      {agendaItem.fileUrl && (
        <div className="flex py-0.5 w-full bg-mblue-600 rounded-b-xl justify-between">
          <button
            className="text-xs mobileSM:text-sm text-white px-2.5"
            onClick={() => setShowPDF(!showPDF)}
          >
            {showPDF ? "Show description" : "Show presentation"}
          </button>

          <div className="disabled:hidden flex space-x-2">
            <button
              disabled={fullscreenHandler.active}
              className="flex items-center justify-center text-white"
              onClick={() => setScale(scale + 0.1)}
            >
              <MdAdd className="w-5 h-5 flex-shrink-0" />
            </button>

            <button
              disabled={fullscreenHandler.active}
              className="flex items-center justify-center text-white"
              onClick={() => setScale(scale - 0.1)}
            >
              <MdRemove className="w-5 h-5 flex-shrink-0" />
            </button>
          </div>

          <span className="flex mobileSM:space-x-2">
            <button
              onClick={() => onPresentationPageChange(pageNumber - 1)}
              className="flex items-center justify-center w-7 h-7 text-white flex-shrink-0 disabled:text-transparent"
              disabled={pageNumber <= 1}
            >
              <MdKeyboardArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-center text-xs mobileSM:text-sm text-white">{`${pageNumber} / ${numPages}`}</div>
            <button
              disabled={pageNumber >= numPages!}
              onClick={() => onPresentationPageChange(pageNumber + 1)}
              className="flex items-center justify-center w-7 h-7 text-white flex-shrink-0 disabled:text-transparent"
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
