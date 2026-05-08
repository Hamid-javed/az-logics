import SliderCardPill from "@/components/SliderCardPill";
import ThunderCard from "@/components/ThunderCardBg";
import Image from "next/image";
import img from "@/public/images/home/finance/security-image.png";
import coin1 from "@/public/images/home/finance/coin1.png";
import coin2 from "@/public/images/home/finance/coin2.png";
import coin3 from "@/public/images/home/finance/coin3.png";
import coin4 from "@/public/images/home/finance/coin4.png";

const CryptoCard = () => {
  const baseClass = "flex justify-center items-center rounded-full bg-white";
  const shadow1 =
    "shadow-[0_296.8px_83.55px_0_rgba(133,173,255,0.00),0_190.175px_76.388px_0_rgba(133,173,255,0.01),0_106.625px_64.453px_0_rgba(133,173,255,0.05),0_47.743px_47.743px_0_rgba(133,173,255,0.09),0_11.936px_26.258px_0_rgba(133,173,255,0.10)]";
  const shadow2 =
    "filter-[drop-shadow(0_11.936px_26.258px_rgba(133,173,255,0.10))_drop-shadow(0_47.743px_47.743px_rgba(133,173,255,0.09))_drop-shadow(0_106.625px_64.453px_rgba(133,173,255,0.05))_drop-shadow(0_190.175px_76.388px_rgba(133,173,255,0.01))_drop-shadow(0_296.8px_83.55px_rgba(133,173,255,0.00))]";
  const pillClass = "bg-white! rounded-xl! text-xs! sm:text-sm! xl:text-base!";

  const coins = [
    {
      imgSrc: coin1,
      class: "w-13 xxs:w-15 xs:w-17 sm:w-20 xl:w-23 left-[5%] top-[5%]",
    },
    {
      imgSrc: coin2,
      class: "w-13 xxs:w-15 xs:w-17 sm:w-20 xl:w-25 left-0 bottom-[20%]",
    },
    {
      imgSrc: coin3,
      class: "w-13 xxs:w-15 xs:w-17 sm:w-20 xl:w-25 right-0 top-[-8%]",
    },
    {
      imgSrc: coin4,
      class:
        "w-13 xxs:w-15 xs:w-16 sm:w-18 xl:w-23 right-0 sm:right-[-7%] xl:right-[-10%] bottom-[20%]",
    },
  ];

  return (
    <ThunderCard className="pt-5 md:pt-6 px-3 sm:px-5 md:px-6 h-full">
      <SliderCardPill text="Crypto Coin" className="mb-6" />
      <SliderCardPill text="Swap" className={`${pillClass} ms-auto me-3`} />
      <SliderCardPill
        text="Exchange"
        className={`${pillClass} ms-3 mb-6 sm:mb-10`}
      />

      <div
        className={`${baseClass} size-60 xxs:size-70 xs:size-85 sm:size-104 lg:size-90 xl:size-104 relative mx-2 sm:mx-5 xl:mx-10`}
      >
        {coins.map((coin, i) => (
          <Image
            key={`crypto-coin-${i}`}
            src={coin.imgSrc}
            alt="crypto coin"
            width={500}
            height={500}
            className={`absolute ${coin.class}`}
          />
        ))}
        <div className={`${baseClass} ${shadow1} size-[80%]`}>
          <div className={`${baseClass} ${shadow2} size-[75%] `}>
            <div className={`${baseClass} ${shadow2} size-[70%]`}>
              <Image
                src={img}
                alt="Security Lock"
                width={1200}
                height={1000}
                className="w-22 xxs:w-25 xs:w-30 sm:w-35 h-auto translate-y-[-30%] translate-x-[10%]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between -translate-y-full">
        <SliderCardPill
          text="Cash by Mail"
          className={`${pillClass} -translate-y-full`}
        />
        <SliderCardPill text="Cash in world point" className={pillClass} />
      </div>
    </ThunderCard>
  );
};

export default CryptoCard;
