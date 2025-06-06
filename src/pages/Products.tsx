
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductCommentModal from "@/components/ProductCommentModal";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/database";
import { Tractor, HeartHandshake } from "lucide-react";

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

  // Categorize products
  const agricultureProducts = products?.filter(product => 
    product.category.toLowerCase().includes('crop') || 
    product.category.toLowerCase().includes('organic') ||
    product.category.toLowerCase().includes('fertilizer') ||
    product.category.toLowerCase().includes('soil')
  ) || [];

  const veterinaryProducts = products?.filter(product => 
    product.category.toLowerCase().includes('disease') || 
    product.category.toLowerCase().includes('health') ||
    product.category.toLowerCase().includes('nutrition') ||
    product.category.toLowerCase().includes('performance') ||
    product.category.toLowerCase().includes('viral') ||
    product.category.toLowerCase().includes('gut')
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-amber-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-emerald-800 mb-4">Our Product Range</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of over 90 natural solutions for animal health and crop management
          </p>
        </div>

        <Tabs defaultValue="veterinary" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="veterinary" className="flex items-center space-x-2">
              <HeartHandshake className="w-4 h-4" />
              <span>Veterinary Products ({veterinaryProducts.length})</span>
            </TabsTrigger>
            <TabsTrigger value="agriculture" className="flex items-center space-x-2">
              <Tractor className="w-4 h-4" />
              <span>Agriculture Products ({agricultureProducts.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="veterinary">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-emerald-800 mb-2">Veterinary & Animal Health Solutions</h2>
              <p className="text-gray-600">Natural products for animal health, disease management, and performance enhancement</p>
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
                {veterinaryProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onCommentClick={handleCommentClick}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="agriculture">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-emerald-800 mb-2">Agriculture & Crop Management</h2>
              <p className="text-gray-600">Organic fertilizers, soil enhancers, and crop protection solutions</p>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                {agricultureProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onCommentClick={handleCommentClick}
                  />
                ))}
                {agricultureProducts.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <Tractor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Agriculture products coming soon!</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
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
