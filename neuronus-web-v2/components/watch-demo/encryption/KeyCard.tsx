import ScrollUp from "@/public/icons/watch-demo/signupFlow/ScrollUp";
import Pill from "./Pill";

interface KeyCardProps {
  title: string;
  label: string;
}
const KeyCard = ({ title, label }: KeyCardProps) => {
  return (
    <div className="bg-white rounded-[7.017px] border border-[#D8D8D8] ps-3 lg:ps-5 2xl:ps-7 py-3 lg:py-4 2xl:py-5.5 pe-3 lg:pe-4 2xl:pe-5.5 flex items-center justify-between">
      <h3 className="text-xs lg:text-sm 2xl:text-base font-semibold">
        {title}
      </h3>
      <div className="flex items-center gap-2 lg:gap-2.5 2xl:gap-3.5">
        <Pill text={label} />
        <ScrollUp className="size-2.75 lg:size-3 2xl:size-3.5" />
      </div>
    </div>
  );
};

export default KeyCard;
