import { Camera } from "lucide-react";
import { TextHoverEffect, FooterBackgroundGradient } from "@/components/ui/text-hover-effect";

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-background border-t border-foreground/5 pt-24 pb-8">
      <FooterBackgroundGradient/>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        {/* Top Section: Branding & Icon */}
        <div className="flex items-center space-x-3 mb-16">
          <Camera className="w-7 h-7 text-foreground" strokeWidth={1.2}/>
          <span className="text-3xl font-serif font-semibold italic tracking-wide text-foreground">
            MELI
          </span>
        </div>

        {/* Middle Section: Navigation */}
        <div className="flex flex-wrap justify-center gap-8 mb-20 text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-muted-foreground">
          <a href="#portfolio" className="hover:text-foreground transition-colors duration-300">Portfolio</a>
          <a href="#vision" className="hover:text-foreground transition-colors duration-300">Vision</a>
          <a href="#gallery" className="hover:text-foreground transition-colors duration-300">Gallery</a>
          <a href="#contact" className="hover:text-foreground transition-colors duration-300">Contact</a>
        </div>

        {/* Hero Animation Text */}
        <div className="w-full h-[30vh] sm:h-[40vh] flex items-center justify-center cursor-crosshair">
          <TextHoverEffect text="MELI"/>
        </div>

        {/* Bottom Section: Legal & Credits */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-foreground/10 text-[9px] font-sans text-muted-foreground tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Melina Zanacchi.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors duration-300">Instagram</a>
            <a href="#" className="hover:text-foreground transition-colors duration-300">Behance</a>
            <a href="#" className="hover:text-foreground transition-colors duration-300">Vogue</a>
          </div>
          <p className="mt-6 md:mt-0 font-medium">Designed by Axon Crafts</p>
        </div>

      </div>
    </footer>
  );
}
