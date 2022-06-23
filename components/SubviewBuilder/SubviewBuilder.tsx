import React from "react";
import { MdOutlineClose, MdKeyboardBackspace } from "react-icons/md";

type Props = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onBack?: () => void;
};

const SubviewBuilder = ({ title, children, onClose, onBack }: Props) => {
  return (
    <div className="w-full h-screen flex flex-col bg-gray-200 px-6">
      <div className="flex py-5 justify-between items-center space-x-3">
        {onBack && (
          <button
            onClick={onBack}
            className="rounded-full p-1 bg-black hover:bg-black group"
          >
            <MdKeyboardBackspace className="text-white w-6 h-6 group-hover:text-white" />
          </button>
        )}
        <h1 className="font-bold text-xl">{title}</h1>
        <button
          onClick={onClose}
          className="rounded-full p-1 bg-black hover:bg-black group"
        >
          <MdOutlineClose className="text-white w-6 h-6 group-hover:text-white" />
        </button>
      </div>
      <div className="w-full flex flex-col flex-1 justify-between pb-6">
        {children}
      </div>
    </div>
  );
};

export default SubviewBuilder;
