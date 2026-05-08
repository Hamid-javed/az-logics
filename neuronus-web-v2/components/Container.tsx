import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  left?: boolean;
  right?: boolean;
}

const Container = ({
  children,
  className = "",
  left = false,
  right = false,
}: ContainerProps) => {
  return (
    <div
      className={`${
        left
          ? "w-full pl-[2.5vw] md:pl-[5vw] 2xl:pl-[calc((100%-1500px)/2)]"
          : right
          ? "w-full pr-[2.5vw] md:pr-[5vw] 2xl:pr-[calc((100%-1500px)/2)]"
          : "w-[95vw] md:w-[90vw] 2xl:w-375 mx-auto"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
