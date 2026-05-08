import Button from "@/components/Button";
import Container from "@/components/Container";
import Description from "@/components/Description";
import Heading from "@/components/Heading";
import EncryptionCenter from "./EncryptionCenter";
import EncryptionAnimation from "./EncryptionAnimation";
import BasicRulesEllipse from "@/public/images/home/BasicRulesEllipse";
import BasicRulesEllipseVerticle from "@/public/images/home/BasicRulesEllipseVerticle";

const NextGenEncryption = () => {
  return (
    <section className="pt-20">
      <Container className="text-center">
        <Heading className="mb-3 md:mb-5">
          Next-Gen Encryption for <br /> Real-World Privacy
        </Heading>
        <Description
          text="Protect your identity with AI-secure tools built for absolute safety, anonymity, and control."
          className="mb-10 xs:mb-12 lg:mb-16"
        />
        <Button text="Get Started →" className="mx-auto w-48 md:w-54 lg:w-64" />
      </Container>
      <div className="relative my-20 lg:my-0">
        <BasicRulesEllipse className="relative w-full h-auto object-cover hidden lg:block" />
        <BasicRulesEllipseVerticle className="lg:hidden w-full h-250 object-cover" />
        <EncryptionCenter />
        <EncryptionAnimation />
      </div>
    </section>
  );
};

export default NextGenEncryption;
