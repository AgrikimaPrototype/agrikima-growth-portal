
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HeartHandshake, Youtube, Tractor } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in agricultural-card p-12 rounded-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-green-800">
            AGRIKIMA
          </h1>
          <p className="text-2xl md:text-4xl mb-4 font-semibold text-stone-800">
            Making Growth Happen
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-stone-700">
            Distinguished leader in organic animal health solutions and sustainable crop management across five continents
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/products">
              <Button 
                size="lg" 
                className="btn-agricultural flex items-center space-x-2"
              >
                <HeartHandshake className="w-5 h-5" />
                <span>Explore Products</span>
              </Button>
            </Link>
            <Link to="/farmer-forum">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-green-600 text-green-700 hover:bg-green-50 px-8 py-4 text-lg font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
              >
                <Tractor className="w-5 h-5" />
                <span>Join Farmer Forum</span>
              </Button>
            </Link>
          </div>

          <div className="flex justify-center items-center space-x-8 text-sm opacity-90">
            <div className="flex items-center space-x-2 text-green-700">
              <Youtube className="w-5 h-5 text-red-500" />
              <span>Watch Our Story</span>
            </div>
            <div className="text-stone-800 font-medium">🌱 90+ Products</div>
            <div className="text-green-700 font-medium">🌍 5+ Continents</div>
            <div className="text-stone-800 font-medium">🏭 3 Manufacturing Facilities</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
