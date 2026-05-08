import Image from "next/image";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import Description from "@/components/Description";
import ShadowButton from "@/components/ShadowButton";
import Background from "./Background";
import thunder from "@/public/images/home/header/card-thunder.avif";
import question from "@/public/images/home/neuronus-protects/question.avif";
import Coins from "./Coins";
import Video from "@/components/Video";

const NeuronusProtects = () => {
  return (
    <div className="relative w-full">
      <Background />
      <div className="absolute w-full h-fit top-0 left-0">
        <Container className="relative text-center pt-14">
          <Heading className="gradient-text mb-3 xl:mb-5">
            Understand how Neuronus <br /> protects you
          </Heading>
          <Description
            text="Find clear, honest explanations about Neuronus tools, security, and anonymity"
            white
            className="mb-12 xl:mb-16"
          />
          <ShadowButton
            text="Check FAQ"
            classes={{ root: "w-45 xs:w-50 md:w-58 lg:w-64 mx-auto" }}
          />
        </Container>
      </div>
      <div className="absolute size-full bottom-0 overflow-hidden flex justify-center items-end">
        <div className="relative bottom-[27%] sm:bottom-[29%] lg:bottom-[32%] w-fit p-12">
          <Image
            src={thunder}
            alt="thunder"
            width={800}
            height={800}
            className="absolute top-0 left-0 w-full h-auto"
          />
          <Image
            src={question}
            alt="question mark"
            width={800}
            height={800}
            className="size-32 xs:size-40 md:size-50 lg:size-60 2xl:size-70 relative opacity-85"
          />
          <Video
            className="absolute size-full top-0 left-0 mix-blend-lighten origin-center scale-280"
            src="/videos/space.mp4"
          />
        </div>
      </div>
      <Coins />
    </div>
  );
};

export default NeuronusProtects;
