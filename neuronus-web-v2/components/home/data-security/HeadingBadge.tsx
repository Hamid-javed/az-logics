import React from "react";

interface HeadingBadgeProps {
  className?: string;
  children: React.ReactNode;
}

const HeadingBadge = ({ children, className = "" }: HeadingBadgeProps) => {
  return (
    <h1
      className={`text-base sm:text-lg md:text-xl xl:text-2xl 2xl:text-[26px] rounded-xl bg-white w-fit mx-auto translate-y-[-55%] shadow-2xl ${className}`}
    >
      {children}
    </h1>
  );
};

export default HeadingBadge;
