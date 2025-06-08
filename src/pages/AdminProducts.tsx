
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { Product } from "@/types/database";

const AdminProducts = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    usage: "",
    benefits: "",
    packaging: "",
    price: "",
    image: "",
  });

  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      console.log("Fetching products...");
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
      console.log("Products fetched:", data);
      return data as Product[];
    }
  });

  const createProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      console.log("Creating product with data:", productData);
      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...productData,
          benefits: productData.benefits.split('\n').filter((b: string) => b.trim()),
          packaging: productData.packaging.split('\n').filter((p: string) => p.trim()),
        }])
        .select()
        .single();
      
      if (error) {
        console.error("Error creating product:", error);
        throw error;
      }
      console.log("Product created:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ 
        title: "Success!", 
        description: "Product created successfully!",
      });
    },
    onError: (error) => {
      console.error("Create product error:", error);
      toast({ 
        title: "Error", 
        description: "Failed to create product. Please try again.",
        variant: "destructive"
      });
    }
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, ...productData }: any) => {
      console.log("Updating product:", id, productData);
      const { data, error } = await supabase
        .from('products')
        .update({
          ...productData,
          benefits: productData.benefits.split('\n').filter((b: string) => b.trim()),
          packaging: productData.packaging.split('\n').filter((p: string) => p.trim()),
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error("Error updating product:", error);
        throw error;
      }
      console.log("Product updated:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ 
        title: "Success!", 
        description: "Product updated successfully!",
      });
    },
    onError: (error) => {
      console.error("Update product error:", error);
      toast({ 
        title: "Error", 
        description: "Failed to update product. Please try again.",
        variant: "destructive"
      });
    }
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log("Deleting product:", id);
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error("Error deleting product:", error);
        throw error;
      }
      console.log("Product deleted successfully");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast({ 
        title: "Success!", 
        description: "Product deleted successfully!",
      });
    },
    onError: (error) => {
      console.error("Delete product error:", error);
      toast({ 
        title: "Error", 
        description: "Failed to delete product. Please try again.",
        variant: "destructive"
      });
    }
  });

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      usage: "",
      benefits: "",
      packaging: "",
      price: "",
      image: "",
    });
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    console.log("Editing product:", product);
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      usage: product.usage,
      benefits: Array.isArray(product.benefits) ? product.benefits.join('\n') : '',
      packaging: Array.isArray(product.packaging) ? product.packaging.join('\n') : '',
      price: product.price,
      image: product.image,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
    
    if (!formData.name.trim() || !formData.category.trim() || !formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, ...formData });
    } else {
      createProductMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      deleteProductMutation.mutate(id);
    }
  };

  const handleOpenDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
            <p className="text-gray-600 mt-2">Manage your product catalog ({products?.length || 0} products)</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenDialog} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                <DialogDescription>
                  {editingProduct ? "Update product information" : "Create a new product for your catalog"}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Fertilizer, Pesticide"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the product and its purpose"
                    rows={3}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="usage">Usage Instructions</Label>
                  <Textarea
                    id="usage"
                    value={formData.usage}
                    onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                    placeholder="How to use this product"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="benefits">Benefits (one per line)</Label>
                  <Textarea
                    id="benefits"
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    placeholder="Increases crop yield&#10;Improves soil health&#10;Reduces pest damage"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="packaging">Packaging Options (one per line)</Label>
                  <Textarea
                    id="packaging"
                    value={formData.packaging}
                    onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                    placeholder="1kg bag&#10;5kg bag&#10;25kg bag"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="e.g., $50 - $100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700"
                    disabled={createProductMutation.isPending || updateProductMutation.isPending}
                  >
                    {createProductMutation.isPending || updateProductMutation.isPending 
                      ? "Saving..." 
                      : editingProduct ? "Update Product" : "Create Product"
                    }
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Products Catalog
            </CardTitle>
            <CardDescription>Manage your agricultural products and their details</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading products...</p>
              </div>
            ) : products && products.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price || 'Not set'}</TableCell>
                        <TableCell>{new Date(product.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(product)}
                              className="hover:bg-green-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              disabled={deleteProductMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No products found</p>
                <Button onClick={handleOpenDialog} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Product
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
