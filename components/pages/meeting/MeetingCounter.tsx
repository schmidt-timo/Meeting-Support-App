import { useState, useEffect } from "react";
import { MdNotifications, MdNotificationsActive } from "react-icons/md";
import {
  calculatePassedTime,
  calculateTotalTime,
} from "../../../utils/functions";
import { Meeting } from "../../../utils/types";

type Props = {
  meeting: Meeting;
  onReachingEndTime: () => void;
};

const MeetingCounter = ({ meeting, onReachingEndTime }: Props) => {
  const [passedTime, setPassedTime] = useState(
    calculatePassedTime(meeting.startDate)
  );
  const totalTime = calculateTotalTime(meeting.startDate, meeting.endDate);

  const endTimeReached = passedTime.total >= totalTime.total;

  if (passedTime.total === totalTime.total) {
    onReachingEndTime();
  }

  useEffect(() => {
    setInterval(() => {
      setPassedTime(calculatePassedTime(meeting.startDate));
    }, 1000);
  });

  function formatWithLeadingZeros(value: number) {
    return value < 10 ? `0${value}` : value;
  }

  return (
    <div className="flex space-x-1 monospace text-sm">
      <div
        className={
          endTimeReached ? "text-red-500 font-bold rounded-xl text-white" : ""
        }
      >
        <span>{formatWithLeadingZeros(passedTime.hours)}</span>
        <span>:</span>
        <span>{formatWithLeadingZeros(passedTime.minutes)}</span>
        <span>:</span>
        <span>{formatWithLeadingZeros(passedTime.seconds)}</span>
      </div>
      <p>/</p>
      <div>
        <span>{formatWithLeadingZeros(totalTime.hours)}</span>
        <span>:</span>
        <span>{formatWithLeadingZeros(totalTime.minutes)}</span>
        <span>:</span>
        <span>{formatWithLeadingZeros(totalTime.seconds)}</span>
      </div>
    </div>
  );
};

export default MeetingCounter;
