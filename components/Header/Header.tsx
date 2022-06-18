import { useRouter } from "next/router";
import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { HeaderButton } from "../../utils/types";

type Props = {
  children: React.ReactNode;
  showBackArrow?: boolean;
  buttons?: HeaderButton[];
};

const Header = ({ children, buttons, showBackArrow: backArrow }: Props) => {
  const router = useRouter();

  return (
    <div
      className={`fixed top-0 w-full z-10 w-full flex items-center z-10 bg-white ${
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
              className="rounded-full w-11 h-11 bg-gray-300 hover:bg-gray-400 flex items-center justify-center"
              key={button.id}
              onClick={() => router.push(button.href)}
            >
              {button.icon}
            </button>
          ))}
        </span>
      </span>
    </div>
  );
};

export default Header;
