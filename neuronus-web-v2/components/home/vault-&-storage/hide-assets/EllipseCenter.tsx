import Quantumography from "@/public/icons/Quantumography";
import Image from "next/image";
import dots from "@/public/images/home/vault/hide-assets-dots.png";
import AnimatingElements from "./AnimatingElements";
import Video from "@/components/Video";

const EllipseCenter = () => {
  const baseClass = "flex justify-center items-center rounded-full";

  return (
    <div className="relative py-8 xl:py-12 w-full">
      <AnimatingElements />
      <div
        className={`${baseClass} size-60 xs:size-80 sm:size-90 xl:size-103 bg-white/49 mx-auto`}
      >
        <div
          className={`${baseClass} size-[80%] bg-white/58 shadow-2xl relative`}
        >
          <Image
            src={dots}
            alt="dots"
            width={500}
            height={800}
            className="absolute top-0 left-0 size-full object-contain z-3"
          />
          <div
            className={`${baseClass} size-[70%] bg-white/64 shadow-2xl relative`}
          >
            <Video
              className="absolute size-full object-cover mix-blend-lighten z-4"
              src="/videos/hide-assets-circle.mp4"
            />

            <div
              className={`${baseClass} size-[80%] bg-linear-to-l from-[#42A4FF] to-transparent`}
            >
              <div className={`${baseClass} size-[96%] bg-white`}>
                <div
                  className={`${baseClass} size-[95%] bg-linear-to-r from-[#42A4FF] to-transparent`}
                >
                  <div className={`${baseClass} size-[97%] bg-white`}>
                    <div
                      className={`${baseClass} size-[93%] bg-linear-to-l from-[#075CAA] to-transparent`}
                    >
                      <div
                        className={`${baseClass} size-[90%] bg-[#075CAA] relative z-2`}
                      >
                        <div className="absolute size-[30%] bg-white blur-lg left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute size-[30%] bg-white blur-lg left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <Quantumography className="text-white relative w-1/3 h-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EllipseCenter;
