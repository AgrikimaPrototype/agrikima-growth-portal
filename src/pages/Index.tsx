
import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CompanyOverview from "@/components/CompanyOverview";
import ProductHighlights from "@/components/ProductHighlights";
import ImpactMetrics from "@/components/ImpactMetrics";
import Footer from "@/components/Footer";

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    "https://images.unsplash.com/photo-1543281410-d94b3b9b8f76?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  ];

  useEffect(() => {
    // Auto-play background video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }

    // Rotate background images every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen professional-gradient">
      <Navigation />
      
      {/* Subtle Background with rotating images */}
      <div className="fixed inset-0 z-0">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-5"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://videos.pexels.com/video-files/6253568/6253568-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Rotating Background Images */}
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-2000 ${
              index === currentImageIndex ? 'opacity-10' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${image}')`
            }}
          />
        ))}

        {/* Subtle overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80"></div>
      </div>

      <div className="relative z-10">
        <div className="animate-fade-in">
          <HeroSection />
        </div>
        <div className="animate-fade-in animation-delay-100">
          <CompanyOverview />
        </div>
        <div className="animate-fade-in animation-delay-200">
          <ProductHighlights />
        </div>
        <div className="animate-fade-in animation-delay-300">
          <ImpactMetrics />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
