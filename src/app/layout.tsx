import { Instrument_Serif, Work_Sans } from "next/font/google";
import { Navigator } from "@/components/Navigator";
import { RevealManager } from "@/components/RevealManager";
import { Pretext } from "@/components/Pretext";

import { SovereignOverlay } from "@/components/SovereignOverlay";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-display",
});

const workSans = Work_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-body",
});

import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Africa Advisory | Africa’s Dealmaker",
  description: "Specialist pan-African trade and project finance advisory firm focused on world-class, strategic, and workable financing solutions across African markets.",
  keywords: ["Africa Advisory", "Project Finance", "Trade Finance", "Debt Resolution", "Bruce Jewels", "Africa Dealmaker"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} ${workSans.variable} font-body antialiased bg-background text-foreground`}>

        <Pretext>
          <SovereignOverlay />
          <Navigator />
          <RevealManager />
          <main id="main-content">
            {children}
          </main>
        </Pretext>
      </body>
    </html>
  );
}
