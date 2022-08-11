import { MdVpnKey } from "react-icons/md";
import Logo from "../../Logo/Logo";

type Props = {
  title: string;
  children: React.ReactNode;
  secondaryChildren: React.ReactNode;
};

const AuthPageLayout = ({ title, children, secondaryChildren }: Props) => {
  return (
    <div className="w-full bg-white min-h-screen rounded-xl px-8 flex flex-col justify-center items-center py-10">
      <Logo />
      <div className="w-full space-y-5 pt-5 max-w-buttons">
        <div className="border bg-mblue-100 rounded-xl">
          <div className="flex bg-mblue-500 bg-opacity-10 rounded-t-xl py-3 px-3 space-x-2 items-center justify-center">
            <MdVpnKey className="text-mblue-500" />
            <h1 className="text-sm font-medium text-mblue-500 uppercase">
              {title}
            </h1>
          </div>
          {children}
        </div>
        <div className="border bg-mblue-100 rounded-xl p-5 space-y-2">
          {secondaryChildren}
        </div>
      </div>
    </div>
  );
};

export default AuthPageLayout;
