import { MdCheckCircle, MdError, MdOutlineWarning } from "react-icons/md";

type Props = {
  children: React.ReactNode;
  variant?: "red" | "yellow" | "green";
};

const NotificationLabel = ({ children, variant = "red" }: Props) => {
  return (
    <div
      className={`rounded-xl p-2 flex space-x-2 items-center border 
      ${variant === "red" && "bg-red-200 border-red-300"}
      ${variant === "yellow" && "bg-yellow-200 border-yellow-400"} 
      ${variant === "green" && "bg-green-200 border-green-300"}`}
    >
      {variant === "red" && (
        <MdError className="w-5 h-5 flex-shrink-0 text-red-600" />
      )}
      {variant === "yellow" && (
        <MdOutlineWarning className="w-5 h-5 flex-shrink-0 text-yellow-600" />
      )}

      {variant === "green" && (
        <MdCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
      )}
      <p
        className={`text-xs 
        ${variant === "red" && "text-red-600"}
        ${variant === "yellow" && "text-yellow-600"}
        ${variant === "green" && "text-green-600"}
        `}
      >
        {children}
      </p>
    </div>
  );
};

export default NotificationLabel;
