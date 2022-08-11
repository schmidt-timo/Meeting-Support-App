import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      className="w-full rounded-xl bg-white px-3 py-2 border border-mblue-200 outline-0 h-input safari-fix text-sm text-mblue-500 placeholder-mblue-500 placeholder-opacity-40"
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
