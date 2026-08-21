"use client";

import { useState } from "react";
import { m, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

import { useLenis } from "lenis/react";

const navItems = [
  { name: "Portfolio", href: "#portfolio", view: null, id: "portfolio" },
  { name: "Vision", href: "#vision", view: null, id: "vision" },
  { name: "Gallery", href: "#gallery", view: null, id: "gallery" },
  { name: "About", href: "#about", view: "about", id: "about" },
] as const;

type NavView = "about" | null;

interface FloatingNavbarProps {
  onNavigate?: (view: NavView) => void;
  currentView?: string;
}

export function FloatingNavbar({ onNavigate, currentView = "home" }: FloatingNavbarProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState("Portfolio");
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, isAboutView: boolean) => {
    e.preventDefault();
    setActive(targetId.charAt(0).toUpperCase() + targetId.slice(1));
    
    if (isAboutView) {
      onNavigate?.("about");
      return;
    }

    if (currentView === "about") {
      onNavigate?.(null);
      // Wait for React to render the home view, then scroll
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement && lenis) {
          lenis.scrollTo(targetElement, {
            offset: -80,
            duration: 1.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement && lenis) {
      lenis.scrollTo(targetElement, {
        offset: -80,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <m.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 z-[100] flex justify-center w-full pt-6 px-4 pointer-events-none"
    >
      <m.div
        className={cn(
          "flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full pointer-events-auto transition-colors duration-500",
          isScrolled
            ? "bg-background/60 backdrop-blur-lg border border-foreground/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]"
            : "bg-transparent border-transparent"
        )}
      >
        {/* Branding — clicking logo always goes home */}
        <button
          type="button"
          onClick={() => {
            onNavigate?.(null);
            window.location.hash = "";
            setActive("Portfolio");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-2xl font-serif font-semibold italic tracking-wide text-foreground hover:opacity-80 transition-opacity duration-200"
        >
          M. Zanacchi
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => {
            const isAbout = item.view === "about";
            const isActive = isAbout
              ? currentView === "about"
              : currentView !== "about" && active.toLowerCase() === item.id;
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.id, isAbout)}
                  className={cn(
                    "relative px-4 py-2 text-[10px] font-sans font-medium uppercase tracking-[0.25em] transition-colors",
                    isActive
                      ? "text-background"
                      : "text-foreground hover:text-muted-foreground"
                  )}
                >
                  {isActive && (
                    <m.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 z-[-1] rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Call to Action */}
        <button
          type="button"
          className="px-6 py-2.5 text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-background bg-foreground rounded-full hover:scale-105 transition-transform duration-300 shadow-xl"
        >
          Book Session
        </button>
      </m.div>
    </m.nav>
  );
}
