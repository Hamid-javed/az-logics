import Image from "next/image";
import SliderCardPill from "@/components/SliderCardPill";
import hand from "@/public/images/home/communication-hand.png";
import Power from "@/public/icons/home/accessNetork/Power";
import bg from "@/public/images/home/header-card-bg-mob.png";
import ThunderCard from "../../ThunderCardBg";
import Guard from "@/public/icons/home/communication/Guard";

const MailCard = () => {
  return (
    <ThunderCard>
      <SliderCardPill text="Mail" className="m-6.5" />
      <div className="ml-6.5 mt-6.5 text-3xl font-normal">
        <p>No Tracker, No</p>
        <p>Distraction, Just your mail</p>
      </div>
      <Guard clasName="absolute top-[32%] size-6 left-[10%] text-white" />
      <Guard clasName="absolute bottom-[6%] left-[10%] text-white" />
      <Guard clasName="absolute top-[39%] right-[8%] text-white" />
      <Guard clasName="absolute top-[60%] size-6 left-[6%] text-[#DCE6FF]" />
      <Guard clasName="absolute top-[60%] size-6 left-[6%] text-[#DCE6FF]" />
      <Guard clasName="absolute top-[52%] size-6 right-[25%] text-[#DCE6FF]" />

      <div>
        <Image
          src={hand}
          alt="mobile in hand"
          width={800}
          height={1000}
          className="relative pl-5 sm:pl-15 pt-38 sm:pt-10 w-85 sm:w-114 2xl:w-127 h-auto object-cover"
        />
      </div>
    </ThunderCard>
  );
};

export default MailCard;
