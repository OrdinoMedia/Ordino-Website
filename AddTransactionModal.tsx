import { motion } from 'motion/react';
import { Button } from './ui/button';
import { X, DollarSign, Calendar, Tag } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface AddTransactionModalProps {
  onClose: () => void;
  onAddTransaction: (transaction: {
    type: 'income' | 'expense';
    source: string;
    amount: number;
    date: string;
    category: string;
    categoryGroup?: string;
    location?: string;
    accountName?: string;
    accountLastFour?: string;
    transactionId?: string;
  }) => void;
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

export function AddTransactionModal({ onClose, onAddTransaction }: AddTransactionModalProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [location, setLocation] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('Chase Checking - 4829');

  // Common account options
  const accounts = [
    'Unspecified',
    'Chase Checking - 4829',
    'Chase Savings - 1234',
    'Bank of America - 5678',
    'Wells Fargo - 9012',
    'Capital One - 3456',
    'Citi Bank - 7890'
  ];

  // Function to generate transaction ID
  const generateTransactionId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9).toUpperCase();
    return `TXN${timestamp}${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!source || !amount || !selectedCategory || !selectedAccount) {
      toast.error('Please fill in all required fields');
      return;
    }

    const [accountName, lastFour] = selectedAccount.split(' - ');

    onAddTransaction({
      type,
      source,
      amount: parseFloat(amount),
      date,
      category: selectedCategory,
      categoryGroup: selectedCategoryGroup || undefined,
      location: location || undefined,
      accountName,
      accountLastFour: lastFour,
      transactionId: generateTransactionId()
    });
    
    toast.success(`Transaction added successfully!`);
    onClose();
  };

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
          <h2 
            className="text-[#162a2c] text-[18px]"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 500
            }}
          >
            Add Transaction
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <X className="size-5 text-[#686867]" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Transaction Type */}
          <div>
            <label 
              className="text-[#686867] text-[12px] mb-2 block"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Transaction Type
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setType('expense');
                  setSelectedCategory('');
                  setSelectedCategoryGroup('');
                }}
                className={`flex-1 py-2 px-4 rounded-md text-[12px] transition-colors ${
                  type === 'expense'
                    ? 'bg-[#686867] text-white'
                    : 'bg-white text-[#686867] border border-[#686867]/20'
                }`}
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => {
                  setType('income');
                  setSelectedCategory('');
                  setSelectedCategoryGroup('');
                }}
                className={`flex-1 py-2 px-4 rounded-md text-[12px] transition-colors ${
                  type === 'income'
                    ? 'bg-[#686867] text-white'
                    : 'bg-white text-[#686867] border border-[#686867]/20'
                }`}
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                Income
              </button>
            </div>
          </div>

          {/* Description/Source */}
          <div className="relative">
            <div 
              className="absolute left-3 top-2 text-[11px] text-[#686867]"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Description
            </div>
            <input
              type="text"
              placeholder="e.g., Grocery Store, Monthly Salary"
              required
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full h-[50px] px-3 pt-5 pb-2 bg-[#E9F0F1] border border-[#686867]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#686867]/50 text-[14px] text-[#162a2c]"
              style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}
            />
          </div>

          {/* Amount */}
          <div className="relative">
            <div 
              className="absolute left-3 top-2 text-[11px] text-[#686867]"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Amount
            </div>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-[50px] px-3 pt-5 pb-2 bg-[#E9F0F1] border border-[#686867]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#686867]/50 text-[14px] text-[#162a2c]"
              style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}
            />
          </div>

          {/* Date */}
          <div className="relative">
            <div 
              className="absolute left-3 top-2 text-[11px] text-[#686867] z-10"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Date
            </div>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-[50px] px-3 pt-5 pb-2 bg-[#E9F0F1] border border-[#686867]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#686867]/50 text-[14px] text-[#162a2c]"
              style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}
            />
          </div>

          {/* Location */}
          <div className="relative">
            <div 
              className="absolute left-3 top-2 text-[11px] text-[#686867]"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Location (Optional)
            </div>
            <input
              type="text"
              placeholder="e.g., Walmart, 123 Main St"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-[50px] px-3 pt-5 pb-2 bg-[#E9F0F1] border border-[#686867]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#686867]/50 text-[14px] text-[#162a2c]"
              style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}
            />
          </div>

          {/* Category */}
          <div>
            <label 
              className="text-[#686867] text-[12px] mb-2 block"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Category
            </label>
            
            {type === 'income' ? (
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
                          type="button"
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
                          type="button"
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

          {/* Account */}
          <div>
            <label 
              className="text-[#686867] text-[12px] mb-2 block"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Account
            </label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full h-[50px] px-3 py-2 bg-[#E9F0F1] border border-[#686867]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#686867]/50 text-[14px] text-[#162a2c]"
              style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}
            >
              {accounts.map((account) => (
                <option key={account} value={account}>
                  {account}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-[#686867] text-white hover:bg-[#162a2c] transition-colors"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 400
              }}
            >
              Add Transaction
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}