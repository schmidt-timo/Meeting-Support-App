type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  highlighted?: boolean;
  className?: string;
  onClick?: () => void;
};

const Button = ({ children, highlighted, className, onClick }: Props) => {
  return (
    <button
      className={`w-full rounded-xl text-white font-medium px-3 py-2 outline-0 ${
        highlighted
          ? "bg-gray-700 hover:bg-black"
          : "bg-gray-400 hover:bg-gray-500"
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
