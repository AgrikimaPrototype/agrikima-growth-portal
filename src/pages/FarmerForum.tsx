
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ForumPost from "@/components/ForumPost";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users, Clock, Send, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ForumPost as ForumPostType, ForumReply } from "@/types/database";

const FarmerForum = () => {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostAuthor, setNewPostAuthor] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("General");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const queryClient = useQueryClient();

  const categories = ["General", "Disease Management", "Crop Management", "Nutrition", "Business", "Organic Farming"];

  const { data: posts, isLoading } = useQuery({
    queryKey: ['forum-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ForumPostType[];
    }
  });

  const { data: replies } = useQuery({
    queryKey: ['forum-replies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_replies')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as ForumReply[];
    }
  });

  // Real-time subscriptions
  useEffect(() => {
    const postsChannel = supabase
      .channel('forum-posts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'forum_posts'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['forum-posts'] });
        }
      )
      .subscribe();

    const repliesChannel = supabase
      .channel('forum-replies-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'forum_replies'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['forum-replies'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(postsChannel);
      supabase.removeChannel(repliesChannel);
    };
  }, [queryClient]);

  const createPostMutation = useMutation({
    mutationFn: async (postData: any) => {
      const { data, error } = await supabase
        .from('forum_posts')
        .insert([postData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-posts'] });
      setNewPostTitle("");
      setNewPostContent("");
      setNewPostAuthor("");
      setNewPostCategory("General");
      toast({
        title: "Question Posted!",
        description: "Your question has been posted. Our experts will respond soon.",
      });
    }
  });

  const handleSubmitPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !newPostAuthor.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to post your question.",
        variant: "destructive",
      });
      return;
    }

    createPostMutation.mutate({
      author: newPostAuthor,
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory,
    });
  };

  // Group replies by post ID
  const repliesByPost = replies?.reduce((acc, reply) => {
    if (!acc[reply.post_id]) {
      acc[reply.post_id] = [];
    }
    acc[reply.post_id].push(reply);
    return acc;
  }, {} as Record<string, ForumReply[]>) || {};

  // Filter posts by category
  const filteredPosts = posts?.filter(post => 
    selectedCategory === "All" || post.category === selectedCategory
  ) || [];

  // Enhanced posts with replies
  const enhancedPosts = filteredPosts.map(post => ({
    ...post,
    replies: repliesByPost[post.id] || []
  }));

  const stats = [
    { icon: MessageCircle, label: "Total Questions", value: posts?.length?.toString() || "0" },
    { icon: Users, label: "Active Farmers", value: "150+" },
    { icon: Clock, label: "Avg Response Time", value: "< 4 hrs" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-amber-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-emerald-800 mb-4">Farmer Forum</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow farmers and our agricultural experts. Ask questions, share experiences, and learn together.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-emerald-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-emerald-800">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-emerald-800">Filter by Category</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedCategory === "All" ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 ${selectedCategory === "All" ? "bg-emerald-600" : "hover:bg-emerald-100"}`}
              onClick={() => setSelectedCategory("All")}
            >
              All ({posts?.length || 0})
            </Badge>
            {categories.map((category) => {
              const count = posts?.filter(p => p.category === category).length || 0;
              return (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 ${selectedCategory === category ? "bg-emerald-600" : "hover:bg-emerald-100"}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} ({count})
                </Badge>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Post Question Form */}
          <div className="lg:col-span-1">
            <Card className="border-emerald-200 sticky top-24 animate-slide-in-right bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-emerald-700">Ask a Question</CardTitle>
                <CardDescription>
                  Get expert advice from Agrikima specialists and experienced farmers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="author">Your Name (Stay Anonymous)</Label>
                  <Input
                    id="author"
                    placeholder="e.g., John K. (Kenya)"
                    value={newPostAuthor}
                    onChange={(e) => setNewPostAuthor(e.target.value)}
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md bg-white/80"
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="title">Question Title</Label>
                  <Input
                    id="title"
                    placeholder="Brief title for your question"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="bg-white/80"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Your Question</Label>
                  <Textarea
                    id="content"
                    placeholder="Describe your farming challenge or question in detail..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={5}
                    className="bg-white/80"
                  />
                </div>
                <Button 
                  onClick={handleSubmitPost} 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={createPostMutation.isPending}
                >
                  <Send className="mr-2 w-4 h-4" />
                  {createPostMutation.isPending ? "Posting..." : "Post Question"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Forum Posts */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-emerald-800">
              {selectedCategory === "All" ? "Recent Discussions" : `${selectedCategory} Discussions`}
            </h2>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : enhancedPosts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {selectedCategory === "All" 
                      ? "No questions yet. Be the first to ask!" 
                      : `No questions in ${selectedCategory} category yet.`
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              enhancedPosts.map((post) => (
                <ForumPost
                  key={post.id}
                  post={post}
                  onUpdatePost={() => {
                    queryClient.invalidateQueries({ queryKey: ['forum-posts'] });
                    queryClient.invalidateQueries({ queryKey: ['forum-replies'] });
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FarmerForum;
