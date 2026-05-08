import Button from "../Button";
import Container from "../Container";
import Description from "../Description";
import Heading from "../Heading";
import SectionMerger from "../SectionMerger";
import Background from "./data-security/Background";
import HeaderCard from "./HeaderCard";

const PoweredByNuronus = () => {
  return (
    <>
      <SectionMerger />
      <div className="relative py-20 md:py-30 xl:py-40 overflow-hidden">
        <Background />
        <Container className="relative grid grid-cols-1 xl:grid-cols-[55%_45%] gap-10 md:gap-14 xl:gap-0 xl:items-center">
          <HeaderCard small />
          <div className="xl:ps-10">
            <Heading className="mb-3 md:mb-5">
              Powered by <br /> Neuronus — One <br /> Core, Many Minds.
            </Heading>
            <Description
              className="text-black! mb-8 sm:mb-10"
              text="Every system is born from Neuronus, built for privacy, powered by intelligence."
            />
            <div className="flex gap-1.5 xs:gap-3 items-center">
              <Button
                text="Create a Free Account"
                className="py-2.5! xs:px-5! text-base! sm:text-lg! border border-[#1D4ED8]"
              />
              <button className="text-base sm:text-lg py-2.5 px-4 xs:px-5 rounded-full text-[#112762] border border-[#112762]">
                View Plan
              </button>
            </div>
          </div>
        </Container>
      </div>
      <SectionMerger bottom />
    </>
  );
};

export default PoweredByNuronus;
