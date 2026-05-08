import ThunderCard from "@/components/ThunderCardBg";
import SliderCardPill from "@/components/SliderCardPill";
import Resonance from "@/public/icons/Resonance";

const MessageCard3 = () => {
  return (
    <ThunderCard>
      <SliderCardPill text="Messaging" className="m-6.5" />
      <div className="ml-6.5 mt-6.5 text-3xl font-normal mb-6">
        <p>Real Time communication</p>
        <p>with high security</p>
      </div>
      <div className="p-4 xl:p-22">
        <div className="size-85 rounded-full bg-white flex items-center justify-center">
          <div className="rounded-full opacity-99 bg-[#6753E4] size-75 flex justify-center items-center">
            <Resonance className="text-white pl-10 size-40" />
          </div>
        </div>
      </div>
    </ThunderCard>
  );
};

export default MessageCard3;
