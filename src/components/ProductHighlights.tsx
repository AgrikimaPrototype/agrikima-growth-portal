
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { HeartHandshake } from "lucide-react";

const ProductHighlights = () => {
  const featuredProducts = [
    {
      name: "Advice",
      category: "Viral Disease Management",
      description: "Natural product effective in managing viral problems like Newcastle, Gumboro, and Infectious Bronchitis",
      benefits: ["Reduces mortality rates", "Natural alternative to antibiotics", "Proven effectiveness"],
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Biogar",
      category: "Gut Health Enhancement", 
      description: "Garlic extract that improves gut health leading to early cropping and better bird performance",
      benefits: ["Improved gut health", "Early harvesting", "Better feed conversion"],
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Agritonic",
      category: "Performance Enhancement",
      description: "Provides better value for money and saves small-holder farmers from significant losses",
      benefits: ["Cost-effective solution", "Prevents farming losses", "Suitable for small-scale farmers"],
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Agrivitam",
      category: "Nutritional Support",
      description: "Comprehensive nutritional support that has saved many farmers from business failure",
      benefits: ["Complete nutrition", "Business sustainability", "Proven track record"],
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/80 to-slate-50/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-800 mb-4">
            Our Flagship Products
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Over 90 high-quality products designed to revolutionize animal health and crop management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <Card key={index} className="agricultural-card hover:scale-105 transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-slate-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-blue-700 text-xl">{product.name}</CardTitle>
                <CardDescription className="text-slate-600">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-center">
                        <span className="text-blue-500 mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/products">
            <Button size="lg" className="btn-agricultural flex items-center space-x-2">
              <HeartHandshake className="w-5 h-5" />
              <span>View All Products</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductHighlights;
