import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return (
      <textarea
        className="w-full rounded-xl bg-white px-3 py-2 border border-mblue-200 outline-0 resize-none text-sm min-h-150 text-mblue-500 placeholder-mblue-500 placeholder-opacity-40"
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
