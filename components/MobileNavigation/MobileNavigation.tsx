import { useRouter } from "next/router";
import React from "react";
import {
  MdAccessTime,
  MdAccessTimeFilled,
  MdInsertChartOutlined,
  MdInsertChart,
  MdPersonOutline,
  MdPerson,
} from "react-icons/md";
import { NAVIGATION_IDS } from "../../utils/constants";

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

type Props = {
  activeItemId: string;
  onClick: (id: string) => void;
};

const MobileNavigation = ({ activeItemId, onClick }: Props) => {
  const activeItem = activeItemId;

  return (
    <div className="fixed bottom-0 w-full bg-gray-200 flex justify-between drop-shadow sm:justify-center z-10">
      <NavItem
        active={activeItem === NAVIGATION_IDS.meetings}
        id={NAVIGATION_IDS.meetings}
        onSelect={(id) => onClick(id)}
      >
        {activeItem === NAVIGATION_IDS.meetings ? (
          <MdAccessTimeFilled className="w-5 h-5 text-black" />
        ) : (
          <MdAccessTime className="w-5 h-5 text-gray-500" />
        )}
        <p>Meetings</p>
      </NavItem>
      <NavItem
        active={activeItem === NAVIGATION_IDS.reports}
        id={NAVIGATION_IDS.reports}
        onSelect={(id) => onClick(id)}
      >
        {activeItem === NAVIGATION_IDS.reports ? (
          <MdInsertChart className="w-5 h-5 text-black" />
        ) : (
          <MdInsertChartOutlined className="w-5 h-5 text-gray-500" />
        )}
        <p className="mobileSM:hidden">Reports</p>
        <p className="hidden mobileSM:inline-flex">Meeting Reports</p>
      </NavItem>
      <NavItem
        active={activeItem === NAVIGATION_IDS.profile}
        id={NAVIGATION_IDS.profile}
        onSelect={(id) => onClick(id)}
      >
        {activeItem === NAVIGATION_IDS.profile ? (
          <MdPerson className="w-5 h-5 text-black" />
        ) : (
          <MdPersonOutline className="w-5 h-5 text-gray-500" />
        )}
        <p>Profile</p>
      </NavItem>
    </div>
  );
};

export default MobileNavigation;
