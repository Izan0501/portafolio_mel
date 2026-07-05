"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Portfolio", href: "#portfolio" },
  { name: "Vision", href: "#vision" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export function FloatingNavbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState("Portfolio");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide navbar if scrolling down and passed the 150px mark
    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    // Add glass effect if scrolled past 50px
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 z-[100] flex justify-center w-full pt-6 px-4 pointer-events-none"
    >
      <motion.div
        className={cn(
          "flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full pointer-events-auto transition-colors duration-500",
          isScrolled
            ? "bg-background/60 backdrop-blur-lg border border-foreground/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]"
            : "bg-transparent border-transparent"
        )}
      >
        {/* Branding */}
        <span className="text-2xl font-serif font-semibold italic tracking-wide text-foreground">
          M. Zanacchi
        </span>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={() => setActive(item.name)}
                className={cn(
                  "relative px-4 py-2 text-[10px] font-sans font-medium uppercase tracking-[0.25em] transition-colors",
                  active === item.name
                    ? "text-background"
                    : "text-foreground hover:text-muted-foreground"
                )}
              >
                {active === item.name && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 z-[-1] rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Call to Action */}
        <button className="px-6 py-2.5 text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-background bg-foreground rounded-full hover:scale-105 transition-transform duration-300 shadow-xl">
          Book Session
        </button>
      </motion.div>
    </motion.nav>
  );
}
