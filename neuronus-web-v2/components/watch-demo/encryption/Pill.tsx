interface PillProps {
  text: string;
  icon?: React.ReactNode;
  className?: string;
}

const Pill = ({ text, className = "", icon = null }: PillProps) => {
  return (
    <p
      className={`bg-[#E6E7EBB5] rounded-[3.25px] text-[8px] lg:text-[9px] 2xl:text-[9.751px] px-2 lg:px-3 2xl:px-4 py-0.5 flex justify-center items-center gap-1 ${className}`}
    >
      {icon} {text}
    </p>
  );
};

export default Pill;
