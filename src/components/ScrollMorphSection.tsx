import { useRef } from "react";
import { useScroll } from "framer-motion";
import IntroAnimation from "@/components/ui/scroll-morph-hero";

export function ScrollMorphSection() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative w-full h-[300vh] bg-background">
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                {/* FIXED: Passed as an object, NOT a string */}
                <IntroAnimation scrollYProgress={scrollYProgress}/>
            </div>
        </section>
    );
}
