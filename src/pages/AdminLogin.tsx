
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Shield, Leaf } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Attempting login with:", { email });
      
      // First authenticate with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Auth response:", { authData, authError });

      if (authError) {
        // If user doesn't exist, try to create them
        if (authError.message.includes('Invalid login credentials')) {
          console.log("User not found, attempting to create admin user...");
          
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
          });

          console.log("SignUp response:", { signUpData, signUpError });

          if (signUpError) throw signUpError;

          if (signUpData.user) {
            // Add to admin_users table
            const { error: adminError } = await supabase
              .from('admin_users')
              .insert({
                user_id: signUpData.user.id,
                email: email,
                is_active: true
              });

            if (adminError) {
              console.log("Admin insert error:", adminError);
              // If admin already exists, that's okay
              if (!adminError.message.includes('duplicate')) {
                throw adminError;
              }
            }

            toast({
              title: "Admin Account Created",
              description: "Admin account created successfully. Please check your email for verification.",
            });

            navigate('/admin/dashboard');
            return;
          }
        }
        throw authError;
      }

      if (!authData.user) {
        throw new Error('No user data returned');
      }

      // Check if user is admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      console.log("Admin check:", { adminData, adminError });

      if (adminError && adminError.code !== 'PGRST116') {
        throw adminError;
      }

      if (!adminData) {
        // Create admin entry if it doesn't exist
        const { error: insertError } = await supabase
          .from('admin_users')
          .insert({
            user_id: authData.user.id,
            email: email,
            is_active: true
          });

        if (insertError && !insertError.message.includes('duplicate')) {
          console.log("Failed to create admin entry:", insertError);
          throw new Error('Failed to create admin entry');
        }
      }

      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });

      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-amber-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <Card className="w-full max-w-md relative z-10 border-green-200 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-green-800 flex items-center justify-center gap-2">
            <Leaf className="w-6 h-6" />
            Agrikima Admin
          </CardTitle>
          <CardDescription>
            Access the administrative panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-green-200 focus:border-green-500"
                placeholder="agrikimaprototype6@gmail.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-green-200 focus:border-green-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm text-stone-600">
            <p>Admin credentials:</p>
            <p>Email: agrikimaprototype6@gmail.com</p>
            <p>Password: Insideout.co.ke(1906)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
