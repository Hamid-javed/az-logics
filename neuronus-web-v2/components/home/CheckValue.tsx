import Container from "../Container";
import Growth from "@/public/icons/Growth";

const CheckValue = () => {
  return (
    <Container className="sm:px-15 md:px-30 lg:px-0 xl:px-20 -translate-y-4/5 md:-translate-y-full lg:translate-y-[-160%]">
      <div className="rounded-xl py-4.5 xs:py-6.5 px-4 sm:px-6 lg:px-8 bg-white shadow-[-10px_45px_101px_0_rgba(0,0,0,0.10)] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <h3 className="text-sm xs:text-base sm:text-lg lg:text-xl 2xl:text-2xl">
          <span className="underline">Check Value</span>{" "}
          <span className="text-black/50">flow for the neuronus project</span>
        </h3>
        <h4 className="text-xs xs:text-sm sm:text-base lg:text-lg 2xl:text-[22px] space-x-3 xs:space-x-5 text-black/70">
          <span>1 NCNC = $0.02</span>
          <span className="text-[#00B23E] bg-[#4BFF693B] border border-[#00B23E] rounded-[5px] py-1.75 px-4">
            <Growth className="inline-block" /> +25% Growth
          </span>
          <span>vs. last period</span>
        </h4>
      </div>
    </Container>
  );
};

export default CheckValue;
