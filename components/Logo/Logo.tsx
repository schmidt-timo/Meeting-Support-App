import { MdAccessTime } from "react-icons/md";

const Logo = () => {
  return (
    <div className="w-full h-14 flex justify-center items-center pointer-events-none flex-shrink-0">
      <div className="flex flex-col items-center justify-center relative bottom-7">
        <MdAccessTime className="spin-animation ml-2 w-10 h-10 text-gray-500 absolute top-0" />
        <div
          className="leading-0 font-medium uppercase text-gray-500 leading-none absolute top-2"
          aria-label="Meeting Support App Logo"
        >
          <div className="flex">
            <p className="text-2xl leading-none">Mee</p>
            <div className="w-10" />
            <p className="text-2xl leading-none">ing</p>
          </div>
          <p className="text-xs text-center font-normal pt-2">Support App</p>
        </div>
      </div>
    </div>
  );
};

export default Logo;
