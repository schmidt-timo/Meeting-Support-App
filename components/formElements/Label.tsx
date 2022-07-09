import {
  MdAccessTime,
  MdCalendarToday,
  MdEmail,
  MdOutlineEast,
  MdPassword,
} from "react-icons/md";

type Props = {
  icon?: "ARROW" | "EMAIL" | "PASSWORD" | "DATE" | "TIME";
  children: React.ReactNode;
  required?: boolean;
};

const Label = ({ icon = "ARROW", children, required }: Props) => {
  return (
    <div
      className={`px-0.5 flex items-center justify-between space-x-1 text-xs text-gray-500 uppercase ${
        required && "h-4"
      }`}
    >
      <span className="flex items-center space-x-1">
        {icon === "ARROW" && <MdOutlineEast />}
        {icon === "EMAIL" && <MdEmail />}
        {icon === "PASSWORD" && <MdPassword />}
        {icon === "DATE" && <MdCalendarToday />}
        {icon === "TIME" && <MdAccessTime />}
        <p>{children}</p>
      </span>
      {required && <p className="text-lg pt-1.5 text-gray-500">*</p>}
    </div>
  );
};

export default Label;
