
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductCommentModal from "@/components/ProductCommentModal";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/database";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    }
  });

  // Real-time subscription for products
  useEffect(() => {
    const channel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        () => {
          // Refetch products when changes occur
          window.location.reload();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleCommentClick = (product: Product) => {
    setSelectedProduct(product);
    setIsCommentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Our Product Range</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of over 90 natural solutions for animal health and crop management
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {products?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onCommentClick={handleCommentClick}
              />
            ))}
          </div>
        )}
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
