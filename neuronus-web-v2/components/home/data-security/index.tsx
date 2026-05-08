import Container from "@/components/Container";
import Button from "@/components/Button";

import BottomEllipse from "@/public/images/home/BottomEllipse";
import KeySeedsCard from "./KeySeedsCard";
import MessageEncryptionCard from "./MessageEncryptionCard";
import Typography from "./Typography";
import Background from "./Background";
import Link from "next/link";
import Github from "@/public/icons/Github";

const DataSecurity = () => {
  return (
    <>
      <Typography />
      <div className="relative overflow-hidden">
        <Background />

        <Container className="relative grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-[55%_45%] gap-30 xs:gap-34 md:gap-40 lg:gap-3 xl:gap-5 2xl:gap-0 pt-20 md:pt-30 lg:pt-50 pb-14 md:pb-20 lg:pb-30">
          <KeySeedsCard />
          <MessageEncryptionCard />
        </Container>

        <div className="relative flex justify-center items-center gap-5 md:gap-8 mb-10 md:mb-5">
          <Link href="/watch-demo">
            <Button
              text="Watch Demo →"
              className="text-white w-45 xs:w-50 md:w-58 lg:w-64"
            />
          </Link>
          <Github className="text-backlight w-7 md:w-9 h-auto" />
        </div>

        <BottomEllipse className="w-full h-auto relative" />
      </div>
    </>
  );
};

export default DataSecurity;
