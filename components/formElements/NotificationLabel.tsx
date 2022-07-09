import { MdCheckCircle, MdError, MdOutlineWarning } from "react-icons/md";

type Props = {
  children: React.ReactNode;
  variant?: "RED" | "YELLOW" | "GREEN";
};

const NotificationLabel = ({ children, variant = "RED" }: Props) => {
  return (
    <div
      className={`rounded-xl p-1 flex space-x-1 items-center border 
      ${variant === "RED" && "bg-red-200 border-red-300"}
      ${variant === "YELLOW" && "bg-yellow-200 border-yellow-300"} 
      ${variant === "GREEN" && "bg-green-200 border-green-300"}`}
    >
      {variant === "RED" && (
        <MdError className="w-5 h-5 flex-shrink-0 text-red-600" />
      )}
      {variant === "YELLOW" && (
        <MdOutlineWarning className="w-5 h-5 flex-shrink-0 text-yellow-600" />
      )}

      {variant === "GREEN" && (
        <MdCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
      )}
      <p
        className={`text-xs 
        ${variant === "RED" && "text-red-600"}
        ${variant === "YELLOW" && "text-yellow-600"}
        ${variant === "GREEN" && "text-green-600"}
        `}
      >
        {children}
      </p>
    </div>
  );
};

export default NotificationLabel;
