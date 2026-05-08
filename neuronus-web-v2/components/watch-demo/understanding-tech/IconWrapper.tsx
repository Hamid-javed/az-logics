import React from "react";

interface IconWrapperProps {
  Icon: React.ElementType;
  className?: string;
}

const IconWrapper = ({ Icon, className = "" }: IconWrapperProps) => {
  return (
    <div
      className={`size-7 xs:size-9 xl:size-11 rounded-md xs:rounded-lg xl:rounded-xl bg-[#DBE0FF] flex items-center justify-center px-1.5 xs:px-2 xl:px-3 ${className}`}
    >
      <Icon className="w-full h-auto text-backlight" />
    </div>
  );
};

export default IconWrapper;
