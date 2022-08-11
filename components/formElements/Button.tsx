type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "normal" | "highlighted" | "light" | "lightred" | "red";
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
      ${variant === "light" && "bg-mblue-100 hover:bg-mblue-200 text-mblue-600"}
      ${
        variant === "normal" && "bg-mblue-200 hover:bg-mblue-300 text-mblue-600"
      }
      ${
        variant === "highlighted" &&
        "bg-mblue-500 hover:bg-mblue-600 text-white"
      }
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
