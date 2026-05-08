import Container from "../Container";
import Logo from "../Logo";
import {
  communication,
  company,
  finance,
  security,
  socialIcons,
  storage,
} from "@/data/footerLinks";
import Navigation from "./Navigation";
import CopyWrite from "@/public/icons/footer/CopyWrite";

const iconBg =
  "bg-[radial-gradient(43.45%_44.45%_at_56.56%_20.66%,_#2E3E99_0%,_#4C67FF_100%)]";

const Footer = () => {
  return (
    <Container className="pt-20 text-base xl:text-lg">
      <div className="pb-10 border-b border-[#7C7C7C] grid grid-cols-1 xl:grid-cols-[28%_72%] gap-10 sm:gap-14 md:gap-20 xl:gap-0">
        <div>
          <Logo classes={{ root: "mb-5" }} />
          <p className="mb-6 xl:mb-10 xs:w-2/3 md:w-1/3 lg:w-1/4 xl:w-3/4 2xl:w-2/3">
            Encrypted tools that protect your identity — without surveillance or
            data harvesting.
          </p>
          <div
            className={`flex gap-1.5 xxs:gap-3 xl:gap-0 xl:justify-between items-center`}
          >
            {socialIcons.map((item, index) => (
              <div
                key={index}
                className={`${iconBg} rounded-full size-10 xl:size-12 2xl:size-14.5 flex items-center justify-center px-2.75 xl:px-3.25 2xl:px-3.75`}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>
        <div className="xl:ps-15 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-[30%_70%] gap-10 md:gap-0">
          <Navigation title="COMPANY" links={company} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xs:gap-0 md:gap-y-7">
            <Navigation
              className="md:border-b border-black/10 md:ps-5"
              title="Communication & Privacy"
              links={communication}
            />
            <Navigation
              className="md:border-b border-black/10"
              title="Security & Infrastructure"
              links={security}
            />
            <Navigation
              className="ps-5 hidden md:block"
              title="Storage & Data"
              links={storage}
            />
            <Navigation
              className="hidden md:block"
              title="Finance & Web3"
              links={finance}
            />
          </div>
          <Navigation
            className="md:hidden"
            title="Storage & Data"
            links={storage}
          />
          <Navigation
            className="md:hidden"
            title="Finance & Web3"
            links={finance}
          />
        </div>
      </div>
      <div className="flex gap-2 xs:gap-3 flex-col sm:flex-row justify-between sm:items-center py-3 sm:py-5 text-[11px] xxs:text-xs md:text-sm lg:text-base xl:text-lg">
        <div className="flex items-center gap-2">
          <CopyWrite className="w-4 sm:w-5 h-auto" />
          <p>Copyright 2026 All rights reserved | Neuronus Computing</p>
        </div>
        <p>Privacy Policy | Terms & Conditions </p>
      </div>
    </Container>
  );
};

export default Footer;
