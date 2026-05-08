"use client";
import AppSwiper from "@/components/Swipper";
import { SwiperSlide } from "swiper/react";
import SecuresheetCard from "./SecuresheetCard";
import DocumentsCard from "./DocumentsCard";
import HighSecurityCard from "./HighSecurityCard";

const Slider = () => {
  return (
    <AppSwiper
      autoplay={{
        delay: 3000,
        pauseOnMouseEnter: true,
        reverseDirection: true,
      }}
      spaceBetween={1}
      className="[&>.swiper-pagination]:-scale-x-100 [&_.swiper-slide]:ml-5 [&_.swiper-slide]:sm:ml-6"
      breakpoints={{ 768: { spaceBetween: 5 } }}
    >
      <SwiperSlide className="w-auto! h-auto! mb-10">
        <SecuresheetCard />
      </SwiperSlide>
      <SwiperSlide className="w-auto! h-auto! mb-10">
        <DocumentsCard />
      </SwiperSlide>
      <SwiperSlide className="w-auto! h-auto! mb-10 mr-5 sm:mr-6 lg:mr-0">
        <HighSecurityCard />
      </SwiperSlide>
    </AppSwiper>
  );
};

export default Slider;
