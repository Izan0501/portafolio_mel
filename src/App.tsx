import { LandingHero } from "@/components/LandingHero"
import { ScrollMorphSection } from "@/components/ScrollMorphSection"
import { FeaturedExhibitions } from "@/components/FeaturedExhibitions"
import { PortfolioCategories } from "@/components/PortfolioCategories"
import { GalleryParallax } from "@/components/GalleryParallax"
import { VisionProcess } from "@/components/VisionProcess"
import { FooterReveal } from "@/components/FooterReveal"
import { MainLayout } from "@/components/layout/MainLayout"

function App() {
  return (
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
  )
}

export default App
