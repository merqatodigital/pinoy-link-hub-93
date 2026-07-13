import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "tl";

interface LangContextType {
  lang: Lang;
  toggle: () => void;
  t: (en: string, tl: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  toggle: () => {},
  t: (en) => en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("katwa-lang") as Lang) || "en";
    }
    return "en";
  });

  const toggle = () => {
    const next = lang === "en" ? "tl" : "en";
    setLang(next);
    localStorage.setItem("katwa-lang", next);
  };

  const t = (en: string, tl: string) => (lang === "tl" ? tl : en);

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
