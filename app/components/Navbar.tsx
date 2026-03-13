



"use client";

import Link from "next/link";
import { Dancing_Script } from "next/font/google";

const cursive = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function Navbar() {
  return (
    <header className="w-full bg-[#FFF6F1]">
      <nav className="px-10 py-6 flex justify-between items-center">
        <Link href="/#home" className={`text-xl md:text-2xl text-gray-800 ${cursive.className}`}>
          AI Health Helpdesk
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/#home" className="nav-link">Home</Link>
          <Link href="/#features" className="nav-link">Features</Link>
          <Link href="/#about" className="nav-link">About</Link>
          <Link href="/chat" className="nav-link">Chat</Link>
          <Link href="/#footer" className="nav-link">Footer</Link>
        </div>
      </nav>
      <div className="h-px bg-pink-200/70"></div>
    </header>
  );
}