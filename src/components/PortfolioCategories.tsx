"use client";

import { ImageAccordion, type AccordionItemData } from "@/components/ui/image-accordion";

const categories: AccordionItemData[] = [
  {
    id: 1,
    title: "Editorial",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Fine Art",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Portraiture",
    imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Cinematic",
    imageUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Monochrome",
    imageUrl: "https://images.unsplash.com/photo-1605406575497-015ab0d21b9b?q=80&w=1974&auto=format&fit=crop",
  },
];

export function PortfolioCategories() {
  return (
    <section id="portfolio" className="relative w-full bg-background py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-16">
          
          {/* Left Side: Editorial Text Content */}
          <div className="w-full xl:w-5/12 text-center xl:text-left">
            <h2 className="text-4xl md:text-6xl font-serif font-semibold text-foreground leading-tight tracking-tight">
              Mastering <br className="hidden xl:block" /> the Light
            </h2>
            <p className="mt-8 text-sm md:text-base font-sans text-muted-foreground leading-relaxed max-w-md mx-auto xl:mx-0">
              Elevating visual narratives through high-end editorial and fine-art photography. Every frame is meticulously crafted to evoke emotion and capture raw authenticity.
            </p>
            <div className="mt-10">
              <a
                href="#contact"
                className="inline-block border border-foreground text-foreground font-sans text-xs font-semibold uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                Explore Galleries
              </a>
            </div>
          </div>

          {/* Right Side: High-Performance Image Accordion */}
          <div className="w-full xl:w-7/12">
            <ImageAccordion items={categories}/>
          </div>

        </div>
      </div>
    </section>
  );
}
