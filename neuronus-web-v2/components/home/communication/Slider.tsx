"use client";
import AppSwiper from "../../Swipper";
import { SwiperSlide } from "swiper/react";
import MessageCard from "./messaging-card";
import MailCard from "./mail-card";
import KeyEncryption from "./KeyEncryption";

const Slider = () => {
  return (
    <AppSwiper
      autoplay={{
        delay: 3000,
        pauseOnMouseEnter: true,
        reverseDirection: true,
      }}
      spaceBetween={5}
      className="[&>.swiper-pagination]:-scale-x-100 [&_.swiper-slide]:ml-3 [&_.swiper-slide]:xs:ml-5"
      breakpoints={{
        640: { spaceBetween: 10 },
        1024: { spaceBetween: 5 },
        1280: { spaceBetween: 10 },
      }}
    >
      <SwiperSlide className="h-auto! w-auto! mb-10">
        <KeyEncryption />
      </SwiperSlide>
      <SwiperSlide className="h-auto! w-auto! mb-10">
        <MessageCard />
      </SwiperSlide>
      <SwiperSlide className="h-auto! w-auto! mb-10">
        <MailCard />
      </SwiperSlide>
    </AppSwiper>
  );
};

export default Slider;
