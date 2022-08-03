import { useEffect, useState } from "react";
import { formatWithLeadingZeros } from "../../utils/formatting";
import { calculateRemainingTime } from "../../utils/functions";

type Props = {
  countDownEndDate: Date;
  className?: string;
};

const StartCountdown = ({ countDownEndDate, className }: Props) => {
  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(new Date(), countDownEndDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime(new Date(), countDownEndDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownEndDate]);

  return (
    <div className={`flex space-x-1 monospace text-sm font-bold ${className}`}>
      <div>
        {remainingTime.hours > 0 && (
          <>
            <span>{formatWithLeadingZeros(remainingTime.hours)}</span>
            <span>:</span>
          </>
        )}
        <span>{formatWithLeadingZeros(remainingTime.minutes)}</span>
        <span>:</span>
        <span>{formatWithLeadingZeros(remainingTime.seconds)}</span>
      </div>
    </div>
  );
};

export default StartCountdown;
