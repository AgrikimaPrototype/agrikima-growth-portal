
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Globe, Package, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hero-gradient section-padding">
      <div className="container-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent text-accent-foreground border border-border">
                <Globe className="w-4 h-4 mr-2" />
                Serving 5+ Continents
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              AGRIKIMA
              <span className="block text-2xl md:text-3xl text-primary font-semibold mt-2">
                Making Growth Happen
              </span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-muted-foreground leading-relaxed max-w-2xl">
              Distinguished leader in organic animal health solutions and sustainable crop management. 
              Empowering farmers worldwide with innovative, natural alternatives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/products">
                <Button size="lg" className="btn-primary group">
                  Explore Products
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/farmer-forum">
                <Button variant="outline" size="lg" className="btn-secondary group">
                  <Users className="w-4 h-4 mr-2" />
                  Join Farmer Forum
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-lg mb-2 mx-auto">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">90+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-lg mb-2 mx-auto">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">5+</div>
                <div className="text-sm text-muted-foreground">Continents</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-lg mb-2 mx-auto">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">1000+</div>
                <div className="text-sm text-muted-foreground">Farmers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-lg mb-2 mx-auto">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">35+</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="animate-fade-in animation-delay-200">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Modern agriculture facility"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
