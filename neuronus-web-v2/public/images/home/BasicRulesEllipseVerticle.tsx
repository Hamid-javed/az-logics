import { SvgProps } from "@/types/svg";

const BasicRulesEllipseVerticle = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="390"
      height="747"
      viewBox="0 0 390 747"
      fill="none"
      className={className}
    >
      <foreignObject x="-61.3904" y="-2.15995" width="512.783" height="750.75">
        <div
          style={{
            backdropFilter: "blur(1.08px)",
            clipPath: "url(#bgblur_0_4_85314_clip_path)",
            height: "100%",
            width: "100%",
          }}
        ></div>
      </foreignObject>
      <path
        d="M44.1617 561.251C15.9046 637.222 -59.2305 746.43 -59.2305 746.43H449.232C449.232 746.43 361.609 628.686 331.677 545.248C307.854 478.841 298.511 439.488 297.685 370.357C296.674 285.671 308.324 236.532 343.008 156.602C371.133 91.7839 442.151 -0.00012207 442.151 -0.00012207H-59.2305C-59.2305 -0.00012207 15.9485 95.5013 44.1617 163.46C76.3459 240.984 85.0994 288.604 83.819 370.357C82.6352 445.94 71.0899 488.853 44.1617 561.251Z"
        fill="url(#paint0_linear_4_85314)"
        fillOpacity="0.9"
      />
      <defs>
        <clipPath
          id="bgblur_0_4_85314_clip_path"
          transform="translate(61.3904 2.15995)"
        >
          <path d="M44.1617 561.251C15.9046 637.222 -59.2305 746.43 -59.2305 746.43H449.232C449.232 746.43 361.609 628.686 331.677 545.248C307.854 478.841 298.511 439.488 297.685 370.357C296.674 285.671 308.324 236.532 343.008 156.602C371.133 91.7839 442.151 -0.00012207 442.151 -0.00012207H-59.2305C-59.2305 -0.00012207 15.9485 95.5013 44.1617 163.46C76.3459 240.984 85.0994 288.604 83.819 370.357C82.6352 445.94 71.0899 488.853 44.1617 561.251Z" />
        </clipPath>
        <linearGradient
          id="paint0_linear_4_85314"
          x1="169.327"
          y1="724.957"
          x2="170.619"
          y2="8.06606"
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

export default BasicRulesEllipseVerticle;
