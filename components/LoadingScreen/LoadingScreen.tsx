import { MdAccessTime } from "react-icons/md";

type Props = {};

const LoadingScreen = ({}: Props) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col space-y-2 items-center justify-center py-5 px-10 bg-gray-100 rounded-xl">
        <MdAccessTime className="animate-spin w-10 h-10 text-gray-400" />
        <p className="text-xs uppercase text-gray-400">Loading</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
