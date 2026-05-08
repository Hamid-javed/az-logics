import Neuronus from "@/public/icons/Neuronus";

interface LogoProps {
  light?: boolean;
  classes?: { root?: string; text?: string; icon?: string };
}

const Logo = ({ classes, light = false }: LogoProps) => {
  const { icon = "", root = "", text = "" } = classes || {};

  return (
    <div className={`flex items-center gap-2 ${root}`}>
      <Neuronus className={`w-7 sm:w-8 2xl:w-9.25 h-auto ${icon}`} />
      <h1
        className={`text-base sm:text-lg 2xl:text-[20px] font-NeueBold leading-none ${text} ${
          light ? "text-white" : "text-black"
        }`}
      >
        Neuronus <br />
        Computing
      </h1>
    </div>
  );
};

export default Logo;
