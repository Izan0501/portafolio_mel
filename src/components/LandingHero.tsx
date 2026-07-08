"use client"

import { useRef } from "react"
import { LayoutGroup, motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { TextRotate } from "@/components/ui/text-rotate"

const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Branislav Rodman",
    title: "A Black and White Photo of a Woman Brushing Her Teeth",
  },
  {
    url: "https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Neon Palm",
    author: "Tim Mossholder",
  },
  {
    url: "https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "ANDRII SOLOK",
    title: "A blurry photo of a crowd of people",
  },
  {
    url: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Wesley Tingey",
    title: "Rippling Crystal Blue Water",
  },
  {
    url: "https://images.unsplash.com/photo-1624344965199-ed40391d20f2?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Serhii Tyaglovsky",
    title: "Mann im schwarzen Hemd unter blauem Himmel",
  },
  {
    url: "https://images.unsplash.com/photo-1689553079282-45df1b35741b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Vladimir Yelizarov",
    title: "A women with a flower crown on her head",
  },
  {
    url: "https://images.unsplash.com/photo-1721968317938-cf8c60fccd1a?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "A blurry photo of white flowers in a field",
    author: "Eugene Golovesov",
  },
  {
    url: "https://images.unsplash.com/photo-1677338354108-223e807fb1bd?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Mathilde Langevin",
    title: "A table topped with two wine glasses and plates",
  },
]

export function LandingHero() {
  // 1. ABSOLUTE SCROLL TRACKING: 
  // By tracking the global window scroll instead of an element intersection,
  // we completely eliminate "stuck" elements during rapid "Back to Top" scrolls.
  const { scrollY } = useScroll();

  // STRICT CLAMPING & AGGRESSIVE MULTIPLIERS:
  // The fourth argument `{ clamp: true }` is critical. It physically prevents the 
  // values from extrapolating beyond the boundaries when scrolling deep into the footer,
  // completely eliminating the re-entry lag and desync bugs.
  const yFast = useTransform(scrollY, [0, 800], [0, -650], { clamp: true });
  const yMedium = useTransform(scrollY, [0, 800], [0, -450], { clamp: true });
  const ySlow = useTransform(scrollY, [0, 800], [0, -250], { clamp: true });
  
  const yTitle = useTransform(scrollY, [0, 800], [0, -180], { clamp: true });
  const ySubtitle = useTransform(scrollY, [0, 800], [0, -280], { clamp: true });
  const yButtons = useTransform(scrollY, [0, 800], [0, -380], { clamp: true });
  const fadeOut = useTransform(scrollY, [0, 500], [1, 0], { clamp: true });

  // 2. NATIVE MOUSE PHYSICS (Replacing the buggy third-party UI component)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // High-end spring configuration for buttery smooth cursor tracking
  const springConfig = { damping: 40, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Depth multipliers (Inverse movement for floating effect)
  const mouseXFast = useTransform(smoothMouseX, v => v * -0.06);
  const mouseYFast = useTransform(smoothMouseY, v => v * -0.06);
  
  const mouseXMedium = useTransform(smoothMouseX, v => v * -0.03);
  const mouseYMedium = useTransform(smoothMouseY, v => v * -0.03);
  
  const mouseXSlow = useTransform(smoothMouseX, v => v * -0.01);
  const mouseYSlow = useTransform(smoothMouseY, v => v * -0.01);

  // Capture mouse movement globally on the section
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX.set(clientX - centerX);
    mouseY.set(clientY - centerY);
  };

  return (
    <section onMouseMove={handleMouseMove} className="w-full h-screen overflow-hidden flex flex-col items-center justify-center relative bg-background">

      {/* Global Entry Layer */}
      <motion.div className="absolute inset-0 w-full h-full z-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
        
        {/* Image 1 (Fast Scroll, Fast Mouse) */}
        <div className="absolute top-[15%] left-[2%] md:top-[25%] md:left-[5%] pointer-events-auto">
          <motion.div style={{ y: yFast }} className="will-change-transform">
            <motion.div style={{ x: mouseXFast, y: mouseYFast }} className="will-change-transform">
              <motion.img whileHover={{ scale: 1.05 }} src={exampleImages[0].url} alt={exampleImages[0].title} className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover cursor-pointer -rotate-[3deg] shadow-2xl rounded-xl opacity-80" />
            </motion.div>
          </motion.div>
        </div>

        {/* Image 2 (Medium Scroll, Medium Mouse) */}
        <div className="absolute top-[0%] left-[8%] md:top-[6%] md:left-[11%] pointer-events-auto">
          <motion.div style={{ y: yMedium }} className="will-change-transform">
            <motion.div style={{ x: mouseXMedium, y: mouseYMedium }} className="will-change-transform">
              <motion.img whileHover={{ scale: 1.05 }} src={exampleImages[1].url} alt={exampleImages[1].title} className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover cursor-pointer -rotate-12 shadow-2xl rounded-xl" />
            </motion.div>
          </motion.div>
        </div>

        {/* Image 3 (Slow Scroll, Slow Mouse) */}
        <div className="absolute top-[90%] left-[6%] md:top-[80%] md:left-[8%] pointer-events-auto">
          <motion.div style={{ y: ySlow }} className="will-change-transform">
            <motion.div style={{ x: mouseXSlow, y: mouseYSlow }} className="will-change-transform">
              <motion.img whileHover={{ scale: 1.05 }} src={exampleImages[2].url} alt={exampleImages[2].title} className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover cursor-pointer -rotate-[4deg] shadow-2xl rounded-xl" />
            </motion.div>
          </motion.div>
        </div>

        {/* Image 4 (Medium Scroll, Medium Mouse) */}
        <div className="absolute top-[0%] left-[87%] md:top-[2%] md:left-[83%] pointer-events-auto">
          <motion.div style={{ y: yMedium }} className="will-change-transform">
            <motion.div style={{ x: mouseXMedium, y: mouseYMedium }} className="will-change-transform">
              <motion.img whileHover={{ scale: 1.05 }} src={exampleImages[3].url} alt={exampleImages[3].title} className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover cursor-pointer shadow-2xl rotate-[6deg] rounded-xl" />
            </motion.div>
          </motion.div>
        </div>

        {/* Image 5 (Fast Scroll, Fast Mouse) */}
        <div className="absolute top-[78%] left-[83%] md:top-[68%] md:left-[83%] pointer-events-auto">
          <motion.div style={{ y: yFast }} className="will-change-transform">
            <motion.div style={{ x: mouseXFast, y: mouseYFast }} className="will-change-transform">
              <motion.img whileHover={{ scale: 1.05 }} src={exampleImages[4].url} alt={exampleImages[4].title} className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover cursor-pointer shadow-2xl rotate-[19deg] rounded-xl" />
            </motion.div>
          </motion.div>
        </div>

      </motion.div>

      {/* Center Text Layer — multi-layered parallax + fade out on scroll */}
      <motion.div
        style={{ opacity: fadeOut }}
        className="flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto will-change-transform"
      >
        <motion.div style={{ y: yTitle }} className="will-change-transform w-full">
          <motion.h1
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-calendas tracking-tight space-y-1 md:space-y-4"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
          >
            <span>Capturing moments that are </span>
            <LayoutGroup>
              <motion.span layout className="flex whitespace-pre">
                <TextRotate
                  texts={["timeless", "artistic", "bold", "cinematic", "pure", "unforgettable", "elegant"]}
                  mainClassName="overflow-hidden pr-3 text-[#0015ff] py-0 pb-2 md:pb-4 rounded-xl"
                  staggerDuration={0.03}
                  staggerFrom="last"
                  rotationInterval={3000}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                />
              </motion.span>
            </LayoutGroup>
          </motion.h1>
        </motion.div>

        <motion.div style={{ y: ySubtitle }} className="will-change-transform w-full">
          <motion.p
            className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-overusedGrotesk pt-4 sm:pt-8 md:pt-10 lg:pt-12 text-muted-foreground"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
          >
            Melina Zanacchi | High-End Professional Photography &amp; Art Direction.
          </motion.p>
        </motion.div>

        <motion.div style={{ y: yButtons }} className="will-change-transform w-full">
          <div className="flex flex-row justify-center space-x-4 items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20 text-xs">
            <motion.button
              className="sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-background bg-foreground px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.7, scale: { duration: 0.2 } }}
              whileHover={{ scale: 1.05, transition: { type: "spring", damping: 30, stiffness: 400 } }}
            >
              <a href="#gallery">View Gallery <span className="font-serif ml-1">→</span></a>
            </motion.button>
            <motion.button
              className="sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-white bg-[#0015ff] px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut", delay: 0.7, scale: { duration: 0.2 } }}
              whileHover={{ scale: 1.05, transition: { type: "spring", damping: 30, stiffness: 400 } }}
            >
              <a href="#contact">Contact Me</a>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Minimalist Editorial Scroll Cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <motion.div
          style={{ y: yFast, opacity: fadeOut }}
          className="flex flex-col items-center will-change-transform"
        >
          {/* Added ml-[0.4em] to mathematically balance the right-side tracking-[0.4em] */}
          <span className="text-[9px] uppercase tracking-[0.4em] ml-[0.4em] text-foreground/40 font-sans mb-3">
            Scroll
          </span>
          <div className="w-[1px] h-16 bg-foreground/10 relative overflow-hidden rounded-full">
            <motion.div
              className="w-full h-1/3 bg-foreground/60 absolute top-0 left-0 rounded-full"
              animate={{ y: ["-100%", "400%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
