import { LandingHero } from "@/components/LandingHero"
import { ScrollMorphSection } from "@/components/ScrollMorphSection"
import { FeaturedExhibitions } from "@/components/FeaturedExhibitions"
import { PortfolioCategories } from "@/components/PortfolioCategories"
import { GalleryParallax } from "@/components/GalleryParallax"
import { MainLayout } from "@/components/layout/MainLayout"

function App() {
  return (
    <MainLayout>
      <LandingHero />
      <ScrollMorphSection />
      <FeaturedExhibitions />
      <div id="gallery">
        <GalleryParallax />
      </div>
      <PortfolioCategories />
    </MainLayout>
  )
}

export default App
