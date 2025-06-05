
import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CompanyOverview from "@/components/CompanyOverview";
import ProductHighlights from "@/components/ProductHighlights";
import ImpactMetrics from "@/components/ImpactMetrics";
import Footer from "@/components/Footer";

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play background video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      <Navigation />
      
      {/* Background Video */}
      <div className="fixed inset-0 z-0 opacity-30">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://images.unsplash.com/photo-1566838803778-ebc32be5cb32"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="relative z-10">
        <HeroSection />
        <CompanyOverview />
        <ProductHighlights />
        <ImpactMetrics />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
