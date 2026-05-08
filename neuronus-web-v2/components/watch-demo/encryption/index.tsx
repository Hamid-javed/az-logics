"use client";
import Description from "@/components/Description";
import Heading from "@/components/Heading";
import EncryptMessage from "./EncryptMessage";
import SignupFlow from "./SignupFlow";
import { useState } from "react";
import Container from "@/components/Container";
import TabSwitcher from "@/components/TabSwitcher";
import { CryptoProvider, useCrypto } from "../../../context/CryptoContext";

function DemoInner() {
  const { activeTab, setActiveTab } = useCrypto();

  return (
    <div className=" min-h-screen py-8">
      <TabSwitcher
        options={[
          { label: "Signup Flow", value: "signup" },
          { label: "Encrypt Message", value: "encrypt" },
        ]}
        value={activeTab}
        onChange={(v) => setActiveTab(v as "signup" | "encrypt")}
        className="mx-auto mb-5"
      />
      {activeTab === "signup" ? <SignupFlow /> : <EncryptMessage />}
    </div>
  );
}

const Encryption = () => {
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <Container className="pb-16 md:pb-32 lg:pb-40 pt-12 md:pt-16 lg:pt-20">
      <Heading className="text-center mb-2.5">
        See Encryption in Real-Time
      </Heading>
      <Description
        text="Watch how your data transforms from readable text to encrypted ciphertext, all within your browser."
        className="text-black text-center w-[95%] sm:w-[90%] lg:w-1/2 mx-auto"
      />

      <CryptoProvider>
        <DemoInner />
      </CryptoProvider>
    </Container>
  );
};

export default Encryption;
