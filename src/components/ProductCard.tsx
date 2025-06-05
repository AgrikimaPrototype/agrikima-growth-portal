
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, PiggyBank } from "lucide-react";
import { Product } from "@/pages/Products";

interface ProductCardProps {
  product: Product;
  onCommentClick: (product: Product) => void;
}

const ProductCard = ({ product, onCommentClick }: ProductCardProps) => {
  return (
    <Card className="border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-4 right-4 bg-yellow-500 text-green-900">
          {product.category}
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="text-green-700 text-xl">{product.name}</CardTitle>
        <CardDescription className="text-gray-600">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-green-800 mb-2">Usage:</h4>
          <p className="text-sm text-gray-600">{product.usage}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-green-800 mb-2">Key Benefits:</h4>
          <ul className="space-y-1">
            {product.benefits.slice(0, 3).map((benefit, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-green-800 mb-2">Available Packaging:</h4>
          <div className="flex flex-wrap gap-1">
            {product.packaging.map((size, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {size}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-lg font-bold text-green-700 flex items-center">
              <PiggyBank className="mr-1 w-4 h-4" />
              {product.price}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCommentClick(product)}
            className="flex items-center space-x-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Comments ({product.comments.length})</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
