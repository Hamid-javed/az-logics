import Container from "@/components/Container";
import Description from "@/components/Description";
import Heading from "@/components/Heading";
import DataEncryption from "@/public/icons/watch-demo/DataEncryption";
import Key from "@/public/icons/watch-demo/Key";
import Passwords from "@/public/icons/watch-demo/Passwords";
import Shield from "@/public/icons/watch-demo/Shield";

const TableHeader = ["Component", "Algorithm", "Strength", "Purpose"];
const TableRows = [
  {
    component: { icon: <Passwords />, label: "Passwords" },
    algorithm: "PBKDF2-SHA256 + bcrypt-12",
    strength: "10⁷⁷ combinations",
    purpose: "Master key derivation",
  },
  {
    component: { icon: <DataEncryption />, label: "Data Encryption" },
    algorithm: "AES-256-GCM",
    strength: "256-bit",
    purpose: "Content protection",
  },
  {
    component: { icon: <Key />, label: "Key Exchange" },
    algorithm: "ECC Curve25519",
    strength: "128-bit equivalent",
    purpose: "Secure key sharing",
  },
];

const TechnicalArchitecture = () => {
  return (
    <Container className="py-10 md:py-20">
      <p className="text-[#4D67FF] font-semibold text-[9px] xs:text-base sm:text-[22px] text-center">
        Under the Hood
      </p>
      <Heading className="text-center">Technical Architecture</Heading>
      <Description
        text="Built on industry-standard cryptographic primitives, audited and battle-tested."
        className="text-center text-black!"
      />
      <div className="bg-white border border-[#D4D4D4] rounded-[10px] mt-8.5 w-[95vw] md:w-[90vw] lg:w-5/6 mx-auto text-[8px] sm:text-[12px] md:text-sm lg:text-[22px]">
        <div className="grid gap-5 grid-cols-4  py-4 sm:py-9  ps-2 xs:ps-6 sm:ps-12.5 border-b border-[#D4D4D4]">
          {TableHeader.map((item, index) => (
            <h1 key={`${item}-${index}`}>{item}</h1>
          ))}
        </div>
        {TableRows.map((row, index) => (
          <div
            key={`${row.algorithm}-${index}`}
            className={`grid gap-5 grid-cols-4 items-center py-4 sm:py-9  ps-2 xs:ps-6 sm:ps-12.5 pe-1 ${index === TableRows.length - 1 ? "" : "border-b border-[#D4D4D4]"}`}
          >
            <div className="flex items-center gap-2">
              <div className="size-2.25 sm:size-6 md:size-8 lg:size-13 rounded-sm flex items-center justify-center bg-slate">
                {row.component.icon}
              </div>
              {row.component.label}
            </div>
            <div className="bg-[#DBE0FF]  text-[8px] sm:text-[12px] md:text-sm lg:text-base rounded-sm px-2 lg:px-4 py-1 flex-1 overflow-hidden">
              <p className="min-w-0 w-full truncate">{row.algorithm}</p>
            </div>
            <p>{row.strength}</p>
            <p>{row.purpose}</p>
          </div>
        ))}
      </div>
      <div className="bg-white/18 border w-fit mx-auto gap-1 sm:gap-3 text-[8.161px] sm:text-sm border-[#4C67FF] flex justify-center items-center px-3 mt-4 sm:mt-6 backdrop-blur-[1.8px] rounded-[89.302px]">
        <Shield className="size-3.5 sm:size-6" />
        <p className="py-1 sm:py-3 pr-2 sm:pr-5">
          {" "}
          All algorithms independently audited
        </p>
      </div>
    </Container>
  );
};

export default TechnicalArchitecture;
