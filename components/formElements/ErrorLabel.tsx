import { MdError } from "react-icons/md";

type Props = {
  children: React.ReactNode;
};

const ErrorLabel = ({ children }: Props) => {
  return (
    <div className="rounded-xl p-1 bg-red-200 flex space-x-1 items-center border border-red-300">
      <MdError className="text-red-600 w-4 h-4" />
      <p className="text-extrasmall text-red-600">{children}</p>
    </div>
  );
};

export default ErrorLabel;
