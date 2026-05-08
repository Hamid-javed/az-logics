import { SvgProps } from "@/types/svg";

const BottomEllipse = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1728"
      height="106"
      viewBox="0 0 1728 106"
      fill="none"
      className={`w-full h-auto text-primary ${className}`}
    >
      <path
        d="M0 0H1728V105.124C1728 105.124 1198.1 20.1474 856.012 20.7594C520.139 21.3603 0 105.124 0 105.124V0Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default BottomEllipse;
