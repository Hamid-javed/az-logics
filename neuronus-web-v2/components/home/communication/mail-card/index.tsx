import Image from "next/image";
import SliderCardPill from "@/components/SliderCardPill";
import hand from "@/public/images/home/communication-hand.png";
import ThunderCard from "@/components/ThunderCardBg";
import AnimatingElements from "./AnimatingElements";

const MailCard = () => {
  return (
    <ThunderCard className="pl-5 2xl:pl-6 pt-5 2xl:pt-6 h-full me-3 xs:me-5 lg:me-0">
      <SliderCardPill text="Mail" className="mb-3 2xl:mb-5" />
      <h1 className="text-lg xs:text-xl sm:text-2xl 2xl:text-3xl mb-11 xxs:mb-5 xs:mb-8 2xl:mb-10">
        No Tracker, No
        <br />
        Distraction, Just your mail
      </h1>

      <div className="relative w-68 xxs:w-76 xs:w-84 sm:w-111 xl:w-120 2xl:w-125">
        <AnimatingElements />
        <Image
          src={hand}
          alt="mobile in hand"
          width={1500}
          height={1500}
          className="relative z-2 w-full h-auto"
        />
      </div>
    </ThunderCard>
  );
};

export default MailCard;
