import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { X, ChevronRight, ChevronLeft, Home, TrendingUp, Receipt, Brain, User, Move, BarChart3, ArrowLeftRight } from 'lucide-react';
import { useOnboarding } from './OnboardingProvider';
import { useState } from 'react';

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  page: 'Home' | 'Transactions' | 'Insights' | 'Receipts' | 'Tools';
  targetArea?: 'top' | 'center' | 'bottom';
  action?: string; // What the user should do
}

interface OnboardingTourProps {
  currentPage: 'Home' | 'Transactions' | 'Insights' | 'Receipts' | 'Tools';
  onNavigate: (page: 'Home' | 'Transactions' | 'Insights' | 'Receipts' | 'Tools') => void;
}

export const onboardingSteps: OnboardingStep[] = [
  // Home Hub (Steps 1-2)
  {
    id: 0,
    page: 'Home',
    title: 'Your Financial Dashboard',
    description: 'This is your HomeHub - your central command for all financial activities. See your monthly overview, savings progress, and recent transactions at a glance.',
    targetArea: 'center',
  },
  {
    id: 1,
    page: 'Home',
    title: 'Navigation Bar',
    description: 'Use the bottom navigation to explore different sections. Let\'s check out Insights next!',
    targetArea: 'bottom',
    action: 'Click Insights to continue'
  },
  
  // Insights (Steps 3-4)
  {
    id: 2,
    page: 'Insights',
    title: 'Financial Analytics',
    description: 'Get deep insights into your spending patterns with visual charts and breakdowns by category. Track your budget progress and see where your money goes.',
    targetArea: 'top',
  },
  {
    id: 3,
    page: 'Insights',
    title: 'Budget & Category Management',
    description: 'Scroll down to see all your spending categories and set budgets. Click "Set Your Budget" to customize spending limits for each category.',
    targetArea: 'top',
    action: 'Click Receipts to continue'
  },
  
  // Receipts (Step 5)
  {
    id: 4,
    page: 'Receipts',
    title: 'Receipt Gallery',
    description: 'All your uploaded receipts organized in one place. Upload receipts to earn badge progress! Our OCR extracts merchant, amount, date, and items automatically.',
    targetArea: 'top',
    action: 'Click Transactions to continue'
  },
  
  // Transactions (Step 6)
  {
    id: 5,
    page: 'Transactions',
    title: 'All Your Transactions',
    description: 'Track every income and expense here. Filter by type, search by name, or click the + button to add manual transactions. Click any item to edit or delete.',
    targetArea: 'top',
    action: 'Click Vero to continue'
  },
  
  // Vero AI (Steps 7-8)
  {
    id: 6,
    page: 'Tools',
    title: 'Meet Vero - Your AI Assistant',
    description: 'Ask Vero anything about your finances! Type in the chat below to get personalized insights, budgeting advice, and spending analysis based on your actual data.',
    targetArea: 'bottom',
  },
  {
    id: 7,
    page: 'Tools',
    title: 'You\'re All Set!',
    description: 'That\'s the complete tour! Start uploading receipts, tracking expenses, and building better money habits. Click your profile icon anytime to see settings and badge progress.',
    targetArea: 'bottom',
  },
];

export function OnboardingTour({ currentPage, onNavigate }: OnboardingTourProps) {
  const { currentOnboardingStep, completeOnboarding, skipOnboarding, nextOnboardingStep, setOnboardingStep } = useOnboarding();

  const currentStep = onboardingSteps[currentOnboardingStep];
  const isLastStep = currentOnboardingStep === onboardingSteps.length - 1;
  const isFirstStep = currentOnboardingStep === 0;

  // Auto-navigate when step changes to different page
  if (currentStep && currentStep.page !== currentPage) {
    onNavigate(currentStep.page);
  }

  const handleNext = () => {
    if (isLastStep) {
      completeOnboarding();
    } else {
      nextOnboardingStep();
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setOnboardingStep(currentOnboardingStep - 1);
    }
  };

  const getPageIcon = (page: string) => {
    switch (page) {
      case 'Home': return Home;
      case 'Transactions': return ArrowLeftRight;
      case 'Insights': return BarChart3;
      case 'Receipts': return Receipt;
      case 'Tools': return null; // Will use custom V for Vero
      default: return User;
    }
  };

  const PageIcon = getPageIcon(currentStep.page);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Draggable Tour Card - Completely Free Movement */}
        <motion.div
          key={`tour-${currentOnboardingStep}`}
          drag
          dragMomentum={false}
          dragElastic={0}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
          className="fixed w-[340px] pointer-events-auto touch-none"
          initial={{
            x: '-50%',
            y: currentStep.targetArea === 'top' ? 80 :
               currentStep.targetArea === 'bottom' ? window.innerHeight - 500 : 
               window.innerHeight / 2 - 250,
            left: '50%'
          }}
          style={{
            cursor: 'grab'
          }}
          whileDrag={{
            cursor: 'grabbing',
            scale: 1.02
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl p-6 shadow-2xl border-2 border-[#5e6c5b]/20 relative"
          >
            {/* Drag indicator */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#686867]/30 rounded-full cursor-grab active:cursor-grabbing" />
            
            {/* Header */}
            <div className="flex items-start justify-between mb-4 mt-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-[#5e6c5b]/10 rounded-full flex items-center justify-center">
                    {PageIcon ? (
                      <PageIcon className="size-3 text-[#5e6c5b]" />
                    ) : (
                      <span 
                        className="text-[#5e6c5b] text-[11px]"
                        style={{ 
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                          fontWeight: 700
                        }}
                      >
                        V
                      </span>
                    )}
                  </div>
                  <span 
                    className="text-[#686867] text-[10px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    {currentStep.page === 'Tools' ? 'Vero' : currentStep.page} • Step {currentOnboardingStep + 1} of {onboardingSteps.length}
                  </span>
                  <div className="ml-auto flex items-center gap-1 text-[#686867]/40">
                    <Move className="size-3.5" />
                  </div>
                </div>
                <h3 
                  className="text-[#162a2c] text-[17px] mb-2 leading-tight"
                  style={{ 
                    fontFamily: "'Gill Sans Medium', 'Gill Sans', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {currentStep.title}
                </h3>
              </div>
              <button
                onClick={skipOnboarding}
                className="w-8 h-8 rounded-full hover:bg-[#E9F0F1] flex items-center justify-center transition-colors flex-shrink-0 ml-2"
              >
                <X className="size-4 text-[#686867]" />
              </button>
            </div>

            {/* Description */}
            <p 
              className="text-[#686867] text-[12px] mb-6"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                lineHeight: '1.6'
              }}
            >
              {currentStep.description}
            </p>

            {/* Action hint */}
            {currentStep.action && (
              <div className="mb-6 p-3 bg-[#5e6c5b]/10 rounded-lg border border-[#5e6c5b]/20">
                <p 
                  className="text-[#5e6c5b] text-[11px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    fontWeight: 500
                  }}
                >
                  💡 {currentStep.action}
                </p>
              </div>
            )}

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span 
                  className="text-[#686867] text-[10px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Progress
                </span>
                <span 
                  className="text-[#5e6c5b] text-[10px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    fontWeight: 500
                  }}
                >
                  {Math.round(((currentOnboardingStep + 1) / onboardingSteps.length) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-[#E9F0F1] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#5e6c5b] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentOnboardingStep + 1) / onboardingSteps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {!isFirstStep && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 h-[44px] border-[#686867]/20 text-[#686867] rounded-full hover:bg-[#E9F0F1]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    fontSize: '13px'
                  }}
                >
                  <ChevronLeft className="size-4 mr-1" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                className={`${isFirstStep ? 'w-full' : 'flex-1'} h-[44px] bg-[#5e6c5b] hover:bg-[#4a5648] text-white rounded-full transition-colors flex items-center justify-center gap-1`}
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontSize: '13px'
                }}
              >
                {isLastStep ? 'Finish Tour' : 'Next'}
                {!isLastStep && <ChevronRight className="size-4" />}
              </Button>
            </div>

            {/* Skip option */}
            <button
              onClick={skipOnboarding}
              className="w-full text-center mt-3"
            >
              <span 
                className="text-[#686867] text-[11px] hover:text-[#162a2c] transition-colors"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                Skip tour
              </span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
