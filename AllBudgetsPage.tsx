import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { X, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { CategoryDetail } from './CategoryDetailView';

interface AllBudgetsPageProps {
  onClose: () => void;
  onSetBudget: () => void;
  onCategorySelect?: (category: CategoryDetail) => void;
}

// Mock data for all categories with budgets set
const categoriesWithBudgets = [
  {
    id: 'flex-groceries',
    name: 'Groceries & Essentials',
    icon: '🛒',
    group: 'Flexible Expenses',
    groupColor: '#686867',
    spent: 385,
    budget: 500,
    trend: 'down'
  },
  {
    id: 'flex-dining',
    name: 'Dining & Coffee',
    icon: '☕',
    group: 'Flexible Expenses',
    groupColor: '#686867',
    spent: 180,
    budget: 200,
    trend: 'up'
  },
  {
    id: 'flex-health',
    name: 'Health & Wellness',
    icon: '💪',
    group: 'Flexible Expenses',
    groupColor: '#686867',
    spent: 85,
    budget: 100,
    trend: 'neutral'
  },
  {
    id: 'fixed-transport',
    name: 'Transportation',
    icon: '🚗',
    group: 'Fixed Expenses',
    groupColor: '#ffa47d',
    spent: 120,
    budget: 150,
    trend: 'neutral'
  }
];

export function AllBudgetsPage({ onClose, onSetBudget, onCategorySelect }: AllBudgetsPageProps) {
  const totalBudget = categoriesWithBudgets.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = categoriesWithBudgets.reduce((sum, cat) => sum + cat.spent, 0);
  const percentageUsed = (totalSpent / totalBudget) * 100;

  const handleCategoryClick = (category: typeof categoriesWithBudgets[0]) => {
    const categoryDetail: CategoryDetail = {
      category: category.name,
      spent: category.spent,
      budget: category.budget,
      icon: category.icon,
      percentageUsed: (category.spent / category.budget) * 100,
      amountUnder: category.budget - category.spent,
      percentageUnder: ((category.budget - category.spent) / category.budget) * 100
    };
    onCategorySelect?.(categoryDetail);
  };

  return (
    <motion.div
      className="absolute inset-0 bg-[#E9F0F1] z-50 flex flex-col"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      {/* Header */}
      <motion.div
        className="p-6 pb-4 pt-12 bg-white border-b border-[#686867]/20"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-[#E9F0F1]"
          >
            <X className="size-5 text-[#686867]" />
          </Button>
          
          <h1 
            className="text-[14px]"
            style={{ 
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              color: '#162a2c',
              letterSpacing: '0.02em'
            }}
          >
            Your Budgets
          </h1>

          <button
            onClick={onSetBudget}
            className="px-4 py-2 rounded-md text-[10px] bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1] transition-colors flex items-center"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            <Plus className="size-4 mr-1" />
            Edit
          </button>
        </div>

        <p 
          className="text-[12px] text-[#686867] text-center"
          style={{ 
            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
            letterSpacing: '0.02em'
          }}
        >
          {categoriesWithBudgets.length} categories with budgets
        </p>
      </motion.div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* Total Overview */}
        <motion.div
          className="mt-6 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card className="bg-white border-[#686867]/20 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p 
                  className="text-[#686867] text-[12px] mb-1"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Total Budget
                </p>
                <p 
                  className="text-[#162a2c] text-[24px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  ${totalBudget}
                </p>
              </div>
              <div className="text-right">
                <p 
                  className="text-[#686867] text-[12px] mb-1"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Spent
                </p>
                <p 
                  className="text-[#162a2c] text-[20px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  ${totalSpent}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#E9F0F1] rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full"
                style={{ backgroundColor: percentageUsed > 85 ? '#ffa47d' : '#5e6c5b' }}
                initial={{ width: 0 }}
                animate={{ width: `${percentageUsed}%` }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span 
                className="text-[#686867] text-[11px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                {percentageUsed.toFixed(0)}% used
              </span>
              <span 
                className="text-[#686867] text-[11px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                ${totalBudget - totalSpent} remaining
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Categories List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 
            className="text-[#162a2c] mb-3"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 400
            }}
          >
            All Categories
          </h2>

          <div className="space-y-3">
            {categoriesWithBudgets.map((category, index) => {
              const percentage = (category.spent / category.budget) * 100;
              const isOverBudget = percentage > 100;
              const isNearLimit = percentage > 85 && !isOverBudget;
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                >
                  <Card 
                    className="bg-white border-[#686867]/20 p-4 cursor-pointer hover:bg-[#E9F0F1]/30 transition-colors"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-[20px] shrink-0"
                        style={{ backgroundColor: `${category.groupColor}20` }}
                      >
                        {category.icon}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {category.trend === 'down' && (
                            <TrendingDown className="size-3.5" style={{ color: '#5e6c5b' }} />
                          )}
                          {category.trend === 'up' && (
                            <TrendingUp className="size-3.5" style={{ color: '#ffa47d' }} />
                          )}
                          <h3 
                            className="text-[#162a2c] text-[14px]"
                            style={{ 
                              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                              letterSpacing: '0.02em'
                            }}
                          >
                            {category.name}
                          </h3>
                        </div>
                        
                        <p 
                          className="text-[#686867] text-[11px] mb-2"
                          style={{ 
                            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            letterSpacing: '0.02em'
                          }}
                        >
                          {category.group}
                        </p>

                        {/* Amount */}
                        <div className="flex items-center justify-between mb-2">
                          <span 
                            className="text-[#686867] text-[12px]"
                            style={{ 
                              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                              letterSpacing: '0.02em'
                            }}
                          >
                            ${category.spent} / ${category.budget}
                          </span>
                          <span 
                            className={`text-[11px] ${isOverBudget ? 'text-[#ffa47d]' : isNearLimit ? 'text-[#ffa47d]' : 'text-[#5e6c5b]'}`}
                            style={{ 
                              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                              letterSpacing: '0.02em'
                            }}
                          >
                            {percentage.toFixed(0)}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-[#E9F0F1] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full"
                            style={{ 
                              backgroundColor: isOverBudget || isNearLimit ? '#ffa47d' : '#686867'
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(percentage, 100)}%` }}
                            transition={{ delay: 0.4 + index * 0.05, duration: 0.6 }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom spacing */}
        <div className="h-6" />
      </div>
    </motion.div>
  );
}