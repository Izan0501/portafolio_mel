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
        className="relative w-full max-w-5xl mx-auto h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-foreground/10"
      >
        {/* Background image — scroll parallax, untouched */}
        <m.div
          className="absolute inset-0 w-full h-full bg-neutral-900"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <img
            src={card.imageUrl}
            alt={card.title}
            className="w-full h-full object-cover opacity-80"
          />
        </m.div>

        {/* Editorial Dark Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        {/* Top accent strip */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-70"
          style={{ background: card.accentColor }}
        />

        {/* ── 3D INNER STAGE ── wraps only the floating content, not the bg */}
        <ThreeDCardContainer
          className="absolute inset-0 w-full h-full"
          containerClassName="absolute inset-0 w-full h-full"
        >
          <ThreeDCardBody className="absolute inset-0 w-full h-full">

            {/* Label — top left */}
            <ThreeDCardItem
              as="div"
              translateZ={50}
              className="absolute top-8 left-8 flex items-center gap-3"
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: card.accentColor }}
              />
              <span
                className="text-[10px] tracking-[0.25em] uppercase font-sans font-medium"
                style={{ color: card.accentColor }}
              >
                {card.label}
              </span>
            </ThreeDCardItem>

            {/* Vertical counter */}
            <ThreeDCardItem
              as="div"
              translateZ={30}
              className="absolute right-8 bottom-12 top-20 flex flex-col items-center justify-center pointer-events-none"
              style={{ writingMode: "vertical-rl" } as React.CSSProperties}
            >
              <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 text-white font-sans">
                0{card.index} / 0{total}
              </span>
            </ThreeDCardItem>

            {/* Bottom content block */}
            <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 md:px-12 md:pb-12">
              <ThreeDCardItem as="p" translateZ={40} className="text-[10px] tracking-[0.2em] uppercase mb-4 font-sans font-medium" style={{ color: card.accentColor } as React.CSSProperties}>
                {card.subtitle}
              </ThreeDCardItem>

              <ThreeDCardItem
                as="h2"
                translateZ={70}
                className="text-white font-serif font-medium mb-6 leading-tight text-4xl md:text-5xl lg:text-6xl whitespace-pre-line tracking-tight"
              >
                {card.title}
              </ThreeDCardItem>

              <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
                <div
                  className="hidden md:block h-[1px] w-8 shrink-0 mt-2.5 opacity-50"
                  style={{ background: card.accentColor }}
                />
                <ThreeDCardItem
                  as="p"
                  translateZ={50}
                  className="text-white/70 text-sm md:text-base font-sans leading-relaxed max-w-[55ch]"
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
