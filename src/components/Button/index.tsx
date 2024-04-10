import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  children: string;
}

const Button = ({ className = "", children, ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-[#6C757D] border p-3 text-center w-full rounded-sm font-thin text-md text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
