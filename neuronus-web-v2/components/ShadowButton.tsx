import Button from "./Button";

interface ShadowButtonProps {
  classes?: { root?: string; button?: string };
  text: string;
}

const ShadowButton = ({ text, classes = {} }: ShadowButtonProps) => {
  const { button = "", root = "" } = classes;

  return (
    <div
      className={`relative ${root} before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-2/3 before:bg-[#627AFF] before:z-0 before:rounded-full before:blur-[21px] after:content-[''] after:absolute after:-left-1.5 after:top-0 after:w-2/3 after:h-3/4 after:bg-[linear-gradient(90deg,#8A62FF_0%,#3B4999_100%)] after:z-0 after:blur-sm after:rounded-full`}
    >
      <div className="absolute size-full rounded-full bg-primary -bottom-1/2 left-0 blur-md" />
      <Button
        text={text}
        className={`border-t md:border-t-2 border-white w-full relative z-1 ${button}`}
      />
    </div>
  );
};

export default ShadowButton;
