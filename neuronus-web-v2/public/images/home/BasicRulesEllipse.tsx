import { SvgProps } from "@/types/svg";

const BasicRulesEllipse = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1694"
      height="757"
      viewBox="0 0 1694 757"
      fill="none"
      className={className}
    >
      <foreignObject x="-40.3574" y="-6" width="1740" height="768.584">
        <div
          style={{
            backdropFilter: "blur(3px)",
            clipPath: "url(#bgblur_0_4_32407_clip_path)",
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>
      <path
        d="M394.335 153.846C218.461 111.8 -34.3574 0 -34.3574 0V756.583C-34.3574 756.583 238.222 626.202 431.382 581.663C585.116 546.215 676.218 532.312 836.258 531.084C1032.31 529.579 1146.07 546.914 1331.11 598.523C1481.16 640.373 1693.64 746.046 1693.64 746.046V0C1693.64 0 1472.55 111.865 1315.23 153.846C1135.76 201.735 1025.52 214.76 836.258 212.855C661.281 211.093 561.937 193.914 394.335 153.846Z"
        fill="url(#paint0_linear_4_32407)"
        fillOpacity="0.9"
      />
      <defs>
        <clipPath
          id="bgblur_0_4_32407_clip_path"
          transform="translate(40.3574 6)"
        >
          <path d="M394.335 153.846C218.461 111.8 -34.3574 0 -34.3574 0V756.583C-34.3574 756.583 238.222 626.202 431.382 581.663C585.116 546.215 676.218 532.312 836.258 531.084C1032.31 529.579 1146.07 546.914 1331.11 598.523C1481.16 640.373 1693.64 746.046 1693.64 746.046V0C1693.64 0 1472.55 111.865 1315.23 153.846C1135.76 201.735 1025.52 214.76 836.258 212.855C661.281 211.093 561.937 193.914 394.335 153.846Z" />
        </clipPath>
        <linearGradient
          id="paint0_linear_4_32407"
          x1="15.3529"
          y1="340.09"
          x2="1674.96"
          y2="344.741"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="0.509615" stopColor="white" />
          <stop offset="0.975962" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BasicRulesEllipse;
