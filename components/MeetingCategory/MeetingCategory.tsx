import React from "react";
import { FaChevronDown } from "react-icons/fa";

type Props = {
  title: string;
  children: React.ReactNode;
};

const MeetingCategory = ({ title, children }: Props) => {
  const [collapsed, setCollapsed] = React.useState<Boolean>(false);

  return (
    <div>
      <div
        className="accordion flex items-center justify-between mx-2 h-10 cursor-pointer transition duration-150 ease-in-out"
        onClick={() => setCollapsed(!collapsed)}
        role="button"
      >
        <p className="text-gray-400 uppercase text-sm">{title}</p>
        <FaChevronDown className="text-gray-400" />
      </div>
      <div className={`space-y-3 ${collapsed && "hidden"}`}>{children}</div>
    </div>
  );
};

export default MeetingCategory;
