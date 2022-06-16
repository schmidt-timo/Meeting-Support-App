import React from "react";
import { MdMeetingRoom, MdListAlt, MdPerson } from "react-icons/md";

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
        active ? "bg-gray-300 text-black" : "text-gray-500"
      }`}
      onClick={() => onSelect(id)}
    >
      {children}
    </button>
  );
};

type Props = {
  activeItemId: string;
  onSelect: (id: string) => void;
};

const MobileNavigation = ({ activeItemId, onSelect }: Props) => {
  const [activeItem, setActiveItem] = React.useState<string>(activeItemId);

  return (
    <div
      className="absolute bottom-0 w-full bg-gray-200 flex justify-between sm:justify-center"
      onClick={() => onSelect(activeItem)}
    >
      <NavItem
        active={activeItem === "nav_meetings"}
        id="nav_meetings"
        onSelect={(id) => setActiveItem(id)}
      >
        <MdMeetingRoom className="text-gray-500 w-5 h-5" />
        <p>Meetings</p>
      </NavItem>
      <NavItem
        active={activeItem === "nav_reports"}
        id="nav_reports"
        onSelect={(id) => setActiveItem(id)}
      >
        <MdListAlt className="text-gray-500 w-5 h-5" /> <p>Meeting Reports</p>
      </NavItem>
      <NavItem
        active={activeItem === "nav_profile"}
        id="nav_profile"
        onSelect={(id) => setActiveItem(id)}
      >
        <MdPerson className="text-gray-500 w-5 h-5" /> <p>Profil</p>
      </NavItem>
    </div>
  );
};

export default MobileNavigation;
