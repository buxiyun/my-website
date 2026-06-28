"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Lang = "en" | "zh";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
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
  }, []);

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

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);

/** Pick a value by language. */
export function t<T>(lang: Lang, en: T, zh: T): T {
  return lang === "zh" ? zh : en;
}
