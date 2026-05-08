import ThunderCard from "@/components/ThunderCardBg";
import Image from "next/image";
import SliderCardPill from "@/components/SliderCardPill";
import Mobile from "@/public/images/home/Communication-mobile2.png";

const MessageCard1 = () => {
  return (
    <ThunderCard>
      <div className="w-90 lg:w-127 h-auto ">
        <SliderCardPill text="Messaging" className="m-6.5" />
        <div className="ml-6.5 mt-6.5 text-3xl font-normal mb-6">
          <p>Real Time communication</p>
          <p>with high security</p>
        </div>
        <Image
          src={Mobile}
          alt="ai chat"
          width={800}
          height={1200}
          className="w-full h-auto"
        />
      </div>
    </ThunderCard>
  );
};

export default MessageCard1;
