import { ViewTransitions } from "next-view-transitions";

import { DeviceProvider } from "@/context/DeviceContext";
import LenisProvider from "@/context/LenisContext";

import Header from "@/components/Header/Header";
import FooterWrapper from "@/components/Footer/FooterWrapper";

import "./globals.css";
import "./fonts.css";

import { getSite } from "@/lib/sanity/fetch";

import ScrollRestorationController from "@/controllers/ScrollRestorationController";
import { ViewportProvider } from "../context/ViewportContext";

const portableTextToMetaDescription = (blocks) => {
  if (!Array.isArray(blocks)) return "";

  return blocks
    .filter((block) => block?._type === "block" && Array.isArray(block.children))
    .map((block) => block.children.map((child) => child?.text || "").join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
};

export async function generateMetadata() {
  const site = await getSite();
  const metaDescription = portableTextToMetaDescription(site?.description);

  return {
    title: site.title,
    description: metaDescription,
    icons: {
      icon: [
        { url: "/icons/favicon/favicon.ico" },
        { url: "/icons/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/icons/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/icons/favicon/favicon-180x180.png" }],
      shortcut: "/icons/favicon/favicon.ico",
    },
    openGraph: {
      title: site.title,
      description: metaDescription,
      images: [
        {
          url: "/icons/share.png", // <- your share image path
          width: 1200,
          height: 630,
          alt: site.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: metaDescription,
      images: ["/icons/share.png"],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const site = await getSite();

  return (
    <ViewTransitions>
      <html lang="en">
        <DeviceProvider>
          <ViewportProvider>
            <ScrollRestorationController />
            <body>
              <LenisProvider>
                <Header />
                {children}
                <div id="portal"></div>
                <FooterWrapper site={site} />
              </LenisProvider>
            </body>
          </ViewportProvider>
        </DeviceProvider>
      </html>
    </ViewTransitions>
  );
}
