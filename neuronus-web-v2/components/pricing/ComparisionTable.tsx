import Container from "../Container";

export interface Plan {
  title: string;
  price: string;
  buttonText: string;
  storage: string;
  email: string;
  quantumography: React.ReactNode;
  neuroScreens: React.ReactNode;
  ncnc: React.ReactNode;
  resonance: React.ReactNode;
  support: string;
  registration: React.ReactNode;
  knowledge: React.ReactNode;
  models: React.ReactNode;
}

interface ComparisionTabeProps {
  plans: Plan[];
  annual: boolean;
}

const ComparisionTable = ({ annual, plans }: ComparisionTabeProps) => {
  const FeatureClass =
    "border-r border-t border-b border-[#B4B4B4] text-left py-2 sm:py-5 xl:py-9 ps-4 xl:ps-7.5 pe-2 sm:pe-8 md:pe-14 xl:pe-18 font-semibold";
  const HeaderClass =
    "border-r border-t border-b border-[#B4B4B4] text-left py-4 sm:py-5 xl:py-9 ps-3 xl:ps-7.5 pe-6 sm:pe-8 md:pe-14 xl:pe-18 font-semibold";
  const Shadow =
    "shadow-[-64px_1276px_250px_0_rgba(0,0,0,0.00),-41px_817px_250px_0_rgba(0,0,0,0.01),-23px_459px_250px_0_rgba(0,0,0,0.05),-10px_204px_204px_0_rgba(0,0,0,0.09),-3px_51px_112px_0_rgba(0,0,0,0.10)]";
  return (
    <Container>
      <div className="rounded-[22px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${HeaderClass}`}>
                <th className="border-r border-b border-[#B4B4B4]"></th>
                {plans.map((plan, index) => (
                  <th key={plan.title} className={`${HeaderClass}`}>
                    <h1 className="text-[10px] whitespace-nowrap sm:text-sm lg:text-base xl:text-lg 2xl:text-2xl font-semibold">
                      Neuronus {plan.title}
                    </h1>
                    <div className="flex items-baseline mt-2 sm:mt-10">
                      <p className="text-[8.884px] md:text-lg lg:text-[21px]">
                        ${annual ? Number(plan.price) * 12 : plan.price}
                      </p>
                      <p className="text-[6px] sm:text-[9px] md:text-[13px] text-black/70">
                        /{annual ? "yearly" : "monthly"}
                      </p>
                    </div>
                    <button
                      className={`mt-2 mb-2 sm:mb-7 md:mb-11.5 text-[5.91px] md:text-[9px] text-[#4C67FF] whitespace-nowrap lg:text-xs 2xl:text-sm py-1.5 sm:py-3 px-3 2xl:px-10 font-normal rounded-full border border-[#4C67FF]  ${index === 2 ? " text-white bg-radial-[43.45%_44.45%_at_56.56%_20.66%,#2E3E99_0%,#4C67FF_100%,#4C67FF]" : ""}`}
                    >
                      Get {plan.buttonText}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            {/* STORAGE */}
            <tbody className="text-[8.709px] md:text-base lg:text-xl">
              <tr className="bg-white">
                <td className={`${FeatureClass}`}>Storage</td>
                {plans.map((plan) => (
                  <td
                    key={plan.title + "-storage"}
                    className="border-t border-r border-[#B4B4B4] px-5 lg:px-8.25"
                  >
                    {plan.storage}
                  </td>
                ))}
              </tr>

              {/* EMAIL */}
              <tr className="bg-white">
                <td className={`${FeatureClass}`}> Email Addresses</td>
                {plans.map((plan) => (
                  <td
                    key={plan.title + "-email"}
                    className="border border-[#B4B4B4] px-5 lg:px-8.25"
                  >
                    {plan.email}
                  </td>
                ))}
              </tr>

              {/* QUANTUMOGRAPHY */}
              <tr className={`${Shadow} bg-white`}>
                <td className={`${FeatureClass}`}>Quantumography</td>
                {plans.map((plan) => (
                  <td
                    key={plan.title + "-quantum"}
                    className="p-5 lg:p-8.25 text-[8.709px] md:text-base lg:text-xl"
                  >
                    {plan.quantumography}
                  </td>
                ))}
              </tr>

              {/* NEUROSCREENS */}
              <tr>
                <td className={`${FeatureClass}`}>NeuroScreens RDP</td>
                {plans.map((plan) => (
                  <td
                    key={plan.title + "-neuro"}
                    className="border-t border-r border-[#B4B4B4] px-5 lg:px-8.25"
                  >
                    {plan.neuroScreens}
                  </td>
                ))}
              </tr>

              {/* NCNC */}
              <tr>
                <td className={`${FeatureClass}`}>NCNC Rewards</td>
                {plans.map((plan) => (
                  <td
                    key={plan.title + "-ncnc"}
                    className="border-t border-r border-[#B4B4B4] px-5 lg:px-8.25"
                  >
                    {plan.ncnc}
                  </td>
                ))}
              </tr>

              {/* RESONANCE */}
              <tr>
                <td className={`${FeatureClass}`}>Resonance PLUS</td>
                {plans.map((plan) => (
                  <td
                    key={plan.title + "-resonance"}
                    className="border-t border-r border-[#B4B4B4] px-5 lg:px-8.25"
                  >
                    {plan.resonance}
                  </td>
                ))}
              </tr>

              {/* SUPPORT */}
              <tr>
                <td className={`${FeatureClass}`}>Support</td>
                {plans.map((plan) => (
                  <td
                    key={plan.title + "-support"}
                    className="border-t border-r border-[#B4B4B4] px-5 lg:px-8.25"
                  >
                    {plan.support}
                  </td>
                ))}
              </tr>

              {/* REGISTRATION */}
              <tr>
                <td className={`${FeatureClass}`}>Anonymous Registration</td>
                {plans.map((plan) => (
                  <td
                    key={plan.title + "-registration"}
                    className="border-t border-r border-[#B4B4B4] px-5 lg:px-8.25"
                  >
                    {plan.registration}
                  </td>
                ))}
              </tr>

              {/* ZERO KNOWLEDGE */}
              <tr>
                <td className={`${FeatureClass}`}>Zero-Knowledge</td>
                {plans.map((plan) => (
                  <td
                    key={plan.title + "-knowledge"}
                    className="border-t border-r border-[#B4B4B4] px-5 lg:px-8.25"
                  >
                    {plan.knowledge}
                  </td>
                ))}
              </tr>

              {/* AI MODELS */}
              <tr>
                <td className={`${FeatureClass}`}>AI Chat Models</td>
                {plans.map((plan) => (
                  <td
                    key={plan.title + "-models"}
                    className="border-t border-r border-[#B4B4B4] px-5 lg:px-8.25"
                  >
                    {plan.models}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default ComparisionTable;
