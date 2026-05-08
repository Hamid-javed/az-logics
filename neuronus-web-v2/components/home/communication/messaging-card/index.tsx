import ThunderCard from "@/components/ThunderCardBg";
import SliderCardPill from "@/components/SliderCardPill";
import AnimatingElements from "./AnimatingElements";

const MessageCard = () => {
  return (
    <ThunderCard className="pl-4 sm:pl-5 2xl:pl-6 pt-5 2xl:pt-6 h-full">
      <SliderCardPill text="Messaging" className="mb-3 2xl:mb-5" />
      <h1 className="text-lg xs:text-xl sm:text-2xl 2xl:text-3xl mb-7 xxs:mb-5 2xl:mb-8">
        Real Time communication
        <br />
        with high security
      </h1>
      <AnimatingElements />
    </ThunderCard>
  );
};

export default MessageCard;
