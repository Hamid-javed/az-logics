import { SvgProps } from "@/types/svg";

const Mastodon = ({ className = "" }: SvgProps) => {
  return (
    <svg
      width="30"
      height="32"
      viewBox="0 0 30 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.78906 17.9157V10.8938C6.78906 6.21249 14.5912 6.21249 14.5912 10.8938M14.5912 10.8938V15.575M14.5912 10.8938C14.5912 6.21249 22.3933 6.21249 22.3933 10.8938V17.9157"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.3534 23.3762C20.0566 24.9366 28.6389 23.3762 28.6389 17.1345V10.8928C28.6389 2.31043 22.3972 0.75 19.2764 0.75H9.91383C5.23255 0.75 0.446725 2.31043 0.765051 10.8928C0.880523 13.9933 0.821227 17.7352 1.33149 21.8157C2.89191 34.2992 17.716 30.3981 20.0566 29.6179V27.2772C20.0566 27.2772 7.57319 29.6179 8.3534 23.3762Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Mastodon;
