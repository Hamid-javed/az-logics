interface SectionMergerProps {
  className?: string;
  bottom?: boolean;
}

const SectionMerger = ({
  bottom = false,
  className = "",
}: SectionMergerProps) => {
  return (
    <div
      className={`w-full h-8 bg-slate blur-sm ${
        bottom ? "-translate-y-1/2" : "translate-y-1/2"
      } relative z-10 ${className}`}
    />
  );
};

export default SectionMerger;
