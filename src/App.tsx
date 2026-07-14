import { MotionConfig, LazyMotion } from "framer-motion"
import { LandingHero } from "@/components/LandingHero"
import { ScrollMorphSection } from "@/components/ScrollMorphSection"
import { FeaturedExhibitions } from "@/components/FeaturedExhibitions"
import { PortfolioCategories } from "@/components/PortfolioCategories"
import { GalleryParallax } from "@/components/GalleryParallax"
import { VisionProcess } from "@/components/VisionProcess"
import { FooterReveal } from "@/components/FooterReveal"
import { MainLayout } from "@/components/layout/MainLayout"

// domMax (not domAnimation) because the project uses advanced 3D transforms
// (preserve-3d, rotateX/Y/Z), LayoutGroup, and complex spring physics.
const loadFeatures = () => import("framer-motion").then((res) => res.domMax)

function App() {
  return (
    // 1. Accessibility (WCAG 2.3.3): respects users with vestibular/motion disorders
    <MotionConfig reducedMotion="user">

      {/* 2. Extreme Performance: defers the heavy animation engine asynchronously */}
      <LazyMotion features={loadFeatures} strict>

        <MainLayout>
          <LandingHero />
          <VisionProcess />
          <ScrollMorphSection />
          <FeaturedExhibitions />
          <PortfolioCategories />
          <div id="gallery">
            <GalleryParallax />
          </div>
          <FooterReveal />
        </MainLayout>

      </LazyMotion>

    </MotionConfig>
  )
}

export default App
