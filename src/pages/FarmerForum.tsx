
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ForumPost from "@/components/ForumPost";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Users, Clock, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export interface ForumPostType {
  id: number;
  author: string;
  title: string;
  content: string;
  timestamp: string;
  replies: Reply[];
  category: string;
  isAnswered: boolean;
}

export interface Reply {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  isAdminReply: boolean;
}

const FarmerForum = () => {
  const [posts, setPosts] = useState<ForumPostType[]>([
    {
      id: 1,
      author: "Sarah M. (Kenya)",
      title: "Newcastle Disease Prevention - Need Advice",
      content: "My neighbor's chickens recently died from Newcastle disease. What preventive measures should I take to protect my flock? I have 200 birds.",
      timestamp: "2024-01-15 10:30",
      category: "Disease Management",
      isAnswered: true,
      replies: [
        {
          id: 1,
          author: "Peter K. (Uganda)",
          content: "I faced the same issue last year. Advice from Agrikima worked perfectly for prevention. Use 1ml per liter of water for 5 days.",
          timestamp: "2024-01-15 11:15",
          isAdminReply: false
        },
        {
          id: 2,
          author: "Dr. James - Agrikima Expert",
          content: "Thank you for the question. For Newcastle prevention, I recommend our Advice product at 1ml/L in drinking water for 5 consecutive days monthly. Also ensure proper vaccination schedule and biosecurity measures.",
          timestamp: "2024-01-15 14:30",
          isAdminReply: true
        }
      ]
    },
    {
      id: 2,
      author: "Michael T. (Tanzania)",
      title: "Organic Fertilizer Application Timing",
      content: "When is the best time to apply organic fertilizer for maize farming? I'm planning to plant next month and want to ensure maximum yield.",
      timestamp: "2024-01-14 16:45",
      category: "Crop Management",
      isAnswered: false,
      replies: [
        {
          id: 1,
          author: "Grace N. (Rwanda)",
          content: "From my experience, apply 2 weeks before planting. This gives time for soil integration.",
          timestamp: "2024-01-14 18:20",
          isAdminReply: false
        }
      ]
    }
  ]);

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostAuthor, setNewPostAuthor] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("General");

  const categories = ["General", "Disease Management", "Crop Management", "Nutrition", "Business", "Organic Farming"];

  const handleSubmitPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !newPostAuthor.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to post your question.",
        variant: "destructive",
      });
      return;
    }

    const newPost: ForumPostType = {
      id: Date.now(),
      author: newPostAuthor,
      title: newPostTitle,
      content: newPostContent,
      timestamp: new Date().toLocaleString(),
      category: newPostCategory,
      isAnswered: false,
      replies: []
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostAuthor("");
    setNewPostCategory("General");

    toast({
      title: "Question Posted!",
      description: "Your question has been posted. Our experts will respond soon.",
    });
  };

  const stats = [
    { icon: MessageCircle, label: "Total Questions", value: posts.length.toString() },
    { icon: Users, label: "Active Farmers", value: "150+" },
    { icon: Clock, label: "Avg Response Time", value: "< 4 hrs" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Farmer Forum</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow farmers and our agricultural experts. Ask questions, share experiences, and learn together.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-green-200">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-800">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Post Question Form */}
          <div className="lg:col-span-1">
            <Card className="border-green-200 sticky top-24">
              <CardHeader>
                <CardTitle className="text-green-700">Ask a Question</CardTitle>
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
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
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
                  />
                </div>
                <Button onClick={handleSubmitPost} className="w-full">
                  <Send className="mr-2 w-4 h-4" />
                  Post Question
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Forum Posts */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-green-800">Recent Discussions</h2>
            {posts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No questions yet. Be the first to ask!</p>
                </CardContent>
              </Card>
            ) : (
              posts.map((post) => (
                <ForumPost
                  key={post.id}
                  post={post}
                  onUpdatePost={(updatedPost) => {
                    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
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
