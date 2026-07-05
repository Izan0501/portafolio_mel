import { LandingHero } from "@/components/LandingHero"
import { ScrollMorphSection } from "@/components/ScrollMorphSection"
import { GalleryParallax } from "@/components/GalleryParallax"
import { MainLayout } from "@/components/layout/MainLayout"

function App() {
  return (
    <MainLayout>
      <LandingHero />
      <ScrollMorphSection />
      <div id="gallery">
        <GalleryParallax />
      </div>
    </MainLayout>
  )
}

export default App
