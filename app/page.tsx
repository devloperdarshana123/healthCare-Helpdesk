"use client";

import Home from "./components/Home";
import Features from "./components/Features";
import About from "./components/About";

export default function Page() {
  return (
    <>
      <section id="home">
        <Home />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="about">
        <About />
      </section>
    </>
  );
}
