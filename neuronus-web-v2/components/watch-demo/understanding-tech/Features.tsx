import Container from "@/components/Container";
import Description from "@/components/Description";
import Decryption from "@/public/icons/watch-demo/understanding-tech/Decryption";
import EncryptLocally from "@/public/icons/watch-demo/understanding-tech/EncryptLocally";
import GradientLock from "@/public/icons/watch-demo/understanding-tech/Lock";
import PrivateKey from "@/public/icons/watch-demo/understanding-tech/PrivateKey";
import BasicRulesEllipse from "@/public/images/home/BasicRulesEllipse";
import BasicRulesEllipseVerticle from "@/public/images/home/BasicRulesEllipseVerticle";

const Features = () => {
  const features = [
    {
      title: (
        <span>
          Encrypted locally <br /> before upload
        </span>
      ),
      icon: EncryptLocally,
    },
    {
      title: (
        <span>
          No private key <br /> access by servers
        </span>
      ),
      icon: PrivateKey,
    },
    {
      title: (
        <span>
          You control the <br /> decryption
        </span>
      ),
      icon: Decryption,
    },
    {
      title: (
        <span>
          Mathematically <br /> provable privacy
        </span>
      ),
      icon: GradientLock,
    },
  ];

  return (
    <div className="relative w-full">
      <div className="w-32 lg:w-65 xl:w-75 2xl:w-83 h-32 lg:h-47 xl:h-57 2xl:h-67 rounded-full bg-[#0180EA] blur-[60px] lg:blur-[150px] absolute top-[25%] lg:top-1/2 -translate-y-1/2 left-1/5 2xl:left-1/4" />
      <div className="w-32 lg:w-65 xl:w-75 2xl:w-83 h-32 lg:h-70 xl:h-80 2xl:h-87 rounded-full bg-[#7CCDF4] blur-[60px] lg:blur-[150px] absolute top-[90%] lg:top-1/2 -translate-y-1/2 right-1/5 2xl:right-1/4" />

      <BasicRulesEllipse className="absolute w-full h-full object-cover hidden lg:block" />
      <BasicRulesEllipseVerticle className="lg:hidden absolute size-full object-cover" />
      <Container className="relative py-20 md:py-30 lg:py-0 grid grid-cols-1 lg:grid-cols-4 gap-16 md:gap-20 lg:gap-0 lg:h-150 xl:h-170 2xl:h-200 items-center">
        {features.map((feature, i) => (
          <div
            className="flex flex-col gap-3 items-center justify-center text-center"
            key={`understanding-tech-feature-${i}`}
          >
            <feature.icon className="w-8 sm:w-10 lg:w-12 xl:w-auto h-auto" />
            <Description className="font-semibold text-black!">
              {feature.title}
            </Description>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Features;
