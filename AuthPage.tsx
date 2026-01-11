import { motion } from 'motion/react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

interface AuthPageProps {
  onAuthSuccess?: () => void;
}

export function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Call the success callback to transition to main app
      onAuthSuccess?.();
    }, 2000);
  };

  return (
    <motion.div
      className="size-full flex items-center justify-center bg-[#E9F0F1] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* ORDINO Branding */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 
            className="font-bold text-[#E9F0F1] text-[48px] leading-normal mb-2"
            style={{ 
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontVariationSettings: "'opsz' 14, 'wdth' 100",
              textShadow: 'rgba(0,0,0,0.33) 0px 3px 10px'
            }}
          >
            ORDINO
          </h1>
          <p 
            className="text-[#686867] text-[16px] leading-normal"
            style={{ fontFamily: "'Helvetica', sans-serif" }}
          >
            Simple. Secure. Sustainable.
          </p>
        </motion.div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/60">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card className="bg-white/80 backdrop-blur-sm border-[#686867]/20">
              <CardHeader>
                <CardTitle style={{ fontFamily: "'Helvetica', sans-serif", color: '#686867' }}>
                  Welcome back
                </CardTitle>
                <CardDescription style={{ fontFamily: "'Helvetica', sans-serif" }}>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" style={{ fontFamily: "'Helvetica', sans-serif", color: '#686867' }}>
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      className="bg-white border-[#686867]/30"
                      style={{ fontFamily: "'Helvetica', sans-serif" }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" style={{ fontFamily: "'Helvetica', sans-serif", color: '#686867' }}>
                      Password
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="bg-white border-[#686867]/30"
                      style={{ fontFamily: "'Helvetica', sans-serif" }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <label
                        htmlFor="remember"
                        className="text-[#686867] cursor-pointer select-none text-[14px]"
                        style={{ fontFamily: "'Helvetica', sans-serif" }}
                      >
                        Remember me
                      </label>
                    </div>
                    <Button 
                      variant="link" 
                      className="px-0 text-[#686867] text-[14px]" 
                      type="button"
                      style={{ fontFamily: "'Helvetica', sans-serif" }}
                    >
                      Forgot password?
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-[#686867] hover:bg-[#686867]/90 text-white"
                    disabled={isLoading}
                    style={{ fontFamily: "'Helvetica', sans-serif" }}
                  >
                    {isLoading ? 'Logging in...' : 'Log in'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup">
            <Card className="bg-white/80 backdrop-blur-sm border-[#686867]/20">
              <CardHeader>
                <CardTitle style={{ fontFamily: "'Helvetica', sans-serif", color: '#686867' }}>
                  Create an account
                </CardTitle>
                <CardDescription style={{ fontFamily: "'Helvetica', sans-serif" }}>
                  Enter your information to get started
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" style={{ fontFamily: "'Helvetica', sans-serif", color: '#686867' }}>
                      Full Name
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="bg-white border-[#686867]/30"
                      style={{ fontFamily: "'Helvetica', sans-serif" }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" style={{ fontFamily: "'Helvetica', sans-serif", color: '#686867' }}>
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      className="bg-white border-[#686867]/30"
                      style={{ fontFamily: "'Helvetica', sans-serif" }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" style={{ fontFamily: "'Helvetica', sans-serif", color: '#686867' }}>
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="bg-white border-[#686867]/30"
                      style={{ fontFamily: "'Helvetica', sans-serif" }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" style={{ fontFamily: "'Helvetica', sans-serif", color: '#686867' }}>
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="bg-white border-[#686867]/30"
                      style={{ fontFamily: "'Helvetica', sans-serif" }}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-[#686867] cursor-pointer select-none text-[14px]"
                      style={{ fontFamily: "'Helvetica', sans-serif" }}
                    >
                      I agree to the terms and conditions
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-[#686867] hover:bg-[#686867]/90 text-white"
                    disabled={isLoading}
                    style={{ fontFamily: "'Helvetica', sans-serif" }}
                  >
                    {isLoading ? 'Creating account...' : 'Sign up'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}