"use client";

import { m } from "framer-motion";
import { type ComponentPropsWithoutRef, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/utils";

// ─── Polymorphic type helpers ──────────────────────────────────────────────────
type MotionTagMap = {
  div: typeof m.div;
  span: typeof m.span;
  a: typeof m.a;
  figure: typeof m.figure;
  button: typeof m.button;
  section: typeof m.section;
  article: typeof m.article;
  p: typeof m.p;
  h1: typeof m.h1;
  h2: typeof m.h2;
  h3: typeof m.h3;
};

type SupportedTag = keyof MotionTagMap;

type TimelineContentProps<T extends SupportedTag = "div"> = {
  children: ReactNode;
  animationNum: number;
  timelineRef?: RefObject<Element | null>;
  customVariants?: any;
  className?: string;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "children" | "className">;

// ─── Module-scope defaults ─────────────────────────────────────────────────────
const defaultVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
  hidden: { y: 20, opacity: 0 },
};

// ─── Component ────────────────────────────────────────────────────────────────
export function TimelineContent<T extends SupportedTag = "div">({
  children,
  animationNum,
  timelineRef,
  customVariants,
  className,
  as,
  ...rest
}: TimelineContentProps<T>) {
  const tag = (as ?? "div") as SupportedTag;
  const MotionEl = m[tag] as typeof m.div;

  return (
    <MotionEl
      custom={animationNum}
      variants={customVariants || defaultVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, root: timelineRef }}
      className={cn("will-change-transform transform-gpu", className)}
      {...(rest as any)}
    >
      {children}
    </MotionEl>
  );
}
