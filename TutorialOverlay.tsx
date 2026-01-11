import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface TutorialStep {
  title: string;
  description: string;
  targetArea?: 'top' | 'center' | 'bottom';
}

interface TutorialOverlayProps {
  steps: TutorialStep[];
  pageName: string;
  onComplete: () => void;
}

export function TutorialOverlay({ steps, pageName, onComplete }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = steps[currentStep];

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Tutorial Card */}
      <div 
        className={`absolute left-1/2 -translate-x-1/2 w-[350px] ${
          currentStepData.targetArea === 'top' ? 'top-24' :
          currentStepData.targetArea === 'bottom' ? 'bottom-24' :
          'top-1/2 -translate-y-1/2'
        }`}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl p-6 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span 
                  className="text-[#686867] text-[10px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {pageName} • Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              <h3 
                className="text-[#162a2c] text-[16px]"
                style={{ 
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700,
                  letterSpacing: '0.02em'
                }}
              >
                {currentStepData.title}
              </h3>
            </div>
            <button
              onClick={handleSkip}
              className="w-8 h-8 rounded-full hover:bg-[#E9F0F1] flex items-center justify-center transition-colors flex-shrink-0"
            >
              <X className="size-4 text-[#686867]" />
            </button>
          </div>

          {/* Description */}
          <p 
            className="text-[#686867] text-[13px] mb-6"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              lineHeight: '1.5'
            }}
          >
            {currentStepData.description}
          </p>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentStep 
                    ? 'w-6 bg-[#5e6c5b]' 
                    : 'w-1.5 bg-[#686867]/20'
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1 h-[44px] bg-white border border-[#686867]/20 text-[#686867] rounded-full hover:bg-[#E9F0F1] transition-colors"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontSize: '13px'
                }}
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 h-[44px] bg-[#5e6c5b] hover:bg-[#4a5648] text-white rounded-full transition-colors flex items-center justify-center gap-2"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontSize: '13px'
              }}
            >
              {currentStep === steps.length - 1 ? 'Got it!' : 'Next'}
              {currentStep < steps.length - 1 && <ChevronRight className="size-4" />}
            </button>
          </div>

          {/* Skip option */}
          <button
            onClick={handleSkip}
            className="w-full text-center mt-3"
          >
            <span 
              className="text-[#686867] text-[11px] hover:text-[#162a2c] transition-colors"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Skip tutorial
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Tutorial steps for different pages
export const homeHubTutorial: TutorialStep[] = [
  {
    title: 'Welcome to Ordino!',
    description: 'Your personal financial companion. Let\'s take a quick tour of the HomeHub.',
    targetArea: 'center'
  },
  {
    title: 'Quick Stats',
    description: 'See your monthly overview at a glance - income, expenses, and net balance.',
    targetArea: 'top'
  },
  {
    title: 'Upload Receipts',
    description: 'Tap the camera icon to snap and upload receipts. Earn badges as you upload more!',
    targetArea: 'center'
  },
  {
    title: 'Recent Transactions',
    description: 'View your latest transactions and tap any to see detailed information.',
    targetArea: 'bottom'
  }
];

export const transactionsTutorial: TutorialStep[] = [
  {
    title: 'Transactions Overview',
    description: 'Track all your income and expenses in one place with powerful filtering.',
    targetArea: 'center'
  },
  {
    title: 'Filter & Search',
    description: 'Use filters to view all transactions, just income, or just expenses. The search bar helps you find specific items.',
    targetArea: 'top'
  },
  {
    title: 'Advanced Search',
    description: 'Tap the filter icon for advanced search with date ranges, amount ranges, and category filtering.',
    targetArea: 'top'
  }
];

export const insightsTutorial: TutorialStep[] = [
  {
    title: 'Financial Insights',
    description: 'Get a deep understanding of your spending patterns and budgets.',
    targetArea: 'center'
  },
  {
    title: 'Analytics Views',
    description: 'Switch between monthly, yearly, and weekly views to see different spending patterns.',
    targetArea: 'top'
  },
  {
    title: 'Set Budgets',
    description: 'Click "Set Your Budget" to create budgets for different spending categories.',
    targetArea: 'center'
  },
  {
    title: 'Category Insights',
    description: 'Tap any category to see detailed spending information and helpful tips.',
    targetArea: 'bottom'
  }
];

export const receiptsTutorial: TutorialStep[] = [
  {
    title: 'Receipt Gallery',
    description: 'All your uploaded receipts in one organized place.',
    targetArea: 'center'
  },
  {
    title: 'Upload Receipts',
    description: 'Tap the + button to add new receipts and earn badge progress.',
    targetArea: 'top'
  },
  {
    title: 'View Details',
    description: 'Tap any receipt to see the full image and transaction details.',
    targetArea: 'bottom'
  }
];
