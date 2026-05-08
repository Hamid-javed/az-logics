import Container from "@/components/Container";
import Description from "@/components/Description";
import Heading from "@/components/Heading";

const Typography = () => {
  return (
    <Container className="text-center">
      <h5 className="text-sm lg:text-base 2xl:text-lg bg-white px-4 py-2 rounded-full w-fit mx-auto mb-2">
        Data security
      </h5>
      <Heading className="mb-3 xs:mb-5">
        End-to-end encryption with <br className="hidden xs:inline" />{" "}
        AES-256-GCM, PBKDF2 & RSA <br className="hidden xs:inline" /> protection
      </Heading>
      <Description
        className="w-full lg:w-3/4 2xl:w-2/3 mx-auto"
        text="Your data is secured by default with SEED-based key derivation, local
          private key encryption, HKDF, and Zero-Knowledge
          protocols—guaranteeing true privacy and trust for every user."
      />
    </Container>
  );
};

export default Typography;
