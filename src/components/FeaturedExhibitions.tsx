"use client";

import { HorizontalCarousel, type CarouselCardType } from "@/components/ui/horizontal-carousel";

const carouselData: CarouselCardType[] = [
  {
    id: 1,
    category: "Fashion Week",
    title: "Milan Series",
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "Editorial",
    title: "Shadow & Light",
    url: "https://images.unsplash.com/photo-1492633423870-43d1cd2a45f7?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "Fine Art",
    title: "The Solitude",
    url: "https://images.unsplash.com/photo-1510520434124-5bc7e642b61d?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 4,
    category: "Portraiture",
    title: "Raw Essence",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: 5,
    category: "Commercial",
    title: "Noir Collection",
    url: "https://images.unsplash.com/photo-1605406575497-015ab0d21b9b?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 6,
    category: "Exhibition",
    title: "Paris Archive",
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
  },
];

export function FeaturedExhibitions() {
  return (
    <div className="relative w-full bg-background border-t border-foreground/5">
      {/* Intro Header */}
      <div className="flex flex-col items-center justify-center pt-24 pb-8 text-center px-4">
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground tracking-tight">
          Selected Works
        </h2>
        <p className="mt-4 text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground">
          Scroll to explore the archives
        </p>
      </div>
      
      {/* The Carousel */}
      <HorizontalCarousel cards={carouselData} />
    </div>
  );
}
