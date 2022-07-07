import { MdOutlineEast } from "react-icons/md";

type Props = {
  children: React.ReactNode;
  required?: boolean;
};

const Label = ({ children, required }: Props) => {
  return (
    <div
      className={`px-0.5 flex items-center space-x-1 text-xs text-gray-500 uppercase ${
        required && "h-4"
      }`}
    >
      <MdOutlineEast />
      <p>{children}</p>
      {required && <p className="text-lg pt-1.5 text-gray-500">*</p>}
    </div>
  );
};

export default Label;
