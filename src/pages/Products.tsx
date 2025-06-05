
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductCommentModal from "@/components/ProductCommentModal";

export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  usage: string;
  benefits: string[];
  packaging: string[];
  price: string;
  image: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Advice",
      category: "Viral Disease Management",
      description: "Natural product effective in managing viral problems like Newcastle, Gumboro, and Infectious Bronchitis",
      usage: "Administer 1ml per liter of drinking water for 5 consecutive days. For severe cases, double the dosage.",
      benefits: ["Reduces mortality rates by up to 90%", "Natural alternative to antibiotics", "No withdrawal period", "Safe for all poultry"],
      packaging: ["100ml", "250ml", "500ml", "1L", "5L"],
      price: "From $15 per 100ml",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      comments: [
        {
          id: 1,
          author: "John K. (Kenya)",
          content: "This product saved my flock from Newcastle disease. Highly recommended!",
          timestamp: "2024-01-15",
          likes: 12
        },
        {
          id: 2,
          author: "Mary S. (Uganda)",
          content: "Been using Advice for 6 months. No more antibiotic resistance issues.",
          timestamp: "2024-01-10",
          likes: 8
        }
      ]
    },
    {
      id: 2,
      name: "Biogar",
      category: "Gut Health Enhancement",
      description: "Garlic extract that improves gut health leading to early cropping and better bird performance",
      usage: "Mix 2ml per liter of drinking water continuously or 3ml per liter for 3 days weekly.",
      benefits: ["Improved gut health", "Early harvesting", "Better feed conversion ratio", "Natural growth promotion"],
      packaging: ["100ml", "250ml", "500ml", "1L"],
      price: "From $12 per 100ml",
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      comments: [
        {
          id: 1,
          author: "Peter M. (Tanzania)",
          content: "My birds are ready for market 5 days earlier since using Biogar.",
          timestamp: "2024-01-12",
          likes: 15
        }
      ]
    },
    {
      id: 3,
      name: "Agritonic",
      category: "Performance Enhancement",
      description: "Provides better value for money and saves small-holder farmers from significant losses",
      usage: "Add 1ml per liter of drinking water daily. Increase to 2ml during stress periods.",
      benefits: ["Cost-effective solution", "Prevents farming losses", "Stress management", "Immune system boost"],
      packaging: ["100ml", "250ml", "500ml", "1L", "2L"],
      price: "From $10 per 100ml",
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      comments: []
    },
    {
      id: 4,
      name: "Agrivitam",
      category: "Nutritional Support",
      description: "Comprehensive nutritional support that has saved many farmers from business failure",
      usage: "Administer 0.5ml per liter of drinking water daily. Double dosage during recovery periods.",
      benefits: ["Complete nutrition", "Business sustainability", "Recovery support", "Proven track record"],
      packaging: ["100ml", "250ml", "500ml", "1L"],
      price: "From $18 per 100ml",
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      comments: [
        {
          id: 1,
          author: "Grace N. (Rwanda)",
          content: "Agrivitam helped me recover from a major disease outbreak. My farm is thriving again!",
          timestamp: "2024-01-08",
          likes: 20
        }
      ]
    },
    {
      id: 5,
      name: "Organic Fertilizer Plus",
      category: "Crop Management",
      description: "Premium organic fertilizer that enhances soil health and crop productivity",
      usage: "Apply 50kg per hectare during planting season. Follow with 25kg top dressing after 4 weeks.",
      benefits: ["Improved soil structure", "Higher crop yields", "Organic certification safe", "Long-lasting effects"],
      packaging: ["10kg", "25kg", "50kg", "100kg"],
      price: "From $25 per 25kg",
      image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      comments: []
    },
    {
      id: 6,
      name: "BioDefend",
      category: "Disease Prevention",
      description: "Natural disease prevention solution for comprehensive farm protection",
      usage: "Spray 10ml per liter of water on affected areas twice weekly for prevention.",
      benefits: ["Broad spectrum protection", "Environmentally safe", "No chemical residues", "Preventive action"],
      packaging: ["250ml", "500ml", "1L", "5L"],
      price: "From $20 per 250ml",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      comments: []
    }
  ];

  const handleCommentClick = (product: Product) => {
    setSelectedProduct(product);
    setIsCommentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Our Product Range</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of over 90 natural solutions for animal health and crop management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onCommentClick={handleCommentClick}
            />
          ))}
        </div>
      </div>

      <Footer />

      {selectedProduct && (
        <ProductCommentModal
          product={selectedProduct}
          isOpen={isCommentModalOpen}
          onClose={() => setIsCommentModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Products;
