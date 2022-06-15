import React from "react";
import { FaUserAlt } from "react-icons/fa";

type MobileNavItemProps = {
  active?: boolean;
  symbol: "MEETINGS" | "REPORTS" | "PROFILE";
  children: React.ReactNode;
};

const MobileNavItem = ({
  active = false,
  symbol,
  children,
}: MobileNavItemProps) => {
  return (
    <button
      className={`w-full p-3 flex flex-col items-center justify-center space-y-1 max-w-lg ${
        active && "bg-gray-300"
      }`}
    >
      <FaUserAlt className="text-gray-500 w-4 h-4" />
      <p className="text-gray-500 text-xs">{children}</p>
    </button>
  );
};

type Props = {};

const MobileNavigation = ({}: Props) => {
  const [activeItem, setActiveItem] = React.useState<String>("MEETINGS");

  return (
    <div className="absolute bottom-0 w-full bg-gray-200 flex justify-between">
      <MobileNavItem active={true} symbol="MEETINGS">
        Meetings
      </MobileNavItem>
      <MobileNavItem active={false} symbol="REPORTS">
        Meeting Reports
      </MobileNavItem>
      <MobileNavItem active={false} symbol="PROFILE">
        Profil
      </MobileNavItem>
    </div>
  );
};

export default MobileNavigation;
