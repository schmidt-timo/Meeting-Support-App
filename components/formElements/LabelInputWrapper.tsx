type Props = {
  children: React.ReactNode;
};

const LabelInputWrapper = ({ children }: Props) => {
  return <div className="w-full flex flex-col space-y-1">{children}</div>;
};

export default LabelInputWrapper;
