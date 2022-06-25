import Input from "./Input";
import Label from "./Label";

type Props = {
  children: React.ReactNode;
  sideBySide?: boolean;
};

const LabelInputWrapper = ({ children, sideBySide }: Props) => {
  return (
    <div
      className={`w-full flex ${
        sideBySide
          ? "flex-row space-y-0 space-x-3 justify-between"
          : "flex-col space-y-1"
      }`}
    >
      {children}
    </div>
  );
};

export default LabelInputWrapper;
