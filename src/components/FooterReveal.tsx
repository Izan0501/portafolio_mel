"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function FooterReveal() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    restDelta: 0.001,
  });

  const contentY = useTransform(smoothProgress, [0, 1], [100, 0]);
  const textRevealOpacity = useTransform(smoothProgress, [0.5, 1], [0, 1]);

  return (
    <footer
      ref={containerRef}
      className="relative w-full h-[50vh] md:h-[60vh] bg-[#0a0a0a]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 left-0 w-full h-[50vh] md:h-[60vh] bg-[#0a0a0a] text-neutral-300 flex flex-col justify-between pt-16 overflow-hidden">

        {/* Asymmetrical 12-Column Editorial Grid */}
        <motion.div
          style={{ y: contentY }}
          className="container mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 lg:gap-8 z-10 w-full"
        >
          {/* Column 1: Brand Ethos (spans 5 — maximum breathing room) */}
          <div className="md:col-span-5 flex flex-col pr-0 md:pr-12 lg:pr-20">
            <div className="flex items-center gap-3 mb-4">
              <svg
                width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                className="text-white shrink-0"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                <circle cx="12" cy="13" r="3"/>
              </svg>
              <h3 className="font-serif text-2xl md:text-3xl text-white">Melina Zanacchi</h3>
            </div>
            <p className="font-sans text-xs leading-relaxed text-neutral-400">
              High-end editorial and fine-art photography. Capturing raw authenticity through the mastery of light and shadow.
            </p>
          </div>

          {/* Column 2: Studio Location (spans 2) */}
          <div className="md:col-span-2 flex flex-col">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-5">Location</p>
            <div className="font-sans text-sm text-neutral-300 space-y-1">
              <p>Tucumán, Argentina</p>
              <p className="text-neutral-500 text-xs pt-1">Available Worldwide</p>
            </div>
          </div>

          {/* Column 3: Social Connectivity (spans 2) */}
          <div className="md:col-span-2 flex flex-col">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-5">Connect</p>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors relative group w-fit flex">
                  Instagram
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors relative group w-fit flex">
                  Behance
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Inquiries (spans 3 — protects long email string) */}
          <div className="md:col-span-3 flex flex-col">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-5">Direct</p>
            <div className="font-sans text-sm space-y-3">
              <a href="mailto:hellomelinazanacchi@gmail.com" className="block text-neutral-300 hover:text-white transition-colors truncate">
                hellomelinazanacchi@gmail.com
              </a>
              <p className="text-neutral-300 hover:text-white transition-colors cursor-pointer select-all">
                +54 9 11 0000-0000
              </p>
            </div>
          </div>
        </motion.div>

        {/* Minimalist Bottom Anchor */}
        <motion.div
          style={{ opacity: textRevealOpacity }}
          className="w-full flex flex-col items-center pb-8 px-4 z-10 mt-auto"
        >
          {/* Razor-thin Architectural Divider */}
          <div className="w-[90%] md:w-[95%] h-[1px] bg-white/10 mb-6" />

          {/* Copyright & Utility Track */}
          <div className="w-[90%] md:w-[95%] flex flex-col md:flex-row justify-between items-center font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-600 gap-4 md:gap-0">
            <p>© {new Date().getFullYear()} Melina Zanacchi Studio</p>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              Back to Top
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
