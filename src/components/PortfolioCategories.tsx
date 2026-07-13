"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, LayoutGroup, type Variants, type Easing } from "framer-motion";
import { ImageAccordion, type AccordionItemData } from "@/components/ui/image-accordion";
import { TextRotate } from "@/components/ui/text-rotate";

const categories: AccordionItemData[] = [
  { id: 1, title: "Editorial", imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" },
  { id: 2, title: "Fine Art", imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop" },
  { id: 3, title: "Portraiture", imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop" },
  { id: 4, title: "Cinematic", imageUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1974&auto=format&fit=crop" },
  { id: 5, title: "Monochrome", imageUrl: "https://images.unsplash.com/photo-1605406575497-015ab0d21b9b?q=80&w=1974&auto=format&fit=crop" },
];

// --- High-End Animation Variants ---
const CUSTOM_EASE: Easing = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const maskRevealVariants: Variants = {
  hidden: { y: "100%", opacity: 0, filter: "blur(4px)" },
  visible: { 
    y: "0%", 
    opacity: 1, 
    filter: "blur(0px)", 
    transition: { duration: 1.2, ease: CUSTOM_EASE } 
  }
};

const fadeUpVariants: Variants = {
  hidden: { y: 30, opacity: 0, filter: "blur(4px)" },
  visible: { 
    y: 0, 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: CUSTOM_EASE } 
  }
};

const imageRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { duration: 1.5, ease: CUSTOM_EASE } 
  }
};

export function PortfolioCategories() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Continuous Macro-Parallax (Tracked across the whole section)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] 
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Floating variables (Macro)
  // Goldilocks sweep: Enough initial push-down to prevent clipping, but keeps the ghost-gap away
  const textY = useTransform(smoothProgress, [0, 1], [80, -150]);
  const accordionY = useTransform(smoothProgress, [0, 1], [120, -250]);

  return (
    <section ref={containerRef} id="portfolio" className="relative w-full bg-background pt-16 pb-24 md:pt-24 md:pb-40 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-16">
          
          {/* Left Side: Parallax Outer Wrapper */}
          <motion.div style={{ y: textY }} className="w-full xl:w-5/12 text-center xl:text-left will-change-transform">
            {/* Inner Staggered Reveal Choreography */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col items-center xl:items-start"
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-foreground leading-tight tracking-tight flex flex-col">
                <span className="overflow-hidden block pb-1">
                  <motion.span variants={maskRevealVariants} className="block">Mastering</motion.span>
                </span>
                <span className="overflow-hidden block">
                  <motion.span variants={maskRevealVariants} className="flex items-center whitespace-pre">
                    <span className="italic mr-3 text-muted-foreground">the</span>
                    <LayoutGroup>
                      <motion.span layout className="flex">
                        <TextRotate 
                          texts={["Craft.", "Emotion.", "Light.", "Moment.", "Shadows."]} 
                          mainClassName="overflow-hidden text-foreground" 
                          rotationInterval={3000} 
                          staggerDuration={0.03} 
                          staggerFrom="last" 
                          transition={{ type: "spring", damping: 30, stiffness: 400 }} 
                        />
                      </motion.span>
                    </LayoutGroup>
                  </motion.span>
                </span>
              </h2>
              
              <motion.p variants={fadeUpVariants} className="mt-8 text-sm md:text-base font-sans text-muted-foreground leading-relaxed max-w-md">
                Elevating visual narratives through high-end editorial and fine-art photography. Every frame is meticulously crafted to evoke emotion and capture raw authenticity.
              </motion.p>
              
              <motion.div variants={fadeUpVariants} className="mt-10">
                <a
                  href="#contact"
                  className="inline-block border border-foreground text-foreground font-sans text-xs font-semibold uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-foreground hover:text-background transition-colors duration-300"
                >
                  Explore Galleries
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side: Heavy Parallax Image Accordion */}
          <motion.div style={{ y: accordionY }} className="w-full xl:w-7/12 will-change-transform">
            <motion.div
              variants={imageRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <ImageAccordion items={categories}/>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
