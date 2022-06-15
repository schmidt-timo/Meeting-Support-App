import React from "react";
import {
  FaCalendar,
  FaClock,
  FaUserAlt,
  FaLocationArrow,
  FaPlay,
  FaUserFriends,
  FaPen,
  FaRegListAlt,
} from "react-icons/fa";
import {
  formatAgendaText,
  formatMeetingDate,
  formatMeetingTime,
  formatNumberOfParticipants,
} from "../../utils/formatting";
import { Meeting } from "../../utils/types";

type MeetingInfoBoxButtonProps = {
  symbol?: "EDIT" | "AGENDA" | "PARTICIPANTS";
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
      {symbol === "EDIT" && <FaPen className="h-3 w-3" />}
      {symbol === "AGENDA" && <FaRegListAlt className="h-3 w-3" />}
      {symbol === "PARTICIPANTS" && <FaUserFriends className="h-3 w-3" />}
      <p className="font-medium truncate" style={{ fontSize: "0.7em" }}>
        {children}
      </p>
    </button>
  );
};

type InfoLineProps = {
  symbol: "DATE" | "TIME" | "SOURCE" | "LOCATION";
  children: React.ReactNode;
};

const InfoLine = ({ symbol, children }: InfoLineProps) => {
  return (
    <span className="flex items-center space-x-1">
      {symbol === "DATE" && (
        <FaCalendar className="h-2.5 w-2.5 text-gray-500" />
      )}
      {symbol === "TIME" && <FaClock className="h-2.5 w-2.5 text-gray-500" />}
      {symbol === "SOURCE" && (
        <FaUserAlt className="h-2.5 w-2.5 text-gray-500" />
      )}
      {symbol === "LOCATION" && (
        <FaLocationArrow className="h-2.5 w-2.5 text-gray-500" />
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
      <button className="absolute right-3 top-3 bg-white ml-0.5 p-2 pl-3 rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-300">
        <FaPlay className="h-5 w-5" />
      </button>
      <p className="font-medium truncate" style={{ maxWidth: "80%" }}>
        {meeting.name}
      </p>
      <InfoLine symbol="DATE">{formatMeetingDate(meeting.startDate)}</InfoLine>
      <InfoLine symbol="TIME">
        {formatMeetingTime(meeting.startDate, meeting.endDate)}
      </InfoLine>
      {meeting.location ? (
        <InfoLine symbol="LOCATION">Besprechungszimmer A</InfoLine>
      ) : (
        <div className="h-4" />
      )}
      <div className="mt-3 flex justify-between space-x-2">
        <MeetingInfoBoxButton symbol="EDIT" className="min-w-sm">
          bearbeiten
        </MeetingInfoBoxButton>
        {meeting.agenda && (
          <MeetingInfoBoxButton
            symbol="AGENDA"
            color={agendaIsAvailable ? "GREEN" : "RED"}
            className="w-full"
          >
            {formatAgendaText(meeting.agenda)}
          </MeetingInfoBoxButton>
        )}
        {meeting.participants && (
          <MeetingInfoBoxButton symbol="PARTICIPANTS">
            {meeting.participants.length}
          </MeetingInfoBoxButton>
        )}
      </div>
    </div>
  );
};

export default MeetingInfoBox;
