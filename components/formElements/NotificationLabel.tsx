import { MdError } from "react-icons/md";

type Props = {
  children: React.ReactNode;
  variant?: "red" | "yellow";
};

const NotificationLabel = ({ children, variant = "red" }: Props) => {
  return (
    <div
      className={`rounded-xl p-1 flex space-x-1 items-center border ${
        variant === "yellow"
          ? "bg-yellow-200 border-yellow-300"
          : "bg-red-200 border-red-300"
      }`}
    >
      <MdError
        className={`w-4 h-4 ${
          variant === "yellow" ? "text-yellow-600" : "text-red-600"
        }`}
      />
      <p
        className={`text-extrasmall ${
          variant === "yellow" ? "text-yellow-600" : "text-red-600"
        }`}
      >
        {children}
      </p>
    </div>
  );
};

export default NotificationLabel;
