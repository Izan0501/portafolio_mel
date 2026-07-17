"use client";

import { useRef } from "react";
import { useTransform, m, useScroll } from "framer-motion";
import type { MotionValue } from "framer-motion";
import {
  CardContainer as ThreeDCardContainer,
  CardBody as ThreeDCardBody,
  CardItem as ThreeDCardItem,
} from "@/components/ui/3d-card";

export interface StackingCard {
  index: number;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  accentColor: string;
}

interface StackingCardsProps {
  cards: StackingCard[];
}

interface CardItemProps {
  card: StackingCard;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  total: number;
}

function CardItem({ card, progress, range, targetScale, total }: CardItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: localProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(localProgress, [0, 1], [1.15, 1]);
  const cardScale = useTransform(progress, range, [1, targetScale]);

  return (
    // TIER 1: THE UI-LAYOUT STICKY TRACK (Strictly handles screen locking and stacking overlap)
    <div 
      className="h-screen w-full flex items-center justify-center sticky top-0 pointer-events-none bg-transparent border-none shadow-none"
      style={{ zIndex: card.index }}
    >
      
      {/* TIER 2: THE SCALING STAGE (Strictly handles shrinkage, offset, and GPU acceleration) */}
      <m.div
        style={{
          scale: cardScale,
          top: `calc(5vh + ${(card.index - 1) * 30}px)`, // Stacking vertical cascade offset
        }}
        className="relative w-full max-w-5xl mx-auto h-[450px] sm:h-[520px] md:h-[600px] origin-top will-change-transform transform-gpu pointer-events-auto bg-transparent border-none shadow-none"
      >
        
        {/* TIER 3: OUR PROVEN SIBLING 3D DIORAMA (DO NOT ALTER THIS WORKING VISUAL LOGIC) */}
        <ThreeDCardContainer
          className="w-full h-full bg-transparent border-none shadow-none py-0"
          containerClassName="w-full h-full bg-transparent border-none shadow-none py-0 flex items-center justify-center"
        >
          <ThreeDCardBody 
            className="relative w-full h-full border-none bg-transparent"
            style={{ transformStyle: "preserve-3d" }}
          >
            
            {/* LAYER 1: STRICTLY BRIGHT BACKGROUND IMAGE */}
            <div 
              className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.95)] border border-white/15 bg-neutral-950 z-0"
              style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
            >
              {card.imageUrl && (
                <m.img
                  src={card.imageUrl}
                  alt={card.title}
                  loading="lazy"
                  decoding="async"
                  style={{ scale: imageScale }}
                  // CRITICAL: Force absolute optical purity. Zero inherited opacity or darkening filters!
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-100 brightness-100 contrast-100 filter-none"
                />
              )}
              
              {/* THE 33% STRUCTURAL GUARANTEE: 
                Using 'inset-x-0 bottom-0 h-1/3' ensures this dark gradient only exists in the bottom 33% of the card. 
                The top 67% of the photo is 100% free of any overlay, guaranteeing maximum original brightness! 
              */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />
            </div>

            {/* SIBLING 2: 3D FOREGROUND TYPOGRAPHY (Free to project infinitely in Z-space) */}
            <div 
              className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-12 pointer-events-none z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              
              {/* Top Metadata Row */}
              <div className="flex justify-between items-start w-full" style={{ transformStyle: "preserve-3d" }}>
                <ThreeDCardItem
                  translateZ={50}
                  className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/90 font-mono bg-black/60 px-4 py-1.5 rounded-full border border-white/15 shadow-lg w-auto"
                >
                  • PHASE {card.index}
                </ThreeDCardItem>
                
                <ThreeDCardItem
                  translateZ={30}
                  className="text-xs sm:text-sm font-mono text-white/60 tracking-widest font-semibold w-auto"
                  style={{ textShadow: "0 4px 8px rgba(0,0,0,0.5)" }}
                >
                  0{card.index} / 0{total}
                </ThreeDCardItem>
              </div>

              {/* Bottom Editorial Content Row */}
              <div className="flex flex-col gap-2 sm:gap-3 max-w-2xl" style={{ transformStyle: "preserve-3d" }}>
                <ThreeDCardItem
                  translateZ={60}
                  className="text-xs sm:text-sm uppercase tracking-[0.3em] font-sans font-bold w-auto"
                  style={{ color: card.accentColor, textShadow: "0 4px 8px rgba(0,0,0,0.5)" }}
                >
                  {card.subtitle || card.label}
                </ThreeDCardItem>

                {/* Title leaps out aggressively (Vector Sharpness Enforced) */}
                <ThreeDCardItem
                  as="h2"
                  translateZ={120}
                  className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-none w-full antialiased subpixel-antialiased backface-hidden select-none"
                  style={{ textShadow: "0 12px 24px rgba(0,0,0,0.9)" }}
                >
                  {card.title}
                </ThreeDCardItem>

                {/* Description */}
                <ThreeDCardItem
                  translateZ={80}
                  className="text-sm sm:text-base md:text-lg text-neutral-200 font-sans font-normal leading-relaxed w-full mt-1 sm:mt-2"
                  style={{ textShadow: "0 4px 8px rgba(0,0,0,0.8)" }}
                >
                  {card.description}
                </ThreeDCardItem>
              </div>

            </div>

          </ThreeDCardBody>
        </ThreeDCardContainer>
      </m.div>
    </div>
  );
}

export function StackingCards({ cards }: StackingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = cards.length;

  return (
    <div ref={containerRef} className="relative w-full">
      {cards.map((card, i) => {
        // UI-Layout targetScale logic: Each buried card shrinks by 5%
        const targetScale = 1 - (total - i) * 0.05; 
        const range: [number, number] = [i * (1 / total), 1];
        
        return (
          <CardItem
            key={card.index}
            card={card}
            progress={scrollYProgress}
            range={range}
            targetScale={targetScale}
            total={total}
          />
        );
      })}
    </div>
  );
}
