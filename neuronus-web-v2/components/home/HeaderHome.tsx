import Header from "@/components/Header";
import HeaderCard from "@/components/home/HeaderCard";
import Curtains from "@/public/images/Curtains";
import dots from "@/public/images/dots-landing-header.png";
import Image from "next/image";
import ShadowButton from "../ShadowButton";

const HeaderHome = () => {
  return (
    <Header
      title={
        <span>
          Encrypted tools that <br /> protect your identity.
        </span>
      }
      description="Your online life stays hidden — safe, private, and in your control"
    >
      <div className="py-16 md:py-20 relative">
        <Image
          src={dots}
          alt="dots"
          width={1500}
          height={1500}
          className="w-55 md:w-65 lg:w-75 h-auto object-cover absolute top-0 left-1/2 -translate-x-[54%]"
        />
        <ShadowButton
          text="Get Started"
          classes={{ root: "w-55 md:w-65 lg:w-75 mx-auto" }}
        />
        <Curtains className="translate-y-[-15%]" />
        <HeaderCard
          classes={{
            root: "translate-y-[-3%] sm:translate-y-[-5%] md:translate-y-[-11%] lg:translate-y-[-15%]",
          }}
        />
      </div>
    </Header>
  );
};

export default HeaderHome;
