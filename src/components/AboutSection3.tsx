"use client";

import { useRef } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

// ─── Module-scoped variants (prevents rebuild-every-render React Doctor warning) ─
const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.4,
      duration: 0.5,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: -20,
    opacity: 0,
  },
};

const scaleVariants = {
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.4,
      duration: 0.5,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
  },
};

// ─── Inline arrow icon (no lucide-react dependency) ───────────────────────────
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

// ─── Social icon links data ───────────────────────────────────────────────────
const socialLinks = [
  {
    id: "facebook",
    href: "https://www.facebook.com/",
    label: "Follow on Facebook",
    icon: "https://pro-section.ui-layouts.com/facebook.svg",
    alt: "Facebook",
    animationNum: 0,
  },
  {
    id: "instagram",
    href: "https://www.instagram.com/",
    label: "Follow on Instagram",
    icon: "https://pro-section.ui-layouts.com/instagram.svg",
    alt: "Instagram",
    animationNum: 1,
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/",
    label: "Follow on LinkedIn",
    icon: "https://pro-section.ui-layouts.com/linkedin.svg",
    alt: "LinkedIn",
    animationNum: 2,
  },
  {
    id: "youtube",
    href: "https://www.youtube.com/",
    label: "Follow on YouTube",
    icon: "https://pro-section.ui-layouts.com/youtube.svg",
    alt: "YouTube",
    animationNum: 3,
  },
];

// ─── Main component ───────────────────────────────────────────────────────────
export function AboutSection3() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section className="pt-28 md:pt-32 lg:pt-36 pb-8 px-4 bg-[#f9f9f9]" ref={heroRef}>
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Header: badge + social icons — normal block flow, clears navbar */}
          <div className="flex justify-between items-center mb-6 w-full">
            <div className="flex items-center gap-2 text-xl">
              <span className="text-red-500 animate-spin" aria-hidden="true">✱</span>
              <TimelineContent
                as="span"
                animationNum={0}
                className="text-sm font-medium text-gray-600"
                customVariants={revealVariants}
                timelineRef={heroRef}
              >
                THE ARTIST &amp; DIRECTION
              </TimelineContent>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((s) => (
                <TimelineContent
                  key={s.id}
                  as="a"
                  animationNum={s.animationNum}
                  className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                  customVariants={revealVariants}
                  href={s.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={s.label}
                  timelineRef={heroRef}
                >
                  <img
                    src={s.icon}
                    alt={s.alt}
                    width={24}
                    height={24}
                    loading="lazy"
                    decoding="async"
                  />
                </TimelineContent>
              ))}
            </div>
          </div>

          {/* Main editorial image with SVG clip path */}
          <TimelineContent
            as="figure"
            animationNum={4}
            className="relative group"
            customVariants={scaleVariants}
            timelineRef={heroRef}
          >
            <svg
              className="w-full"
              width="100%"
              height="100%"
              viewBox="0 0 100 40"
              role="img"
              aria-label="Melina Zanacchi — editorial photography"
            >
              <defs>
                <clipPath id="clip-inverted" clipPathUnits="objectBoundingBox">
                  <path
                    d="M0.1 1H0.42H0.75C0.77 1 0.77 0.96 0.78 0.94V0.81C0.78 0.74 0.79 0.73 0.80 0.73H0.97C0.99 0.73 1.0 0.69 1.0 0.68V0.07C1.0 0.03 0.99 0.0 0.98 0H0.90C0.85 0 0.89 0.14 0.85 0.14H0.02C0.0 0.14 0 0.18 0 0.20V0.41C0 0.45 0.01 0.47 0.02 0.47H0.05C0.07 0.47 0.07 0.50 0.07 0.51V0.92C0.07 0.98 0.09 1 0.1 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              {/* eslint-disable-next-line react/no-unknown-property */}
              <image
                clipPath="url(#clip-inverted)"
                preserveAspectRatio="xMidYMid slice"
                width="100%"
                height="100%"
                decoding="async"
                // @ts-expect-error SVG image loading attribute is valid but not in TS types
                loading="lazy"
                xlinkHref="https://images.unsplash.com/photo-1718601980986-0ce75101d52d?w=1200&auto=format&fit=crop"
                href="https://images.unsplash.com/photo-1718601980986-0ce75101d52d?w=1200&auto=format&fit=crop"
              />
            </svg>
          </TimelineContent>

          {/* Stats row — left block inline, right block pushed to flex-end */}
          <div className="flex flex-wrap justify-between items-end py-3 text-sm gap-y-2">
            <TimelineContent
              as="div"
              animationNum={5}
              className="flex flex-wrap gap-4"
              customVariants={revealVariants}
              timelineRef={heroRef}
            >
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-red-500 font-bold">10+</span>
                <span className="text-gray-600">years of editorial mastery</span>
                <span className="text-gray-300" aria-hidden="true">|</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-red-500 font-bold">500+</span>
                <span className="text-gray-600">curated sessions</span>
              </div>
            </TimelineContent>

            <div className="flex flex-col items-end gap-1">
              <TimelineContent
                as="div"
                animationNum={6}
                className="flex lg:text-4xl sm:text-3xl text-2xl items-center gap-2"
                customVariants={revealVariants}
                timelineRef={heroRef}
              >
                <span className="text-red-500 font-semibold">100%</span>
                <span className="text-gray-600 uppercase">authenticity</span>
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={7}
                className="flex items-center gap-2 sm:text-base text-xs"
                customVariants={revealVariants}
                timelineRef={heroRef}
              >
                <span className="text-red-500 font-bold">100+</span>
                <span className="text-gray-600">featured editorials</span>
              </TimelineContent>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-semibold text-gray-900 mb-8">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 3,
                }}
              >
                Sculpting Light, Architecture, and Raw Human Essence.
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={9}
              className="grid md:grid-cols-2 gap-8 text-gray-600"
              customVariants={revealVariants}
              timelineRef={heroRef}
            >
              <TimelineContent
                as="div"
                animationNum={10}
                className="sm:text-base text-xs"
                customVariants={revealVariants}
                timelineRef={heroRef}
              >
                <p className="leading-relaxed text-justify">
                  My journey began with a deep fascination for the interplay between natural light
                  and architectural space. Today, I specialize in fine art and editorial photography,
                  transforming moments into timeless visual legacies.
                </p>
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={11}
                className="sm:text-base text-xs"
                customVariants={revealVariants}
                timelineRef={heroRef}
              >
                <p className="leading-relaxed text-justify">
                  Every photograph has a soul, and I specialize in revealing yours with clarity and
                  sophistication. By blending technical perfection with raw emotion, I create visual
                  art that deeply resonates with audiences.
                </p>
              </TimelineContent>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="text-right">
              <TimelineContent
                as="div"
                animationNum={12}
                className="text-red-500 text-2xl font-bold mb-2"
                customVariants={revealVariants}
                timelineRef={heroRef}
              >
                MELINA ZANACCHI
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={13}
                className="text-gray-600 text-sm mb-8"
                customVariants={revealVariants}
                timelineRef={heroRef}
              >
                Fine Art &amp; Editorial Photographer
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={14}
                className="mb-6"
                customVariants={revealVariants}
                timelineRef={heroRef}
              >
                <p className="text-gray-900 font-medium mb-4">
                  Ready to immortalize your vision with uncompromising artistic quality?
                </p>
              </TimelineContent>

              <TimelineContent
                as="button"
                animationNum={15}
                className="bg-neutral-900 hover:bg-neutral-950 shadow-lg shadow-neutral-900 border border-neutral-700 flex w-fit ml-auto gap-2 hover:gap-4 transition-all duration-300 ease-in-out text-white px-5 py-3 rounded-lg cursor-pointer font-semibold"
                customVariants={revealVariants}
                timelineRef={heroRef}
                type="button"
                onClick={() => {
                  window.location.href = "mailto:contact@melinazanacchi.com";
                }}
              >
                BOOK YOUR SESSION <ArrowRight />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
