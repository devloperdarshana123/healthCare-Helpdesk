



// // "use client";

// // import Link from "next/link";
// // import { Dancing_Script } from "next/font/google";

// // const cursive = Dancing_Script({
// //   subsets: ["latin"],
// //   weight: ["600", "700"],
// // });

// // export default function Navbar() {
// //   return (
// //     <header className="w-full bg-[#FFF6F1]">
// //       <nav className="px-10 py-6 flex justify-between items-center">
// //         <Link href="/#home" className={`text-xl md:text-2xl text-gray-800 ${cursive.className}`}>
// //           AI Health Helpdesk
// //         </Link>
// //         <div className="flex gap-6 text-sm">
// //           <Link href="/#home" className="nav-link">Home</Link>
// //           <Link href="/chat" className="nav-link">Chat</Link>
        
// //           <Link href="/symptom-checker" className="nav-link">Symptoms</Link>
// //           <Link href="/hospital-finder" className="nav-link">Hospitals</Link>
// //         </div>
// //       </nav>
// //       <div className="h-px bg-pink-200/70"></div>
// //     </header>
// //   );
// // }



// "use client";

// import Link from "next/link";
// import { Dancing_Script } from "next/font/google";
// import LanguageSwitcher from "../components/LanguageSwitcher";
// import { useLang } from "../context/LanguageContext";

// const cursive = Dancing_Script({
//   subsets: ["latin"],
//   weight: ["600", "700"],
// });

// export default function Navbar() {
//   const { tr } = useLang();

//   return (
//     <header className="w-full bg-[#FFF6F1]">
//       <nav className="px-10 py-6 flex justify-between items-center flex-wrap gap-3">

//         <Link href="/#home" className={`text-xl md:text-2xl text-gray-800 ${cursive.className}`}>
//           AI Health Helpdesk
//         </Link>

//         <div className="flex gap-6 text-sm">
//           <Link href="/#home" className="nav-link">{tr.home}</Link>
//           <Link href="/chat" className="nav-link">{tr.chat}</Link>
//           <Link href="/symptom-checker" className="nav-link">{tr.symptoms}</Link>
//           <Link href="/hospital-finder" className="nav-link">{tr.hospitals}</Link>
//         </div>

//         {/* 23 languages dropdown */}
//         <LanguageSwitcher />

//       </nav>
//       <div className="h-px bg-pink-200/70"></div>
//     </header>
//   );
// }



"use client";

import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useLang } from "../context/LanguageContext";

const cursive = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function Navbar() {
  const { tr } = useLang();

  return (
    <header className="w-full bg-[#FFF6F1]">
      <nav className="px-10 py-6 flex justify-between items-center flex-wrap gap-3">

        {/* LOGO */}
        <Link href="/#home" className={`text-xl md:text-2xl text-gray-800 ${cursive.className}`}>
          AI Health Helpdesk
        </Link>

        {/* LINKS */}
        <div className="flex gap-6 text-sm">
          <Link href="/#home" className="nav-link">{tr.home}</Link>
          <Link href="/#features" className="nav-link">{tr.features}</Link>
          <Link href="/#about" className="nav-link">{tr.about}</Link>
          <Link href="/chat" className="nav-link">{tr.chat}</Link>
          <Link href="/hospital-finder" className="nav-link">{tr.hospitals}</Link>
          <Link href="/symptom-checker" className="nav-link">{tr.symptoms}</Link>
        </div>

        {/* LANGUAGE SWITCHER */}
        <LanguageSwitcher />

      </nav>
      <div className="h-px bg-pink-200/70"></div>
    </header>
  );
}