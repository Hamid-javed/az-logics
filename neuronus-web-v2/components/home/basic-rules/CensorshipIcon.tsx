import Compas from "@/public/icons/home/Compas";

const CensorshipIcon = () => {
  return (
    <div className="relative size-8 sm:size-10 xl:size-13 2xl:size-17 bg-linear-to-r from-[#91A2FF] to-[#576199] p-0.5 rounded-[5px]">
      <div
        className={`size-full rounded-[5px] flex justify-center items-center bg-radial-[54.44%_55.7%_at_56.56%_20.66%,#2E3E99_0%,#5A73FF_100%]`}
      >
        <Compas className="animate-spin-reverse w-4.5 sm:w-5.5 xl:w-7 2xl:w-9 h-auto" />
      </div>
    </div>
  );
};

export default CensorshipIcon;
