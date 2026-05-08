interface Option {
  label: string;
  value: string;
}

interface TabSwitcherProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TabSwitcher = ({
  options,
  value,
  onChange,
  className = "",
}: TabSwitcherProps) => {
  return (
    <div
      className={`bg-radial-[43.45%_44.45%_at_56.56%_20.66%,#2E3E99_0%,#4C67FF_100%,#4C67FF] 
      text-sm sm:text-lg font-semibold text-white w-fit p-1 rounded-full ${className}`}
    >
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`py-2 sm:py-4 px-5 sm:px-10 rounded-full cursor-pointer transition-all
              ${isActive ? "bg-white text-black" : ""}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabSwitcher;
