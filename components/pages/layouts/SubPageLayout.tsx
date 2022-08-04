import React from "react";
import { MdOutlineClose, MdKeyboardBackspace } from "react-icons/md";

type Props = {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  onBack?: () => void;
};

const SubPageLayout = ({ title, children, onClose, onBack }: Props) => {
  return (
    <div className="w-full fixed h-screen flex flex-col bg-gray-200 items-center">
      <div className="flex px-6 py-5 justify-between items-center space-x-3 truncate flex-shrink-0 w-full bg-gray-200 max-w-desktop">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-full p-1 bg-black hover:bg-black group"
          >
            <MdKeyboardBackspace className="text-white w-6 h-6 group-hover:text-white" />
          </button>
        )}
        <h1 className="font-bold text-xl truncate">{title}</h1>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 bg-black hover:bg-black group"
          >
            <MdOutlineClose className="text-white w-6 h-6 group-hover:text-white" />
          </button>
        )}
      </div>
      <div className="w-full h-subpage flex flex-col flex-1 bg-gray-200 justify-between desktop:justify-start px-6 pb-6 overflow-y-scroll max-w-desktop">
        {children}
      </div>
    </div>
  );
};

export default SubPageLayout;
