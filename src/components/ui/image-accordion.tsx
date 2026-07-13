"use client";

import { useState } from "react";
import { motion, type Variants, type Easing } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: number;
  title: string;
  imageUrl: string;
}

interface ImageAccordionProps {
  items: AccordionItemData[];
  className?: string;
}

const ACCORDION_EASE: Easing = [0.16, 1, 0.3, 1];

// The text starts standing upright (-90deg) along the narrow card height,
// reading bottom-to-top. On expand, it pivots around origin-bottom-left
// and lays flat (0deg) across the card width.
const accordionTextVariants: Variants = {
  collapsed: {
    rotate: -90,
    x: 4,
    y: 0,
    opacity: 0.75,
    scale: 0.95,
    transition: { duration: 0.6, ease: ACCORDION_EASE },
  },
  expanded: {
    rotate: 0,
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: ACCORDION_EASE },
  },
};

export function ImageAccordion({ items, className }: ImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={cn("flex w-full h-[400px] md:h-[500px] gap-2 overflow-hidden", className)}>
      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.div
            key={item.id}
            layout
            initial={false}
            animate={{ flex: isActive ? 5 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onHoverStart={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
          >
            {/* Background Image */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/400x600/2d3748/ffffff?text=Image";
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

            {/* Title — anchored to bottom-left, pivots around that corner */}
            <motion.span
              variants={accordionTextVariants}
              animate={isActive ? "expanded" : "collapsed"}
              className="absolute bottom-8 left-6 origin-bottom-left whitespace-nowrap z-20 font-serif text-lg sm:text-xl md:text-2xl text-white tracking-wide will-change-transform pointer-events-none drop-shadow-md"
            >
              {item.title}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}
