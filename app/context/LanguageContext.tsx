"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Language, t } from "../lib/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  tr: typeof t["en"];
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  tr: t["en"],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  const setLang = (l: Language) => setLangState(l);

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);