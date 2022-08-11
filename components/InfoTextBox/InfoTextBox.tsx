import { MdOutlineError } from "react-icons/md";

type Props = {
  title: string;
  children: React.ReactNode;
};

const InfoTextBox = ({ title, children }: Props) => {
  return (
    <div className="relative p-3 pb-4 bg-yellow-100 rounded-xl space-y-3">
      <div className="flex items-center space-x-1">
        <MdOutlineError className="w-5 h-5 text-yellow-500" />
        <p className="font-medium truncate text-yellow-500">{title}</p>
      </div>
      <p className="text-xs text-mblue-600">{children}</p>
    </div>
  );
};

export default InfoTextBox;
