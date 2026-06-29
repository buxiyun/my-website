"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export type Lang = "en" | "zh";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  prefixPath: (path: string) => string;
};

const LanguageContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
  prefixPath: (p: string) => p,
});

export function LanguageProvider({
  children,
  defaultLang,
}: {
  children: ReactNode;
  defaultLang?: Lang;
}) {
  const pathname = usePathname();
  const isZhRoute = pathname.startsWith("/zh");
  const [lang, setLangState] = useState<Lang>(
    defaultLang ?? (isZhRoute ? "zh" : "en")
  );

  useEffect(() => {
    if (isZhRoute || defaultLang === "zh") {
      setLangState("zh");
      return;
    }
    if (defaultLang === "en") {
      setLangState("en");
      return;
    }
    const saved = (typeof window !== "undefined" &&
      window.localStorage.getItem("tlp-lang")) as Lang | null;
    if (saved === "en" || saved === "zh") {
      setLangState(saved);
    } else if (
      typeof navigator !== "undefined" &&
      navigator.language?.toLowerCase().startsWith("zh")
    ) {
      setLangState("zh");
    }
  }, [defaultLang, isZhRoute]);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("tlp-lang", l);
    } catch {}
  };

  const toggle = () => setLang(lang === "en" ? "zh" : "en");

  const prefixPath = (path: string) =>
    isZhRoute ? `/zh${path === "/" ? "" : path}` : path;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, prefixPath }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);

/** Pick a value by language. */
export function t<T>(lang: Lang, en: T, zh: T): T {
  return lang === "zh" ? zh : en;
}
