"use client";

import { m, useTransform, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export interface CarouselCardType {
  id: number;
  title: string;
  category: string;
  url: string;
}

interface HorizontalCarouselProps {
  cards: CarouselCardType[];
  className?: string;
}

export function HorizontalCarousel({ cards, className }: HorizontalCarouselProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track from the moment the top of the container enters the bottom of the screen
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Inject high-end momentum (smooth catch-up physics)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  // Start pushed to the right (40%) to create entry anticipation, end far left (-95%)
  const x = useTransform(smoothProgress, [0, 1], ["40%", "-95%"]);

  return (
    <section ref={targetRef} className={cn("relative h-[300vh] bg-background", className)}>
      <div className="sticky top-0 flex h-screen items-center overflow-clip">
        <m.div style={{ x }} className="flex gap-6 px-4 md:px-10">
          {cards.map((card) => {
            return <CarouselCard card={card} key={card.id} />;
          })}
        </m.div>
      </div>
    </section>
  );
}

const CarouselCard = ({ card }: { card: CarouselCardType }) => {
  return (
    <div className="group relative h-[400px] w-[300px] sm:h-[500px] sm:w-[400px] md:h-[600px] md:w-[450px] overflow-hidden bg-foreground/5 rounded-sm">
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Elegant Editorial Gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Typography */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
        <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {card.category}
        </p>
        <p className="text-3xl md:text-5xl font-serif font-medium text-foreground leading-tight">
          {card.title}
        </p>
      </div>
    </div>
  );
};
