"use client";

import { StackingCards, type StackingCard } from "@/components/ui/stacking-cards";

const processCards: StackingCard[] = [
  {
    index: 1,
    label: "Phase I",
    subtitle: "The Concept",
    title: "Vision &\nDirection.",
    description: "Every iconic photograph begins before the camera is even picked up. We collaborate to define the mood, styling, and narrative core of the editorial piece.",
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop",
    accentColor: "#ffffff",
  },
  {
    index: 2,
    label: "Phase II",
    subtitle: "The Execution",
    title: "Mastering\nthe Frame.",
    description: "On set, light is sculpted and moments are directed with precision. It's a dance between technical perfection and raw, unscripted human emotion.",
    imageUrl: "https://images.unsplash.com/photo-1577741314755-048d8525d31e?q=80&w=2000&auto=format&fit=crop",
    accentColor: "#e5e7eb",
  },
  {
    index: 3,
    label: "Phase III",
    subtitle: "The Polish",
    title: "High-End\nRetouching.",
    description: "The digital darkroom. Subtle color grading, dodging, and burning are applied to elevate the image while fiercely protecting its natural authenticity.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop",
    accentColor: "#9ca3af",
  },
];

export function VisionProcess() {
  return (
    <section id="vision" className="w-full bg-background pt-10 pb-20 scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-semibold text-foreground tracking-tight">
          The Creative Process
        </h2>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-[1px] w-12 bg-foreground/20" />
          <p className="text-[10px] tracking-[0.2em] font-sans uppercase text-muted-foreground">
            How the vision comes to life
          </p>
          <div className="h-[1px] w-12 bg-foreground/20" />
        </div>
      </div>
      
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <StackingCards cards={processCards}/>
      </div>
    </section>
  );
}
