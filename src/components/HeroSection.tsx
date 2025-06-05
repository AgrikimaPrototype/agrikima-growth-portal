
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PiggyBank, Youtube } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-green-800/90 to-yellow-600/90 text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
        }}
      />
      
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-yellow-400">
            AGRIKIMA
          </h1>
          <p className="text-2xl md:text-4xl mb-4 font-semibold">
            Making Growth Happen
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Distinguished leader in organic animal health solutions and sustainable crop management across five continents
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/products">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-green-900 font-semibold px-8 py-4 text-lg"
              >
                <PiggyBank className="mr-2" />
                Explore Products
              </Button>
            </Link>
            <Link to="/farmer-forum">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-green-900 px-8 py-4 text-lg"
              >
                Join Farmer Forum
              </Button>
            </Link>
          </div>

          <div className="flex justify-center items-center space-x-8 text-sm opacity-90">
            <div className="flex items-center space-x-2">
              <Youtube className="w-5 h-5 text-red-400" />
              <span>Watch Our Story</span>
            </div>
            <div className="text-yellow-300">🌱 90+ Products</div>
            <div className="text-yellow-300">🌍 5+ Continents</div>
            <div className="text-yellow-300">🏭 3 Manufacturing Facilities</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
