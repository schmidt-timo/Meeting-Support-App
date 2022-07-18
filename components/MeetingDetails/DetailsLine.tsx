import {
  MdCalendarToday,
  MdAccessTime,
  MdOutlineLocationOn,
  MdPerson,
} from "react-icons/md";

type DetailsLineProps = {
  symbol?: "date" | "time" | "location" | "author";
  children: React.ReactNode;
};

const DetailsLine = ({ symbol, children }: DetailsLineProps) => {
  return (
    <div className="flex items-center space-x-2 w-full">
      {symbol === "date" && (
        <MdCalendarToday className="w-3.5 text-gray-500 flex-shrink-0" />
      )}
      {symbol === "time" && (
        <MdAccessTime className="w-3.5 text-gray-500 flex-shrink-0" />
      )}
      {symbol === "location" && (
        <MdOutlineLocationOn className="w-3.5 text-gray-500 flex-shrink-0" />
      )}
      {symbol === "author" && (
        <MdPerson className="w-3.5 text-gray-500 flex-shrink-0" />
      )}
      <span className="text-sm">{children}</span>
    </div>
  );
};

export default DetailsLine;
