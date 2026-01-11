import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, Shield } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface SignupPageProps {
  onSignupSuccess?: () => void;
  onBack?: () => void;
}

export function SignupPage({ onSignupSuccess, onBack }: SignupPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasReadTerms) {
      toast.error('Please read the Terms and Conditions');
      setShowTermsDialog(true);
      return;
    }
    
    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ email, password, name })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      toast.success('Account created successfully!');
      onSignupSuccess?.();
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create account');
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
                Create an account
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Full Name Input */}
                <div className="relative">
                  <div 
                    className="absolute left-3 top-2 text-[11px] text-[#686867]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Full Name
                  </div>
                  <input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-[60px] px-3 pt-5 pb-2 bg-[#E9F0F1] border border-[#686867]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#686867]/50"
                    style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}
                  />
                </div>

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
                    id="signup-email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-[60px] px-3 pt-5 pb-2 bg-[#E9F0F1] border border-[#686867]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#686867]/50"
                    style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}
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
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[60px] px-3 pt-5 pb-2 bg-[#E9F0F1] border border-[#686867]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#686867]/50"
                    style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}
                  />
                </div>

                {/* Confirm Password Input */}
                <div className="relative">
                  <div 
                    className="absolute left-3 top-2 text-[11px] text-[#686867]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Confirm Password
                  </div>
                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-[60px] px-3 pt-5 pb-2 bg-[#E9F0F1] border border-[#686867]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#686867]/50"
                    style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreedToTerms}
                      disabled={!hasReadTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowTermsDialog(true)}
                      className="text-[#686867] cursor-pointer select-none text-[14px] hover:text-[#162a2c] transition-colors underline decoration-dotted underline-offset-2"
                      style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", letterSpacing: '0.02em' }}
                    >
                      I agree to the terms and conditions
                    </button>
                  </div>
                  {!hasReadTerms && (
                    <p 
                      className="text-[#686867] text-[12px] ml-6"
                      style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", letterSpacing: '0.02em' }}
                    >
                      Please read the terms and conditions to continue
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] hover:border-[#686867] transition-colors"
                disabled={isLoading}
                style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", letterSpacing: '0.02em', fontWeight: 400 }}
              >
                {isLoading ? 'Creating account...' : 'Signup'}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Terms and Conditions Dialog */}
      <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
        <DialogContent className="bg-white max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle 
              className="text-[#162a2c] flex items-center gap-2"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                letterSpacing: '0.02em',
                fontWeight: 500
              }}
            >
              <Shield className="size-5 text-[#5e6c5b]" />
              Terms and Conditions
            </DialogTitle>
            <DialogDescription 
              className="text-[#686867] text-[13px]"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                letterSpacing: '0.02em'
              }}
            >
              Please read our terms and conditions before creating your account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <h3 
                className="text-[#162a2c] mb-2"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                  letterSpacing: '0.02em',
                  fontWeight: 500
                }}
              >
                User Agreement
              </h3>
              <p 
                className="text-[#686867] text-[14px] leading-relaxed"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                  letterSpacing: '0.02em'
                }}
              >
                By creating an account, you agree to use Ordino in accordance with these terms and conditions. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
            </div>

            <div>
              <h3 
                className="text-[#162a2c] mb-2"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                  letterSpacing: '0.02em',
                  fontWeight: 500
                }}
              >
                Your Data Security
              </h3>
              <p 
                className="text-[#686867] text-[14px] leading-relaxed"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                  letterSpacing: '0.02em'
                }}
              >
                At Ordino, we take your privacy seriously. All your financial data is encrypted and stored securely using industry-standard encryption protocols. Your information is never shared with third parties without your explicit consent.
              </p>
            </div>

            <div>
              <h3 
                className="text-[#162a2c] mb-2"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                  letterSpacing: '0.02em',
                  fontWeight: 500
                }}
              >
                Account Security
              </h3>
              <p 
                className="text-[#686867] text-[14px] leading-relaxed"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                  letterSpacing: '0.02em'
                }}
              >
                Your account is protected with secure authentication. We use Supabase's enterprise-grade authentication system to ensure your account remains safe. Each user's data is completely isolated and accessible only to you.
              </p>
            </div>

            <div>
              <h3 
                className="text-[#162a2c] mb-2"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                  letterSpacing: '0.02em',
                  fontWeight: 500
                }}
              >
                Privacy Policy
              </h3>
              <p 
                className="text-[#686867] text-[14px] leading-relaxed"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                  letterSpacing: '0.02em'
                }}
              >
                We do not sell, rent, or share your personal information or financial data. Your receipts, transactions, and financial information are stored privately and used only to provide you with the Ordino service. You have full control over your data and can delete your account at any time.
              </p>
            </div>

            <div>
              <h3 
                className="text-[#162a2c] mb-2"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                  letterSpacing: '0.02em',
                  fontWeight: 500
                }}
              >
                Data Usage
              </h3>
              <p 
                className="text-[#686867] text-[14px] leading-relaxed"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                  letterSpacing: '0.02em'
                }}
              >
                We use your data solely to provide and improve the Ordino service. This includes storing your receipts, analyzing your spending patterns to provide insights, and personalizing your experience. We will never use your data for advertising or sell it to third parties.
              </p>
            </div>

            <div>
              <h3 
                className="text-[#162a2c] mb-2"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                  letterSpacing: '0.02em',
                  fontWeight: 500
                }}
              >
                Prototype Notice
              </h3>
              <p 
                className="text-[#686867] text-[14px] leading-relaxed"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                  letterSpacing: '0.02em'
                }}
              >
                This is a prototype/test version of Ordino. Please do not enter real financial data or sensitive information. Use mock or test data only for demonstration purposes.
              </p>
            </div>

            <div className="pt-2">
              <Button
                onClick={() => {
                  setAgreedToTerms(true);
                  setHasReadTerms(true);
                  setShowTermsDialog(false);
                  toast.success('Thank you for agreeing to the terms and conditions');
                }}
                className="w-full bg-[#5e6c5b] text-white hover:bg-[#5e6c5b]/90 transition-colors"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif", 
                  letterSpacing: '0.02em',
                  fontWeight: 400
                }}
              >
                I Agree
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}