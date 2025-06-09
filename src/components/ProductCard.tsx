
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, DollarSign } from "lucide-react";
import { Product } from "@/types/database";

interface ProductCardProps {
  product: Product;
  onCommentClick: (product: Product) => void;
}

const ProductCard = ({ product, onCommentClick }: ProductCardProps) => {
  return (
    <Card className="border-border hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
          {product.category}
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="text-foreground text-xl">{product.name}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Usage:</h4>
          <p className="text-sm text-muted-foreground">{product.usage}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-2">Key Benefits:</h4>
          <ul className="space-y-1">
            {product.benefits.slice(0, 3).map((benefit, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-center">
                <span className="text-primary mr-2">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-2">Available Packaging:</h4>
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
            <p className="text-lg font-bold text-foreground flex items-center">
              <DollarSign className="mr-1 w-4 h-4" />
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
            <span>Comments</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
