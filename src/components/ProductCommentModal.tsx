
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, User } from "lucide-react";
import { Product, Comment } from "@/types/database";
import { toast } from "@/hooks/use-toast";

interface ProductCommentModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductCommentModal = ({ product, isOpen, onClose }: ProductCommentModalProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");

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
      id: Date.now().toString(),
      product_id: product?.id || "",
      author: authorName,
      content: newComment,
      likes: 0,
      is_admin_reply: false,
      created_at: new Date().toISOString(),
    };

    setComments([...comments, comment]);
    setNewComment("");
    setAuthorName("");

    toast({
      title: "Comment Posted!",
      description: "Your comment has been added.",
    });
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground">
            Comments for {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Product Info */}
          <div className="p-4 bg-accent rounded-lg">
            <h3 className="font-semibold text-foreground">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>

          {/* Comments */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Comments ({comments.length})
            </h4>
            
            {comments.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No comments yet. Be the first to share your experience!
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="p-3 bg-accent rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-sm text-foreground flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {comment.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.content}</p>
                </div>
              ))
            )}
          </div>

          {/* Add Comment Form */}
          <div className="space-y-3 border-t pt-4">
            <h4 className="font-semibold text-foreground">Add Your Comment</h4>
            <Input
              placeholder="Your name (e.g., John D. (Kenya))"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
            <Textarea
              placeholder="Share your experience with this product..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <div className="flex space-x-2">
              <Button onClick={handleSubmitComment} size="sm">
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCommentModal;
