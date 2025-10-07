import clsx from "clsx";
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Button = ({
  title,
  leftIcon,
  rightIcon,
  containerClassName,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black",
        containerClassName
      )}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        {title}
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
