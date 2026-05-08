import ThunderCard from "@/components/ThunderCardBg";
import Image from "next/image";
import SliderCardPill from "@/components/SliderCardPill";
import Mobile from "@/public/images/home/Communication-mobile.png";
import ai from "@/public/images/message-card-ai-image.png";
import MovingCursor from "./MovingCursor";

const MessageCard1 = () => {
  return (
    <ThunderCard>
      <div className="w-90 xl:w-127 h-auto">
        <SliderCardPill text="Messaging" className="m-6.5" />
        <div className="ml-6.5 mt-6.5 text-3xl font-normal">
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
      <MovingCursor />
    </ThunderCard>
  );
};

export default MessageCard1;
