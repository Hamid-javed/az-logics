interface HeadingProps {
  className?: string;
  children: React.ReactNode;
}

const Heading = ({ children, className = "" }: HeadingProps) => {
  return (
    <h2
      className={`text-2xl xs:text-3xl md:text-4xl lg:text-[40px] xl:text-5xl 2xl:text-[56px] font-semibold leading-[1.15] ${className}`}
    >
      {children}
    </h2>
  );
};

export default Heading;
