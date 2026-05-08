interface SliderCardPillProps {
  className?: string;
  dark?: boolean;
  text: string;
}

const SliderCardPill = ({
  className = "",
  dark = false,
  text,
}: SliderCardPillProps) => {
  return (
    <h3
      className={`rounded-full ${
        dark ? "bg-[#E2EAFF]" : "bg-[#ECF2FF]"
      } px-5.25 py-1 text-sm sm:text-base 2xl:text-lg w-fit ${className}`}
    >
      {text}
    </h3>
  );
};

export default SliderCardPill;
