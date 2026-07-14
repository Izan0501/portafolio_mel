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
  const imageOpacity = useTransform(localProgress, [0, 0.6], [0.3, 1]);
  const cardScale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-screen flex items-center justify-center sticky top-0"
      style={{ zIndex: card.index }}
    >
      <m.article
        style={{
          scale: cardScale,
          top: `${card.index * 2}vh`,
          transformOrigin: "top center",
        }}
        className="relative w-full max-w-5xl mx-auto h-[450px] sm:h-[520px] md:h-[600px] bg-transparent"
      >
        <ThreeDCardContainer
          className="absolute inset-0 w-full h-full bg-transparent"
          containerClassName="absolute inset-0 w-full h-full bg-transparent"
        >
          <ThreeDCardBody 
            className="relative w-full h-[450px] sm:h-[520px] md:h-[600px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            
            {/* LAYER 1: THE PHYSICAL CARD (Background Image + Clipping Mask + Borders) */}
            {/* This item handles all the styling that would have broken the 3D stage */}
            <ThreeDCardItem
              translateZ={0}
              className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.9)] bg-neutral-950 pointer-events-none"
            >
              {card.imageUrl && (
                <m.img
                  src={card.imageUrl}
                  alt={card.title}
                  loading="lazy"
                  style={{ scale: imageScale, opacity: imageOpacity }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}
              {/* LAYER 2: EDITORIAL DARK GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 pointer-events-none" />
            </ThreeDCardItem>

            {/* LAYER 2: FOREGROUND TYPOGRAPHY (Free to project in Z-space because parent has no overflow-hidden) */}
            <div 
              className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-12 pointer-events-none"
              style={{ transformStyle: "preserve-3d" }}
            >
              
              {/* Top Metadata Row */}
              <div className="flex justify-between items-start w-full" style={{ transformStyle: "preserve-3d" }}>
                <ThreeDCardItem
                  translateZ={50}
                  className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/90 font-mono bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-lg w-auto"
                >
                  • PHASE {card.index}
                </ThreeDCardItem>
                
                <ThreeDCardItem
                  translateZ={40}
                  className="text-[10px] sm:text-xs font-mono text-white/60 tracking-widest w-auto"
                >
                  0{card.index} / 0{total}
                </ThreeDCardItem>
              </div>

              {/* Bottom Editorial Content */}
              <div className="flex flex-col gap-3 max-w-2xl" style={{ transformStyle: "preserve-3d" }}>
                <ThreeDCardItem
                  translateZ={60}
                  className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-sans font-semibold w-auto"
                  style={{ color: card.accentColor }}
                >
                  {card.subtitle || card.label}
                </ThreeDCardItem>

                {/* MAXIMUM POP-OUT: Title leaps out toward the user */}
                <ThreeDCardItem
                  as="h2"
                  translateZ={120}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] w-full"
                >
                  {card.title}
                </ThreeDCardItem>

                <ThreeDCardItem
                  translateZ={80}
                  className="text-sm sm:text-base md:text-lg text-neutral-300 font-sans font-light leading-relaxed border-l-2 pl-4 mt-2 drop-shadow-md bg-black/30 backdrop-blur-[2px] p-3 rounded-r-xl w-full"
                  style={{ borderColor: card.accentColor }}
                >
                  {card.description}
                </ThreeDCardItem>
              </div>

            </div>

          </ThreeDCardBody>
        </ThreeDCardContainer>
      </m.article>
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
        const targetScale = 1 - (total - i) * 0.04;
        const segmentSize = 1 / total;
        return (
          <CardItem
            key={card.index}
            card={card}
            progress={scrollYProgress}
            range={[i * segmentSize, (i + 1) * segmentSize]}
            targetScale={targetScale}
            total={total}
          />
        );
      })}
    </div>
  );
}
