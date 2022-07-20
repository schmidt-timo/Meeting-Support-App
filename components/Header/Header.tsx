import { useRouter } from "next/router";
import React from "react";
import {
  MdAddCircle,
  MdKeyboardBackspace,
  MdQrCodeScanner,
} from "react-icons/md";
import { HeaderButton } from "../../utils/types";

type HeaderButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const HeaderButton = ({ children, onClick }: HeaderButtonProps) => {
  return (
    <button
      className="rounded-full w-11 h-11 bg-gray-300 hover:bg-gray-400 flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

type Props = {
  children: React.ReactNode;
  showBackArrow?: boolean;
  buttons?: HeaderButton[];
};

const Header = ({ children, buttons, showBackArrow: backArrow }: Props) => {
  const router = useRouter();

  return (
    <div
      className={`w-full z-10 w-full flex items-center bg-white max-w-desktop desktop:hidden ${
        backArrow ? "px-3" : "pl-1 pr-3"
      }`}
    >
      {backArrow && (
        <button onClick={() => router.back()}>
          <MdKeyboardBackspace className="w-8 h-8" />
        </button>
      )}
      <span className="w-full flex justify-between items-center py-1">
        <h1 className="p-3 font-bold text-2xl">{children}</h1>
        <span className="flex space-x-2">
          {buttons?.map((button) => (
            <HeaderButton key={button.id} onClick={() => button.onClick()}>
              {button.icon}
            </HeaderButton>
          ))}
        </span>
      </span>
    </div>
  );
};

export default Header;

type DesktopHeaderProps = {
  children: React.ReactNode;
  showBackArrow?: boolean;
  buttons?: HeaderButton[];
};

export const DesktopHeader = ({
  children,
  buttons,
  showBackArrow: backArrow,
}: DesktopHeaderProps) => {
  const router = useRouter();

  const formatButtonText = (buttonId: string) => {
    if (buttonId === "HEADER_BTN_NEWMEETING") {
      return "Create Meeting";
    }

    if (buttonId === "HEADER_BTN_QR") {
      return "Add Meeting";
    }
  };

  return (
    <div
      className={`w-full z-10 w-full flex items-center bg-white max-w-desktop hidden desktop:block ${
        backArrow ? "px-3" : "pl-1 pr-3"
      }`}
    >
      {backArrow && (
        <button onClick={() => router.back()}>
          <MdKeyboardBackspace className="w-8 h-8" />
        </button>
      )}
      <span className="w-full flex justify-between items-center py-1">
        <h1 className="p-3 font-bold text-2xl">{children}</h1>
        <span className="flex space-x-2">
          {buttons?.map((button) => (
            <button
              className="bg-gray-300 hover:bg-gray-600 hover:text-white rounded-xl flex items-center space-x-1.5 text-xs px-3 py-1 font-medium"
              key={button.id}
              onClick={() => button.onClick()}
            >
              {button.id === "HEADER_BTN_NEWMEETING" && (
                <MdAddCircle className="w-5 h-5" />
              )}
              {button.id === "HEADER_BTN_QR" && (
                <MdQrCodeScanner className="w-4 h-4" />
              )}
              <p>{formatButtonText(button.id)}</p>
            </button>
          ))}
        </span>
      </span>
    </div>
  );
};
