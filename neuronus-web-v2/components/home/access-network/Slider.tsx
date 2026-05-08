"use client";
import AppSwiper from "@/components/Swipper";
import { SwiperSlide } from "swiper/react";
import SecureBrowserCard from "./SecureBrowserCard";
import NeuroSPNCard from "./NeuroSPNCard";

const Slider = () => {
  return (
    <AppSwiper
      breakpoints={{
        640: { spaceBetween: 20 },
        768: { spaceBetween: 25 },
        1024: { spaceBetween: 15 },
        1280: { spaceBetween: 20 },
      }}
    >
      <SwiperSlide className="w-auto!">
        <SecureBrowserCard />
      </SwiperSlide>
      <SwiperSlide className="w-auto!">
        <NeuroSPNCard />
      </SwiperSlide>
    </AppSwiper>
  );
};

export default Slider;
