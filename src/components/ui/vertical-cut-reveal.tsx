"use client";

import { m } from "framer-motion";
import { type ReactNode, useMemo, useId } from "react";
import { cn } from "@/lib/utils";

export interface VerticalCutRevealProps {
  children: ReactNode;
  splitBy?: "characters" | "words" | "lines";
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  transition?: any;
  className?: string;
}

export function VerticalCutReveal({
  children,
  splitBy = "words",
  staggerDuration = 0.05,
  transition = { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  className,
}: VerticalCutRevealProps) {
  const text = typeof children === "string" ? children : "";
  const baseId = useId();
  
  const itemsWithIds = useMemo(() => {
    const arr = splitBy === "characters" ? text.split("") : text.split(" ");
    return arr.map((item, i) => ({ text: item, id: `${baseId}-${i}` }));
  }, [text, splitBy, baseId]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDuration },
    },
  };

  const itemVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1, transition },
  };

  return (
    <m.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn("flex flex-wrap gap-x-2 gap-y-1 overflow-hidden", className)}
    >
      {itemsWithIds.map((item) => (
        <span key={item.id} className="overflow-hidden inline-block leading-none py-1">
          <m.span
            variants={itemVariants}
            className="inline-block will-change-transform transform-gpu"
          >
            {item.text === " " ? "\u00A0" : item.text}
          </m.span>
        </span>
      ))}
    </m.div>
  );
}
