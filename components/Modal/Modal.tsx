import { MdOutlineClose } from "react-icons/md";

type Props = {
  title: string | React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  variant?: "STANDARD" | "ALARM";
};

const Modal = ({ title, children, onClose, variant = "STANDARD" }: Props) => {
  return (
    <div
      className={`w-full h-screen flex items-center justify-center z-50 absolute
      ${variant === "STANDARD" && "bg-black bg-opacity-80"}
      ${variant === "ALARM" && "bg-red-700 bg-opacity-95"}
      `}
    >
      <div className="p-10">
        <div className="w-full flex flex-col bg-white p-3 rounded-xl desktop:max-w-desktop">
          <div
            className={`flex justify-between pb-3 space-x-2 text-mblue-500 
            ${typeof title !== "string" ? "items-start" : "items-center"}`}
          >
            <h1 className="font-bold w-full text-sm mobileSM:text-base">
              {title}
            </h1>
            <button
              onClick={onClose}
              className="rounded-full p-1 bg-mblue-500 hover:bg-mblue-600 group"
            >
              <MdOutlineClose className="text-white w-5 h-5 group-hover:text-white" />
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
