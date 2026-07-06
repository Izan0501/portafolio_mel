"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";
import type { MotionValue } from "framer-motion";

// --- Types ---
export interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({
    src,
    index,
    target,
}: FlipCardProps) {
    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 40,
                mass: 0.5
            }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={`hero-${index}`}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-900 flex flex-col items-center justify-center p-4 border border-gray-700"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[8px] font-bold text-blue-400 uppercase tracking-widest mb-1">View</p>
                        <p className="text-xs font-medium text-white">Details</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;

// Unsplash Images
const IMAGES = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=300&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&q=80",
    "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=300&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&q=80",
    "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=300&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80",
    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=300&q=80",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=300&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&q=80",
    "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=300&q=80",
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=300&q=80",
    "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=300&q=80",
    "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=300&q=80",
    "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=300&q=80",
];

// Helper for linear interpolation
const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function IntroAnimation({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;
        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
            }
        };
        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);
        setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
        return () => observer.disconnect();
    }, []);

    // --- High-Performance Scroll Transforms ---
    const morphProgress = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
    const scrollRotate = useTransform(scrollYProgress, [0.15, 1], [0, 360]);

    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);

    useMotionValueEvent(morphProgress, "change", (latest) => setMorphValue(latest));
    useMotionValueEvent(scrollRotate, "change", (latest) => setRotateValue(latest));

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribe = smoothMouseX.on("change", setParallaxValue);
        return () => unsubscribe();
    }, [smoothMouseX]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Scroll-Driven Text Opacity ---
    // Text fades out smoothly as the circle morphs into the arc
    const introOpacity = useTransform(morphProgress, [0, 0.5], [1, 0]);
    const introScale = useTransform(morphProgress, [0, 0.5], [1, 0.9]);
    
    const contentOpacity = useTransform(morphProgress, [0.8, 1], [0, 1]);
    const contentY = useTransform(morphProgress, [0.8, 1], [20, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-background overflow-hidden">
            <div className="flex h-full w-full flex-col items-center justify-center [perspective:1000px]">

                {/* Intro Text (Scroll Fade Out) */}
                <motion.div 
                    style={{ opacity: introOpacity, scale: introScale }}
                    className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2"
                >
                    <h1 className="text-2xl font-medium tracking-tight text-foreground md:text-4xl font-serif">
                        The Art of Perception.
                    </h1>
                    <p className="mt-4 text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                        Scroll to explore
                    </p>
                </motion.div>

                {/* Arc Active Content (Scroll Fade In) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[12%] mt-12 md:mt-16 z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-serif font-semibold text-foreground tracking-tight mb-4">
                        Curated Masterpieces
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed font-sans">
                        Discover a world where light meets emotion. <br className="hidden md:block" />
                        Scroll through a curated collection of visual stories designed to captivate.
                    </p>
                </motion.div>

                {/* Main Container */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                        const isMobile = containerSize.width < 768;
                        const minDimension = Math.min(containerSize.width, containerSize.height);

                        // A. Calculate Circle Position (Baseline)
                        const circleRadius = Math.min(minDimension * 0.35, 350);
                        const circleAngle = (i / TOTAL_IMAGES) * 360;
                        const circleRad = (circleAngle * Math.PI) / 180;
                        const circlePos = {
                            x: Math.cos(circleRad) * circleRadius,
                            y: Math.sin(circleRad) * circleRadius,
                            rotation: circleAngle + 90,
                        };

                        // B. Calculate Bottom Arc Position
                        const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                        const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                        const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                        const arcCenterY = arcApexY + arcRadius;
                        
                        const spreadAngle = isMobile ? 100 : 130;
                        const startAngle = -90 - (spreadAngle / 2);
                        const step = spreadAngle / (TOTAL_IMAGES - 1);

                        const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                        const maxRotation = spreadAngle * 1.0; 
                        const boundedRotation = -scrollProgress * maxRotation;
                        const currentArcAngle = startAngle + (i * step) + boundedRotation;
                        const arcRad = (currentArcAngle * Math.PI) / 180;

                        const arcPos = {
                            x: Math.cos(arcRad) * arcRadius + parallaxValue,
                            y: Math.sin(arcRad) * arcRadius + arcCenterY,
                            rotation: currentArcAngle + 90,
                            scale: isMobile ? 1.4 : 1.8,
                        };

                        // C. Interpolate (Morph) deterministically
                        const target = {
                            x: lerp(circlePos.x, arcPos.x, morphValue),
                            y: lerp(circlePos.y, arcPos.y, morphValue),
                            rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                            scale: lerp(1, arcPos.scale, morphValue),
                            opacity: 1,
                        };

                        return (
                            <FlipCard index={i} key={i} src={src} target={target} total={TOTAL_IMAGES}/>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
