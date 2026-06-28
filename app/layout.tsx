import type { Metadata } from "next";
import { Public_Sans, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Leap Union (TLU) — AI-Empowered Business Solutions",
  description:
    "The Leap Union (TLU) — AI-empowered, next-gen business solution provider, from strategic design to omni-channel execution, driving growth through technology that understands business",
  verification: {
    google: "DAlBqrPhKMp3ZN2LvAexGnsBBeTEC8v0PLIzhnrpKuU",
    other: {
      "baidu-site-verification": "codeva-x7gOKaUtCF",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${notoSC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <Nav />
          <main className="flex-1 pt-[72px]">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
