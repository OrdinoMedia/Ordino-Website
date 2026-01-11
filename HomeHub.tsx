import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, TrendingUp, Receipt, DollarSign, Wrench, Menu, X, User, ChevronRight, ChevronDown, ChevronUp, Bell, HelpCircle, BookOpen, LifeBuoy, Lightbulb, BarChart3, ArrowLeftRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { InsightsPage } from './InsightsPage';
import { ReceiptsPage } from './ReceiptsPage';
import { AllBudgetsPage } from './AllBudgetsPage';
import { BreakdownDetailPage } from './BreakdownDetailPage';
import { ReceiptDetailView } from './ReceiptDetailView';
import { TransactionDetailView } from './TransactionDetailView';
import { TransactionsPage } from './TransactionsPage';
import { ToolsPage } from './ToolsPage';
import { ProfilePage } from './ProfilePage';
import { getBadgeInfo, BadgeDisplay } from './BadgeSystem';
import { BadgeProgressView } from './BadgeProgressView';
import { CategoryBudgetPage } from './CategoryBudgetPage';
import { CategoryDetailView, CategoryDetail } from './CategoryDetailView';
import { PickPreviewBudgetsModal } from './PickPreviewBudgetsModal';
import { useOnboarding } from './OnboardingProvider';
import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingTour } from './OnboardingTour';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface HomeHubProps {
  userName?: string;
  userEmail?: string;
  userId?: string;
  onLogout?: () => void;
}

type PageType = 'Home' | 'Insights' | 'Receipts' | 'Transactions' | 'Tools';

// Mock category performance data
const categoryPerformance = [
  { category: 'Groceries & Essentials', spent: 385, budget: 500, icon: '🛒' },
  { category: 'Transportation', spent: 120, budget: 150, icon: '🚗' },
  { category: 'Dining & Coffee', spent: 85, budget: 120, icon: '☕' },
  { category: 'Entertainment', spent: 45, budget: 80, icon: '🎬' },
  { category: 'Health & Wellness', spent: 50, budget: 100, icon: '💪' },
];

// Get best performing categories (sorted by % under budget)
const getBestPerformingCategories = () => {
  return categoryPerformance
    .map(cat => ({
      ...cat,
      percentageUsed: (cat.spent / cat.budget) * 100,
      amountUnder: cat.budget - cat.spent,
      percentageUnder: ((cat.budget - cat.spent) / cat.budget) * 100
    }))
    .filter(cat => cat.percentageUsed < 100) // Only categories under budget
    .sort((a, b) => b.percentageUnder - a.percentageUnder); // Sort by best performance
};

// Monthly budget tips
const monthlyTips = [
  { month: 0, tip: 'Start the year strong! Review your annual financial goals and set monthly budgets accordingly.' },
  { month: 1, tip: 'Track your spending post-holidays. February is perfect for building sustainable saving habits.' },
  { month: 2, tip: 'Spring cleaning time! Review subscriptions and cancel services you no longer use.' },
  { month: 3, tip: 'Tax season! Keep all receipts organized and categorized for easier filing.' },
  { month: 4, tip: 'Mother\'s Day planning? Set aside a small gift budget to avoid overspending.' },
  { month: 5, tip: 'Summer vacation ahead! Start saving now to avoid credit card debt later.' },
  { month: 6, tip: 'Mid-year check-in! Review your progress on financial goals and adjust as needed.' },
  { month: 7, tip: 'Back-to-school shopping? Make a list and stick to it to avoid impulse purchases.' },
  { month: 8, tip: 'Fall into good habits! Automate your savings to make budgeting effortless.' },
  { month: 9, tip: 'October tip: Review your insurance policies and health benefits before year-end enrollment.' },
  { month: 10, tip: 'Holiday season approaching! Create a gift budget now to prevent January stress.' },
  { month: 11, tip: 'Year-end reflection: Calculate your total savings and celebrate your financial wins!' }
];

// Get tip for current month
const getCurrentMonthTip = () => {
  const currentMonth = new Date().getMonth(); // 0-11 (October is 10)
  return monthlyTips[currentMonth].tip;
};

export function HomeHub({ userName = 'User', userEmail = 'user@email.com', userId, onLogout }: HomeHubProps) {
  const [currentPage, setCurrentPage] = useState<PageType>('Home');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState<number | string | null>(null);
  const [showCategoryBudget, setShowCategoryBudget] = useState(false);
  const [showPickPreviewBudgets, setShowPickPreviewBudgets] = useState(false);
  const [showAllBudgets, setShowAllBudgets] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialPage, setTutorialPage] = useState<PageType>('Home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryDetail | null>(null);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [showBadgeProgress, setShowBadgeProgress] = useState(false);
  const [showBreakdownDetail, setShowBreakdownDetail] = useState(false);
  const [showOnboardingWelcome, setShowOnboardingWelcome] = useState(true);
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [recentReceipts, setRecentReceipts] = useState<any[]>([
    { id: 1, merchant: 'Whole Foods', amount: 87.45, date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0], category: 'Groceries' },
    { id: 2, merchant: 'Shell Gas Station', amount: 52.30, date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().split('T')[0], category: 'Transportation' },
  ]);
  
  const [transactions, setTransactions] = useState<any[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  
  // Refs for scrollable containers
  const homeScrollRef = useRef<HTMLDivElement>(null);
  const insightsScrollRef = useRef<HTMLDivElement>(null);
  const receiptsScrollRef = useRef<HTMLDivElement>(null);
  const transactionsScrollRef = useRef<HTMLDivElement>(null);
  const toolsScrollRef = useRef<HTMLDivElement>(null);
  
  // Calculate totals from transactions for current month
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const totalSpent = transactions
    .filter(t => {
      const transactionDate = new Date(t.date);
      return t.type === 'expense' && 
             transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalIncome = transactions
    .filter(t => {
      const transactionDate = new Date(t.date);
      return t.type === 'income' && 
             transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);
  
  const monthlyBudget = totalIncome > 0 ? totalIncome : 850; // Use income as budget, fallback to 850
  const percentageUsed = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;
  
  // Calculate savings (TFSA, Savings Account, Emergency Fund) from actual transactions
  const totalSaved = transactions
    .filter(t => {
      const transactionDate = new Date(t.date);
      return (t.categoryGroup === 'Savings' || t.categoryGroup === 'Investments') && 
             transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);
    
  // Calculate savings goal as percentage of income (e.g., 20% of monthly income)
  const savingsGoal = totalIncome > 0 ? totalIncome * 0.20 : 400; // 20% of income or fallback to $400
  const savingsPercentage = savingsGoal > 0 ? (totalSaved / savingsGoal) * 100 : 0;
  
  // Mock receipts count for badge system - in real app, this would come from data
  const receiptsCount = 6;
  const badgeInfo = getBadgeInfo(receiptsCount);
  
  // Get best performing categories
  const bestCategories = getBestPerformingCategories();
  const maxInsights = Math.min(bestCategories.length, 3);
  
  // Get onboarding state
  const { isOnboardingActive, completeOnboarding, skipOnboarding, restartOnboarding } = useOnboarding();

  // Reset to home page when onboarding ends
  useEffect(() => {
    if (!isOnboardingActive && currentPage !== 'Home') {
      // Small delay to avoid jarring transition
      const timer = setTimeout(() => {
        setCurrentPage('Home');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOnboardingActive]);

  // Load recent receipts from backend
  useEffect(() => {
    loadRecentReceipts();
  }, [currentPage]);

  // Load transactions from backend
  useEffect(() => {
    loadTransactions();
  }, [currentPage]);

  const loadTransactions = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/transactions`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );

      if (response.ok) {
        const data = await response.json();
        const backendTransactions = data.transactions || [];
        
        // Convert backend transactions to frontend format
        const formattedTransactions = backendTransactions.map((t: any) => ({
          id: t.id,
          type: t.type || (t.categoryGroup?.includes('Income') ? 'income' : 'expense'),
          source: t.merchant || t.source,
          amount: t.amount,
          date: t.date,
          category: t.category,
          categoryGroup: t.categoryGroup,
          location: t.location || 'Not specified',
          notes: t.notes || ''
        }));
        
        setTransactions(formattedTransactions);
      }
    } catch (error) {
      console.error('Error loading transactions for HomeHub:', error);
    }
  };

  const loadRecentReceipts = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/receipts`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.receipts && data.receipts.length > 0) {
          // Sort by uploadedAt (most recent first) and take top 2
          const sortedReceipts = data.receipts
            .sort((a: any, b: any) => {
              const dateA = new Date(a.uploadedAt || a.date).getTime();
              const dateB = new Date(b.uploadedAt || b.date).getTime();
              return dateB - dateA;
            })
            .slice(0, 2)
            .map((receipt: any) => ({
              id: receipt.id,
              merchant: receipt.merchant,
              amount: receipt.amount,
              date: receipt.date,
              category: receipt.category
            }));

          if (sortedReceipts.length > 0) {
            setRecentReceipts(sortedReceipts);
          }
        }
      }
    } catch (error) {
      console.error('Error loading recent receipts:', error);
      // Keep the default mock receipts if loading fails
    }
  };

  const handleReceiptClick = (receiptId: number | string) => {
    setSelectedReceiptId(receiptId);
    setCurrentPage('Receipts');
  };

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    
    // Scroll to top of the new page
    setTimeout(() => {
      const scrollRefs: { [key in PageType]: React.RefObject<HTMLDivElement> } = {
        'Home': homeScrollRef,
        'Insights': insightsScrollRef,
        'Receipts': receiptsScrollRef,
        'Transactions': transactionsScrollRef,
        'Tools': toolsScrollRef
      };
      
      scrollRefs[page].current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
    
    // Check if user has seen tutorial for this page
    const tutorialKey = `tutorial_${page}_seen`;
    const hasSeenTutorial = localStorage.getItem(tutorialKey);
    
    if (!hasSeenTutorial && page !== 'Home') {
      setTutorialPage(page);
      setShowTutorial(true);
    }
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem(`tutorial_${tutorialPage}_seen`, 'true');
  };

  return (
    <motion.div
      className="size-full bg-[#E9F0F1] flex flex-col relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
        {/* Header with Profile and Notification Icons */}
        <motion.div
          className="p-6 pb-4 pt-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            {/* Left Side - Notification Bell */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full hover:bg-white/50"
                onClick={() => toast.info('No new notifications', { description: 'You\'re all caught up!' })}
              >
                <Bell className="size-5 text-[#686867]" />
              </Button>
              {/* Notification Badge */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-[#ffa47d] rounded-full border-2 border-[#E9F0F1]" />
            </div>
            
            {/* Current Page Indicator - Always Centered */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute left-1/2 transform -translate-x-1/2"
            >
              <div className="inline-block border border-[#686867]/30 rounded-md px-3 py-1">
                <h1 
                  className="text-[12px] leading-normal"
                  style={{ 
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontVariationSettings: "'opsz' 14, 'wdth' 100",
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #686867 0%, #162a2c 50%, #686867 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '0.02em'
                  }}
                >
                  {currentPage === 'Tools' ? 'Vero' : currentPage}
                </h1>
              </div>
            </motion.div>
            
            {/* Right Side - Help and Profile Icons */}
            <div className="flex items-center gap-3">
              {/* Help Icon with Dropdown */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-full hover:bg-white/50"
                  onClick={() => setShowHelpDropdown(!showHelpDropdown)}
                >
                  <HelpCircle className="size-5 text-[#686867]" />
                </Button>
                
                {/* Help Dropdown Menu */}
                <AnimatePresence>
                  {showHelpDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-xl border border-[#686867]/20 overflow-hidden z-50"
                    >
                      <button
                        onClick={async () => {
                          setShowHelpDropdown(false);
                          await restartOnboarding();
                          setShowOnboardingWelcome(true);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#E9F0F1] transition-colors"
                      >
                        <BookOpen className="size-5 text-[#5e6c5b]" />
                        <span
                          className="text-[#162a2c] text-[14px]"
                          style={{
                            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            letterSpacing: '0.02em'
                          }}
                        >
                          App Guide
                        </span>
                      </button>
                      
                      <div className="h-px bg-[#686867]/10" />
                      
                      <button
                        onClick={() => {
                          setShowHelpDropdown(false);
                          toast.info('Coming Soon', { description: 'Help & Support page will be available soon!' });
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#E9F0F1] transition-colors"
                      >
                        <LifeBuoy className="size-5 text-[#5e6c5b]" />
                        <span
                          className="text-[#162a2c] text-[14px]"
                          style={{
                            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            letterSpacing: '0.02em'
                          }}
                        >
                          Help & Support
                        </span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full hover:bg-white/50"
                onClick={() => setShowProfile(true)}
              >
                <User className="size-5 text-[#686867]" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          {currentPage === 'Home' && (
            <div className="size-full overflow-y-auto px-6 pb-24" ref={homeScrollRef}>
              {/* User Badge */}
              <motion.div
                className="mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Card 
                  className="bg-white border-[#686867]/20 p-4 cursor-pointer hover:bg-[#E9F0F1]/30 transition-colors"
                  onClick={() => setShowBadgeProgress(true)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p 
                        className="text-[#686867] text-[12px] mb-2"
                        style={{ 
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                          fontVariationSettings: "'opsz' 14, 'wdth' 100",
                          fontWeight: 700,
                          background: 'linear-gradient(135deg, #686867 0%, #162a2c 50%, #686867 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          letterSpacing: '0.02em'
                        }}
                      >
                        Hello, {userName}
                      </p>
                      <p 
                        className="text-[#686867] text-[12px] mb-1"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        Your Status:
                      </p>
                      <h3 
                        className="text-[#162a2c] text-[14px] mb-2"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        {badgeInfo.level}
                      </h3>
                      <p 
                        className="text-[#686867] text-[11px]"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        {badgeInfo.description}
                      </p>
                    </div>
                    <div className="ml-4">
                      <BadgeDisplay badgeInfo={badgeInfo} size="medium" />
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Monthly Financial Snapshot */}
              <motion.div
                className="mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 
                  className="text-[#162a2c] mb-3"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    fontWeight: 400
                  }}
                >
                  {new Date().toLocaleString('en-US', { month: 'long' })} Snapshot
                </h2>
                
                {/* Consolidated Card */}
                <Card className="bg-white border-[#686867]/20 p-2">
                  {/* Money Saved */}
                  <div className="mb-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span 
                        className="text-[#686867] text-[12px]"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        Money Saved
                      </span>
                      <span 
                        className="text-[#686867] text-[12px]"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        ${totalSaved.toFixed(0)} / ${savingsGoal.toFixed(0)}
                      </span>
                    </div>
                    
                    {/* Progress Bar with Border */}
                    <div className="relative w-full h-8 rounded-full border-2 border-[#E9F0F1] bg-white p-1">
                      <motion.div
                        className="absolute left-1 top-1 bottom-1 bg-[#5e6c5b] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `calc(${Math.max(savingsPercentage, 10)}% - 8px)` }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                      />
                      <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 z-10">
                        <span 
                          className="text-[#686867] text-[11px]"
                          style={{ 
                            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            letterSpacing: '0.02em',
                            fontWeight: 500
                          }}
                        >
                          {savingsPercentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Total Spending */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-0.5">
                      <span 
                        className="text-[#686867] text-[12px]"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        Total Spend
                      </span>
                      <span 
                        className="text-[#686867] text-[12px]"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        ${totalSpent.toFixed(0)} / ${monthlyBudget.toFixed(0)}
                      </span>
                    </div>
                    
                    {/* Progress Bar with Border */}
                    <div className="relative w-full h-8 rounded-full border-2 border-[#E9F0F1] bg-white p-1">
                      <motion.div
                        className="absolute left-1 top-1 bottom-1 bg-[#E9F0F1] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `calc(${Math.max(percentageUsed, 10)}% - 8px)` }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                      />
                      <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 z-10">
                        <span 
                          className="text-[#686867] text-[11px]"
                          style={{ 
                            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            letterSpacing: '0.02em',
                            fontWeight: 500
                          }}
                        >
                          {percentageUsed.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[#686867]/10 my-1.5" />

                  {/* Recent Receipts */}
                  <div>
                    <h3 
                      className="text-[#686867] text-[13px] mb-1 cursor-pointer hover:text-[#162a2c] transition-colors"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                      onClick={() => setCurrentPage('Receipts')}
                    >
                      Recent Receipts
                    </h3>
                    <div className="space-y-1">
                      {recentReceipts.map((receipt, index) => (
                        <motion.div
                          key={receipt.id}
                          className="flex items-center justify-between p-1.5 bg-[#E9F0F1] rounded-md cursor-pointer hover:bg-white/50 transition-colors"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                          onClick={() => handleReceiptClick(receipt.id)}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                              <Receipt className="size-3.5 text-[#686867]" />
                            </div>
                            <div>
                              <p 
                                className="text-[#686867] text-[13px]"
                                style={{ 
                                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                                  letterSpacing: '0.02em'
                                }}
                              >
                                {receipt.merchant}
                              </p>
                              <p 
                                className="text-[#686867] text-[11px]"
                                style={{ 
                                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                                  letterSpacing: '0.02em'
                                }}
                              >
                                {receipt.category}
                              </p>
                            </div>
                          </div>
                          <span 
                            className="text-[#686867] text-[13px]"
                            style={{ 
                              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                              letterSpacing: '0.02em'
                            }}
                          >
                            ${receipt.amount.toFixed(2)}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Positive Category Insights - Rotating */}
              <motion.div
                className="mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {bestCategories.length > 0 && bestCategories[currentInsightIndex] && (
                      <motion.div
                        key={currentInsightIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card 
                          className="p-4 cursor-pointer hover:opacity-90 transition-opacity"
                          style={{
                            background: 'linear-gradient(135deg, #e8ede7 0%, #d4dbd3 100%)',
                            borderColor: '#b3bdb1'
                          }}
                          onClick={() => setCurrentPage('Insights')}
                        >
                          <div className="flex items-start gap-3">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-[18px]"
                              style={{ 
                                backgroundColor: '#d4dbd3',
                                filter: 'grayscale(100%)',
                                opacity: 0.6
                              }}
                            >
                              {bestCategories[currentInsightIndex].icon}
                            </div>
                            <div className="flex-1">
                              <h3 
                                className="text-[14px] mb-1"
                                style={{ 
                                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                                  letterSpacing: '0.02em',
                                  fontWeight: 500,
                                  color: '#3a4439'
                                }}
                              >
                                Great job on {bestCategories[currentInsightIndex].category}!
                              </h3>
                              <p 
                                className="text-[12px] mb-2"
                                style={{ 
                                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                                  letterSpacing: '0.02em',
                                  color: '#5e6c5b'
                                }}
                              >
                                You're ${bestCategories[currentInsightIndex].amountUnder.toFixed(0)} under budget this month. Keep up the excellent work!
                              </p>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                                  style={{ backgroundColor: '#b3bdb1' }}
                                >
                                  <motion.div
                                    className="h-full"
                                    style={{ backgroundColor: '#5e6c5b' }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${bestCategories[currentInsightIndex].percentageUsed}%` }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                  />
                                </div>
                                <span 
                                  className="text-[11px]"
                                  style={{ 
                                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                                    letterSpacing: '0.02em',
                                    color: '#5e6c5b'
                                  }}
                                >
                                  {bestCategories[currentInsightIndex].percentageUsed.toFixed(0)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation dots */}
                  {maxInsights > 1 && (
                    <div className="flex justify-center gap-1.5 mt-3">
                      {Array.from({ length: maxInsights }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentInsightIndex(index)}
                          className="w-1.5 h-1.5 rounded-full transition-all"
                          style={{
                            backgroundColor: index === currentInsightIndex ? '#5e6c5b' : '#b3bdb1'
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Budget Tip for the Month */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h2 
                  className="text-[#162a2c] mb-3"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    fontWeight: 400
                  }}
                >
                  Budget Tip for the Month
                </h2>
                
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Card className="bg-white border-[#686867]/20 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E9F0F1] flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="size-5 text-[#686867]" />
                      </div>
                      <p 
                        className="text-[#686867] text-[14px] flex-1 pt-1.5"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em',
                          lineHeight: '1.5'
                        }}
                      >
                        {getCurrentMonthTip()}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          )}

          {currentPage === 'Insights' && (
            <div className="size-full pt-6 pb-24 relative" ref={insightsScrollRef}>
              <InsightsPage 
                key={`insights-${showCategoryBudget}`} // Force reload when budget modal closes
                onCategoryBudgetOpen={() => setShowCategoryBudget(true)}
                onPickPreviewBudgetsOpen={() => setShowPickPreviewBudgets(true)}
                onAllBudgetsOpen={() => setShowAllBudgets(true)}
                onCategorySelect={setSelectedCategory}
                onBreakdownDetailOpen={() => setShowBreakdownDetail(true)}
              />
            </div>
          )}

          {currentPage === 'Receipts' && (
            <div className="size-full pt-6 pb-24" ref={receiptsScrollRef}>
              <ReceiptsPage 
                selectedReceiptId={selectedReceiptId || undefined}
                onReceiptSelect={(id) => setSelectedReceiptId(id)}
              />
            </div>
          )}

          {currentPage === 'Transactions' && (
            <div className="size-full pt-6 pb-24" ref={transactionsScrollRef}>
              <TransactionsPage />
            </div>
          )}

          {currentPage === 'Tools' && (
            <div className="size-full overflow-y-auto pt-6 pb-24 px-6" ref={toolsScrollRef}>
              <ToolsPage />
            </div>
          )}
        </div>

        {/* Bottom Navigation Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#686867]/20 p-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center justify-around">
            <motion.button
              onClick={() => setCurrentPage('Home')}
              className={`flex flex-col items-center justify-center gap-1 hover:bg-[#686867]/10 transition-colors px-4 py-2 rounded-md ${
                currentPage === 'Home' ? 'bg-[#686867]/10' : ''
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="size-5 text-[#686867]" />
              <span 
                className="text-[#686867] text-[10px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                Home
              </span>
            </motion.button>
            <motion.button
              onClick={() => setCurrentPage('Insights')}
              className={`flex flex-col items-center justify-center gap-1 hover:bg-[#686867]/10 transition-colors px-4 py-2 rounded-md ${
                currentPage === 'Insights' ? 'bg-[#686867]/10' : ''
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="size-5 text-[#686867]" />
              <span 
                className="text-[#686867] text-[10px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                Insights
              </span>
            </motion.button>
            <motion.button
              onClick={() => setCurrentPage('Tools')}
              className={`flex flex-col items-center justify-center gap-1 hover:bg-[#686867]/10 transition-colors px-4 py-2 rounded-md ${
                currentPage === 'Tools' ? 'bg-[#686867]/10' : ''
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <span 
                className="text-[#686867] text-[20px] leading-none"
                style={{ 
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700,
                  marginTop: '-2px'
                }}
              >
                V
              </span>
              <span 
                className="text-[#686867] text-[10px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                Vero
              </span>
            </motion.button>
            <motion.button
              onClick={() => setCurrentPage('Receipts')}
              className={`flex flex-col items-center justify-center gap-1 hover:bg-[#686867]/10 transition-colors px-4 py-2 rounded-md ${
                currentPage === 'Receipts' ? 'bg-[#686867]/10' : ''
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <Receipt className="size-5 text-[#686867]" />
              <span 
                className="text-[#686867] text-[10px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                Receipts
              </span>
            </motion.button>
            <motion.button
              onClick={() => setCurrentPage('Transactions')}
              className={`flex flex-col items-center justify-center gap-1 hover:bg-[#686867]/10 transition-colors px-4 py-2 rounded-md ${
                currentPage === 'Transactions' ? 'bg-[#686867]/10' : ''
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeftRight className="size-5 text-[#686867]" />
              <span 
                className="text-[#686867] text-[10px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                Transactions
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Profile Page Overlay */}
        <AnimatePresence>
          {showProfile && (
            <ProfilePage 
              userName={userName}
              userEmail={userEmail}
              receiptsCount={receiptsCount}
              userId={userId}
              onClose={() => setShowProfile(false)}
              onLogout={() => {
                setShowProfile(false);
                if (onLogout) onLogout();
              }}
            />
          )}
        </AnimatePresence>

        {/* Category Budget Page */}
        <AnimatePresence>
          {showCategoryBudget && (
            <CategoryBudgetPage
              onClose={() => setShowCategoryBudget(false)}
            />
          )}
        </AnimatePresence>

        {/* Pick Preview Budgets Modal */}
        <AnimatePresence>
          {showPickPreviewBudgets && (
            <PickPreviewBudgetsModal
              onClose={() => setShowPickPreviewBudgets(false)}
              onSave={() => {
                // Refresh insights page to show updated preview budgets
                setShowPickPreviewBudgets(false);
              }}
            />
          )}
        </AnimatePresence>

        {/* Category Detail View */}
        <AnimatePresence>
          {selectedCategory && (
            <CategoryDetailView
              categoryDetail={selectedCategory}
              onClose={() => setSelectedCategory(null)}
            />
          )}
        </AnimatePresence>

        {/* Badge Progress View */}
        <AnimatePresence>
          {showBadgeProgress && (
            <BadgeProgressView
              currentBadge={badgeInfo}
              onClose={() => setShowBadgeProgress(false)}
            />
          )}
        </AnimatePresence>

        {/* All Budgets Page */}
        <AnimatePresence>
          {showAllBudgets && (
            <AllBudgetsPage
              onClose={() => setShowAllBudgets(false)}
              onCategoryBudgetOpen={() => {
                setShowAllBudgets(false);
                setShowCategoryBudget(true);
              }}
              onCategorySelect={setSelectedCategory}
            />
          )}
        </AnimatePresence>

        {/* Breakdown Detail Page */}
        <AnimatePresence>
          {showBreakdownDetail && (
            <BreakdownDetailPage
              onClose={() => setShowBreakdownDetail(false)}
            />
          )}
        </AnimatePresence>

        {/* Onboarding Overlays */}
        <AnimatePresence>
          {isOnboardingActive && showOnboardingWelcome && (
            <OnboardingWelcome
              onStart={() => setShowOnboardingWelcome(false)}
              onSkip={() => {
                setShowOnboardingWelcome(false);
                skipOnboarding();
              }}
            />
          )}
          
          {isOnboardingActive && !showOnboardingWelcome && (
            <OnboardingTour
              currentPage={currentPage as any}
              onNavigate={(page) => setCurrentPage(page as PageType)}
            />
          )}
        </AnimatePresence>
      </motion.div>
  );
}