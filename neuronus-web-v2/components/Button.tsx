import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string | React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  classes?: {
    root?: string;
  };
  white?: boolean;
  isLoading?: boolean;
}

const Button = ({
  text,
  className = "",
  classes,
  onClick,
  isLoading = false,
  white = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={`${className} text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[22px] py-2.5 md:py-3 lg:py-4 px-4 rounded-full cursor-pointer disabled:opacity-50  ${white ? "bg-white text-black " : " text-white bg-radial-[43.45%_44.45%_at_56.56%_20.66%,#2E3E99_0%,#4C67FF_100%,#4C67FF] "}`}
    >
      {text}
      {isLoading && (
        <ThreeDots color="white" height={7} width={28} ariaLabel="loading" />
      )}
    </button>
  );
};

export default Button;
