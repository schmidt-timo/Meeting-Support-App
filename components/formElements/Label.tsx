import { MdOutlineEast } from "react-icons/md";

type Props = {
  children: React.ReactNode;
  mandatory?: boolean;
};

const Label = ({ children, mandatory }: Props) => {
  return (
    <div
      className={`px-0.5 flex items-center space-x-1 text-xs text-gray-500 uppercase ${
        mandatory && "h-4"
      }`}
    >
      <MdOutlineEast />
      <p>{children}</p>
      {mandatory && <p className="text-lg pt-1.5 text-gray-500">*</p>}
    </div>
  );
};

export default Label;
