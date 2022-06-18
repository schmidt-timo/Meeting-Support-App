type Props = {
  text: string;
};

const Textarea = ({ text }: Props) => {
  return (
    <textarea
      placeholder={text}
      className="w-full rounded-xl bg-white px-3 py-2 border border-gray-300 outline-0 resize-none"
      style={{ minHeight: "120px" }}
    />
  );
};

export default Textarea;
