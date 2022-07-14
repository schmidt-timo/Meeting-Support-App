import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { MeetingAgendaItem } from "../../../utils/types";
import { isMobileOnly, isMobileSafari } from "react-device-detect";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import MeetingCounter from "./MeetingCounter";

type Props = {
  currentAgendaIndex: number;
  agendaItem: MeetingAgendaItem;
  agendaTimerStartDate?: Date;
  meetingTimer: {
    start: Date;
    end: Date;
  };
};

const PresentationView = ({
  agendaItem,
  currentAgendaIndex: index,
  agendaTimerStartDate,
  meetingTimer,
}: Props) => {
  const fullscreenHandler = useFullScreenHandle();

  return (
    <div className="w-full h-full border border-gray-500 rounded-xl overflow-hidden aspect-video relative">
      <FullScreen
        handle={fullscreenHandler}
        className="w-full h-full bg-gray-300 flex flex-col items-center justify-center space-y-3 p-3"
      >
        {fullscreenHandler.active && (
          <MeetingCounter
            startDate={meetingTimer.start}
            endDate={meetingTimer.end}
            onReachingEndTime={() => {
              console.log("REACHED END");
              // TODO: Alarm function
            }}
            className="absolute bottom-3.5 justify-center"
          />
        )}
        <h1 className="font-medium text-xl text-center">
          {`${index + 1}. ${agendaItem.title}`}
        </h1>
        {fullscreenHandler.active &&
          agendaTimerStartDate &&
          agendaItem.duration && (
            <MeetingCounter
              startDate={new Date(agendaTimerStartDate)}
              endDate={
                new Date(
                  new Date(agendaTimerStartDate).getTime() +
                    agendaItem.duration! * 60 * 1000
                )
              }
              className={`justify-center ${
                isMobileOnly ? "text-xs" : "text-base"
              }`}
              onReachingEndTime={() => {}}
            />
          )}
        <p className="text-sm">{agendaItem.description}</p>
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
  );
};

export default PresentationView;
