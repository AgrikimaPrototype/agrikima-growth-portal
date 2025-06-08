
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
  const [email, setEmail] = useState("agrikimaprototype6@gmail.com");
  const [password, setPassword] = useState("Insideout.co.ke(1906)");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Attempting login with email:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Auth response:", { data, error });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          console.log("User not found, attempting to create admin user...");
          
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/admin/dashboard`
            }
          });

          console.log("SignUp response:", { signUpData, signUpError });

          if (signUpError) {
            throw signUpError;
          }

          if (signUpData.user && !signUpData.user.email_confirmed_at) {
            toast({
              title: "Check Your Email",
              description: "Please check your email and click the confirmation link to complete registration.",
            });
            return;
          }

          toast({
            title: "Account Created",
            description: "Admin account created successfully. You can now login.",
          });
          
          // Try to login again after signup
          const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (loginError) {
            throw loginError;
          }

          if (loginData.user) {
            navigate('/admin/dashboard');
          }
        } else {
          throw error;
        }
      } else if (data.user) {
        console.log("Login successful for user:", data.user.id);
        
        toast({
          title: "Login Successful",
          description: "Welcome to the admin panel!",
        });

        navigate('/admin/dashboard');
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Authentication Failed",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-stone-800 flex items-center justify-center p-4">
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
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm text-stone-600">
            <p>Default credentials:</p>
            <p>Email: agrikimaprototype6@gmail.com</p>
            <p>Password: Insideout.co.ke(1906)</p>
            <div className="mt-2 text-xs text-green-600">
              Note: First-time login will create admin account automatically
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
