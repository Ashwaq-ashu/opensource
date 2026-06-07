import type { Metadata } from "next";
import { Montserrat, Work_Sans, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MT Constructions | Building with Integrity",
  description:
    "MT Constructions delivers high-quality commercial and residential construction projects with precision engineering and absolute reliability.",
  keywords:
    "construction, civil engineering, commercial construction, residential, renovation, MT Constructions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${workSans.variable} ${ibmPlexSans.variable}`}
    >
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
