import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '../utils/supabase/client';
import { toast } from 'sonner';

interface LoginPageProps {
  onLoginSuccess?: (userName: string, userEmail: string) => void;
  onBack?: () => void;
}

export function LoginPage({ onLoginSuccess, onBack }: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data.session) {
        throw new Error('No session created');
      }

      // Store the access token and user info
      const userName = data.user?.user_metadata?.name || email.split('@')[0];
      const userEmail = data.user?.email || email;
      
      toast.success('Login successful!');
      onLoginSuccess?.(userName, userEmail);
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col bg-[#E9F0F1]"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      {/* Back Button */}
      <motion.div
        className="p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-[#686867] hover:bg-transparent hover:border hover:border-[#686867]"
          style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}
        >
          <ArrowLeft className="size-5 mr-2" />
          Back
        </Button>
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-8 pb-16">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* ORDINO Branding */}
          <div className="text-center mb-8">
            <h1 
              className="font-bold text-[#E9F0F1] text-[64px] leading-normal mb-2"
              style={{ 
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontVariationSettings: "'opsz' 14, 'wdth' 100",
                textShadow: 'rgba(0,0,0,0.33) 0px 3px 10px'
              }}
            >
              ORDINO
            </h1>
          </div>

          <div>
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 
                className="text-[#686867] text-[24px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                  letterSpacing: '0.02em',
                  fontWeight: 400
                }}
              >
                Welcome back
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Email Input */}
                <div className="relative">
                  <div 
                    className="absolute left-3 top-2 text-[11px] text-[#686867]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Email
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="w-full h-[60px] px-3 pt-5 pb-2 bg-[#E9F0F1] border border-[#686867]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#686867]/50"
                    style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div 
                    className="absolute left-3 top-2 text-[11px] text-[#686867]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Password
                  </div>
                  <input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="w-full h-[60px] px-3 pt-5 pb-2 bg-[#E9F0F1] border border-[#686867]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#686867]/50"
                    style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] hover:border-[#686867] transition-colors"
                disabled={isLoading}
                style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", letterSpacing: '0.02em', fontWeight: 400 }}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>

              {/* Forgot Password */}
              <div className="flex justify-center -mt-2">
                <Button 
                  variant="link" 
                  className="px-0 text-[#686867] text-[14px]" 
                  type="button"
                  style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", letterSpacing: '0.02em', fontWeight: 400 }}
                >
                  Forgot password?
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}