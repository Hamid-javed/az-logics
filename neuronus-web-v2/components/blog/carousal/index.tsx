import { BlogType } from "@/app/api/blog";
import BlogCard from "../BlogCard";
import AppSwiper from "@/components/Swipper";
import { SwiperSlide } from "swiper/react";

const Carousal = ({ data }: { data: BlogType[] }) => {
  return (
    <div className="flex-1">
      <AppSwiper
        autoplay={false}
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{ 1024: { slidesPerView: 2, spaceBetween: 20 } }}
      >
        {data.map((item) => (
          <SwiperSlide key={`recent-blog-${item.id}`}>
            <BlogCard data={item} small />
          </SwiperSlide>
        ))}
      </AppSwiper>
    </div>
  );
};

export default Carousal;
