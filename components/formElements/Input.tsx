import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      className="w-full rounded-xl bg-white px-3 py-2 border border-gray-300 outline-0 h-input safari-fix text-sm"
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
