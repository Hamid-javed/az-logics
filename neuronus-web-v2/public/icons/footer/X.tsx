import { SvgProps } from "@/types/svg";

const X = ({ className = "" }: SvgProps) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.0823 10.2396L22.891 0H20.8034L13.1551 8.89071L7.04607 0H0L9.23795 13.4445L0 24.1821H2.0876L10.1648 14.7932L16.6161 24.1821H23.6622L14.0817 10.2396H14.0823ZM11.2232 13.5628L10.287 12.2241L2.8397 1.57146H6.0461L12.0559 10.1686L12.9918 11.5073L20.8044 22.6821H17.5984L11.2232 13.5633V13.5628Z"
        fill="white"
      />
    </svg>
  );
};

export default X;
