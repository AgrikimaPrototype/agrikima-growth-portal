
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { MessageCircle, Reply, CheckCircle, Clock, Trash2 } from "lucide-react";
import { ForumPost, ForumReply } from "@/types/database";

const AdminForum = () => {
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin-forum-posts'],
    queryFn: async () => {
      console.log("Fetching forum posts...");
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching forum posts:", error);
        throw error;
      }
      console.log("Forum posts fetched:", data);
      return data as ForumPost[];
    }
  });

  const { data: replies } = useQuery({
    queryKey: ['forum-replies', selectedPost?.id],
    queryFn: async () => {
      if (!selectedPost) return [];
      console.log("Fetching replies for post:", selectedPost.id);
      const { data, error } = await supabase
        .from('forum_replies')
        .select('*')
        .eq('post_id', selectedPost.id)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error("Error fetching replies:", error);
        throw error;
      }
      console.log("Replies fetched:", data);
      return data as ForumReply[];
    },
    enabled: !!selectedPost
  });

  const replyMutation = useMutation({
    mutationFn: async ({ postId, content }: { postId: string; content: string }) => {
      console.log("Creating admin reply for post:", postId);
      const { data, error } = await supabase
        .from('forum_replies')
        .insert([{
          post_id: postId,
          author: "Agrikima Expert Team",
          content,
          is_admin_reply: true,
        }])
        .select()
        .single();
      
      if (error) {
        console.error("Error creating reply:", error);
        throw error;
      }
      console.log("Admin reply created:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-replies'] });
      setReplyContent("");
      toast({ 
        title: "Success!", 
        description: "Admin reply posted successfully!",
      });
    },
    onError: (error) => {
      console.error("Reply error:", error);
      toast({ 
        title: "Error", 
        description: "Failed to post reply. Please try again.",
        variant: "destructive"
      });
    }
  });

  const markAnsweredMutation = useMutation({
    mutationFn: async (postId: string) => {
      console.log("Marking post as answered:", postId);
      const { data, error } = await supabase
        .from('forum_posts')
        .update({ is_answered: true })
        .eq('id', postId)
        .select()
        .single();
      
      if (error) {
        console.error("Error marking post as answered:", error);
        throw error;
      }
      console.log("Post marked as answered:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-forum-posts'] });
      toast({ 
        title: "Success!", 
        description: "Post marked as answered!",
      });
    },
    onError: (error) => {
      console.error("Mark answered error:", error);
      toast({ 
        title: "Error", 
        description: "Failed to mark post as answered.",
        variant: "destructive"
      });
    }
  });

  const deletePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      console.log("Deleting post:", postId);
      // First delete all replies
      await supabase
        .from('forum_replies')
        .delete()
        .eq('post_id', postId);
      
      // Then delete the post
      const { error } = await supabase
        .from('forum_posts')
        .delete()
        .eq('id', postId);
      
      if (error) {
        console.error("Error deleting post:", error);
        throw error;
      }
      console.log("Post deleted successfully");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-forum-posts'] });
      setSelectedPost(null);
      toast({ 
        title: "Success!", 
        description: "Post deleted successfully!",
      });
    },
    onError: (error) => {
      console.error("Delete post error:", error);
      toast({ 
        title: "Error", 
        description: "Failed to delete post.",
        variant: "destructive"
      });
    }
  });

  const deleteReplyMutation = useMutation({
    mutationFn: async (replyId: string) => {
      console.log("Deleting reply:", replyId);
      const { error } = await supabase
        .from('forum_replies')
        .delete()
        .eq('id', replyId);
      
      if (error) {
        console.error("Error deleting reply:", error);
        throw error;
      }
      console.log("Reply deleted successfully");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-replies'] });
      toast({ 
        title: "Success!", 
        description: "Reply deleted successfully!",
      });
    },
    onError: (error) => {
      console.error("Delete reply error:", error);
      toast({ 
        title: "Error", 
        description: "Failed to delete reply.",
        variant: "destructive"
      });
    }
  });

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !replyContent.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a reply message.",
        variant: "destructive"
      });
      return;
    }
    
    replyMutation.mutate({
      postId: selectedPost.id,
      content: replyContent,
    });
  };

  const handleMarkAnswered = (postId: string) => {
    markAnsweredMutation.mutate(postId);
  };

  const handleDeletePost = (postId: string, postTitle: string) => {
    if (window.confirm(`Are you sure you want to delete the post "${postTitle}"? This will also delete all replies and cannot be undone.`)) {
      deletePostMutation.mutate(postId);
    }
  };

  const handleDeleteReply = (replyId: string) => {
    if (window.confirm("Are you sure you want to delete this reply? This action cannot be undone.")) {
      deleteReplyMutation.mutate(replyId);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Forum Management</h1>
          <p className="text-gray-600 mt-2">
            Manage farmer discussions and provide expert responses ({posts?.length || 0} posts)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Posts List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Forum Posts
              </CardTitle>
              <CardDescription>Click on a post to view details and respond</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading posts...</p>
                </div>
              ) : posts && posts.length > 0 ? (
                posts.map((post) => (
                  <div
                    key={post.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPost?.id === post.id 
                        ? "border-green-500 bg-green-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{post.title}</h3>
                      <div className="flex items-center gap-2 ml-2">
                        <Badge variant={post.is_answered ? "default" : "secondary"}>
                          {post.is_answered ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Answered
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </>
                          )}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePost(post.id, post.title);
                          }}
                          className="p-1 h-6 w-6 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>By {post.author}</span>
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {post.category}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No forum posts found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Post Details and Reply */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Reply className="w-5 h-5" />
                {selectedPost ? "Post Details & Reply" : "Select a post"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPost ? (
                <div className="space-y-6">
                  {/* Post Details */}
                  <div className="border-b pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{selectedPost.title}</h3>
                      <div className="flex items-center gap-2">
                        {!selectedPost.is_answered && (
                          <Button
                            size="sm"
                            onClick={() => handleMarkAnswered(selectedPost.id)}
                            className="bg-green-600 hover:bg-green-700"
                            disabled={markAnsweredMutation.isPending}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {markAnsweredMutation.isPending ? "Marking..." : "Mark as Answered"}
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePost(selectedPost.id, selectedPost.title)}
                          className="text-red-600 hover:text-red-700"
                          disabled={deletePostMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3 whitespace-pre-wrap">{selectedPost.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>By {selectedPost.author}</span>
                      <span>{new Date(selectedPost.created_at).toLocaleString()}</span>
                      <Badge variant="outline">{selectedPost.category}</Badge>
                    </div>
                  </div>

                  {/* Existing Replies */}
                  {replies && replies.length > 0 && (
                    <div className="space-y-4 max-h-60 overflow-y-auto">
                      <h4 className="font-semibold text-gray-900">Replies ({replies.length}):</h4>
                      {replies.map((reply) => (
                        <div
                          key={reply.id}
                          className={`p-3 rounded-lg ${
                            reply.is_admin_reply 
                              ? "bg-green-50 border border-green-200" 
                              : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{reply.author}</span>
                              {reply.is_admin_reply && (
                                <Badge variant="default" className="text-xs">Admin</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                {new Date(reply.created_at).toLocaleString()}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteReply(reply.id)}
                                className="p-1 h-6 w-6 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  <form onSubmit={handleReply} className="space-y-4">
                    <div>
                      <label htmlFor="reply" className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Response
                      </label>
                      <Textarea
                        id="reply"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Provide your expert response to help this farmer..."
                        rows={4}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={!replyContent.trim() || replyMutation.isPending}
                    >
                      {replyMutation.isPending ? "Posting..." : "Post Admin Reply"}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>Select a post from the left panel to view details and respond</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminForum;
