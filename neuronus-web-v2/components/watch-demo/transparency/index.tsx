import Container from "@/components/Container";
import Description from "@/components/Description";
import Heading from "@/components/Heading";
import DataEncryption from "@/public/icons/watch-demo/DataEncryption";
import EyeCross from "@/public/icons/watch-demo/EyeCross";
import Tick from "@/public/icons/watch-demo/signupFlow/Tick";
import X from "@/public/icons/watch-demo/X";
import StorageCard from "./StorageCard";

const DataFields = [
  "IP addresses",
  "Unencrypted private keys",
  "Readable message content",
  "Personal identification",
];

const Transparency = () => {
  return (
    <Container className="py-10 md:py-20">
      <p className="text-[#4D67FF] font-semibold text-[9px] xs:text-base sm:text-[22px] text-center">
        Full Transparency
      </p>
      <Heading className="text-center">What We Actually Store</Heading>
      <Description
        text="Complete transparency about our data practices. No hidden clauses, no fine print."
        className="text-center text-black!"
      />

      <div className="grid lg:grid-cols-2 gap-4 md:gap-10 pt-4 xs:pt-7 sm:pt-11 w-full">
        {/* Green Card */}
        <StorageCard
          title="What We Store"
          icon={<DataEncryption className="size-4 md:size-6" />}
          descriptions={[
            {
              icon: <Tick className="size-2 sm:size-3 md:size-4 lg:size-5" />,
              text: "Encrypted content (AES-256)",
            },
            {
              icon: <Tick className="size-2 sm:size-3 md:size-4 lg:size-5" />,
              text: "Public keys only",
            },
          ]}
          borderColor="border-[#15D500]"
          iconBg="bg-[#DBE0FF]"
        />
        {/* Red Card */}
        <StorageCard
          title="What We Never Store"
          icon={<EyeCross className="size-4 md:size-6" />}
          descriptions={DataFields.map((field) => ({
            icon: <X className="size-2 sm:size-3 md:size-4" />,
            text: field,
            lineThrough: true,
          }))}
          borderColor="border-[#FF592C]"
          iconBg="bg-[#FFD3D3]"
        />
      </div>

      <p className="w-[90vw] sm:w-130 text-center mx-auto text-[12px] sm:text-base md:text-[22px] mt-8">
        Our infrastructure is designed so that even if compromised, attackers
        gain nothing readable.
      </p>
    </Container>
  );
};

export default Transparency;
