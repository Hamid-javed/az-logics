import Container from "@/components/Container";
import Button from "../Button";
import Search from "@/public/icons/home/accessNetork/Search";
import ProcessCard from "./ProcessCard";
import Image from "next/image";
import brain from "@/public/images/neuronus-brain/top-ideas-brain.png";
import brainBg from "@/public/images/neuronus-brain/brain-bg.png";
import { processData } from "@/data/processData";

const Process = () => {
  const buttonClasses = "text-[9px] sm:text-xs md:text-base! whitespace-nowrap";
  return (
    <Container className="grid grid-cols-1 lg:grid-cols-2 pt-20 gap-4 sm:gap-10">
      <div>
        <div className="w-full overflow-x-auto md:overflow-hidden">
          <div className="flex w-fit gap-5 justify-center lg:justify-start">
            <Button
              text="Top Ideas"
              className={`${buttonClasses} min-w-32.5 sm:min-w-43.5`}
            />
            <Button
              text="Newest"
              white
              className={`${buttonClasses} min-w-21.25 sm:min-w-31.25`}
            />
            <Button
              text="Oldest"
              white
              className={`${buttonClasses} min-w-21.25 sm:min-w-31.25`}
            />
            <Button
              text="Implemented"
              white
              className={`${buttonClasses}  min-w-25 sm:min-w-35`}
            />
          </div>
        </div>
        <div className="flex lg:hidden items-center mt-5 mx-auto gap-2 py-3 px-3 bg-white rounded-full min-w-35 max-w-1/2 h-fit ">
          <Search />
          <input
            type="text"
            placeholder="Search Ideas"
            className="outline-none w-full"
          />
        </div>
        <div className="relative size-fit">
          <Image
            src={brainBg}
            alt="brain background"
            className="mix-blend-color-dodge"
          />
          <Image
            src={brain}
            alt="brain"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <h1 className="text-2xl sm:text-[26px] md:text-[28px] lg:text-3xl font-semibold">
          Coming Soon...
        </h1>
        <p className="text-xl">
          Have an idea? Share on
          <span className="text-backlight">grow@neuronus.net</span> <br /> Ideas
          with 50+ votes enter our official review process by our privacy
          engineering team.
        </p>
      </div>
      <div className="flex flex-wrap gap-5 w-full">
        <div className="hidden lg:flex items-center gap-2 py-4 px-3 bg-white rounded-full min-w-35 max-w-35 flex-1 h-fit ">
          <Search />
          <input
            type="text"
            placeholder="Search Ideas"
            className="outline-none w-full"
          />
        </div>
        <div className="space-y-5">
          {processData.map((item, index) => (
            <ProcessCard key={`process-${index}`} {...item} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Process;
