import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Reply, Send, CheckCircle } from "lucide-react";
import { ForumPost as ForumPostType, ForumReply } from "@/types/database";
import { toast } from "@/hooks/use-toast";

interface ForumPostProps {
  post: ForumPostType & { replies: ForumReply[] };
  onUpdatePost: () => void;
}

const ForumPost = ({ post, onUpdatePost }: ForumPostProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");

  const handleSubmitReply = () => {
    if (!replyContent.trim() || !replyAuthor.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both your name and reply content.",
        variant: "destructive",
      });
      return;
    }

    const newReply: ForumReply = {
      id: Date.now().toString(),
      post_id: post.id,
      author: replyAuthor,
      content: replyContent,
      created_at: new Date().toISOString(),
      is_admin_reply: replyAuthor.toLowerCase().includes("agrikima") || replyAuthor.toLowerCase().includes("dr.")
    };

    onUpdatePost();
    setReplyContent("");
    setReplyAuthor("");
    setShowReplyForm(false);

    toast({
      title: "Reply Posted!",
      description: "Your reply has been added to the discussion.",
    });
  };

  return (
    <Card className="border-green-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant={post.is_answered ? "default" : "secondary"} className="text-xs">
                {post.category}
              </Badge>
              {post.is_answered && (
                <Badge className="bg-green-600 text-white text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Answered
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg text-green-800">{post.title}</CardTitle>
            <div className="text-sm text-gray-500 mt-1">
              by {post.author} • {new Date(post.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-700">{post.content}</p>
        
        {/* Replies */}
        {post.replies.length > 0 && (
          <div className="space-y-3 border-t pt-4">
            <h4 className="font-semibold text-green-800 flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Replies ({post.replies.length})
            </h4>
            {post.replies.map((reply) => (
              <div 
                key={reply.id} 
                className={`p-3 rounded-lg ${
                  reply.is_admin_reply 
                    ? "bg-green-50 border-l-4 border-green-500" 
                    : "bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-semibold text-sm ${
                    reply.is_admin_reply ? "text-green-700" : "text-gray-700"
                  }`}>
                    {reply.author}
                    {reply.is_admin_reply && (
                      <Badge className="ml-2 bg-green-600 text-white text-xs">Expert</Badge>
                    )}
                  </span>
                  <span className="text-xs text-gray-500">{new Date(reply.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-700">{reply.content}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Reply Form */}
        {showReplyForm ? (
          <div className="space-y-3 border-t pt-4">
            <h4 className="font-semibold text-green-800">Add Your Reply</h4>
            <Input
              placeholder="Your name (e.g., Mary S. (Uganda))"
              value={replyAuthor}
              onChange={(e) => setReplyAuthor(e.target.value)}
            />
            <Textarea
              placeholder="Share your experience or advice..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={3}
            />
            <div className="flex space-x-2">
              <Button onClick={handleSubmitReply} size="sm">
                <Send className="w-4 h-4 mr-2" />
                Post Reply
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowReplyForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowReplyForm(true)}
            className="w-full"
          >
            <Reply className="w-4 h-4 mr-2" />
            Reply to this question
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ForumPost;
