"use client";

import { useRef } from "react";
import { m } from "framer-motion";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { AboutSection3 } from "@/components/AboutSection3";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const pillars = [
  {
    number: "01",
    title: "Environmental Synergy",
    body: "Every location is a co-author. Melina reads raw natural light, architectural geometry, and atmospheric texture to make the environment an active, breathing participant in the story—never a passive backdrop.",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop",
  },
  {
    number: "02",
    title: "Editorial Retouching",
    body: "The digital darkroom is treated with the same reverence as the set itself. Subtle color grading, frequency-separation retouching, and hand-dodged shadows achieve magazine-grade polish while fiercely protecting the subject's authentic skin texture.",
    imageUrl:
      "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=2000&auto=format&fit=crop",
  },
  {
    number: "03",
    title: "Tailored Direction",
    body: "A session with Melina is a collaborative, immersive experience. Her direction is precise yet intuitive—guiding subjects into positions that feel genuinely empowered, effortlessly photogenic, and wholly themselves.",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop",
  },
];

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────


// CRITICAL PERFORMANCE FIX: Strip blur filters to prevent GPU layout thrashing on mobile/desktop
const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.15, // Smooth, rapid cascade without blocking main thread
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98], // Custom editorial easing
    },
  }),
  hidden: {
    y: 20,
    opacity: 0,
  },
};

const scaleVariants = {
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
};

function AboutMelinaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full bg-neutral-950 py-24 md:py-32 px-6" ref={sectionRef}>
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-12 lg:gap-24">
        {/* Left Column */}
        <div className="w-full xl:w-1/2 flex flex-col">
          <TimelineContent animationNum={0} timelineRef={sectionRef} customVariants={revealVariants}>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-medium text-white/50 border border-white/10 px-4 py-1.5 rounded-full">
                THE ARTIST & DIRECTION
              </span>
              <div className="flex gap-3">
                {["Instagram", "Behance", "Vogue"].map((social) => (
                  <a
                    key={social}
                    href={`#${social.toLowerCase()}`}
                    className="text-[10px] uppercase tracking-[0.1em] font-sans text-white/40 hover:text-white transition-colors"
                    aria-label={`Follow on ${social}`}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </TimelineContent>

          <TimelineContent animationNum={1} timelineRef={sectionRef} customVariants={revealVariants} className="mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-white tracking-tight leading-[0.95] antialiased subpixel-antialiased backface-hidden">
              <VerticalCutReveal splitBy="words" staggerDuration={0.03}>
                Sculpting Light, Architecture, and Raw Human Essence.
              </VerticalCutReveal>
            </h2>
          </TimelineContent>

          <div className="flex flex-col gap-8 flex-1">
            <TimelineContent animationNum={2} timelineRef={sectionRef} customVariants={revealVariants}>
              <p className="text-base sm:text-lg font-sans font-light text-neutral-400 leading-relaxed">
                My journey began with a fascination for the interplay between natural light and architectural space. Today, I specialize in fine art and editorial photography, crafting visual narratives where every subject and environment elevates one another to their highest aesthetic potential.
              </p>
            </TimelineContent>

            <TimelineContent animationNum={3} timelineRef={sectionRef} customVariants={revealVariants}>
              <p className="text-base sm:text-lg font-sans font-light text-neutral-400 leading-relaxed">
                Every session is an intimate collaboration. Whether directing in raw outdoor landscapes or controlled studio environments, my philosophy is rooted in technical perfection, authentic human connection, and uncompromising editorial quality.
              </p>
            </TimelineContent>

            <TimelineContent animationNum={4} timelineRef={sectionRef} customVariants={revealVariants} className="mt-auto pt-8">
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                  <p className="text-3xl font-serif font-semibold text-white mb-2">10+</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Years of Editorial Excellence</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-semibold text-white mb-2">500+</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Curated Photo Sessions</p>
                </div>
              </div>
            </TimelineContent>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full xl:w-1/2 flex flex-col">
          <m.div
            variants={scaleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, root: sectionRef }}
            className="w-full aspect-[4/5] md:aspect-[3/4] xl:aspect-[4/5] rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl mb-8 group"
          >
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop"
              alt="Melina Zanacchi Portrait"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-100 brightness-100 filter-none"
            />
            <div className="absolute inset-0 bg-neutral-950/20 pointer-events-none" />
          </m.div>

          <TimelineContent animationNum={5} timelineRef={sectionRef} customVariants={revealVariants}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-neutral-900 border border-white/10 p-6 rounded-2xl">
              <div className="flex flex-col">
                <p className="text-lg font-serif font-semibold text-white">MELINA ZANACCHI</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Fine Art & Editorial Photographer</p>
                <p className="text-sm font-sans text-neutral-400 mt-2">Ready to immortalize your vision with uncompromising quality?</p>
              </div>
              <a
                href="mailto:contact@melinazanacchi.com"
                className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-white text-black hover:scale-110 transition-transform duration-300"
                aria-label="Book your session"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </TimelineContent>
        </div>
      </div>
    </section>
  );
}

function PillarsSection() {
  return (
    <section className="w-full bg-neutral-950 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] font-sans font-medium text-white/50 mb-5">
            The Experience
          </p>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-white tracking-tight leading-[0.95] antialiased subpixel-antialiased backface-hidden"
          >
            Three Pillars of
            <br />
            <em className="italic font-normal text-white/70">Photographic Excellence.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 flex flex-col will-change-transform transform-gpu contain-paint transition-all duration-500 hover:border-white/20 hover:scale-[1.02]"
            >
              {/* Card image */}
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={pillar.imageUrl}
                  alt={pillar.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-100 brightness-100 contrast-100 filter-none transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none" />
              </div>

              {/* Card body */}
              <div className="relative z-10 p-8 flex flex-col gap-4 flex-1">
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/40">
                  {pillar.number}
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-serif font-semibold text-white leading-tight antialiased subpixel-antialiased"
                >
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base font-sans font-light text-neutral-400 leading-relaxed flex-1">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutCTA() {
  return (
    <section className="w-full bg-background py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] font-sans font-medium text-muted-foreground mb-6">
          Begin the Collaboration
        </p>
        <h2
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-semibold text-foreground tracking-tight leading-[0.92] mb-10 antialiased subpixel-antialiased backface-hidden"
        >
          Ready to Create
          <br />
          <em className="italic font-normal text-muted-foreground">Something Extraordinary?</em>
        </h2>
        <p className="text-base sm:text-lg font-sans font-light text-muted-foreground leading-relaxed max-w-xl mx-auto mb-12">
          Every iconic image begins with a single conversation. Reach out to discuss your
          vision, explore booking availability, and discover how your story can be told
          with uncompromising visual quality.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:contact@melinazanacchi.com"
            className="inline-flex items-center gap-3 px-10 py-4 text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-background bg-foreground rounded-full hover:scale-105 transition-transform duration-300 shadow-xl"
          >
            Book a Session
          </a>
          <a
            href="#portfolio"
            onClick={() => { window.location.hash = ""; }}
            className="inline-flex items-center gap-3 px-10 py-4 text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-foreground border border-foreground/20 rounded-full hover:border-foreground/50 transition-colors duration-300"
          >
            View Portfolio
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────
export function AboutPage() {
  return (
    <div className="w-full">
      <AboutSection3 />
      <AboutMelinaSection />
      <PillarsSection />
      <AboutCTA />
    </div>
  );
}
