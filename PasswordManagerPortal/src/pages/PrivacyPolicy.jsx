
function PrivacyPolicy() {
  return (
    <div>
      <div className={`bg-[#0e1a60] lg:h-[100vh]`}>
        <div className=" w-full items-center">
          <div className="flex flex-col relative justify-center items-center text-center  bg-[#0e1a60] w-full h-full">
            <div className="text-[#E5E5E5B8] relative z-10 flex flex-col justify-start text-start items-start px-[16px] py-5 sm:px-24 sm:py-16">
              <h1 className="text-[#f7f7f7] text-[22px] leading-[30.73px]">
                Privacy Policy
              </h1>
              <p className="leading-[19.08px] font-sans  text-[13px] sm:text-[14px] text-[#E5E5E5B8]">
                NeuroRSA is designed to provide secure and private communication
                using RSA encryption. We respect your privacy and do not
                collect, store, or share any personal information.
              </p>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#101e71] px-6 py-4 mt-9">
                <p className="text-white text-[16px] sm:text-[18px] mb-3">
                  1. No Data Collection
                </p>
                <p className="font-sans ">
                  NeuroRSA does not collect any personal data, usage data,
                  device identifiers, IP addresses, or any information that can
                  identify you.
                </p>
                <p className="mt-2 font-sans ">
                  All text encryption and decryption processes occur locally on
                  your device.
                </p>
                <p className="mt-2 font-sans ">
                  We never send your data to external servers.
                </p>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#101e71] px-6 py-4 mt-5">
                <p className="text-white text-[16px] sm:text-[18px] mb-3">
                  2. No Accounts or Identity
                </p>
                <p className="font-sans ">NeuroRSA does not require:</p>
                <ul className="list-disc font-sans list-inside mt-2 ml-2">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Login account</li>
                  <li>Any personal identifiers</li>
                </ul>
                <p className="mt-2 font-sans">
                  You remain fully anonymous while using the app.
                </p>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#101e71] px-6 py-4 mt-5">
                <p className="text-white text-[16px] sm:text-[18px] mb-3">
                  3. No Storage of Messages or Keys
                </p>
                <p className="font-sans ">
                  Your encryption keys and encrypted messages are stored only on
                  your device, under your control.
                </p>
                <p className="mt-2 font-sans ">We do not have access to them.</p>
                <p className="mt-2 font-sans ">
                  If you uninstall the app or reset your device, your data will
                  be permanently removed.
                </p>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#101e71] px-6 py-4 mt-5">
                <p className="text-white text-[16px] sm:text-[18px] mb-3">
                  4. No Third-Party Services
                </p>
                <p className="font-sans ">NeuroRSA does not use:</p>
                <ul className="list-disc font-sans  list-inside mt-2 ml-2">
                  <li>Analytics services</li>
                  <li>Cloud storage</li>
                  <li>Advertising systems</li>
                  <li>Tracking frameworks</li>
                  <li>Cookies</li>
                </ul>
                <p className="mt-2 font-sans ">
                  We do not share any data with third parties.
                </p>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#101e71] px-6 py-4 mt-5">
                <p className="text-white text-[16px] sm:text-[18px] mb-3">
                  5. Security
                </p>
                <p className="font-sans ">Encryption is performed using RSA protocol.</p>
                <p className="mt-2 font-sans">
                  The privacy and confidentiality of your messages depend on the
                  security of your private key, which remains solely on your
                  device.
                </p>
              </div>
              <div className="w-full h-full flex flex-col text-[13px] sm:text-[16px] text-start items-start bg-[#101e71] px-6 py-4 mt-5">
                <p className="text-white text-[16px] sm:text-[18px] mb-3">
                  6. Contact
                </p>
                <p className="font-sans ">
                  If you have any questions regarding this Privacy Policy, you
                  may contact us at:
                </p>
                <p className="mt-2 font-sans">
                  Email:{" "}
                  <a
                    href="mailto:contact@neuronus.net"
                    className="text-white hover:underline"
                  >
                    contact@neuronus.net
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
