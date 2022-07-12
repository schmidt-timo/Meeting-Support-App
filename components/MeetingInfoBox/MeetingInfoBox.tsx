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
import { isTheSameDay } from "../../utils/functions";
import { Meeting } from "../../utils/types";

type MeetingInfoBoxButtonProps = {
  symbol?: "edit" | "watch" | "agenda" | "participants";
  color?: "red" | "green";
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
      ${color === "green" && "bg-green-300"} 
      ${color === "red" && "bg-red-300"}
      ${symbol && "flex items-center justify-center space-x-1"}
      ${className}
      `}
      onClick={onClick}
    >
      {symbol === "edit" && <MdMode className="w-3.5 h-3.5" />}
      {symbol === "watch" && <MdRemoveRedEye className="w-3.5 h-3.5" />}
      {symbol === "agenda" && <MdAssignment className="w-3.5 h-3.5" />}
      {symbol === "participants" && <MdPeople className="w-3.5 h-3.5" />}
      <p className="font-medium truncate text-xs">{children}</p>
    </button>
  );
};

type InfoLineProps = {
  symbol: "date" | "time" | "location";
  children: React.ReactNode;
};

const InfoLine = ({ symbol, children }: InfoLineProps) => {
  return (
    <span className="flex items-center space-x-1">
      {symbol === "date" && (
        <MdCalendarToday className="h-2.5 w-3 text-gray-500" />
      )}
      {symbol === "time" && <MdAccessTime className="h-3 w-3 text-gray-500" />}
      {symbol === "location" && (
        <MdOutlineLocationOn className="h-3 w-3 text-gray-500" />
      )}
      <p className="text-xs">{children}</p>
    </span>
  );
};

type Props = {
  meeting: Meeting;
  userId: string;
  onEdit?: () => void;
  onManageAgenda?: () => void;
  onManageParticipants?: () => void;
  onViewDetails?: () => void;
  onViewReport?: () => void;
};

const MeetingInfoBox = ({
  meeting: initialMeeting,
  userId,
  onEdit,
  onManageAgenda,
  onManageParticipants,
  onViewDetails,
  onViewReport,
}: Props) => {
  // Fix dates
  const meeting = {
    ...initialMeeting,
    startDate: new Date(initialMeeting.startDate),
    endDate: new Date(initialMeeting.endDate),
  };

  const agendaIsAvailable = meeting.agenda && meeting.agenda.length > 0;

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
      {isTheSameDay(meeting.startDate, meeting.endDate) ? (
        <>
          <InfoLine symbol="date">
            {formatMeetingDate(meeting.startDate)}
          </InfoLine>
          <InfoLine symbol="time">
            {formatMeetingTime(meeting.startDate, meeting.endDate)}
          </InfoLine>
        </>
      ) : (
        <>
          <div className="flex space-x-2">
            <InfoLine symbol="date">
              {`from ${formatMeetingDate(meeting.startDate)}`}
            </InfoLine>
            <InfoLine symbol="time">
              {meeting.startDate.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </InfoLine>
          </div>
          <div className="flex space-x-2">
            <InfoLine symbol="date">
              {`to ${formatMeetingDate(meeting.endDate)}`}
            </InfoLine>
            <InfoLine symbol="time">
              {meeting.endDate.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </InfoLine>
          </div>
        </>
      )}
      {meeting.location ? (
        <InfoLine symbol="location">{meeting.location}</InfoLine>
      ) : (
        <div className="h-4" />
      )}
      <div className="mt-3 flex justify-end space-x-2">
        {!meeting.completed && meeting.createdBy === userId && (
          <MeetingInfoBoxButton
            symbol="edit"
            className="min-w-xs"
            onClick={onEdit}
          >
            Edit
          </MeetingInfoBoxButton>
        )}
        {!meeting.completed && meeting.agenda && meeting.createdBy === userId && (
          <MeetingInfoBoxButton
            symbol="agenda"
            color={agendaIsAvailable ? "green" : "red"}
            onClick={onManageAgenda}
          >
            {formatAgendaText(meeting.agenda)}
          </MeetingInfoBoxButton>
        )}
        {!meeting.completed && meeting.createdBy !== userId && (
          <MeetingInfoBoxButton symbol="watch" onClick={onViewDetails}>
            View details
          </MeetingInfoBoxButton>
        )}
        {meeting.completed && (
          <MeetingInfoBoxButton symbol="watch" onClick={onViewReport}>
            View report
          </MeetingInfoBoxButton>
        )}
        {!meeting.completed && meeting.participants && (
          <>
            <MeetingInfoBoxButton
              symbol="participants"
              className="mobileSM:hidden"
              onClick={onManageParticipants}
            >
              {meeting.participants.length}
            </MeetingInfoBoxButton>
            <MeetingInfoBoxButton
              symbol="participants"
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
