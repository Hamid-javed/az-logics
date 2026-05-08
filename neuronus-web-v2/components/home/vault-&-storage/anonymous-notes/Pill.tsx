import React from "react";

interface PillProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

const Pill = ({ icon, text, className = "" }: PillProps) => {
  return (
    <div
      className={`bg-white rounded-full w-fit h-7.5 px-3 flex items-center gap-1.5 ${className}`}
    >
      {icon} <p>{text}</p>
    </div>
  );
};

export default Pill;
