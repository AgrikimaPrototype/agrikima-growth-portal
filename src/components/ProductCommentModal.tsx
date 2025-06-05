
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, MessageCircle, Send } from "lucide-react";
import { Product, Comment } from "@/types/database";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProductCommentModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductCommentModal = ({ product, isOpen, onClose }: ProductCommentModalProps) => {
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const queryClient = useQueryClient();

  const { data: comments } = useQuery({
    queryKey: ['comments', product.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('product_id', product.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Comment[];
    },
    enabled: isOpen
  });

  const createCommentMutation = useMutation({
    mutationFn: async (commentData: any) => {
      const { data, error } = await supabase
        .from('comments')
        .insert([commentData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', product.id] });
      setNewComment("");
      setAuthorName("");
      toast({
        title: "Comment Posted!",
        description: "Your comment has been added successfully.",
      });
    }
  });

  const updateLikesMutation = useMutation({
    mutationFn: async ({ commentId, newLikes }: { commentId: string; newLikes: number }) => {
      const { data, error } = await supabase
        .from('comments')
        .update({ likes: newLikes })
        .eq('id', commentId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', product.id] });
    }
  });

  const handleSubmitComment = () => {
    if (!newComment.trim() || !authorName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both your name and comment.",
        variant: "destructive",
      });
      return;
    }

    createCommentMutation.mutate({
      product_id: product.id,
      author: authorName,
      content: newComment,
    });
  };

  const handleLikeComment = (comment: Comment) => {
    updateLikesMutation.mutate({
      commentId: comment.id,
      newLikes: comment.likes + 1
    });
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
              Farmer Comments ({comments?.length || 0})
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
              <Button 
                onClick={handleSubmitComment} 
                className="w-full"
                disabled={createCommentMutation.isPending}
              >
                <Send className="mr-2 w-4 h-4" />
                {createCommentMutation.isPending ? "Posting..." : "Post Comment"}
              </Button>
            </div>

            {/* Display Comments */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {!comments || comments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No comments yet. Be the first to share your experience!
                </p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-white border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-green-700">{comment.author}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikeComment(comment)}
                        className="text-xs p-1 h-auto"
                        disabled={updateLikesMutation.isPending}
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
