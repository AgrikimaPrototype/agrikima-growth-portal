
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, DollarSign, Award, CheckCircle } from "lucide-react";

const ProductHighlights = () => {
  const featuredProducts = [
    {
      name: "Advice",
      category: "Viral Disease Management",
      description: "Natural product effective in managing viral problems like Newcastle, Gumboro, and Infectious Bronchitis",
      benefits: ["Reduces mortality rates", "Natural alternative to antibiotics", "Proven effectiveness"],
      icon: Shield,
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Biogar",
      category: "Gut Health Enhancement", 
      description: "Garlic extract that improves gut health leading to early cropping and better bird performance",
      benefits: ["Improved gut health", "Early harvesting", "Better feed conversion"],
      icon: Zap,
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Agritonic",
      category: "Performance Enhancement",
      description: "Provides better value for money and saves small-holder farmers from significant losses",
      benefits: ["Cost-effective solution", "Prevents farming losses", "Suitable for small-scale farmers"],
      icon: DollarSign,
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Agrivitam",
      category: "Nutritional Support",
      description: "Comprehensive nutritional support that has saved many farmers from business failure",
      benefits: ["Complete nutrition", "Business sustainability", "Proven track record"],
      icon: Award,
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section className="section-padding bg-accent/20">
      <div className="container-width">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Flagship Products
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Over 90 high-quality products designed to revolutionize animal health and crop management
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <Card key={index} className="professional-card group animate-fade-in hover:scale-105 transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-sm font-medium border border-border">
                  {product.category}
                </div>
                <div className="absolute top-4 left-4 bg-primary p-2 rounded-full">
                  <product.icon className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-foreground text-xl">{product.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Key Benefits:</h4>
                  <div className="space-y-2">
                    {product.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in animation-delay-300">
          <Link to="/products">
            <Button size="lg" className="btn-primary group">
              View All Products
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;
