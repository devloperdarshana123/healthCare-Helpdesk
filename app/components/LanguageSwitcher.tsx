// "use client";

// import { useLang } from "@/context/LanguageContext";
// import { LANGUAGES } from "@/lib/translations";

// export default function LanguageSwitcher() {
//   const { lang, setLang } = useLang();

//   return (
//     <div className="flex gap-1">
//       {LANGUAGES.map((l) => (
//         <button
//           key={l.code}
//           onClick={() => setLang(l.code as any)}
//           className={`text-xs px-2.5 py-1 rounded-full transition ${
//             lang === l.code
//               ? "bg-pink-400 text-white"
//               : "border border-gray-200 text-gray-500 hover:border-pink-300"
//           }`}
//         >
//           {l.flag} {l.label}
//         </button>
//       ))}
//     </div>
//   );
// }



"use client";

import { useState, useRef, useEffect } from "react";
import { useLang } from "../context/LanguageContext";
import { LANGUAGES } from "../lib/translations";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find(l => l.code === lang);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-pink-300 transition"
      >
        {current?.flag} {current?.label} ▾
      </button>

      {open && (
        <div className="absolute right-0 top-9 bg-white border border-gray-100 rounded-2xl shadow-lg z-50 w-44 max-h-72 overflow-y-auto py-2">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code as any); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2 transition ${
                lang === l.code
                  ? "bg-pink-50 text-pink-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}