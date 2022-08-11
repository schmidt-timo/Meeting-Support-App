import {
  MdAccessTime,
  MdCalendarToday,
  MdOutlineLocationOn,
  MdPeople,
  MdPerson,
  MdQrCode,
} from "react-icons/md";

type DetailsLineProps = {
  symbol?: "date" | "time" | "location" | "author" | "meeting" | "participants";
  children: React.ReactNode;
};

const DetailsLine = ({ symbol, children }: DetailsLineProps) => {
  return (
    <div className="flex items-center space-x-2 text-mblue-500">
      {symbol === "date" && (
        <MdCalendarToday className="w-3.5 text-mblue-500 text-opacity-60 flex-shrink-0" />
      )}
      {symbol === "time" && (
        <MdAccessTime className="w-3.5 text-mblue-500 text-opacity-60 flex-shrink-0" />
      )}
      {symbol === "location" && (
        <MdOutlineLocationOn className="w-3.5 text-mblue-500 text-opacity-60 flex-shrink-0" />
      )}
      {symbol === "author" && (
        <MdPerson className="w-3.5 text-mblue-500 text-opacity-60 flex-shrink-0" />
      )}
      {symbol === "meeting" && (
        <MdQrCode className="w-3.5 text-mblue-500 text-opacity-60 flex-shrink-0" />
      )}
      {symbol === "participants" && (
        <MdPeople className="w-3.5 text-mblue-500 text-opacity-60 flex-shrink-0" />
      )}
      <span className="text-sm">{children}</span>
    </div>
  );
};

export default DetailsLine;
