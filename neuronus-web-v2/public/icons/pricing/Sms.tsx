import { SvgProps } from "@/types/svg";

const Sms = ({ className = "" }: SvgProps) => {
  return (
    <svg
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.9578 5.17969C7.73213 5.17969 2.91504 8.79251 2.91504 17.2224V34.0823C2.91504 42.5122 7.73213 46.125 14.9578 46.125H39.0433C46.2689 46.125 51.086 42.5122 51.086 34.0823V17.2224C51.086 8.79251 46.2689 5.17969 39.0433 5.17969H14.9578ZM32.6365 25.8691C31.0469 27.1456 29.0237 27.7719 27.0005 27.7719C24.9773 27.7719 22.9301 27.1456 21.3645 25.8691L13.8258 19.8477C13.055 19.2215 12.9346 18.0654 13.5367 17.2947C14.163 16.5239 15.295 16.3794 16.0657 17.0057L23.6045 23.027C25.435 24.4962 28.542 24.4962 30.3725 23.027L37.9112 17.0057C38.682 16.3794 39.8381 16.4999 40.4402 17.2947C41.0664 18.0654 40.946 19.2215 40.1753 19.8477L32.6365 25.8691Z"
        fill="url(#paint0_radial_4_51030)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_4_51030"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(27.0005 25.6523) rotate(90) scale(20.4727 24.0855)"
        >
          <stop stopColor="#2F409D" />
          <stop offset="1" stopColor="#4962F3" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default Sms;
