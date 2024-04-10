import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={`${className} outline-none py-3 px-2 rounded-md border border-slate-300 font-thin`}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Input;
