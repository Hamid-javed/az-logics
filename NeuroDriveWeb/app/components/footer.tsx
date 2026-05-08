import Link from "next/link";
import { Linkedin, Meta, X, Youtube } from "../../public/assets/Icons";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="border-t border-[#E7E7E7] bg-white ">
      <div className="mx-auto max-w-[85vw] px-4 py-6 md:py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="col-span-4">
            <div className="flex gap-1 md:gap-3 items-center">
              <img
                src="/logo.png"
                alt=""
                className="w-[30px] h-[26px] md:w-[62px] md:h-[55.34px]"
              />
              <p className="font-chakra text-[16px] md:text-[22px] text-black leading-[28px]">
                NeuroDrive
              </p>
            </div>
            <p className="mt-4 w-[77vw] md:w-auto text-[12px] md:text-sm text-[#031B1D] font-inter">
              Effortlessly store, share, and collaborate on sheets, docs, and
              files with secure, cloud-based accessibility anytime, anywhere.
            </p>
            <div className="flex items-center mt-6 md:mt-12 gap-5 md:gap-10">
              <Image src="/youtube.png" alt="Logo" width={30} height={30} />
              <Image src="/linkedin.png" alt="Logo" width={30} height={30} />
              <Image src="/x.png" alt="Logo" width={30} height={30} />
              <Image src="/meta.png" alt="Logo" width={30} height={30} />
              {/* <Linkedin />
              <X /> <Meta /> */}
            </div>
          </div>
          <div className="flex justify-between w-full">
            {footerSections.map((section) => (
              <div key={section.title} className="w-1/2 sm:w-1/3 mt-6 md:mt-0">
                <h4 className="font-semibold text-gray-900">{section.title}</h4>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={
                          link.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-[10px] lg:text-sm text-gray-600 hover:text-gray-900"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerSections = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/" },
      { label: "Services", href: "/" },
      { label: "Blog", href: "/" },
      { label: "Contact", href: "/" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Neuromail", href: "https://neuromail.space/" },
      { label: "Neurodrive", href: "https://neurodrive.me/" },
      { label: "GhostTransfer", href: "https://ghosttransfer.tech/" },
      { label: "NeuroRsa", href: "https://neurorsa.xyz" },
      { label: "Password Manager", href: "https://neuropassword.com/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Home", href: "#" },
      { label: "Benefits", href: "#benefits" },
      { label: "Features", href: "#features" },
      { label: "Collaboration", href: "#collaboration" },
      { label: "Pricing", href: "#pricing" },
      { label: "Get Products", href: "#get-products" },
    ],
  },
];
