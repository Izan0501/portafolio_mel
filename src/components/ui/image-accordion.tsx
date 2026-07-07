"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
            // Using flex proportions for responsive, hardware-accelerated animations
            initial={false}
            animate={{
              flex: isActive ? 5 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onHoverStart={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)} // Fallback for touch devices
            className={cn(
              "relative rounded-2xl overflow-hidden cursor-pointer group",
              isActive ? "flex-[5]" : "flex-[1]"
            )}
          >
            {/* Background Image */}
            <motion.img
              layout
              src={item.imageUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/400x600/2d3748/ffffff?text=Image";
              }}
            />
            
            {/* Elegant Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

            {/* Typography & Content */}
            <motion.div 
              layout
              className="absolute inset-0 flex items-end p-4 md:p-6"
            >
              <motion.span
                layout
                className={cn(
                  "text-white font-serif tracking-widest uppercase origin-bottom-left transition-all duration-500 ease-out",
                  isActive 
                    ? "text-xl md:text-3xl rotate-0 whitespace-normal" 
                    : "text-sm md:text-lg -rotate-90 whitespace-nowrap absolute bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-6"
                )}
              >
                {item.title}
              </motion.span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
