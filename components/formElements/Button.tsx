type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "normal" | "highlighted" | "red";
  className?: string;
  onClick?: () => void;
};

const Button = ({
  children,
  variant = "normal",
  className,
  onClick,
}: Props) => {
  return (
    <button
      className={`w-full rounded-xl text-sm px-3 h-input outline-0 flex-shrink-0
      ${
        variant === "normal" &&
        "bg-gray-300 hover:bg-gray-400 hover:text-white text-black"
      }
      ${variant === "highlighted" && "bg-gray-700 hover:bg-black text-white"}
      ${
        variant === "red" &&
        "bg-red-200 hover:bg-red-300 text-red-500 font-medium"
      }
      ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
