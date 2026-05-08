import Description from "@/components/Description";
import Heading from "@/components/Heading";
import Lock from "@/public/icons/home/vault/Lock";
import IconWrapper from "./IconWrapper";

const Typography = () => {
  return (
    <div className="space-y-2.5">
      <Description
        text="Understanding The Tech"
        className="text-backlight! font-semibold"
      />
      <Heading>What is Zero-Knowledge?</Heading>
      <Description
        className="mb-10"
        text="Zero-knowledge encryption means we store your data without ever knowing what's in it. Your encryption keys never leave your device — we literally cannot read your information, even if compelled by law."
      />

      <div className="rounded-[10px] bg-white/44 border border-white flex gap-3 xs:gap-5 xl:gap-8 py-4 px-3 lg:w-[95%] xl:w-[85%]">
        <IconWrapper Icon={Lock} />
        <div className="flex-1 pb-3 xs:pb-5">
          <Description
            heading
            text="The Locked Suitcase Analogy"
            className="font-semibold text-black! text-base md:text-inherit"
          />
          <p className="text-[10px] xs:text-xs md:text-sm">
            {`Imagine giving a bank a locked suitcase to store. They keep it
                  safe, but they don't have the key. Only you can open it.
                  That's zero-knowledge: we protect your data without ever
                  accessing it.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Typography;
