type Props = {
  question: string;
  children: React.ReactNode;
};

const FeedbackViewItem = ({ question, children }: Props) => {
  return (
    <div className="">
      <h1 className="text-gray-600 pb-2" style={{ lineHeight: "1.3" }}>
        {question}
      </h1>
      {children}
    </div>
  );
};

export default FeedbackViewItem;
