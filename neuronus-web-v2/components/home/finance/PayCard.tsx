import Image from "next/image";
import ThunderCard from "@/components/ThunderCardBg";
import SliderCardPill from "@/components/SliderCardPill";
import payImage from "@/public/images/home/finance/pay.png";

const PayCard = () => {
  return (
    <ThunderCard className="h-full">
      <div className="flex flex-col justify-between h-full">
        <div>
          <SliderCardPill
            text="Pay"
            className="mt-5 md:mt-6 ms-3 sm:ms-5 md:ms-6 mb-2"
          />
          <p className="text-xl md:text-2xl xl:text-[30px] font-semibold text-center mb-3.5">
            Anonymous Payment
          </p>
        </div>
        <Image
          src={payImage}
          alt="Payment"
          width={1000}
          height={1500}
          className="w-70 xxs:w-82 xs:w-95 sm:w-130 lg:w-105 xl:w-130 h-auto mb-8"
        />
      </div>
    </ThunderCard>
  );
};

export default PayCard;
