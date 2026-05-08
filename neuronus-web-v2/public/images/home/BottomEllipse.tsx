import { SvgProps } from "@/types/svg";

const BottomEllipse = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1728"
      height="177"
      viewBox="0 0 1728 177"
      fill="none"
      className={className}
    >
      <path
        d="M-0.224609 176.596H1729.67V0.000244141C1729.67 0.000244141 1212.74 116.641 867.638 116.94C520.314 117.241 -0.224609 0.000244141 -0.224609 0.000244141V176.596Z"
        fill="url(#paint0_linear_4_32745)"
      />
      <path
        d="M-0.224609 176.596H1729.67V0.000244141C1729.67 0.000244141 1212.74 116.641 867.638 116.94C520.314 117.241 -0.224609 0.000244141 -0.224609 0.000244141V176.596Z"
        fill="url(#paint1_linear_4_32745)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4_32745"
          x1="864.723"
          y1="176.596"
          x2="864.723"
          y2="0.000244141"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0065DE" />
          <stop offset="1" stopColor="#001650" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4_32745"
          x1="1729.67"
          y1="109.112"
          x2="818.959"
          y2="115.468"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00328F" />
          <stop offset="1" stopColor="#00123E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BottomEllipse;
