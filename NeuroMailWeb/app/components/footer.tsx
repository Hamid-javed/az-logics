import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white overflow-hidden">
      <div className="mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
        {/* Footer Main Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section: Logo & Social Icons */}
          <div className="md:w-1/3 text-center md:text-left mx-3 lg:ml-[125px]">
            <div className="flex justify-start md:justify-start items-center space-x-2">
              <img src="neuromail.svg" alt="" />
            </div>

            <p className="mt-4 text-[10px] text-start lg:text-sm text-gray-600 lg:w-[25vw] mx-1">
              Our platform is designed with your confidentiality in mind,
              providing a seamless and secure mailing experience without
              compromising your privacy.
            </p>

            {/* Social Icons */}
            <div className="flex justify-start md:justify-start mt-6 gap-6">
              <img src="yt.svg" alt="YouTube" className="h-5 w-5" />
              <img src="linkedin.svg" alt="LinkedIn" className="h-5 w-5" />
              <img src="x.svg" alt="X" className="h-5 w-5" />
              <img src="m.svg" alt="Medium" className="h-5 w-5" />
            </div>
          </div>

          {/* Right Section: Links */}
          <div className="flex flex- justify-between md:w-2/3">
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
