import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return (
      <textarea
        className="w-full rounded-xl bg-white px-3 py-2 border border-gray-300 outline-0 resize-none text-sm"
        style={{ minHeight: "150px" }}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Textarea;
