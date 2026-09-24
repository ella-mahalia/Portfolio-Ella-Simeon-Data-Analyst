"use client";

import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import { About } from "./components/About";
import { Resume } from "./components/Resume";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">

      {/* Background glow */}
      <div
        className="
          pointer-events-none
          fixed
          top-[-18rem]
          right-[10%]
          z-0
          h-[38rem]
          w-[38rem]
          rounded-full
          bg-primary/10
          blur-[150px]
        "
      />

      {/* Navbar + Hero */}
      <div className="relative z-10 w-full">
        <Navbar />
        <Hero />
      </div>

      {/* Portfolio needs full width */}
      <div className="relative z-10 w-full">
        <Portfolio />
      </div>

      {/* Remaining sections stay constrained */}
      <div className="relative z-10 mx-auto w-[90%] max-w-6xl">
        <About />
        <Resume />
        <Contact />
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full">
        <Footer />
      </div>

    </main>
  );
}