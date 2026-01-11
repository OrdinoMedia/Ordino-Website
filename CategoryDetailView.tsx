import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { X, Tag, TrendingUp, TrendingDown, Receipt, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { ReceiptDetailView, ReceiptDetail } from './ReceiptDetailView';
import { TransactionDetailView, TransactionDetail } from './TransactionDetailView';

export interface CategoryDetail {
  category: string;
  spent: number;
  budget: number;
  icon: string;
  percentageUsed: number;
  amountUnder: number;
  percentageUnder: number;
}

interface CategoryDetailViewProps {
  category: CategoryDetail;
  onClose: () => void;
}

// Mock transactions for the category
const getMockTransactions = (categoryName: string) => {
  const transactionsByCategory: { [key: string]: any[] } = {
    'Groceries & Essentials': [
      { id: 1, merchant: 'Whole Foods', amount: 87.45, date: '2025-10-28', type: 'receipt' },
      { id: 2, merchant: 'Trader Joe\'s', amount: 52.30, date: '2025-10-25', type: 'transaction' },
      { id: 3, merchant: 'Costco', amount: 145.80, date: '2025-10-20', type: 'receipt' },
      { id: 4, merchant: 'Local Farmers Market', amount: 35.20, date: '2025-10-15', type: 'transaction' },
      { id: 5, merchant: 'Target', amount: 64.25, date: '2025-10-10', type: 'receipt' },
    ],
    'Transportation': [
      { id: 6, merchant: 'Shell Gas Station', amount: 52.30, date: '2025-10-27', type: 'receipt' },
      { id: 7, merchant: 'Uber', amount: 18.50, date: '2025-10-22', type: 'transaction' },
      { id: 8, merchant: 'Metro Transit', amount: 25.00, date: '2025-10-15', type: 'transaction' },
      { id: 9, merchant: 'Chevron', amount: 24.20, date: '2025-10-08', type: 'receipt' },
    ],
    'Dining & Coffee': [
      { id: 10, merchant: 'Starbucks', amount: 15.40, date: '2025-10-29', type: 'transaction' },
      { id: 11, merchant: 'Pizza Palace', amount: 32.50, date: '2025-10-24', type: 'receipt' },
      { id: 12, merchant: 'Local Café', amount: 12.80, date: '2025-10-18', type: 'transaction' },
      { id: 13, merchant: 'Thai Restaurant', amount: 24.30, date: '2025-10-12', type: 'receipt' },
    ],
    'Entertainment': [
      { id: 14, merchant: 'Netflix', amount: 15.99, date: '2025-10-01', type: 'transaction' },
      { id: 15, merchant: 'AMC Theaters', amount: 29.01, date: '2025-10-19', type: 'receipt' },
    ],
    'Health & Wellness': [
      { id: 16, merchant: 'Planet Fitness', amount: 25.00, date: '2025-10-01', type: 'transaction' },
      { id: 17, merchant: 'Pharmacy Plus', amount: 25.00, date: '2025-10-14', type: 'receipt' },
    ],
  };

  return transactionsByCategory[categoryName] || [];
};

export function CategoryDetailView({ category, onClose }: CategoryDetailViewProps) {
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptDetail | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetail | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const transactions = getMockTransactions(category.category);
  const receiptsCount = transactions.filter(t => t.type === 'receipt').length;
  const transactionsCount = transactions.filter(t => t.type === 'transaction').length;

  const handleItemClick = (transaction: any) => {
    if (transaction.type === 'receipt') {
      // Convert to ReceiptDetail format
      setSelectedReceipt({
        id: transaction.id,
        merchant: transaction.merchant,
        amount: transaction.amount,
        date: transaction.date,
        category: category.category,
        categoryGroup: 'Flexible Expenses',
        paymentMethod: 'Credit Card',
        location: '123 Main St, City, State',
        items: [
          { name: 'Item 1', price: transaction.amount * 0.4, quantity: 2 },
          { name: 'Item 2', price: transaction.amount * 0.6, quantity: 1 },
        ],
        notes: 'Sample receipt notes'
      });
    } else {
      // Convert to TransactionDetail format
      setSelectedTransaction({
        id: transaction.id,
        merchant: transaction.merchant,
        amount: transaction.amount,
        date: transaction.date,
        category: category.category,
        categoryGroup: 'Flexible Expenses',
        paymentMethod: 'Debit Card',
        accountName: 'Chase Checking',
        accountLastFour: '4829',
        transactionId: `TXN${transaction.id}${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        status: 'Completed',
        location: '123 Main St, City, State'
      });
    }
  };

  return (
    <>
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
        <div className="flex items-center justify-between mb-4">
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
            Category Breakdown
          </h1>
          
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Category Name and Amount */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#686867]/10 flex items-center justify-center mx-auto mb-3">
            <span className="text-[32px]">{category.icon}</span>
          </div>
          <h2 
            className="text-[#162a2c] text-[20px] mb-1"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            {category.category}
          </h2>
          <p 
            className="text-[#686867] text-[32px]"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 500
            }}
          >
            ${category.spent} / ${category.budget}
          </p>
        </div>
      </motion.div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Budget Overview */}
        <motion.div
          className="mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 
            className="text-[#162a2c] mb-3"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 400
            }}
          >
            Budget Overview
          </h3>

          <Card className="bg-white border-[#686867]/20 p-3">
            <div className="mb-2">
              <span 
                className="text-[#686867] text-[14px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                Budget Progress
              </span>
              <div className="flex items-center gap-1 mt-1">
                {category.percentageUsed < 80 ? (
                  <TrendingDown className="size-4" style={{ color: '#5e6c5b' }} />
                ) : (
                  <TrendingUp className="size-4" style={{ color: '#ffa47d' }} />
                )}
                <span 
                  className="text-[#686867] text-[12px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {category.percentageUsed < 100 
                    ? `$${category.amountUnder.toFixed(2)} remaining`
                    : `$${Math.abs(category.amountUnder).toFixed(2)} over budget`
                  }
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-2 bg-[#E9F0F1] rounded-full overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: category.percentageUsed < 80 ? '#5e6c5b' : '#ffa47d' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${category.percentageUsed}%` }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </div>
              <span 
                className="text-[#162a2c] text-[14px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                {category.percentageUsed.toFixed(0)}%
              </span>
            </div>

            <div className="mt-2 pt-2 border-t border-[#686867]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="size-4 text-[#686867]" />
                <span 
                  className="text-[#686867] text-[12px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {receiptsCount} Receipt{receiptsCount !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="size-4 text-[#686867]" />
                <span 
                  className="text-[#686867] text-[12px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {transactionsCount} Transaction{transactionsCount !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Transactions & Receipts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 
            className="text-[#162a2c] mb-3"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 400
            }}
          >
            Recent Activity
          </h3>

          <div className="space-y-2">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
              >
                <Card 
                  className="bg-white border-[#686867]/20 p-4 hover:bg-[#E9F0F1]/30 transition-colors cursor-pointer"
                  onClick={() => handleItemClick(transaction)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {transaction.type === 'receipt' ? (
                        <div className="w-10 h-10 rounded-full bg-[#5e6c5b]/10 flex items-center justify-center">
                          <Receipt className="size-4" style={{ color: '#5e6c5b' }} />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#686867]/10 flex items-center justify-center">
                          <CreditCard className="size-4 text-[#686867]" />
                        </div>
                      )}
                      <div>
                        <p 
                          className="text-[#162a2c] text-[14px]"
                          style={{ 
                            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            letterSpacing: '0.02em'
                          }}
                        >
                          {transaction.merchant}
                        </p>
                        <p 
                          className="text-[#686867] text-[11px]"
                          style={{ 
                            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            letterSpacing: '0.02em'
                          }}
                        >
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                    <span 
                      className="text-[#162a2c] text-[14px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      ${transaction.amount.toFixed(2)}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>

    <AnimatePresence>
      {selectedReceipt && (
        <ReceiptDetailView
          receipt={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </AnimatePresence>

    <AnimatePresence>
      {selectedTransaction && (
        <TransactionDetailView
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </AnimatePresence>
    </>
  );
}
