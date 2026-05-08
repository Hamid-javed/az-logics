"use client";
import dynamic from "next/dynamic";


const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import animationData from "../../public/animation.json";

interface AnimationProps {
  className?: string;  
  size?: string;       
}

export default function Animation({className, size}: AnimationProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Lottie animationData={animationData} loop={true} className={size} />
    </div>
  );
}
