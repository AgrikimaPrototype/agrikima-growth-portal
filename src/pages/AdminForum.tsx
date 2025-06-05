import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { MessageCircle, Reply, CheckCircle, Clock } from "lucide-react";
import { ForumPost, ForumReply } from "@/types/database";

const AdminForum = () => {
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin-forum-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ForumPost[];
    }
  });

  const { data: replies } = useQuery({
    queryKey: ['forum-replies', selectedPost?.id],
    queryFn: async () => {
      if (!selectedPost) return [];
      const { data, error } = await supabase
        .from('forum_replies')
        .select('*')
        .eq('post_id', selectedPost.id)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as ForumReply[];
    },
    enabled: !!selectedPost
  });

  const replyMutation = useMutation({
    mutationFn: async ({ postId, content }: { postId: string; content: string }) => {
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
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-replies'] });
      setReplyContent("");
      toast({ title: "Reply posted successfully!" });
    }
  });

  const markAnsweredMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { data, error } = await supabase
        .from('forum_posts')
        .update({ is_answered: true })
        .eq('id', postId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-forum-posts'] });
      toast({ title: "Post marked as answered!" });
    }
  });

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !replyContent.trim()) return;
    
    replyMutation.mutate({
      postId: selectedPost.id,
      content: replyContent,
    });
  };

  const handleMarkAnswered = (postId: string) => {
    markAnsweredMutation.mutate(postId);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Forum Management</h1>
          <p className="text-gray-600 mt-2">Manage farmer discussions and provide expert responses</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Posts List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Forum Posts ({posts?.length || 0})
              </CardTitle>
              <CardDescription>Click on a post to view details and reply</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
              {isLoading ? (
                <div className="text-center py-4">Loading posts...</div>
              ) : (
                posts?.map((post) => (
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
                      {!selectedPost.is_answered && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkAnswered(selectedPost.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Mark as Answered
                        </Button>
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{selectedPost.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>By {selectedPost.author}</span>
                      <span>{new Date(selectedPost.created_at).toLocaleString()}</span>
                      <Badge variant="outline">{selectedPost.category}</Badge>
                    </div>
                  </div>

                  {/* Existing Replies */}
                  {replies && replies.length > 0 && (
                    <div className="space-y-4 max-h-60 overflow-y-auto">
                      <h4 className="font-semibold text-gray-900">Replies:</h4>
                      {replies.map((reply) => (
                        <div
                          key={reply.id}
                          className={`p-3 rounded-lg ${
                            reply.is_admin_reply 
                              ? "bg-green-50 border border-green-200" 
                              : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-sm">{reply.author}</span>
                            {reply.is_admin_reply && (
                              <Badge variant="default" className="text-xs">Admin</Badge>
                            )}
                            <span className="text-xs text-gray-500 ml-auto">
                              {new Date(reply.created_at).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{reply.content}</p>
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
