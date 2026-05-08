"use client";
import Heading from "../../Heading";
import Description from "../../Description";
import { CommunicationProducts } from "@/data/productCatalog";
import ProductCatalog from "../../ProductCatalog";
import thunder from "@/public/images/home/data-security/thunder.avif";
import Image from "next/image";
import MessageCard1 from "./messaging/MessageCard1";
import MessageCard2 from "./messaging/MessageCard2";
import MessageCard3 from "./messaging/MessageCard3";
import AppSwiper from "../../Swipper";
import { SwiperSlide } from "swiper/react";
import MailCard from "./MailCard";
import EncryptionCard from "./EncryptionCard";

const Communication = () => {
  return (
    <div className="pt-10 lg:pt-0 pb-16 md:pb-24 -mt-5 overflow-hidden">
      <div className="relative">
        <Image
          src={thunder}
          alt="thunder"
          width={500}
          height={500}
          className="absolute w-2/5 lg:w-1/3 h-auto -right-[20%]"
        />
      </div>

      <div className=" bg-white max-w-[95vw] relative rounded-tr-[62px] rounded-br-[62px] py-12">
        <Heading className="text-center mb-3 ">Communication</Heading>
        <Description
          className="text-center mb-10 md:mb-16"
          text="Information exchange without witnesses.   "
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-4">
          <div>
            <AppSwiper>
              <SwiperSlide>
                <MessageCard1 />
              </SwiperSlide>
              <SwiperSlide>
                <MessageCard2 />
              </SwiperSlide>
              <SwiperSlide>
                <MessageCard3 />
              </SwiperSlide>
              <SwiperSlide>
                <MailCard />
              </SwiperSlide>
              <SwiperSlide>
                <EncryptionCard />
              </SwiperSlide>
            </AppSwiper>
          </div>

          <div className="flex flex-col lg:justify-between mt-8 gap-14 lg:gap-0 pe-8">
            {CommunicationProducts.map((product) => (
              <ProductCatalog
                {...product}
                key={`access-network-product-${product.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
