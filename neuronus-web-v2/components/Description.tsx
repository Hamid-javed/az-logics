interface DescriptionProps {
  className?: string;
  text?: string;
  children?: React.ReactNode;
  white?: boolean;
  heading?: boolean;
}

const Description = ({
  text,
  className = "",
  children = null,
  white = false,
  heading = false,
}: DescriptionProps) => {
  return (
    <p
      className={`${
        heading ? "text-sm sm:text-base" : "text-xs sm:text-sm md:text-base"
      } lg:text-lg xl:text-xl 2xl:text-[22px] ${
        white ? "text-white/70" : "text-black/70"
      } ${className}`}
    >
      {text || children || "Please pass the text or children"}
    </p>
  );
};

export default Description;
