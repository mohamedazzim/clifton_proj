import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { ThreeBackground } from "@/components/ThreeBackground";
import { MovingVectors } from "@/components/MovingVectors";
import { FloatingVectorField } from "@/components/FloatingVectorField";
import { HeroSection } from "@/components/HeroSection";
import { VisionMission } from "@/components/VisionMission";
import { Founders } from "@/components/Founders";
import { Products } from "@/components/Products";
import { ModernProducts } from "@/components/ModernProducts";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { OurClients } from "@/components/OurClients";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for all images to load
    const loadImages = async () => {
      // Wait a bit for images to start loading
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const images = document.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve(img);
          } else {
            img.addEventListener('load', () => resolve(img));
            img.addEventListener('error', () => resolve(img));
          }
        });
      });

      // Wait for all images to load (or error)
      await Promise.all(imagePromises);
      
      // Keep loading screen for minimum time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsLoading(false);
    };

    loadImages();
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <ThreeBackground />
      <MovingVectors />
      <FloatingVectorField />
      <Navigation />
      <HeroSection />
      <VisionMission />
      <Founders />
      <Products />
      <ModernProducts />
      <Projects />
      <Testimonials />
      <OurClients />
      <Contact />
      <Footer />
    </div>
  );
}
