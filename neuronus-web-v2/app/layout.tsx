import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppContextsProvider } from "@/providers";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";

export const viewport: Viewport = {
  themeColor: "#0A1628",
};
export const metadata: Metadata = {
  title: "Neuronus — Encrypted Privacy Tools for Anonymous Digital Life",
  description:
    "Encrypted, anonymous digital tools built on Zero-Knowledge architecture. Email, cloud storage, messaging, browser — no name, no tracking, no compromise.",

  keywords: [
    "encrypted tools",
    "privacy software",
    "anonymous email",
    "zero-knowledge encryption",
    "private cloud storage",
    "encrypted messenger",
    "privacy-first",
    "no tracking",
    "anonymous registration",
    "PGP email",
    "secure browser",
  ],

  metadataBase: new URL("https://neuronus.net"),

  applicationName: "Neuronus",
  authors: [{ name: "Neuronus Computing" }],

  alternates: {
    canonical: "https://neuronus.net",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "Neuronus",
    title: "Neuronus — Encrypted Privacy Tools for Anonymous Digital Life",
    description:
      "Encrypted, anonymous digital tools built on Zero-Knowledge architecture. One seed login, all tools. No name required, no data collected.",
    url: "https://neuronus.net",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Neuronus — Encrypted tools that protect your identity",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@NeuronusHQ",
    title: "Neuronus — Encrypted Privacy Tools for Anonymous Digital Life",
    description:
      "Email, storage, messaging, browser — all encrypted, all anonymous. Zero-Knowledge architecture. No name required.",
    images: [
      {
        url: "/images/og-image.png",
        alt: "Neuronus — Encrypted tools that protect your identity",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Neuronus Computing",
              url: "https://neuronus.net",
              logo: "https://neuronus.net/logo.png",
              description:
                "Encrypted, anonymous digital tools built on Zero-Knowledge architecture. Privacy as a default standard.",
              foundingDate: "2024",
              sameAs: ["https://x.com/NeuronusHQ"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "support@neuronus.net",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Neuronus",
              applicationCategory: "SecurityApplication",
              operatingSystem: "Web",
              description:
                "Suite of encrypted, anonymous digital tools: email, cloud storage, messenger, password manager, browser — all connected by one anonymous login.",
              url: "https://neuronus.net",
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "0",
                highPrice: "50",
                priceCurrency: "USD",
                offerCount: "5",
              },
              provider: {
                "@type": "Organization",
                name: "Neuronus Computing",
                url: "https://neuronus.net",
              },
            }),
          }}
        />
      </head>

      <body>
        <AppContextsProvider>
          {children}
          <Footer />
          <Sidebar />
        </AppContextsProvider>

        <ToastContainer position="top-right" autoClose={4000} theme="colored" />
      </body>
    </html>
  );
}
