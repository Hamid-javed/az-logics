interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
}
const FeatureCard = ({ icon, title }: FeatureCardProps) => {
  return (
    <div className="bg-[linear-gradient(0deg,#D0DDFF_0%,#D0DDFF_100%),radial-gradient(66.39%_66.39%_at_50%_33.61%,#4C67FF_0%,#2563EB_100%)] bg-radial-[66.39%_66.39%_at_50%_33.61%,#4C67FF_0%,#2563EB_100%] rounded-[15.77px] p-10 flex flex-col items-center">
      <div className="bg-slate rounded-[22px] flex items-center justify-center size-13 sm:size-14 lg:size-21">
        {icon}
      </div>

      <p className="text-center max-w-60 mt-4 text-xs sm:text-[15px] xl:text-lg 2xl:text-[22px] font-semibold">
        {title}
      </p>
    </div>
  );
};

export default FeatureCard;
