


"use client";

import Link from "next/link";
import { Dancing_Script } from "next/font/google";
// import LanguageSwitcher from "../components/LanguageSwitcher";
// import { useLang } from "../context/LanguageContext";
import { useEffect, useState } from "react";           // ← ADD
import { auth } from "../lib/firebase";                // ← ADD
import { onAuthStateChanged, signOut } from "firebase/auth"; // ← ADD
import { useRouter } from "next/navigation";           // ← ADD

const cursive = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function Navbar() {
  // const { tr } = useLang();
  const router = useRouter();                          // ← ADD
  const [user, setUser] = useState(null);              // ← ADD

  // ← ADD: Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ← ADD: Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <header className="w-full bg-[#FFF6F1]">
      <nav className="px-10 py-6 flex justify-between items-center flex-wrap gap-3">

        {/* LOGO */}
        <Link href="/#home" className={`text-xl md:text-2xl text-gray-800 ${cursive.className}`}>
          AI Health Helpdesk
        </Link>

        {/* LINKS */}
        <div className="flex gap-6 text-sm">
          <Link href="/#home" className="nav-link">home</Link>
    
          <Link href="/chat" className="nav-link">chat</Link>
          <Link href="/hospital-finder" className="nav-link">hospitals</Link>
          <Link href="/symptom-checker" className="nav-link">symptoms</Link>
          <Link href="/doctors" className="nav-link">Doctors</Link>
          <Link href="/ambulance-tracker" className="nav-link">Ambulance</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* <LanguageSwitcher /> */}

          {/* ← ADD: Auth buttons */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 hidden md:block">
                {user.displayName || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-1.5 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-full border border-pink-300 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm px-4 py-1.5 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition"
            >
              Login
            </Link>
          )}
        </div>

      </nav>
      <div className="h-px bg-pink-200/70"></div>
    </header>
  );
}