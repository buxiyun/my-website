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
  metadataBase: new URL("https://www.theleapunion.com"),
  title: {
    default: "The Leap Union (TLU) — AI-Empowered Business Solutions",
    template: "%s | TLU",
  },
  description:
    "The Leap Union (TLU) — AI-empowered, next-gen business solution provider, from strategic design to omni-channel execution, driving growth through technology that understands business",
  openGraph: {
    siteName: "The Leap Union",
    type: "website",
    locale: "en_US",
    images: [{ url: "/world-map.png", width: 1200, height: 630, alt: "TLU global coverage" }],
  },
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
      suppressHydrationWarning
      className={`${publicSans.variable} ${notoSC.variable} h-full antialiased`}
    >
      <head>
        {/* Set correct lang before first paint — runs synchronously before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.lang=location.pathname.indexOf('/zh')===0?'zh-CN':'en'})()`,
          }}
        />
      </head>
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
