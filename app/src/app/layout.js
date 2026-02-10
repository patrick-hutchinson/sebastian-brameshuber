import { ViewTransitions } from "next-view-transitions";

import { DeviceProvider } from "@/context/DeviceContext";
import LenisProvider from "@/context/LenisContext";

import Header from "@/components/Header/Header";
import FooterWrapper from "@/components/Footer/FooterWrapper";

import "./globals.css";
import "./fonts.css";

import { getSite } from "@/lib/sanity/fetch";

export async function generateMetadata() {
  const site = await getSite();

  return {
    title: site.title,
    description: site.google_description,
    icons: {
      icon: [
        { url: "/icons/favicon/favicon.ico" },
        { url: "/icons/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/icons/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/icons/favicon/apple-touch-icon.png" }],
      shortcut: "/icons/favicon/favicon.ico",
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
          <body>
            <LenisProvider>
              <Header />
              {children}
              <div id="portal"></div>
              <FooterWrapper site={site} />
            </LenisProvider>
          </body>
        </DeviceProvider>
      </html>
    </ViewTransitions>
  );
}
