import Container from "@/components/Container";
import Heading from "@/components/Heading";

const Questions = [
  "What if Neuronus gets hacked?",
  "Can governments force you to decrypt my data?",
  "What happens if I lose my password?",
  "How is this different from other 'encrypted' services?",
  "Can I verify the encryption myself?",
];

const FAQ = () => {
  return (
    <Container className="py-10 lg:py-30">
      <div className="grid gap-4.25 lg:gap-0 lg:grid-cols-[40%_60%]">
        {/* Grid1 */}
        <div>
          <p className="text-xs xs:text-base sm:text-lg md:text-[22px] font-semibold text-[#4D67FF]">
            Questions Answered
          </p>
          <Heading>Frequently Asked Questions</Heading>
          <p className=" text-xs xs:text-base sm:text-lg md:text-[22px] w-5/6 sm:w-3/4 md:w-[35vw] xl:w-[27vw]">
            Everything you need to know about our security and privacy
            practices.
          </p>
        </div>
        {/* Grid2 */}
        <div>
          <Heading>
            {Questions.map((question, index) => (
              <div
                key={`${question}-${index}`}
                className="bg-white mb-5.25 rounded-xl px-4 xs:px-5 xl:ps-8.25 xl:pe-7.5 w-full flex justify-between items-center"
              >
                <p className="py-3.5 md:py-5 lg:py-7 text-[11px] sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[22px]">
                  {question}
                </p>
                <p className="text-base md:text-xl lg:text-3xl xl:text-[32px]">
                  +
                </p>
              </div>
            ))}
          </Heading>
        </div>
      </div>
    </Container>
  );
};

export default FAQ;
