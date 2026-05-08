import Heading from "@/components/Heading";
import Container from "@/components/Container";
import Background from "./Background";
import { methods, rules } from "@/data/home/basic-rules";
import SectionMerger from "@/components/SectionMerger";
import Description from "@/components/Description";

const BasicRules = ({ paymentSection = false }) => {
  return (
    <>
      <SectionMerger />
      <div className="lg:h-190 xl:h-210 2xl:h-240 relative overflow-hidden">
        <Background />

        <div className="text-center relative pt-20 sm:pt-26 lg:py-32 xl:py-36 2xl:py-40 space-y-3">
          <Heading>
            {paymentSection ? (
              "Payment Methods"
            ) : (
              <>
                We Work on <br className="lg:hidden" /> 3 Basic Rules
              </>
            )}
          </Heading>
          {paymentSection && (
            <Description
              text="30-day money-back guarantee on all paid plans"
              className="text-black/70! relative text-center"
            />
          )}
        </div>

        <Container className="relative grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-10 py-16 sm:py-20 lg:pt-5! lg:pb-0!">
          {rules.map((rule, index) => (
            <div
              key={`basic-rule-${index}`}
              className={`flex flex-col items-center text-center gap-1 xl:gap-2 ${
                index === 1
                  ? "lg:pt-6 xl:pt-10 2xl:pt-15"
                  : index === 0
                    ? "lg:pt-1 2xl:pt-2"
                    : ""
              }`}
            >
              {paymentSection ? methods[index]?.icon : rule.icon}
              <h2 className="text-xl xs:text-2xl md:text-3xl xl:text-4xl 2xl:text-[46px] font-semibold">
                {paymentSection ? methods[index]?.title : rule.title}
              </h2>
              <p
                className="text-xs xs:text-sm md:text-base xl:text-lg 2xl:text-xl"
                dangerouslySetInnerHTML={{
                  __html: paymentSection ? "" : rule.description,
                }}
              />
            </div>
          ))}
        </Container>
        {paymentSection && (
          <Description className="relative text-center mx-auto pb-20 py-0 lg:py-25 text-black!">
            <>
              Join thousands of privacy-conscious users who trust <br />{" "}
              Neuronus to protect their digital identity. No tracking. No <br />{" "}
              data mining. Just pure encryption.
            </>
          </Description>
        )}
      </div>
      <SectionMerger bottom />
    </>
  );
};

export default BasicRules;
