
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Reply, Send, CheckCircle } from "lucide-react";
import { ForumPostType, Reply as ReplyType } from "@/pages/FarmerForum";
import { toast } from "@/hooks/use-toast";

interface ForumPostProps {
  post: ForumPostType;
  onUpdatePost: (post: ForumPostType) => void;
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

    const newReply: ReplyType = {
      id: Date.now(),
      author: replyAuthor,
      content: replyContent,
      timestamp: new Date().toLocaleString(),
      isAdminReply: replyAuthor.toLowerCase().includes("agrikima") || replyAuthor.toLowerCase().includes("dr.")
    };

    const updatedPost = {
      ...post,
      replies: [...post.replies, newReply],
      isAnswered: newReply.isAdminReply || post.isAnswered
    };

    onUpdatePost(updatedPost);
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
              <Badge variant={post.isAnswered ? "default" : "secondary"} className="text-xs">
                {post.category}
              </Badge>
              {post.isAnswered && (
                <Badge className="bg-green-600 text-white text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Answered
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg text-green-800">{post.title}</CardTitle>
            <div className="text-sm text-gray-500 mt-1">
              by {post.author} • {post.timestamp}
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
                  reply.isAdminReply 
                    ? "bg-green-50 border-l-4 border-green-500" 
                    : "bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-semibold text-sm ${
                    reply.isAdminReply ? "text-green-700" : "text-gray-700"
                  }`}>
                    {reply.author}
                    {reply.isAdminReply && (
                      <Badge className="ml-2 bg-green-600 text-white text-xs">Expert</Badge>
                    )}
                  </span>
                  <span className="text-xs text-gray-500">{reply.timestamp}</span>
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
