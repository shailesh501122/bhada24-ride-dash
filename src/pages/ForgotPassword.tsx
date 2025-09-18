import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset API call
    setTimeout(() => {
      if (email) {
        setIsEmailSent(true);
        toast({
          title: "Reset Email Sent",
          description: "Check your email for password reset instructions",
        });
      } else {
        toast({
          title: "Error",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Truck className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gradient-primary">Bhada24</h1>
          </div>
          <p className="text-muted-foreground">Reset Your Password</p>
        </div>

        {/* Reset Password Card */}
        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Mail className="w-5 h-5 text-primary" />
              <span>Forgot Password</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            {!isEmailSent ? (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@bhada24.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email Sent!</h3>
                  <p className="text-sm text-muted-foreground">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Check your inbox and follow the instructions to reset your password.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setIsEmailSent(false);
                    setEmail("");
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Send Another Email
                </Button>
              </div>
            )}

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary-dark transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Login</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>&copy; 2024 Bhada24. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}