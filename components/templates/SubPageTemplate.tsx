import React from "react";
import { MdOutlineClose, MdKeyboardBackspace } from "react-icons/md";

type Props = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onBack?: () => void;
};

const SubPageTemplate = ({ title, children, onClose, onBack }: Props) => {
  return (
    <div className="w-full h-screen flex flex-col bg-gray-200">
      <div className="flex px-6 py-5 justify-between items-center space-x-3 truncate flex-shrink-0 sticky top-0 w-full bg-gray-200 z-20">
        {onBack && (
          <button
            onClick={onBack}
            className="rounded-full p-1 bg-black hover:bg-black group"
          >
            <MdKeyboardBackspace className="text-white w-6 h-6 group-hover:text-white" />
          </button>
        )}
        <h1 className="font-bold text-xl truncate">{title}</h1>
        <button
          onClick={onClose}
          className="rounded-full p-1 bg-black hover:bg-black group"
        >
          <MdOutlineClose className="text-white w-6 h-6 group-hover:text-white" />
        </button>
      </div>
      <div className="w-full flex flex-col flex-1 bg-gray-200">
        <div className="flex h-full flex-col justify-between px-6 pb-6 overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SubPageTemplate;
