import React from "react";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

type Props = {
  title: string;
  children: React.ReactNode;
};

const Accordion = ({ title, children }: Props) => {
  const [collapsed, setCollapsed] = React.useState<Boolean>(false);

  return (
    <div>
      <div
        className="accordion flex items-center justify-between mx-2 h-10 cursor-pointer transition duration-150 ease-in-out truncate"
        onClick={() => setCollapsed(!collapsed)}
        role="button"
      >
        <p className="text-gray-400 uppercase text-sm truncate">{title}</p>
        {collapsed ? (
          <MdOutlineExpandMore className="text-gray-400 w-6 h-6" />
        ) : (
          <MdOutlineExpandLess className="text-gray-400 w-6 h-6" />
        )}
      </div>
      <div className={`space-y-3 ${collapsed && "hidden"}`}>{children}</div>
    </div>
  );
};

export default Accordion;
