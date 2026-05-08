import Button from "@/components/Button";
import Header from "@/components/Header";
import Image from "next/image";
import brain from "@/public/images/neuronus-brain/brain.png";
import Video from "@/components/Video";
import Process from "@/components/neuronus-brain";
import Ask from "@/public/icons/neuro-brain/Ask";

const NeuronusBrain = () => {
  return (
    <>
      <Header
        title={
          <span>
            Grow <br /> the Neuronus Brain
          </span>
        }
        description={
          <span>
            Share your ideas.Vote on what matters. <br /> Ideas with
            <span className="text-backlight"> 50+ votes </span>
            enter our review process.
          </span>
        }
        classes={{
          rightImg: "translate-x-1/2",
          leftImg: "top-1/2! -translate-y-1/2",
        }}
      >
        <div className="flex justify-center items-center gap-5 pb-65 lg:pb-0">
          <Button text="Submit Ideas" className="w-52 my-10" />
          <Ask />
        </div>
        <div className="absolute bottom-5 lg:bottom-[10%] right-0 size-full lg:size-fit flex justify-center items-end">
          <div className="relative size-fit">
            <Video
              src="/videos/Neuronus-Brain-light-Circle.mp4"
              className="absolute top-[8%] left-1/2 -translate-x-1/2 size-3/4 object-cover mix-blend-color-dodge"
            />
            <Image
              src={brain}
              alt="Neuronus Brain"
              className="relative mix-blend-lighten w-70 xl:w-84 h-auto"
            />
          </div>
        </div>
      </Header>
      <Process />
    </>
  );
};

export default NeuronusBrain;
