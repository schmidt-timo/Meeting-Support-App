import React from "react";
import {
  MdOutlineMeetingRoom,
  MdMeetingRoom,
  MdInsertChartOutlined,
  MdInsertChart,
  MdPersonOutline,
  MdPerson,
} from "react-icons/md";

type NavItemProps = {
  id: string;
  active: boolean;
  children: React.ReactNode;
  onSelect: (itemId: string) => void;
};

const NavItem = ({ id, active, children, onSelect }: NavItemProps) => {
  return (
    <button
      className={`w-full p-3 flex flex-col items-center justify-center space-y-1 max-w-lg text-xs ${
        active ? "font-medium text-black" : "text-gray-500"
      }`}
      onClick={() => onSelect(id)}
    >
      {children}
    </button>
  );
};

const navIds = ["NAV_MEETINGS", "NAV_REPORTS", "NAV_PROFILE"];

type Props = {
  activeItemId: string;
  onSelect: (id: string) => void;
};

const MobileNavigation = ({ activeItemId, onSelect }: Props) => {
  const [activeItem, setActiveItem] = React.useState<string>(activeItemId);

  return (
    <div
      className="w-full bg-gray-200 flex justify-between drop-shadow sm:justify-center z-10"
      onClick={() => onSelect(activeItem)}
    >
      <NavItem
        active={activeItem === navIds[0]}
        id={navIds[0]}
        onSelect={(id) => setActiveItem(id)}
      >
        {activeItem === navIds[0] ? (
          <MdMeetingRoom className="w-5 h-5 text-black" />
        ) : (
          <MdOutlineMeetingRoom className="w-5 h-5 text-gray-500" />
        )}
        <p>Meetings</p>
      </NavItem>
      <NavItem
        active={activeItem === navIds[1]}
        id={navIds[1]}
        onSelect={(id) => setActiveItem(id)}
      >
        {activeItem === navIds[1] ? (
          <MdInsertChart className="w-5 h-5 text-black" />
        ) : (
          <MdInsertChartOutlined className="w-5 h-5 text-gray-500" />
        )}
        <p>Meeting Reports</p>
      </NavItem>
      <NavItem
        active={activeItem === navIds[2]}
        id={navIds[2]}
        onSelect={(id) => setActiveItem(id)}
      >
        {activeItem === navIds[2] ? (
          <MdPerson className="w-5 h-5 text-black" />
        ) : (
          <MdPersonOutline className="w-5 h-5 text-gray-500" />
        )}
        <p>Profil</p>
      </NavItem>
    </div>
  );
};

export default MobileNavigation;
