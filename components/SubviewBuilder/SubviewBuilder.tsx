import { useRouter } from "next/router";
import React from "react";
import { MdOutlineClose, MdKeyboardBackspace } from "react-icons/md";

type Props = {
  title: string;
  backButtonPath: string;
  children: React.ReactNode;
  variant?: "CLOSE" | "ARROW";
};

const SubviewBuilder = ({
  title,
  children,
  backButtonPath,
  variant = "CLOSE",
}: Props) => {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-200 px-6 pb-6">
      <div
        className={`flex items-center py-5 ${
          variant === "CLOSE" && "p-1 justify-between"
        } ${variant === "ARROW" && "justify-start space-x-3"}`}
      >
        {variant === "ARROW" && (
          <button
            onClick={() => router.push(backButtonPath)}
            className="rounded-full p-1 bg-white hover:bg-black group"
          >
            <MdKeyboardBackspace className="text-black w-6 h-6 group-hover:text-white" />
          </button>
        )}
        <h1 className="font-bold text-2xl">{title}</h1>
        {variant === "CLOSE" && (
          <button
            onClick={() => router.push(backButtonPath)}
            className="rounded-full p-1 bg-white hover:bg-black group"
          >
            <MdOutlineClose className="text-black w-6 h-6 group-hover:text-white" />
          </button>
        )}
      </div>
      <div className="w-full flex flex-col flex-1 justify-between">
        {children}
      </div>
    </div>
  );
};

export default SubviewBuilder;
