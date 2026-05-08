import Link from "next/link";
import { Modal } from "../Modal";
import Warning from "@/public/icons/Warning";
import Button from "../Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const iconBg =
  "bg-[radial-gradient(43.45%_44.45%_at_56.56%_20.66%,_#2E3E99_0%,_#4C67FF_100%)]";

export const FreeAccount = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-6 lg:pt-10 text-center overflow-y-auto ">
        <h2 className="text-[23px] lg:text-[34px] font-semibold">
          Create Free Account
        </h2>

        <div className="flex items-center justify-center sm:mt-8 md:mt-10 lg:mt-12 mb-4">
          <div
            className={`flex items-center justify-center w-20 h-20 rounded-full ${iconBg}`}
          >
            <Warning />
          </div>
        </div>

        <h3 className="text-[23px] lg:text-4xl font-semibold">
          Important Note
        </h3>
        <p className="mt-2 text-[16px] md:text-xl sm:py-2 md:py-3 lg:py-3 px-6 lg:px-8  text-[rgba(0,0,0,0.71)]">
          On the next page you will see a series of 16 words. This is your
          unique and private seed and it is the ONLY way to recover your wallet
          in case of loss or manifestation. It is your responsibility to write
          it down and store it in a safe place outside of the password manager
          app
        </p>

        <Button
          text="I understand, show me my seed"
          className=" text-[12px] md:text-[19px]! px-5 md:px-16 py-2 md:py-6! mt-10"
        />
        <p className="mt-4 mb-2 text-[14px] lg:text-xl">
          Already have account?{" "}
          <Link href="/login" className="cursor-pointer text-[#36F] underline">
            Login here
          </Link>{" "}
        </p>
      </div>
    </Modal>
  );
};
