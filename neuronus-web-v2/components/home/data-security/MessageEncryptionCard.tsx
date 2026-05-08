import Arrow from "@/public/images/home/Arrow";
import LockSwitch from "@/public/images/home/LockSwitch";
import HeadingBadge from "./HeadingBadge";
import MovingCursor from "./MovingCursor";
import Video from "@/components/Video";

const MessageEncryptionCard = () => {
  return (
    <div className="relative rounded-xl bg-white/75 border-3 border-white px-2 xl:px-12.5 pb-7.25 my-1.5 2xl:ml-7">
      <HeadingBadge className="p-2.5 xl:p-3 relative">
        {/* Lock and arrow */}
        <div className="absolute -top-20 xs:-top-25 md:-top-32 right-0 xs:-right-18 md:-right-23">
          <LockSwitch className="w-15 md:w-19.5 h-auto" />
          <Arrow className="w-10 md:w-13.25 h-auto translate-x-4/5 xs:translate-x-0 -translate-y-4 xs:translate-y-0 -rotate-30 xs:rotate-0 ms-auto xs:ms-0" />
        </div>
        We see only <span className="text-backlight">Encrypted noise.</span>
      </HeadingBadge>

      <p className="text-center text-[9px] xxs:text-[10px] xs:text-xs sm:text-sm 2xl:text-[15px]">
        -----BEGIN PGP MESSAGE----- <br />
        wcFMAwNTFJplHjgDARAArCpNitNpkyYZd6t6+M1fNdXt2WnU1hBbqGa <br />{" "}
        XQYAJUiWN1KT5SvzTka5EtwnBcWPbVpKAEfh0X4TuF/vGg+e9/ <br />{" "}
        bru5WkrgCHNyMHjSvay7sYd UlevwsrC4 <br />{" "}
        VjdZTkdDfG6M6kONX9WQZUzvqo96pLmk7GJmuRiAS7ve+IACi1Zh <br /> OSV
        dR3AZR4OAftCX3l9QWFO7KzUEDbn6nqSxV1yC/ <br /> CIPdUJvfPR2WBZapzBKMVlaCLn
        RQ7w5WAGaESx4OzI1RerXk/ <br /> BifD+CgnX8Mo9EnuoxzqE/QATd+tMiMhV83RHRqev{" "}
        <br />
        IkrZkJJl0UCQBxltjsM2ivx/ <br /> KArTYPzLiTugXYvWPZU3llphbuZMa8O7s5WUmBHB{" "}
        <br />
        FShSKgABO8nvQfs87FxxLwLYBcG0A031/ <br /> FSesGoUuQMx9I1fIH4zSU54M9/0uEGd
        4krWpwXYF9g2Cl5/ <br /> Ie1AZ9yvk2l44edW8gur9tx/0jqRg30ITCT4DkpNJHqPRAtN{" "}
        <br />
        3zhd2yKu6eG2efzlXXw1HGirt437Fx1QpiK41NDg8Ov4+1o4BLaDB8bK- <br /> ----END
        PGP MESSAGE-----
      </p>

      {/* Lock Video */}
      <Video
        className="absolute w-full h-1/2 object-cover top-1/2 -translate-y-1/2 left-0 mix-blend-screen"
        src="/videos/data-security-lock.mp4"
      />

      {/* Cursor */}
      <MovingCursor />
    </div>
  );
};

export default MessageEncryptionCard;
