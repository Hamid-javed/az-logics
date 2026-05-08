interface CardTitleProps {
  text: string;
  className?: string;
}

const CardTitle = ({ text, className = "" }: CardTitleProps) => {
  return (
    <h1
      className={`text-lg lg:text-xl xl:text-2xl 2xl:text-[27px] font-semibold ${className}`}
    >
      {text}
    </h1>
  );
};

export default CardTitle;
