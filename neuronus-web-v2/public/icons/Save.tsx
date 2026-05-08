import { SvgProps } from "@/types/svg";

const Save = ({ className = "" }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      className={className}
    >
      <path
        d="M9.84961 12.3418L12.5546 15.0468L15.2596 12.3418"
        stroke="black"
        strokeWidth="0.904519"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5527 4.22656V14.9725"
        stroke="black"
        strokeWidth="0.904519"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.1346 12.8711C21.1346 17.5414 17.9647 21.3241 12.6816 21.3241C7.39841 21.3241 4.22852 17.5414 4.22852 12.8711"
        stroke="black"
        strokeWidth="0.904519"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Save;
