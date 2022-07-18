import {
  MdAccessTime,
  MdCalendarToday,
  MdEmail,
  MdOutlineEast,
  MdPassword,
  MdStickyNote2,
} from "react-icons/md";

type Props = {
  icon?: "arrow" | "email" | "password" | "date" | "time" | "note";
  children: React.ReactNode;
  required?: boolean;
};

const Label = ({ icon = "arrow", children, required }: Props) => {
  return (
    <div
      className={`px-0.5 flex items-center justify-between space-x-1 text-xs text-gray-500 uppercase ${
        required && "h-4"
      }`}
    >
      <span className="flex items-center space-x-1">
        {icon === "arrow" && <MdOutlineEast />}
        {icon === "email" && <MdEmail />}
        {icon === "password" && <MdPassword />}
        {icon === "date" && <MdCalendarToday />}
        {icon === "time" && <MdAccessTime />}
        {icon === "note" && <MdStickyNote2 />}
        <p>{children}</p>
      </span>
      {required && <p className="text-lg pt-1.5 text-gray-500">*</p>}
    </div>
  );
};

export default Label;
