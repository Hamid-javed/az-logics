interface CardDescriptionProps {
  text: string;
  className?: string;
  sm?: boolean;
  xs?: boolean;
}

const CardDescription = ({
  text,
  className = "",
  sm = false,
  xs = false,
}: CardDescriptionProps) => {
  return (
    <p
      className={`${
        sm
          ? "text-xs"
          : xs
          ? "text-[8px] lg:text-[9px] xl:text-[10px] 2xl:text-[11px]"
          : "text-[10px] lg:text-xs 2xl:text-sm"
      } ${className}`}
    >
      {text}
    </p>
  );
};

export default CardDescription;
