import { useRouter } from "next/router";
import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";
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
      className={`w-full z-10 w-full flex items-center bg-white ${
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
