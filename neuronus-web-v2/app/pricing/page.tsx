import dynamic from "next/dynamic";
import Header from "@/components/Header";

const Subscription = dynamic(
  () => import("@/components/pricing/subscription"),
  {
    ssr: true,
  }
);
const FreedomPlan = dynamic(() => import("@/components/pricing/freedom-plan"), {
  ssr: true,
});
const Comparing = dynamic(
  () => import("@/components/pricing/comparing-plans"),
  { ssr: true }
);
const BasicRules = dynamic(() => import("@/components/home/basic-rules"), {
  ssr: true,
});

const PricingPage = () => {
  return (
    <>
      <Header
        title={
          <span>
            Choose Your <br /> Neuronus Computing <br /> Privacy Plan
          </span>
        }
        description="Encrypted tools that protect your identity. Your online life stays hidden — safe, private, and in your control."
        classes={{ desc: "pb-40" }}
      />
      <Subscription />
      <FreedomPlan />
      <Comparing />
      <BasicRules paymentSection={true} />
    </>
  );
};

export default PricingPage;
