import { MdAccessTime } from "react-icons/md";

type Props = {};

const LoadingScreen = ({}: Props) => {
  return (
    <div className="absolute w-full h-screen flex items-center justify-center z-20 bg-gray-100 bg-opacity-90">
      <div className="flex flex-col space-y-2 items-center justify-center py-8 px-14 bg-gray-200 rounded-xl z-30">
        <MdAccessTime className="animate-spin w-10 h-10 text-gray-400" />
        <p className="text-xs uppercase text-gray-400">Loading</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
