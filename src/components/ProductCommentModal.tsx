
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, MessageCircle, Send } from "lucide-react";
import { Product, Comment } from "@/pages/Products";
import { toast } from "@/hooks/use-toast";

interface ProductCommentModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductCommentModal = ({ product, isOpen, onClose }: ProductCommentModalProps) => {
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [comments, setComments] = useState<Comment[]>(product.comments);

  const handleSubmitComment = () => {
    if (!newComment.trim() || !authorName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both your name and comment.",
        variant: "destructive",
      });
      return;
    }

    const comment: Comment = {
      id: Date.now(),
      author: authorName,
      content: newComment,
      timestamp: new Date().toISOString().split('T')[0],
      likes: 0
    };

    setComments([...comments, comment]);
    setNewComment("");
    setAuthorName("");
    
    toast({
      title: "Comment Posted!",
      description: "Your comment has been added successfully.",
    });
  };

  const handleLikeComment = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-green-700 flex items-center">
            <MessageCircle className="mr-2" />
            {product.name} - Farmer Discussions
          </DialogTitle>
          <DialogDescription>
            Share your experience and learn from other farmers using this product
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Info */}
          <div className="space-y-4">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-lg font-semibold text-green-800">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="text-green-700 font-semibold mt-2">{product.price}</p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-800">
              Farmer Comments ({comments.length})
            </h3>
            
            {/* Add New Comment */}
            <div className="space-y-3 p-4 bg-green-50 rounded-lg">
              <Label htmlFor="author">Your Name (Anonymous)</Label>
              <Input
                id="author"
                placeholder="e.g., John K. (Kenya)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
              <Label htmlFor="comment">Share Your Experience</Label>
              <Textarea
                id="comment"
                placeholder="Tell other farmers about your experience with this product..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <Button onClick={handleSubmitComment} className="w-full">
                <Send className="mr-2 w-4 h-4" />
                Post Comment
              </Button>
            </div>

            {/* Display Comments */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No comments yet. Be the first to share your experience!
                </p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-white border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-green-700">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikeComment(comment.id)}
                        className="text-xs p-1 h-auto"
                      >
                        <Heart className="w-3 h-3 mr-1" />
                        {comment.likes}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCommentModal;
