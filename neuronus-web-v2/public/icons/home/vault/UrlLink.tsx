import { SvgProps } from "@/types/svg";

const UrlLink = ({ className = "" }: SvgProps) => {
  return (
    <svg
      width="22"
      height="10"
      viewBox="0 0 22 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 5H15M8 1H5C3.93913 1 2.92172 1.42143 2.17157 2.17157C1.42143 2.92172 1 3.93913 1 5C1 6.06087 1.42143 7.07828 2.17157 7.82843C2.92172 8.57857 3.93913 9 5 9H8M14 1H17C18.0609 1 19.0783 1.42143 19.8284 2.17157C20.5786 2.92172 21 3.93913 21 5C21 6.06087 20.5786 7.07828 19.8284 7.82843C19.0783 8.57857 18.0609 9 17 9H14"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UrlLink;
