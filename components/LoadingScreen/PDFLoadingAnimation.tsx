import { MdAccessTime } from "react-icons/md";

type Props = {};

const PDFLoadingAnimation = ({}: Props) => {
  return (
    <div className="flex flex-col space-y-2 items-center justify-center py-8 px-14 bg-mblue-500 bg-opacity-10 rounded-xl z-30">
      <MdAccessTime className="animate-spin w-10 h-10 text-mblue-500" />
      <p className="text-xs uppercase text-mblue-500">PDF is loading ...</p>
    </div>
  );
};

export default PDFLoadingAnimation;
