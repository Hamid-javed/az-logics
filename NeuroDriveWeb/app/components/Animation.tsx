"use client";

import { useEffect, useState } from "react";

interface AnimatedImagesProps {
  images: string[];
  className: string;
}

const Animation = ({ images, className }: AnimatedImagesProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return images.map((img, index) => (
    <img
      key={index}
      src={img}
      alt=""
      className={`transition-opacity duration-1000 ease-in-out absolute ${className} ${
        currentImage === index ? "opacity-100" : "opacity-0"
      }`}
    />
  ));
};

export default Animation;
