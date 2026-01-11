import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Sparkles, TrendingUp, Receipt, Target, Brain } from 'lucide-react';

interface OnboardingWelcomeProps {
  onStart: () => void;
  onSkip: () => void;
}

export function OnboardingWelcome({ onStart, onSkip }: OnboardingWelcomeProps) {
  const features = [
    {
      icon: TrendingUp,
      title: 'Track Your Finances',
      description: 'Monitor income, expenses, and budgets in real-time'
    },
    {
      icon: Receipt,
      title: 'Smart Receipt Scanning',
      description: 'Upload receipts with automatic OCR data extraction'
    },
    {
      icon: Brain,
      title: 'AI Assistant - Vero',
      description: 'Get personalized financial insights and advice'
    },
    {
      icon: Target,
      title: 'Reach Your Financial Goals',
      description: 'Build better money habits and achieve your targets'
    }
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-[#E9F0F1]/95 backdrop-blur-sm flex items-center justify-center z-[200] p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl w-full max-w-[360px] overflow-hidden shadow-2xl border-2 border-[#686867]/20"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div className="bg-[#E9F0F1] p-6 text-center border-b border-[#686867]/10">
          <motion.div
            className="w-12 h-12 bg-[#686867]/10 rounded-full flex items-center justify-center mx-auto mb-3"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="size-6 text-[#686867]" />
          </motion.div>
          <h1 
            className="text-[#162a2c] text-[22px] mb-1"
            style={{ 
              fontFamily: "'Gill Sans Medium', 'Gill Sans', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            Welcome to Ordino!
          </h1>
          <p 
            className="text-[#686867] text-[13px]"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            Your personal financial companion
          </p>
        </div>

        {/* Features */}
        <div className="p-5 space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-9 h-9 bg-[#E9F0F1] rounded-lg flex items-center justify-center flex-shrink-0">
                <feature.icon className="size-4 text-[#686867]" />
              </div>
              <div>
                <h3 
                  className="text-[#162a2c] text-[13px] mb-0.5"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    fontWeight: 500
                  }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-[#686867] text-[11px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="p-5 pt-0 space-y-3">
          <Button
            onClick={onStart}
            className="w-full h-[50px] bg-[#5e6c5b] hover:bg-[#4a5648] text-white rounded-full transition-colors"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontSize: '14px'
            }}
          >
            Take a Quick Tour
          </Button>
          <button
            onClick={onSkip}
            className="w-full text-center"
          >
            <span 
              className="text-[#686867] text-[12px] hover:text-[#162a2c] transition-colors"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Skip for now
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
