
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Package, MessageCircle, Users, TrendingUp, CheckCircle, Clock } from "lucide-react";

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      console.log("Fetching admin dashboard stats...");
      const [productsRes, postsRes, commentsRes, answeredPostsRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact' }),
        supabase.from('forum_posts').select('id', { count: 'exact' }),
        supabase.from('comments').select('id', { count: 'exact' }),
        supabase.from('forum_posts').select('id', { count: 'exact' }).eq('is_answered', true)
      ]);

      const stats = {
        products: productsRes.count || 0,
        forumPosts: postsRes.count || 0,
        comments: commentsRes.count || 0,
        answeredPosts: answeredPostsRes.count || 0,
        pendingPosts: (postsRes.count || 0) - (answeredPostsRes.count || 0)
      };

      console.log("Dashboard stats:", stats);
      return stats;
    }
  });

  const { data: recentPosts } = useQuery({
    queryKey: ['recent-posts'],
    queryFn: async () => {
      console.log("Fetching recent posts...");
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error("Error fetching recent posts:", error);
        throw error;
      }
      console.log("Recent posts:", data);
      return data;
    }
  });

  const { data: recentProducts } = useQuery({
    queryKey: ['recent-products'],
    queryFn: async () => {
      console.log("Fetching recent products...");
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error("Error fetching recent products:", error);
        throw error;
      }
      console.log("Recent products:", data);
      return data;
    }
  });

  const statCards = [
    {
      title: "Total Products",
      value: stats?.products || 0,
      icon: Package,
      color: "bg-blue-500",
      description: "Agricultural products in catalog"
    },
    {
      title: "Forum Posts",
      value: stats?.forumPosts || 0,
      icon: MessageCircle,
      color: "bg-green-500",
      description: "Total discussions from farmers"
    },
    {
      title: "Answered Posts",
      value: stats?.answeredPosts || 0,
      icon: CheckCircle,
      color: "bg-purple-500",
      description: "Posts with expert responses"
    },
    {
      title: "Pending Posts",
      value: stats?.pendingPosts || 0,
      icon: Clock,
      color: "bg-orange-500",
      description: "Posts awaiting response"
    },
  ];

  const answerRate = stats?.forumPosts ? 
    Math.round((stats.answeredPosts / stats.forumPosts) * 100) : 0;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your agricultural platform management center</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? "..." : stat.value}
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Response Rate</CardTitle>
              <CardDescription>Forum posts answered by admin team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{answerRate}%</div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${answerRate}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {stats?.answeredPosts || 0} of {stats?.forumPosts || 0} posts answered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current platform health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Products API</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Forum System</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">Running</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full text-left p-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="text-sm font-medium">Backup Database</div>
                  <div className="text-xs text-gray-600">Last backup: Today</div>
                </button>
                <button className="w-full text-left p-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="text-sm font-medium">Export Analytics</div>
                  <div className="text-xs text-gray-600">Generate reports</div>
                </button>
                <button className="w-full text-left p-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="text-sm font-medium">System Settings</div>
                  <div className="text-xs text-gray-600">Configure platform</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Forum Posts</CardTitle>
              <CardDescription>Latest farmer discussions requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts && recentPosts.length > 0 ? (
                  recentPosts.map((post, index) => (
                    <div key={post.id} className="flex items-center space-x-4 p-2 rounded hover:bg-gray-50">
                      <div className={`w-2 h-2 rounded-full ${post.is_answered ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
                        <p className="text-xs text-gray-500">
                          By {post.author} • {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        post.is_answered ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {post.is_answered ? 'Answered' : 'Pending'}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No recent forum posts</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Products</CardTitle>
              <CardDescription>Latest additions to your catalog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts && recentProducts.length > 0 ? (
                  recentProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center space-x-4 p-2 rounded hover:bg-gray-50">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">
                          {product.category} • {new Date(product.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                        {product.price || 'No price'}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <Package className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No recent products</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
