import { motion } from 'motion/react';
import { Card } from './ui/card';
import { TrendingUp, TrendingDown, PiggyBank, ShoppingCart, Home, Plus, Settings, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Type definitions
interface BudgetInsight {
  id: string;
  category: string;
  spent: number;
  budget: number;
  groupName?: string;
  trend: 'up' | 'down' | 'neutral';
  tip: string;
  icon: string;
  iconElement: JSX.Element;
  updatedAt: number;
}

interface CategoryDetail {
  category: string;
  spent: number;
  budget: number;
  icon: string;
  percentageUsed: number;
  amountUnder: number;
  percentageUnder: number;
  id: string;
  groupName?: string;
}

// Default budget insights (dummy data shown when no budgets are set)
const defaultBudgetInsights: BudgetInsight[] = [
  {
    id: 'dummy-1',
    category: 'Groceries & Essentials',
    spent: 245.50,
    budget: 400,
    groupName: 'Fixed Expenses',
    trend: 'neutral',
    tip: "You're doing great! You're 39% under budget this month.",
    icon: '🛒',
    iconElement: <TrendingDown className="size-4" style={{ color: '#5e6c5b' }} />,
    updatedAt: Date.now()
  },
  {
    id: 'dummy-2',
    category: 'Dining/Drinking Out',
    spent: 180.00,
    budget: 200,
    groupName: 'Variable Expenses',
    trend: 'neutral',
    tip: "You're doing great! You're 10% under budget this month.",
    icon: '🍽️',
    iconElement: <TrendingDown className="size-4" style={{ color: '#5e6c5b' }} />,
    updatedAt: Date.now()
  },
  {
    id: 'dummy-3',
    category: 'Emergency Fund',
    spent: 150.00,
    budget: 500,
    groupName: 'Savings Goals',
    trend: 'neutral',
    tip: "You're 30% of the way to your Emergency Fund goal. Keep it up!",
    icon: '💰',
    iconElement: <span className="size-4" />,
    updatedAt: Date.now()
  }
];

// Budgeting tips
const budgetingTips = [
  {
    id: 1,
    title: '50/30/20 Rule',
    description: 'Allocate 50% to needs, 30% to wants, and 20% to savings. This simple framework helps maintain financial balance.',
    icon: <PiggyBank className="size-5 text-[#5e6c5b]" />
  },
  {
    id: 2,
    title: 'Track Every Expense',
    description: 'Small purchases add up quickly. Keep track of all expenses, no matter how minor they seem.',
    icon: <ShoppingCart className="size-5 text-[#162a2c]" />
  },
  {
    id: 3,
    title: 'Build an Emergency Fund',
    description: 'Aim to save 3-6 months of living expenses. Start small and be consistent with your contributions.',
    icon: <Home className="size-5 text-[#ffa47d]" />
  }
];

interface InsightsPageProps {
  onCategoryBudgetOpen?: () => void;
  onAllBudgetsOpen?: () => void;
  onCategorySelect?: (category: CategoryDetail) => void;
  onBreakdownDetailOpen?: () => void;
  onPickPreviewBudgetsOpen?: () => void;
}

export function InsightsPage({ onCategoryBudgetOpen, onAllBudgetsOpen, onCategorySelect, onBreakdownDetailOpen, onPickPreviewBudgetsOpen }: InsightsPageProps) {
  const [analyticsView, setAnalyticsView] = useState<'monthly' | 'yearly' | 'daily'>('monthly');
  const [budgetInsights, setBudgetInsights] = useState<BudgetInsight[]>(defaultBudgetInsights);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'categories' | 'tips'>('categories');
  const [transactions, setTransactions] = useState<any[]>([]);
  
  // Add state for selected month/year navigation
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

  // Load transactions from backend
  useEffect(() => {
    loadTransactions();
    
    // Set up polling to check for new/updated/deleted transactions every 2 seconds
    const interval = setInterval(() => {
      loadTransactions();
    }, 2000);
    
    // Also refresh when page becomes visible (user switches back to this tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadTransactions();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

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
        console.log('Loaded transactions for Insights:', formattedTransactions);
      }
    } catch (error) {
      console.error('Error loading transactions for Insights:', error);
    }
  };

  // Calculate spending breakdown from transactions for current month
  const incomeAmount = transactions
    .filter(t => {
      const transactionDate = new Date(t.date);
      return t.type === 'income' && 
             transactionDate.getMonth() === selectedMonth && 
             transactionDate.getFullYear() === selectedYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);
    
  const expensesAmount = transactions
    .filter(t => {
      const transactionDate = new Date(t.date);
      return t.type === 'expense' && 
             transactionDate.getMonth() === selectedMonth && 
             transactionDate.getFullYear() === selectedYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalNetIncome = incomeAmount - expensesAmount;
  
  // Calculate percentages for visual breakdown
  const totalAmount = incomeAmount + expensesAmount + Math.abs(totalNetIncome);
  const incomePercentage = totalAmount > 0 ? (incomeAmount / totalAmount) * 100 : 33;
  const expensesPercentage = totalAmount > 0 ? (expensesAmount / totalAmount) * 100 : 33;
  const netIncomePercentage = totalAmount > 0 ? (Math.abs(totalNetIncome) / totalAmount) * 100 : 33;
  
  // Use calculated values or fallback to dummy data if no transactions
  const spendingBreakdown = transactions.length > 0 
    ? [
        { category: 'Income', amount: incomeAmount, percentage: Math.round(incomePercentage), color: '#5e6c5b' },
        { category: 'Expenses', amount: expensesAmount, percentage: Math.round(expensesPercentage), color: '#162a2c' },
        { category: 'Net Income', amount: totalNetIncome, percentage: Math.round(netIncomePercentage), color: '#8a9899' }
      ]
    : [
        { category: 'Income', amount: 3050, percentage: 56, color: '#5e6c5b' },
        { category: 'Expenses', amount: 1930, percentage: 35, color: '#162a2c' },
        { category: 'Net Income', amount: 1120, percentage: 20, color: '#8a9899' }
      ];

  // Load budgets from backend
  useEffect(() => {
    loadBudgets();
    
    // Set up polling to check for new budgets every 5 seconds
    const interval = setInterval(() => {
      loadBudgets();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const loadBudgets = async () => {
    try {
      // First, load the user's preview budget preferences
      const preferencesResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/preview-budgets`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      let userSelectedBudgetIds: string[] = [];
      if (preferencesResponse.ok) {
        const preferencesData = await preferencesResponse.json();
        if (preferencesData.selectedBudgets && Array.isArray(preferencesData.selectedBudgets)) {
          userSelectedBudgetIds = preferencesData.selectedBudgets;
        }
      }

      // Now load the budgets
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/budgets`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.budgets && Object.keys(data.budgets).length > 0) {
          // Convert budgets object to array and filter out leftover cash
          const budgetsArray = Object.entries(data.budgets)
            .filter(([id, budget]: [string, any]) => id !== 'leftover-cash') // Exclude leftover cash
            .map(([id, budget]: [string, any]) => {
              // Use the actual spent amount from the budget data (or 0 if not set)
              const spent = budget.spent || 0;
              const percentage = (spent / budget.budget) * 100;
              
              // Check if this is a savings goal
              const isSavingsGoal = budget.groupName === 'Savings Goals' || budget.groupName === 'Savings' || budget.groupName === 'Financial Goals';
              
              // For savings goals: different logic for "over budget"
              // For expenses: over 85% is concerning
              const isOverBudget = isSavingsGoal ? false : percentage > 85;
              const isGoalReached = isSavingsGoal && percentage >= 75; // 75%+ towards savings goal is good!
              
              return {
                id,
                category: budget.name,
                spent: spent,
                budget: budget.budget,
                groupName: budget.groupName,
                trend: isOverBudget ? 'up' : (isGoalReached ? 'down' : 'neutral'),
                tip: isSavingsGoal
                  ? (percentage >= 100 
                      ? `🎉 Goal achieved! You've saved $${spent.toFixed(2)} towards your ${budget.name} goal!`
                      : `You're ${Math.round(percentage)}% of the way to your ${budget.name} goal. Keep it up!`)
                  : (isOverBudget 
                      ? `Watch your ${budget.name} expenses - you're at ${Math.round(percentage)}% of your budget.`
                      : `You're doing great! You're ${Math.round(100 - percentage)}% under budget this month.`),
                icon: budget.icon,
                iconElement: isOverBudget 
                  ? <TrendingUp className="size-4" style={{ color: '#ffa47d' }} />
                  : (isGoalReached || (!isSavingsGoal && percentage < 85)
                      ? <TrendingDown className="size-4" style={{ color: '#5e6c5b' }} />
                      : <span className="size-4" />),
                updatedAt: budget.updatedAt
              };
            });

          let selectedBudgets: BudgetInsight[] = [];

          // If user has selected preview budgets, use those
          if (userSelectedBudgetIds.length > 0) {
            // Find the budgets that match the user's selection
            selectedBudgets = userSelectedBudgetIds
              .map(id => budgetsArray.find(b => b.id === id))
              .filter((b): b is BudgetInsight => b !== undefined); // Filter out any that weren't found
            
            // If we have fewer than 3 selected budgets, fill remaining slots with dummy budgets
            const remainingSlots = 3 - selectedBudgets.length;
            const fillerBudgets = defaultBudgetInsights.slice(0, remainingSlots);
            setBudgetInsights([...selectedBudgets, ...fillerBudgets]);
          } else {
            // No user preferences - auto-select 1 budget from each of 3 main categories
            const financialGoalsBudgets = budgetsArray.filter(b => b.groupName === 'Financial Goals').sort((a, b) => b.updatedAt - a.updatedAt);
            const fixedExpensesBudgets = budgetsArray.filter(b => b.groupName === 'Fixed Expenses').sort((a, b) => b.updatedAt - a.updatedAt);
            const variableExpensesBudgets = budgetsArray.filter(b => b.groupName === 'Variable Expenses').sort((a, b) => b.updatedAt - a.updatedAt);
            
            // Take 1 from each category (most recent)
            selectedBudgets = [
              ...(financialGoalsBudgets.length > 0 ? [financialGoalsBudgets[0]] : []),
              ...(fixedExpensesBudgets.length > 0 ? [fixedExpensesBudgets[0]] : []),
              ...(variableExpensesBudgets.length > 0 ? [variableExpensesBudgets[0]] : [])
            ];
            
            // Fill remaining slots with dummy categories if needed
            const remainingSlots = 3 - selectedBudgets.length;
            const fillerBudgets = defaultBudgetInsights.slice(0, remainingSlots);
            
            // Combine user budgets with dummy fillers
            setBudgetInsights([...selectedBudgets, ...fillerBudgets]);
          }
        } else {
          // No user budgets set - show all 3 default dummy categories
          setBudgetInsights(defaultBudgetInsights);
        }
      } else {
        console.warn('Failed to fetch budgets:', response.status, response.statusText);
        // Error fetching - show default dummy categories
        setBudgetInsights(defaultBudgetInsights);
      }
    } catch (error) {
      console.warn('Error loading budgets (this is normal on first load):', error);
      // Silently handle fetch errors (budgets may not be set yet) - show default dummy categories
      setBudgetInsights(defaultBudgetInsights);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (insight: BudgetInsight) => {
    const categoryDetail: CategoryDetail = {
      category: insight.category,
      spent: insight.spent,
      budget: insight.budget,
      icon: insight.icon,
      percentageUsed: (insight.spent / insight.budget) * 100,
      amountUnder: insight.budget - insight.spent,
      percentageUnder: ((insight.budget - insight.spent) / insight.budget) * 100,
      id: insight.id,
      groupName: insight.groupName
    };
    onCategorySelect?.(categoryDetail);
  };

  // Navigation functions for month selection
  const handlePreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    const now = new Date();
    const isCurrentMonth = selectedMonth === now.getMonth() && selectedYear === now.getFullYear();
    
    // Don't allow navigating to future months
    if (isCurrentMonth) return;
    
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Check if we're viewing the current month
  const now = new Date();
  const isCurrentMonth = selectedMonth === now.getMonth() && selectedYear === now.getFullYear();

  // Generate list of previous months (up to 12 months back)
  const generateMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      options.push({
        month: date.getMonth(),
        year: date.getFullYear(),
        label: date.toLocaleString('en-US', { month: 'long', year: 'numeric' }),
        isCurrent: i === 0
      });
    }
    
    return options;
  };

  const monthOptions = generateMonthOptions();

  const handleMonthSelect = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    setIsMonthDropdownOpen(false);
  };

  return (
    <div className="size-full overflow-y-auto px-6 pb-6 relative">
      {/* Spending Breakdown */}
      <motion.div
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        {/* Month Dropdown Selector - Title as Button */}
        <div className="relative mb-3">
          <button
            onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
            className="w-full px-4 py-2.5 rounded-md bg-transparent text-[#162a2c] border border-[#686867]/20 hover:border-[#686867]/40 transition-all flex items-center justify-between group"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 400
            }}
          >
            <span className="text-[16px]">
              {new Date(selectedYear, selectedMonth).toLocaleString('en-US', { month: 'long' })} Breakdown
            </span>
            <ChevronDown 
              className="size-4 transition-all text-[#686867] group-hover:text-[#162a2c]" 
              style={{ 
                transform: isMonthDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }} 
            />
          </button>

          {/* Dropdown Menu */}
          {isMonthDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 rounded-md shadow-lg z-50 max-h-[280px] overflow-y-auto"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(104, 104, 103, 0.15)'
              }}
            >
              {monthOptions.map((option, index) => (
                <button
                  key={`${option.year}-${option.month}`}
                  onClick={() => handleMonthSelect(option.month, option.year)}
                  className={`w-full px-4 py-3 text-left hover:bg-[#E9F0F1]/60 transition-colors border-b border-[#686867]/10 last:border-b-0 ${
                    option.month === selectedMonth && option.year === selectedYear
                      ? 'bg-[#E9F0F1]/40'
                      : ''
                  }`}
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  <span className="text-[14px] text-[#162a2c]">
                    {option.label}
                    {option.isCurrent && (
                      <span className="ml-2 text-[11px] text-[#5e6c5b]">(Current)</span>
                    )}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </div>
        
        <Card 
          className="bg-white border-[#686867]/20 p-4 cursor-pointer hover:bg-[#E9F0F1]/30 transition-colors group"
          onClick={onBreakdownDetailOpen}
        >
          <div className="mb-4">
            <span 
              className="text-[#686867] text-[13px]"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Total Net Income
            </span>
            <p 
              className="text-[#162a2c] text-[24px] mt-1 mb-3"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              ${totalNetIncome.toLocaleString()}
            </p>
          </div>

          {/* Visual breakdown */}
          <div className="w-full h-10 flex rounded-full overflow-hidden mb-4 border-2 border-[#E9F0F1] group-hover:border-white transition-colors">
            {spendingBreakdown.map((item, index) => (
              <motion.div
                key={item.category}
                className="h-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
              />
            ))}
          </div>

          {/* Category list */}
          <div className="space-y-2">
            {spendingBreakdown.map((item, index) => (
              <motion.div
                key={item.category}
                className="flex items-center justify-between"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span 
                    className="text-[#686867] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span 
                    className="text-[#686867] text-[12px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    {item.percentage}%
                  </span>
                  <span 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    ${item.amount.toFixed(0)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Budget Insights */}
      <motion.div
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-3 gap-2">
          <button
            onClick={onAllBudgetsOpen}
            className="px-3 py-2 rounded-md text-[10px] bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1] transition-colors"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            View Budgets
          </button>

          <button
            onClick={onPickPreviewBudgetsOpen}
            className="px-3 py-2 rounded-md text-[10px] bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1] transition-colors flex items-center gap-1.5"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            <Settings className="size-3" />
            Pick Preview
          </button>

          <button
            onClick={onCategoryBudgetOpen}
            className="px-3 py-2 rounded-md text-[10px] bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1] transition-colors flex items-center gap-1.5"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            <Plus className="size-3" />
            Set Budget
          </button>
        </div>

        <div className="space-y-3">
          {budgetInsights.map((insight, index) => {
            const percentage = (insight.spent / insight.budget) * 100;
            const isSavingsGoal = insight.groupName === 'Savings Goals' || insight.groupName === 'Savings';
            
            // Color logic: green for savings progress or good expense tracking, orange for overspending
            let progressColor = '#686867'; // default gray
            if (isSavingsGoal) {
              // Savings: green when making progress (75%+)
              progressColor = percentage >= 75 ? '#5e6c5b' : '#686867';
            } else {
              // Expenses: orange when over 85%
              progressColor = percentage > 85 ? '#ffa47d' : '#686867';
            }
            
            return (
              <motion.div
                key={insight.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
              >
                <Card 
                  className="bg-white border-[#686867]/20 p-4 cursor-pointer hover:bg-[#E9F0F1]/30 transition-colors"
                  onClick={() => handleCategoryClick(insight)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {insight.iconElement}
                        <span 
                          className="text-[#162a2c] text-[14px]"
                          style={{ 
                            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            letterSpacing: '0.02em'
                          }}
                        >
                          {insight.category}
                        </span>
                      </div>
                      <p 
                        className="text-[#686867] text-[12px]"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        {insight.tip}
                      </p>
                    </div>
                    <span 
                      className="text-[#686867] text-[14px] ml-2"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      ${insight.spent.toFixed(2)} / ${insight.budget.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="relative w-full h-6 rounded-full bg-white overflow-hidden p-0.5" style={{ border: '2px solid #E9F0F1' }}>
                    <motion.div
                      className="absolute left-0.5 top-0.5 bottom-0.5 rounded-full"
                      style={{ backgroundColor: progressColor }}
                      initial={{ width: 0 }}
                      animate={{ width: `calc(${Math.max(percentage, 5)}% - 4px)` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Budgeting Tips */}
      <motion.div
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
          Budgeting Tips
        </h2>

        <div className="space-y-3">
          {budgetingTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            >
              <Card className="bg-white border-[#686867]/20 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E9F0F1] flex items-center justify-center flex-shrink-0">
                    {tip.icon}
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-[#162a2c] text-[14px] mb-1"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      {tip.title}
                    </h3>
                    <p 
                      className="text-[#686867] text-[12px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      {tip.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
