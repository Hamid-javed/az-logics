"use client";

import { Swiper } from "swiper/react";
import type { SwiperProps } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface AppSwiperProps extends SwiperProps {
  children: React.ReactNode;
  className?: string;
}

const AppSwiper = ({ children, className = "", ...props }: AppSwiperProps) => {
  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      className={`w-full! ${className}`}
      autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
      slidesPerView={"auto"}
      spaceBetween={10}
      pagination={{ clickable: true }}
      {...props}
    >
      {children}
    </Swiper>
  );
};

export default AppSwiper;
