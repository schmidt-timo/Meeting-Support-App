import { MdAccessTime } from "react-icons/md";

type Props = {};

const LoadingScreen = ({}: Props) => {
  return (
    <div className="absolute w-full h-screen flex items-center justify-center z-20 bg-mblue-100 bg-opacity-90">
      <div className="flex flex-col space-y-2 items-center justify-center py-8 px-14 bg-mblue-500 bg-opacity-10 rounded-xl z-30">
        <MdAccessTime className="animate-spin w-10 h-10 text-mblue-500" />
        <p className="text-xs uppercase text-mblue-500">Loading</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
