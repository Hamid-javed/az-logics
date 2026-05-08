import SliderCardPill from "@/components/SliderCardPill";
import ThunderCard from "@/components/ThunderCardBg";
import Image from "next/image";
import document from "@/public/images/home/workspace/documents.png";

const DocumentsCard = () => {
  return (
    <ThunderCard className="h-full py-5 md:py-6">
      <div className="absolute top-0 left-3 sm:left-5 md:left-6">
        <SliderCardPill text="Documents" />
      </div>
      <Image
        src={document}
        alt="document"
        width={1200}
        height={1000}
        className="w-68 xxs:w-80 xs:w-90 sm:w-100 xl:w-120 2xl:w-140 h-auto"
      />
    </ThunderCard>
  );
};

export default DocumentsCard;
