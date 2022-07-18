import { useEffect, useState } from "react";
import { formatWithLeadingZeros } from "../../../utils/formatting";
import {
  calculatePassedTime,
  calculateTotalTime,
} from "../../../utils/functions";

type Props = {
  startDate: Date;
  endDate: Date;
  onReachingEndTime: () => void;
  className?: string;
};

const MeetingCounter = ({
  startDate,
  endDate,
  onReachingEndTime,
  className,
}: Props) => {
  const [passedTime, setPassedTime] = useState(calculatePassedTime(startDate));
  const totalTime = calculateTotalTime(startDate, endDate);

  const endTimeReached = passedTime.total >= totalTime.total;
  const startTimeReached = startDate < new Date();

  if (passedTime.total === totalTime.total) {
    onReachingEndTime();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPassedTime(calculatePassedTime(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className={`flex space-x-1 monospace text-sm ${className}`}>
      <div className={endTimeReached ? "text-red-500 font-medium" : ""}>
        {startTimeReached ? (
          <>
            {passedTime.hours > 0 && (
              <>
                <span>{formatWithLeadingZeros(passedTime.hours)}</span>
                <span>:</span>
              </>
            )}
            <span>{formatWithLeadingZeros(passedTime.minutes)}</span>
            <span>:</span>
            <span>{formatWithLeadingZeros(passedTime.seconds)}</span>
          </>
        ) : (
          <span>Not started yet</span>
        )}
      </div>
      <p>/</p>
      <div>
        {totalTime.hours > 0 && (
          <>
            <span>{formatWithLeadingZeros(totalTime.hours)}</span>
            <span>:</span>
          </>
        )}
        <span>{formatWithLeadingZeros(totalTime.minutes)}</span>
        <span>:</span>
        <span>{formatWithLeadingZeros(totalTime.seconds)}</span>
      </div>
    </div>
  );
};

export default MeetingCounter;
