
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
      
      {/* Background Video with African Agricultural Theme */}
      <div className="fixed inset-0 z-0 opacity-20">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://videos.pexels.com/video-files/6253568/6253568-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          {/* Fallback image */}
          <img 
            src="https://images.unsplash.com/photo-1543281410-d94b3b9b8f76?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="African farming"
            className="w-full h-full object-cover"
          />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"></div>
      </div>

      <div className="relative z-10">
        <div className="animate-fade-in">
          <HeroSection />
        </div>
        <div className="animate-fade-in animation-delay-200">
          <CompanyOverview />
        </div>
        <div className="animate-fade-in animation-delay-400">
          <ProductHighlights />
        </div>
        <div className="animate-fade-in animation-delay-600">
          <ImpactMetrics />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
