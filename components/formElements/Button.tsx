type Props = {
  children: React.ReactNode;
  highlighted?: boolean;
  className?: string;
};

const Button = ({ children, highlighted, className }: Props) => {
  return (
    <button
      className={`w-full rounded-xl text-white font-medium px-3 py-2 outline-0 ${
        highlighted
          ? "bg-gray-700 hover:bg-black"
          : "bg-gray-400 hover:bg-gray-500"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
