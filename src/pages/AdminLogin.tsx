
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
      
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("SignIn result:", { signInData, signInError });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          console.log("Login failed, attempting signup...");
          
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
          });

          console.log("SignUp result:", { signUpData, signUpError });

          if (signUpError) {
            throw new Error(`Signup failed: ${signUpError.message}`);
          }

          if (signUpData.user) {
            toast({
              title: "Account Created",
              description: "Admin account created successfully. You can now login.",
            });
            
            const { data: retrySignIn, error: retryError } = await supabase.auth.signInWithPassword({
              email,
              password,
            });

            if (retryError) {
              throw new Error(`Login after signup failed: ${retryError.message}`);
            }

            if (retrySignIn.user) {
              navigate('/admin/dashboard');
              return;
            }
          }
        } else {
          throw new Error(`Login failed: ${signInError.message}`);
        }
      } else if (signInData.user) {
        console.log("Login successful for user:", signInData.user.id);
        
        toast({
          title: "Login Successful",
          description: "Welcome to the admin panel!",
        });

        navigate('/admin/dashboard');
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-slate-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <Card className="w-full max-w-md relative z-10 border-blue-200 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-blue-800 flex items-center justify-center gap-2">
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
                className="border-blue-200 focus:border-blue-500"
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
                className="border-blue-200 focus:border-blue-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm text-slate-600">
            <p>Default credentials:</p>
            <p>Email: agrikimaprototype6@gmail.com</p>
            <p>Password: Insideout.co.ke(1906)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
