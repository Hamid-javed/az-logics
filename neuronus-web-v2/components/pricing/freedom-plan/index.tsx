import Container from "@/components/Container";
import brain from "@/public/images/header-brain.png";
import Image from "next/image";
import LeftBrain from "@/public/images/header-brain-left.png";
import Button from "@/components/Button";
import OfferCard from "@/public/icons/pricing/OfferCard";
import Special from "@/public/images/pricing/offer.svg";
import Tick from "@/public/icons/watch-demo/signupFlow/Tick";
import BottomEllipse from "@/public/images/home/BottomEllipse";
import Heading from "@/components/Heading";
import Description from "@/components/Description";

const Benefits = [
  "All Essential Plan features",
  "50 GB Storage",
  "Quantumography (8MB limit)",
  "Priority Support",
  "Free annual upgrades to Pro",
];

const FreedomPlan = () => {
  const TextColor =
    "bg-[linear-gradient(90deg,#999_10.42%,#FFF_37.12%,#FFF_75.88%,#999_100%)] bg-clip-text text-transparent";
  return (
    <>
      <BottomEllipse className="w-full h-auto translate-y-1 relative z-1" />
      <div className="relative z-2 bg-[linear-gradient(270deg,#00328F_0.04%,#00123E_52.65%),linear-gradient(180deg,#0065DE_0%,#001650_100%)] overflow-hidden py-20">
        <Image
          src={brain}
          alt="Brain Image"
          width={600}
          height={800}
          className="absolute w-[80%] h-auto bottom-0 right-0 mix-blend-screen"
        />
        <Image
          src={LeftBrain}
          alt="Brain Image"
          width={600}
          height={500}
          className="absolute top-0 left-0 -translate-x-[40%] mix-blend-screen"
        />
        <Container>
          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            <div>
              <Heading
                className={`${TextColor} text-left max-w-[80%] xs:max-w-[70%]! text-[40px]! sm:text-[58px] md:text-[60px] xl:text-[74px]!`}
              >
                Neuronus Freedom Plan
              </Heading>
              <Description
                text="For Journalists, Activists & Human Rights Defenders"
                white
              />
              <div className="border border-[#0036BA] bg-[#01123E] w-full sm:w-6/7 2xl:w-7/8 h-auto rounded-[22px] p-6 xs:p-10 my-6 sm:my-12">
                <Description
                  text="Discounted access for those fighting for freedom and truth"
                  white
                />
                <span className="flex items-baseline-last ">
                  <p className="text-xl sm:text-3xl md:text-[32px] text-white mt-4 xs:mt-0">
                    $5.00
                  </p>
                  <Description text="/month" className="lg:text-base!" white />
                </span>
              </div>
              <Button
                text="Apply for Freedom Access"
                className="mx-auto sm:mx-0 w-7/8 sm:w-6/7 lg:w-[58%] text-[13px]! sm:text-[19px]! block"
              />
              <Description
                className="text-base! w-full lg:w-[60%] my-6"
                text="Available to verified journalists, non-profit workers, and
                activists in countries with restricted press freedom"
                white
              />
            </div>
            <div className="relative size-fit">
              <OfferCard className="w-full h-auto" />
              <Image
                src={Special}
                alt="Special Badge"
                width={500}
                height={500}
                className="absolute top-[5%] left-0 translate-x-[8%] w-1/4 h-auto object-contain mix-blend-plus-lighter"
              />
              <div className="absolute size-full top-0 left-0 ps-[12%] flex items-center justify-center">
                <div className="space-y-2 xs:space-y-3 sm:space-y-4 xl:space-y-7">
                  <h1 className="text-white font-semibold text-xl xs:text-xl sm:text-3xl md:text-[34px] lg:text-3xl xl:text-[34px] pt-8 xs:py-0">
                    What's included:
                  </h1>
                  {Benefits.map((benefit, index) => (
                    <div
                      key={`${benefit}-${index}`}
                      className={`flex items-center gap-5 text-white/70 text-[13px] sm:text-lg md:text-[22px] lg:text-lg xl:text-[22px]`}
                    >
                      <Tick className="w-3.25 h-auto" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <BottomEllipse className="-scale-y-100 -translate-y-1 relative z-1 w-full h-auto" />
    </>
  );
};

export default FreedomPlan;
