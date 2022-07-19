type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "normal" | "highlighted" | "lightred" | "red";
  className?: string;
  type?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  children,
  variant = "normal",
  className,
  type,
  disabled,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full rounded-xl text-sm font-medium px-3 h-input outline-0 flex-shrink-0
      ${
        variant === "normal" &&
        "bg-gray-300 hover:bg-gray-400 hover:text-white text-black"
      }
      ${variant === "highlighted" && "bg-gray-700 hover:bg-black text-white"}
      ${variant === "lightred" && "bg-red-200 hover:bg-red-300 text-red-500"}
      ${variant === "red" && "bg-red-600 hover:bg-red-700 text-white"}
      ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
