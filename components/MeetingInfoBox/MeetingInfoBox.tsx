import React from "react";
import {
  MdAccessTime,
  MdAssignment,
  MdCalendarToday,
  MdCheck,
  MdInsertChart,
  MdMode,
  MdOutlineChatBubble,
  MdOutlineLocationOn,
  MdPeople,
  MdPlayArrow,
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
  symbol?:
    | "edit"
    | "watch"
    | "agenda"
    | "participants"
    | "feedback"
    | "feedback-results"
    | "check";
  color?: "red" | "green";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

const MeetingInfoBoxButton = ({
  children,
  symbol,
  color,
  disabled,
  className,
  onClick,
}: MeetingInfoBoxButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`rounded-xl px-2.5 py-1 min-w-xs max-w-xl text-mblue-600
      ${!color && "bg-white hover:bg-mblue-200"}
      ${
        color === "green" &&
        "bg-green-300 bg-opacity-80 hover:bg-green-400 hover:bg-opacity-80"
      } 
      ${
        color === "red" &&
        "bg-red-300 bg-opacity-80 hover:bg-red-400 hover:bg-opacity-80"
      }
      ${symbol && "flex items-center justify-center space-x-1"}
      ${className}
      `}
      onClick={onClick}
    >
      {symbol === "check" && <MdCheck className="w-3.5 h-3.5" />}
      {symbol === "edit" && <MdMode className="w-3.5 h-3.5" />}
      {symbol === "watch" && <MdRemoveRedEye className="w-3.5 h-3.5" />}
      {symbol === "agenda" && <MdAssignment className="w-3.5 h-3.5" />}
      {symbol === "participants" && <MdPeople className="w-3.5 h-3.5" />}
      {symbol === "feedback" && <MdOutlineChatBubble className="w-3.5 h-3.5" />}
      {symbol === "feedback-results" && (
        <MdInsertChart className="w-3.5 h-3.5" />
      )}
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
    <span className="flex items-center space-x-1 text-mblue-600">
      {symbol === "date" && (
        <MdCalendarToday className="h-2.5 w-3 text-mblue-600 text-opacity-70" />
      )}
      {symbol === "time" && (
        <MdAccessTime className="h-3 w-3 text-mblue-600 text-opacity-70" />
      )}
      {symbol === "location" && (
        <MdOutlineLocationOn className="h-3 w-3 text-mblue-600 text-opacity-70" />
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
  onStartMeeting?: () => void;
  onViewFeedback?: () => void;
  onGiveFeedback?: () => void;
  showGiveFeedbackButton?: boolean;
};

const MeetingInfoBox = ({
  meeting: initialMeeting,
  userId,
  onEdit,
  onManageAgenda,
  onManageParticipants,
  onViewDetails,
  onViewReport,
  onStartMeeting,
  onViewFeedback,
  onGiveFeedback,
  showGiveFeedbackButton,
}: Props) => {
  // Fix dates
  const meeting = {
    ...initialMeeting,
    startDate: new Date(initialMeeting.startDate),
    endDate: new Date(initialMeeting.endDate),
  };

  const agendaIsAvailable = meeting.agenda && meeting.agenda.length > 0;

  return (
    <div className="relative p-3 bg-mblue-100 rounded-xl">
      {!meeting.completed && (
        <button
          onClick={onStartMeeting}
          className="absolute right-3 top-3 rounded-full h-10 w-10 flex items-center justify-center bg-white hover:bg-mblue-200"
        >
          <MdPlayArrow className="w-7 h-7 text-mblue-600" />
        </button>
      )}
      <p
        className="font-medium truncate text-mblue-600"
        style={{ maxWidth: "80%" }}
      >
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
        {!meeting.completed && meeting.createdBy !== userId && (
          <>
            <MeetingInfoBoxButton
              className="mobile2XL:hidden"
              symbol="watch"
              onClick={onViewDetails}
            >
              Details
            </MeetingInfoBoxButton>

            <MeetingInfoBoxButton
              className="hidden mobile2XL:inline-flex"
              symbol="watch"
              onClick={onViewDetails}
            >
              View Details
            </MeetingInfoBoxButton>
          </>
        )}
        {!meeting.completed && meeting.agenda && (
          <MeetingInfoBoxButton
            symbol="agenda"
            color={agendaIsAvailable ? "green" : "red"}
            onClick={onManageAgenda}
          >
            {formatAgendaText(meeting.agenda)}
          </MeetingInfoBoxButton>
        )}
        {meeting.completed && meeting.createdBy === userId && (
          <MeetingInfoBoxButton
            symbol="feedback-results"
            onClick={onViewFeedback}
          >
            View feedback
          </MeetingInfoBoxButton>
        )}
        {meeting.completed &&
          meeting.createdBy !== userId &&
          showGiveFeedbackButton && (
            <MeetingInfoBoxButton
              color="red"
              symbol="feedback"
              onClick={onGiveFeedback}
            >
              Give feedback
            </MeetingInfoBoxButton>
          )}
        {meeting.completed &&
          meeting.createdBy !== userId &&
          !showGiveFeedbackButton && (
            <MeetingInfoBoxButton
              disabled
              className="bg-mblue-100"
              symbol="check"
              onClick={onGiveFeedback}
            >
              Feedback submitted
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
