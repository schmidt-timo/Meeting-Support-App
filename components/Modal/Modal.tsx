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
      className={`absolute top-0 w-full h-full p-6 flex items-center justify-center z-50 
      ${variant === "STANDARD" && "bg-black bg-opacity-80"}
      ${variant === "ALARM" && "bg-red-400 bg-opacity-90"}
      `}
    >
      <div className="w-full flex flex-col bg-white p-3 rounded-xl">
        <div className="flex justify-between items-center pb-3 truncate space-x-2">
          <h1 className="font-bold truncate">{title}</h1>
          <button
            onClick={onClose}
            className="rounded-full p-1 bg-gray-300 hover:bg-black group"
          >
            <MdOutlineClose className="text-black w-5 h-5 group-hover:text-white" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
