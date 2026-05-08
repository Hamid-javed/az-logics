"use client";
import AppSwiper from "@/components/Swipper";
import { SwiperSlide } from "swiper/react";

interface SliderProps {
  slides: React.ReactNode[];
  title: string;
}

const Slider = ({ slides, title }: SliderProps) => {
  return (
    <AppSwiper spaceBetween={10} breakpoints={{ 640: { spaceBetween: 20 } }}>
      {slides.map((slide, i) => (
        <SwiperSlide
          key={`${title}-slide-${i}`}
          className={`w-auto! h-auto! mb-10 ${
            i === 0
              ? "ml-5 sm:ml-8 lg:ml-0"
              : i === slides.length - 1
              ? "mr-5 sm:mr-8 xl:mr-10"
              : ""
          }`}
        >
          {slide}
        </SwiperSlide>
      ))}
    </AppSwiper>
  );
};

export default Slider;
