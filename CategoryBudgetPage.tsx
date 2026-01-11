import { motion } from 'motion/react';
import { Card } from './ui/card';
import { X, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface CategoryBudgetPageProps {
  onClose: () => void;
}

// Complete category framework with all 28 subcategories
const categoryGroups = [
  {
    name: 'Income',
    color: '#5e6c5b',
    subcategories: [
      { id: 'income-fixed', name: 'Fixed Income', icon: '💰', budget: 0 },
      { id: 'income-flexible', name: 'Flexible Income', icon: '💵', budget: 0 },
    ]
  },
  {
    name: 'Fixed Expenses',
    color: '#ffa47d',
    subcategories: [
      { id: 'fixed-rent', name: 'Rent/Mortgage', icon: '🏠', budget: 0 },
      { id: 'fixed-utilities', name: 'Utilities', icon: '💡', budget: 0 },
      { id: 'fixed-insurance', name: 'Insurance', icon: '🛡️', budget: 0 },
      { id: 'fixed-loan', name: 'Loan Payments', icon: '🏦', budget: 0 },
      { id: 'fixed-subscriptions', name: 'Subscriptions', icon: '📱', budget: 0 },
      { id: 'fixed-childcare', name: 'Childcare', icon: '👶', budget: 0 },
      { id: 'fixed-education', name: 'Education', icon: '📚', budget: 0 },
      { id: 'fixed-healthcare', name: 'Healthcare', icon: '⚕️', budget: 0 },
      { id: 'fixed-transport', name: 'Transportation', icon: '🚗', budget: 0 },
      { id: 'fixed-phone', name: 'Phone/Internet', icon: '📞', budget: 0 },
      { id: 'fixed-other', name: 'Other Fixed', icon: '📋', budget: 0 },
    ]
  },
  {
    name: 'Flexible Expenses',
    color: '#686867',
    subcategories: [
      { id: 'flex-groceries', name: 'Groceries & Essentials', icon: '🛒', budget: 500 },
      { id: 'flex-dining', name: 'Dining & Coffee', icon: '☕', budget: 120 },
      { id: 'flex-entertainment', name: 'Entertainment', icon: '🎬', budget: 80 },
      { id: 'flex-shopping', name: 'Shopping', icon: '🛍️', budget: 0 },
      { id: 'flex-health', name: 'Health & Wellness', icon: '💪', budget: 100 },
      { id: 'flex-personal', name: 'Personal Care', icon: '💆', budget: 0 },
      { id: 'flex-gifts', name: 'Gifts & Donations', icon: '🎁', budget: 0 },
      { id: 'flex-travel', name: 'Travel', icon: '✈️', budget: 0 },
      { id: 'flex-other', name: 'Other Flexible', icon: '💳', budget: 0 },
    ]
  },
  {
    name: 'Savings',
    color: '#5e6c5b',
    subcategories: [
      { id: 'savings-tfsa', name: 'TFSA', icon: '🏛️', budget: 0 },
      { id: 'savings-account', name: 'Savings Account', icon: '🏦', budget: 0 },
      { id: 'savings-emergency', name: 'Emergency Fund', icon: '🚨', budget: 0 },
    ]
  },
  {
    name: 'Investments',
    color: '#162a2c',
    subcategories: [
      { id: 'invest-stocks', name: 'Stocks & Bonds', icon: '📈', budget: 0 },
      { id: 'invest-retirement', name: 'Retirement Fund', icon: '🏖️', budget: 0 },
      { id: 'invest-other', name: 'Other Investments', icon: '💼', budget: 0 },
    ]
  },
];

export function CategoryBudgetPage({ onClose }: CategoryBudgetPageProps) {
  const [budgets, setBudgets] = useState<{ [key: string]: string }>(
    categoryGroups.reduce((acc, group) => {
      group.subcategories.forEach(sub => {
        acc[sub.id] = sub.budget > 0 ? sub.budget.toString() : '';
      });
      return acc;
    }, {} as { [key: string]: string })
  );

  const handleBudgetChange = (subcategoryId: string, value: string) => {
    // Only allow numbers and decimal point
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setBudgets(prev => ({ ...prev, [subcategoryId]: value }));
    }
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log('Saving budgets:', budgets);
    onClose();
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
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-[#E9F0F1] flex items-center justify-center transition-colors"
          >
            <X className="size-5 text-[#686867]" />
          </button>
          
          <h1 
            className="text-[14px]"
            style={{ 
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              color: '#162a2c',
              letterSpacing: '0.02em'
            }}
          >
            Category Budgets
          </h1>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md text-[10px] bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1] transition-colors"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            Save
          </button>
        </div>

        <p 
          className="text-[12px] text-[#686867] text-center"
          style={{ 
            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
            letterSpacing: '0.02em'
          }}
        >
          Set monthly budgets for all categories
        </p>
      </motion.div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {categoryGroups.map((group, groupIndex) => (
          <motion.div
            key={group.name}
            className="mt-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + groupIndex * 0.05, duration: 0.5 }}
          >
            {/* Group Header */}
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="h-1 w-8 rounded-full"
                style={{ backgroundColor: group.color }}
              />
              <h2 
                className="text-[14px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  fontWeight: 600,
                  color: '#162a2c',
                  letterSpacing: '0.02em'
                }}
              >
                {group.name}
              </h2>
              <span 
                className="text-[11px] text-[#686867]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                ({group.subcategories.length})
              </span>
            </div>

            {/* Subcategories */}
            <div className="space-y-2">
              {group.subcategories.map((subcategory, subIndex) => (
                <motion.div
                  key={subcategory.id}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + groupIndex * 0.05 + subIndex * 0.02 }}
                >
                  <Card className="bg-white border-[#686867]/20 p-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-[20px] shrink-0"
                        style={{ backgroundColor: `${group.color}20` }}
                      >
                        {subcategory.icon}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p 
                          className="text-[13px] truncate"
                          style={{ 
                            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            color: '#162a2c',
                            letterSpacing: '0.02em'
                          }}
                        >
                          {subcategory.name}
                        </p>
                      </div>

                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <DollarSign className="size-4 text-[#686867]" />
                        </div>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={budgets[subcategory.id]}
                          onChange={(e) => handleBudgetChange(subcategory.id, e.target.value)}
                          placeholder="0"
                          className="w-24 h-10 pl-8 pr-3 text-right bg-[#E9F0F1] border border-[#686867]/20 rounded-lg focus:outline-none focus:border-[#5e6c5b] transition-colors"
                          style={{ 
                            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            fontSize: '13px',
                            color: '#162a2c',
                            letterSpacing: '0.02em'
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Bottom spacing for scroll */}
        <div className="h-6" />
      </div>
    </motion.div>
  );
}
