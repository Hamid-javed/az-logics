import Image, { StaticImageData } from "next/image";
import Description from "../Description";

interface ProcessCardProps {
  icon?: string | StaticImageData;
  title: string;
  description?: string | React.ReactNode;
}
const ProcessCard = ({ icon, title, description }: ProcessCardProps) => {
  return (
    <div className="bg-white w-full sm:w-md h-auto rounded-xl p-7.5">
      <div className="flex items-center gap-5">
        {icon && (
          <Image src={icon} alt="icon" className="w-10 md:w-15 h-auto" />
        )}
        <h1 className=" text-[22px] sm:text-[28px] font-semibold">{title}</h1>
      </div>
      {description ? (
        <p className="text-xs sm:text-base pt-5">{description}</p>
      ) : (
        <div className="text-center">
          <h1 className="text-[90px] sm:text-[113px] font-semibold text-slate">
            ?
          </h1>
          <Description
            text="Comming soon..."
            className="text-black! font-semibold"
          />
        </div>
      )}
    </div>
  );
};

export default ProcessCard;
