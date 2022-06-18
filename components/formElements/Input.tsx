import React from "react";

type Props = {
  placeholder?: string;
  type?: string;
};

const Input = React.forwardRef(({ placeholder, type }: Props, ref) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-xl bg-white px-3 py-2 border border-gray-300 outline-0 h-input safari-fix"
    />
  );
});

export default Input;
