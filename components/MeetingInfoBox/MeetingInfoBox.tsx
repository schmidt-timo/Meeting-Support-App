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
  onClick?: () => void;
};

const MeetingInfoBoxButton = ({
  children,
  symbol,
  color,
  className,
  onClick,
}: MeetingInfoBoxButtonProps) => {
  return (
    <button
      className={`rounded-xl px-2.5 py-1 bg-white hover:bg-gray-300 min-w-xs max-w-xl
      ${color === "GREEN" && "bg-green-300"} 
      ${color === "RED" && "bg-red-300"}
      ${symbol && "flex items-center justify-center space-x-1"}
      ${className}
      `}
      onClick={onClick}
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
  onEdit?: () => void;
  onManageAgenda?: () => void;
  onManageParticipants?: () => void;
  onViewDetails?: () => void;
  onViewReport?: () => void;
};

const MeetingInfoBox = ({
  meeting: initialMeeting,
  onEdit,
  onManageAgenda,
  onManageParticipants,
  onViewDetails,
  onViewReport,
}: Props) => {
  // Dates fix
  const meeting = {
    ...initialMeeting,
    startDate: new Date(initialMeeting.startDate),
    endDate: new Date(initialMeeting.endDate),
  };

  const agendaIsAvailable = meeting.agenda && meeting.agenda.length > 1;
  const isTheSameDay =
    meeting.startDate.toLocaleDateString("de-DE") ===
    meeting.endDate.toLocaleDateString("de-DE");

  return (
    <div className="relative p-3 bg-gray-200 rounded-xl">
      {!meeting.completed && (
        <button className="absolute right-3 top-3 bg-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-300">
          <MdPlayArrow className="w-7 h-7" />
        </button>
      )}
      <p className="font-medium truncate" style={{ maxWidth: "80%" }}>
        {meeting.title}
      </p>
      {isTheSameDay ? (
        <>
          <InfoLine symbol="DATE">
            {formatMeetingDate(meeting.startDate)}
          </InfoLine>
          <InfoLine symbol="TIME">
            {formatMeetingTime(meeting.startDate, meeting.endDate)}
          </InfoLine>
        </>
      ) : (
        <>
          <div className="flex space-x-2">
            <InfoLine symbol="DATE">
              {`from ${formatMeetingDate(meeting.startDate)}`}
            </InfoLine>
            <InfoLine symbol="TIME">
              {meeting.startDate.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </InfoLine>
          </div>
          <div className="flex space-x-2">
            <InfoLine symbol="DATE">
              {`to ${formatMeetingDate(meeting.endDate)}`}
            </InfoLine>
            <InfoLine symbol="TIME">
              {meeting.endDate.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </InfoLine>
          </div>
        </>
      )}
      {meeting.location ? (
        <InfoLine symbol="LOCATION">{meeting.location}</InfoLine>
      ) : (
        <div className="h-4" />
      )}
      <div className="mt-3 flex justify-end space-x-2">
        {/* // TODO: Replace timoschmidt with current user id */}
        {!meeting.completed && meeting.createdBy === "timoschmidt" && (
          <MeetingInfoBoxButton
            symbol="EDIT"
            className="min-w-xs"
            onClick={onEdit}
          >
            Edit
          </MeetingInfoBoxButton>
        )}
        {!meeting.completed &&
          meeting.agenda &&
          meeting.createdBy === "timoschmidt" && (
            <MeetingInfoBoxButton
              symbol="AGENDA"
              color={agendaIsAvailable ? "GREEN" : "RED"}
              onClick={onManageAgenda}
            >
              {formatAgendaText(meeting.agenda)}
            </MeetingInfoBoxButton>
          )}
        {/* // TODO: Replace timoschmidt with current user id */}
        {!meeting.completed && meeting.createdBy !== "timoschmidt" && (
          <MeetingInfoBoxButton symbol="WATCH" onClick={onViewDetails}>
            View details
          </MeetingInfoBoxButton>
        )}
        {meeting.completed && (
          <MeetingInfoBoxButton symbol="WATCH" onClick={onViewReport}>
            View report
          </MeetingInfoBoxButton>
        )}
        {!meeting.completed && meeting.participants && (
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
              onClick={onManageParticipants}
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
