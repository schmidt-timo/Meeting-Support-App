import React from "react";
import {
  MdCalendarToday,
  MdAccessTime,
  MdOutlineLocationOn,
  MdPlayArrow,
  MdMode,
  MdPeople,
  MdAssignment,
  MdRemoveRedEye,
} from "react-icons/md";
import {
  formatAgendaText,
  formatMeetingDate,
  formatMeetingTime,
  formatParticipantsText,
} from "../../utils/formatting";
import { Meeting } from "../../utils/types";

type MeetingInfoBoxButtonProps = {
  symbol?: "EDIT" | "WATCH" | "AGENDA" | "PARTICIPANTS";
  color?: "RED" | "GREEN";
  className?: string;
  children: React.ReactNode;
};

const MeetingInfoBoxButton = ({
  children,
  symbol,
  color,
  className,
}: MeetingInfoBoxButtonProps) => {
  return (
    <button
      className={`rounded-xl px-2.5 py-1 bg-white hover:bg-gray-300 min-w-xs max-w-xl
      ${color === "GREEN" && "bg-green-300"} 
      ${color === "RED" && "bg-red-300"}
      ${symbol && "flex items-center justify-center space-x-1"}
      ${className}
      `}
    >
      {symbol === "EDIT" && <MdMode className="w-3.5 h-3.5" />}
      {symbol === "WATCH" && <MdRemoveRedEye className="w-3.5 h-3.5" />}
      {symbol === "AGENDA" && <MdAssignment className="w-3.5 h-3.5" />}
      {symbol === "PARTICIPANTS" && <MdPeople className="w-3.5 h-3.5" />}
      <p className="font-medium truncate text-xs">{children}</p>
    </button>
  );
};

type InfoLineProps = {
  symbol: "DATE" | "TIME" | "LOCATION";
  children: React.ReactNode;
};

const InfoLine = ({ symbol, children }: InfoLineProps) => {
  return (
    <span className="flex items-center space-x-1">
      {symbol === "DATE" && (
        <MdCalendarToday className="h-2.5 w-3 text-gray-500" />
      )}
      {symbol === "TIME" && <MdAccessTime className="h-3 w-3 text-gray-500" />}
      {symbol === "LOCATION" && (
        <MdOutlineLocationOn className="h-3 w-3 text-gray-500" />
      )}
      <p className="text-xs">{children}</p>
    </span>
  );
};

type Props = {
  meeting: Meeting;
};

const MeetingInfoBox = ({ meeting }: Props) => {
  const agendaIsAvailable = meeting.agenda && meeting.agenda.length > 1;

  return (
    <div
      className="relative p-3 bg-gray-200 rounded-xl"
      style={{ backgroundColor: "#eee" }}
    >
      <button className="absolute right-3 top-3 bg-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-300">
        <MdPlayArrow className="w-7 h-7" />
      </button>
      <p className="font-medium truncate" style={{ maxWidth: "80%" }}>
        {meeting.name}
      </p>
      <InfoLine symbol="DATE">{formatMeetingDate(meeting.startDate)}</InfoLine>
      <InfoLine symbol="TIME">
        {formatMeetingTime(meeting.startDate, meeting.endDate)}
      </InfoLine>
      {meeting.location ? (
        <InfoLine symbol="LOCATION">{meeting.location}</InfoLine>
      ) : (
        <div className="h-4" />
      )}
      <div className="mt-3 flex justify-start space-x-2">
        {/* // TODO: Replace timoschmidt with current user id */}
        {meeting.createdBy === "timoschmidt" && (
          <MeetingInfoBoxButton symbol="EDIT" className="min-w-xs">
            Edit
          </MeetingInfoBoxButton>
        )}
        {meeting.agenda && meeting.createdBy === "timoschmidt" && (
          <MeetingInfoBoxButton
            symbol="AGENDA"
            color={agendaIsAvailable ? "GREEN" : "RED"}
          >
            {formatAgendaText(meeting.agenda)}
          </MeetingInfoBoxButton>
        )}
        {meeting.createdBy !== "timoschmidt" && (
          <MeetingInfoBoxButton symbol="WATCH">
            Show details
          </MeetingInfoBoxButton>
        )}
        {meeting.participants && (
          <>
            <MeetingInfoBoxButton
              symbol="PARTICIPANTS"
              className="mobileSM:hidden"
            >
              {meeting.participants.length}
            </MeetingInfoBoxButton>
            <MeetingInfoBoxButton
              symbol="PARTICIPANTS"
              className="hidden mobileSM:inline-flex"
            >
              {formatParticipantsText(meeting.participants)}
            </MeetingInfoBoxButton>
          </>
        )}
      </div>
    </div>
  );
};

export default MeetingInfoBox;
