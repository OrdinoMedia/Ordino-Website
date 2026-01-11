import { motion } from 'motion/react';
import { Button } from './ui/button';
import { X, Tag } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface ChangeCategoryModalProps {
  currentCategory: string;
  currentCategoryGroup?: string;
  onClose: () => void;
  onChangeCategory: (category: string, categoryGroup?: string) => void;
}

const categories = {
  income: [
    { group: 'Fixed Income', items: ['Salary/Wages', 'Pension', 'Social Security/Benefits', 'Rental Income', 'Annuities'] },
    { group: 'Flexible Income', items: ['Freelance/Contract Work', 'Bonuses & Commissions', 'Investment Income/Dividends', 'Side Business', 'Gifts & Monetary Gifts', 'Tax Refunds', 'Other Income'] }
  ],
  expense: [
    { group: 'Fixed Expenses', items: ['Housing', 'Groceries & Essentials', 'Utilities', 'Transportation', 'Insurance', 'Debt Payments', 'Childcare & Education', 'Pet Care', 'Subscriptions', 'Phone & Internet', 'Personal Care'] },
    { group: 'Flexible Expenses', items: ['Dining & Coffee', 'Shopping & Retail', 'Entertainment', 'Travel & Vacation', 'Gifts & Donations', 'Health & Wellness', 'Home & Garden', 'Hobbies & Crafts', 'Miscellaneous'] },
    { group: 'Savings', items: ['Emergency Fund', 'Savings Account', 'Short-term Goals'] },
    { group: 'Investments', items: ['RRSP / TFSA / Retirement', 'Stocks & ETFs', 'Real Estate & Property'] }
  ]
};

export function ChangeCategoryModal({ currentCategory, currentCategoryGroup, onClose, onChangeCategory }: ChangeCategoryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState(currentCategoryGroup || '');

  const handleSave = () => {
    if (!selectedCategory) {
      toast.error('Please select a category');
      return;
    }

    onChangeCategory(selectedCategory, selectedCategoryGroup || undefined);
    toast.success('Category updated successfully!');
    onClose();
  };

  // Determine if this is an income or expense category based on current category or group
  const isIncome = categories.income.some(group => group.items.includes(currentCategory)) || 
                   currentCategory.includes('Income') ||
                   (currentCategoryGroup && (currentCategoryGroup === 'Income' || currentCategoryGroup.includes('Income')));

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#686867]/20 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="size-5 text-[#686867]" />
            <h2 
              className="text-[#162a2c] text-[18px]"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 500
              }}
            >
              Change Category
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <X className="size-5 text-[#686867]" />
          </Button>
        </div>

        {/* Category List */}
        <div className="p-4 space-y-3">
          {isIncome ? (
            <div className="space-y-3">
              {categories.income.map((group) => (
                <div key={group.group}>
                  <h3 
                    className="text-[#162a2c] text-[12px] mb-2"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em',
                      fontWeight: 500
                    }}
                  >
                    {group.group}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setSelectedCategoryGroup(group.group);
                        }}
                        className={`w-full p-2 rounded-md text-left text-[12px] transition-colors ${
                          selectedCategory === category
                            ? 'bg-[#5e6c5b] text-white'
                            : 'bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1]'
                        }`}
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {categories.expense.map((group) => (
                <div key={group.group}>
                  <h3 
                    className="text-[#162a2c] text-[12px] mb-2"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em',
                      fontWeight: 500
                    }}
                  >
                    {group.group}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setSelectedCategoryGroup(group.group);
                        }}
                        className={`w-full p-2 rounded-md text-left text-[12px] transition-colors ${
                          selectedCategory === category
                            ? 'bg-[#5e6c5b] text-white'
                            : 'bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1]'
                        }`}
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#686867]/20 p-4 flex gap-2">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-[#686867]/30 text-[#686867] hover:bg-[#E9F0F1]"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-[#686867] text-white hover:bg-[#162a2c]"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 400
            }}
          >
            Save Changes
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}