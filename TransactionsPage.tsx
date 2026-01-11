import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { ArrowDownCircle, ArrowUpCircle, DollarSign, Briefcase, Gift, TrendingUp, Calendar, Search, SlidersHorizontal, Plus, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { TransactionDetailView, TransactionDetail } from './TransactionDetailView';
import { AdvancedSearchModal, SearchFilters } from './AdvancedSearchModal';
import { AddTransactionModal } from './AddTransactionModal';
import { ChangeCategoryModal } from './ChangeCategoryModal';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Mock transaction data
const mockTransactions = [
  { 
    id: 1, 
    type: 'income' as const,
    source: 'Paycheque',
    amount: 2500.00,
    date: '2025-10-25',
    category: 'Paycheque',
    categoryGroup: 'Fixed Income',
    location: 'Direct Deposit',
    notes: '',
    icon: <Briefcase className="size-4" />
  },
  { 
    id: 2, 
    type: 'expense' as const,
    source: 'Rent Payment',
    amount: 1200.00,
    date: '2025-10-24',
    category: 'Housing',
    categoryGroup: 'Fixed Expenses',
    location: 'Property Management Office',
    notes: '',
    icon: <ArrowUpCircle className="size-4" />
  },
  { 
    id: 3, 
    type: 'income' as const,
    source: 'Freelance Project',
    amount: 450.00,
    date: '2025-10-23',
    category: 'Freelance Work',
    categoryGroup: 'Variable Income',
    location: 'Online Transfer',
    notes: '',
    icon: <DollarSign className="size-4" />
  },
  { 
    id: 4, 
    type: 'expense' as const,
    source: 'Groceries',
    amount: 124.89,
    date: '2025-10-22',
    category: 'Groceries & Essentials',
    categoryGroup: 'Fixed Expenses',
    location: 'Walmart, 123 Main St',
    notes: '',
    icon: <ArrowUpCircle className="size-4" />
  },
  { 
    id: 5, 
    type: 'income' as const,
    source: 'Gift from Family',
    amount: 100.00,
    date: '2025-10-21',
    category: 'Gifts',
    categoryGroup: 'Variable Income',
    location: 'Cash',
    notes: '',
    icon: <Gift className="size-4" />
  },
  { 
    id: 6, 
    type: 'expense' as const,
    source: 'Coffee Shop',
    amount: 15.50,
    date: '2025-10-20',
    category: 'Dining/Drinking Out',
    categoryGroup: 'Variable Expenses',
    location: 'Starbucks',
    notes: '',
    icon: <ArrowUpCircle className="size-4" />
  },
  { 
    id: 7, 
    type: 'expense' as const,
    source: 'Shopping',
    amount: 85.00,
    date: '2025-10-20',
    category: 'Shopping & Apparel',
    categoryGroup: 'Variable Expenses',
    location: 'Target',
    notes: '',
    icon: <ArrowUpCircle className="size-4" />
  },
  { 
    id: 8, 
    type: 'expense' as const,
    source: 'Utilities',
    amount: 85.50,
    date: '2025-10-19',
    category: 'Utilities',
    categoryGroup: 'Fixed Expenses',
    location: 'Con Edison',
    notes: '',
    icon: <ArrowUpCircle className="size-4" />
  }
];

export function TransactionsPage() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetail | null>(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<SearchFilters>({});
  const [transactions, setTransactions] = useState(mockTransactions);
  const [deletedTransactions, setDeletedTransactions] = useState<typeof mockTransactions>([]);
  const [categoryEditTransaction, setCategoryEditTransaction] = useState<typeof mockTransactions[0] | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  
  // Add state for selected month/year navigation
  const currentDateNow = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDateNow.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDateNow.getFullYear());
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

  // Load transactions from backend on mount
  useEffect(() => {
    loadTransactionsFromBackend();
  }, []);

  const loadTransactionsFromBackend = async () => {
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

        // If no transactions exist, seed with mock data
        if (backendTransactions.length === 0) {
          console.log('No transactions found. Seeding with mock data...');
          await seedMockTransactions();
        } else {
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
            notes: t.notes || '',
            icon: t.type === 'income' ? <DollarSign className="size-4" /> : <ArrowUpCircle className="size-4" />
          }));
          setTransactions(formattedTransactions);
        }
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const seedMockTransactions = async () => {
    try {
      // Convert mock transactions to backend format and save them
      for (const mockTx of mockTransactions) {
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/transactions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`
            },
            body: JSON.stringify({
              merchant: mockTx.source,
              amount: mockTx.amount,
              date: mockTx.date,
              category: mockTx.category,
              categoryGroup: mockTx.categoryGroup,
              location: mockTx.location,
              notes: mockTx.notes,
              type: mockTx.type
            })
          }
        );
      }
      
      // Reload transactions after seeding
      await loadTransactionsFromBackend();
      console.log('Mock transactions seeded successfully!');
    } catch (error) {
      console.error('Error seeding mock transactions:', error);
    }
  };

  const handleTransactionClick = (transaction: typeof mockTransactions[0] & { 
    accountName?: string; 
    accountLastFour?: string; 
    transactionId?: string;
  }) => {
    setSelectedTransaction({
      id: transaction.id,
      merchant: transaction.source,
      amount: transaction.amount,
      date: transaction.date,
      category: transaction.category,
      categoryGroup: transaction.categoryGroup || (transaction.type === 'income' ? 'Income' : 'Expenses'),
      paymentMethod: transaction.type === 'income' ? 'Direct Deposit' : 'Debit Card',
      accountName: transaction.accountName || 'Chase Checking',
      accountLastFour: transaction.accountLastFour || '4829',
      transactionId: transaction.transactionId || `TXN${transaction.id}${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'Completed',
      location: transaction.location,
      notes: transaction.notes || ''
    });
  };

  // Calculate totals - filter by current month only
  const totalIncome = transactions
    .filter(t => {
      const transactionDate = new Date(t.date);
      return t.type === 'income' && 
             transactionDate.getMonth() === selectedMonth && 
             transactionDate.getFullYear() === selectedYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => {
      const transactionDate = new Date(t.date);
      return t.type === 'expense' && 
             transactionDate.getMonth() === selectedMonth && 
             transactionDate.getFullYear() === selectedYear;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const handleApplyAdvancedFilters = (filters: SearchFilters) => {
    setAdvancedFilters(filters);
  };

  const handleAddTransaction = async (newTransaction: {
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
  }) => {
    // Determine type from categoryGroup if not explicitly provided
    let transactionType = newTransaction.type;
    if (!transactionType && newTransaction.categoryGroup) {
      transactionType = newTransaction.categoryGroup.includes('Income') ? 'income' : 'expense';
    }
    
    // Save to backend first
    try {
      const backendTransaction = {
        type: transactionType || 'expense',
        merchant: newTransaction.source,
        amount: newTransaction.amount,
        date: newTransaction.date,
        category: newTransaction.category,
        categoryGroup: newTransaction.categoryGroup,
        location: newTransaction.location || 'Not specified',
        notes: '',
        accountName: newTransaction.accountName,
        accountLastFour: newTransaction.accountLastFour,
        transactionId: newTransaction.transactionId
      };

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/transactions`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(backendTransaction)
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Backend error response:', errorData);
        throw new Error(`Failed to save transaction to backend: ${errorData.error || response.statusText}`);
      }

      const savedTransaction = await response.json();
      console.log('Transaction saved to backend:', savedTransaction);

      // Now add to local state with backend ID
      const transaction = {
        id: savedTransaction.id || transactions.length + 1,
        ...newTransaction,
        type: transactionType || 'expense',
        location: newTransaction.location || 'Not specified',
        notes: '',
        icon: transactionType === 'income' ? <ArrowDownCircle className="size-4" /> : <ArrowUpCircle className="size-4" />
      };
      setTransactions(prev => [transaction, ...prev]);
    } catch (error) {
      console.error('Error saving transaction:', error);
      
      // Still add to local state even if backend fails (fallback)
      const transaction = {
        id: transactions.length + 1,
        ...newTransaction,
        type: transactionType || 'expense',
        location: newTransaction.location || 'Not specified',
        notes: '',
        icon: transactionType === 'income' ? <ArrowDownCircle className="size-4" /> : <ArrowUpCircle className="size-4" />
      };
      setTransactions(prev => [transaction, ...prev]);
    }
  };

  const handleUpdateCategory = (transactionId: number, category: string, categoryGroup?: string) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === transactionId 
          ? { ...transaction, category, categoryGroup }
          : transaction
      )
    );
    
    // Also update the selected transaction if it's currently open
    if (selectedTransaction && selectedTransaction.id === transactionId) {
      setSelectedTransaction({
        ...selectedTransaction,
        category,
        categoryGroup: categoryGroup || selectedTransaction.categoryGroup
      });
    }
  };

  const handleUpdateLocation = (transactionId: number, location: string) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === transactionId 
          ? { ...transaction, location }
          : transaction
      )
    );
    
    // Also update the selected transaction if it's currently open
    if (selectedTransaction && selectedTransaction.id === transactionId) {
      setSelectedTransaction({
        ...selectedTransaction,
        location
      });
    }
  };

  const handleUpdateNotes = (transactionId: number, notes: string) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === transactionId 
          ? { ...transaction, notes }
          : transaction
      )
    );
    
    // Also update the selected transaction if it's currently open
    if (selectedTransaction && selectedTransaction.id === transactionId) {
      setSelectedTransaction({
        ...selectedTransaction,
        notes
      });
    }
  };

  const handleDeleteTransaction = async (transactionId: number) => {
    const transactionToDelete = transactions.find(t => t.id === transactionId);
    if (transactionToDelete) {
      try {
        // Delete from backend first
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/transactions/${transactionId}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Backend error deleting transaction:', errorData);
          throw new Error(`Failed to delete transaction from backend: ${errorData.error || response.statusText}`);
        }

        console.log('Transaction deleted from backend:', transactionId);

        // Move transaction to deleted list (for undo functionality)
        setDeletedTransactions(prev => [...prev, transactionToDelete]);
        // Remove from active transactions
        setTransactions(prev => prev.filter(t => t.id !== transactionId));
      } catch (error) {
        console.error('Error deleting transaction:', error);
        // Still remove from local state even if backend fails (for better UX)
        setDeletedTransactions(prev => [...prev, transactionToDelete]);
        setTransactions(prev => prev.filter(t => t.id !== transactionId));
      }
    }
  };

  const handleCategoryClick = (e: React.MouseEvent, transaction: typeof mockTransactions[0]) => {
    e.stopPropagation(); // Prevent opening transaction detail
    setCategoryEditTransaction(transaction);
    setShowCategoryModal(true);
  };

  const handleQuickCategoryChange = (category: string, categoryGroup?: string) => {
    if (!categoryEditTransaction) return;

    // Update the transaction with new category
    handleUpdateCategory(categoryEditTransaction.id, category, categoryGroup);
    setShowCategoryModal(false);
    setCategoryEditTransaction(null);
  };

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

  // Filter transactions by type
  let filteredTransactions = selectedFilter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === selectedFilter);

  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredTransactions = filteredTransactions.filter(transaction => {
      const sourceMatch = transaction.source.toLowerCase().includes(query);
      const dateMatch = transaction.date.includes(query) || formatDate(transaction.date).toLowerCase().includes(query);
      const amountMatch = transaction.amount.toString().includes(query);
      const categoryMatch = transaction.category.toLowerCase().includes(query);
      
      return sourceMatch || dateMatch || amountMatch || categoryMatch;
    });
  }

  // Apply advanced filters
  if (advancedFilters.startDate || advancedFilters.endDate) {
    filteredTransactions = filteredTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      if (advancedFilters.startDate && transactionDate < new Date(advancedFilters.startDate)) {
        return false;
      }
      if (advancedFilters.endDate && transactionDate > new Date(advancedFilters.endDate)) {
        return false;
      }
      return true;
    });
  }

  if (advancedFilters.minAmount !== undefined || advancedFilters.maxAmount !== undefined) {
    filteredTransactions = filteredTransactions.filter(transaction => {
      if (advancedFilters.minAmount !== undefined && transaction.amount < advancedFilters.minAmount) {
        return false;
      }
      if (advancedFilters.maxAmount !== undefined && transaction.amount > advancedFilters.maxAmount) {
        return false;
      }
      return true;
    });
  }

  if (advancedFilters.categories && advancedFilters.categories.length > 0) {
    filteredTransactions = filteredTransactions.filter(transaction =>
      advancedFilters.categories?.includes(transaction.category)
    );
  }

  // Group by date
  const groupedTransactions: { [key: string]: typeof mockTransactions } = {};
  filteredTransactions.forEach(transaction => {
    if (!groupedTransactions[transaction.date]) {
      groupedTransactions[transaction.date] = [];
    }
    groupedTransactions[transaction.date].push(transaction);
  });

  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="size-full overflow-y-auto px-6 pb-6">
      {/* Summary Cards */}
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
              {new Date(selectedYear, selectedMonth).toLocaleString('en-US', { month: 'long' })} Overview
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

        <div className="grid grid-cols-3 gap-3 mb-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Card className="bg-white border-[#686867]/20 p-3">
              <div className="flex items-center gap-2 mb-1">
                <ArrowDownCircle className="size-4" style={{ color: '#5e6c5b' }} />
                <span 
                  className="text-[#686867] text-[10px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Income
                </span>
              </div>
              <p 
                className="text-[#162a2c] text-[16px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                ${totalIncome.toFixed(2)}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            <Card className="bg-white border-[#686867]/20 p-3">
              <div className="flex items-center gap-2 mb-1">
                <ArrowUpCircle className="size-4" style={{ color: '#ffa47d' }} />
                <span 
                  className="text-[#686867] text-[10px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Expenses
                </span>
              </div>
              <p 
                className="text-[#162a2c] text-[16px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                ${totalExpenses.toFixed(2)}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Card className="bg-white border-[#686867]/20 p-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="size-4 text-[#686867]" />
                <span 
                  className="text-[#686867] text-[10px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Net
                </span>
              </div>
              <p 
                className="text-[16px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  color: netBalance >= 0 ? '#5e6c5b' : '#ffa47d'
                }}
              >
                ${netBalance.toFixed(2)}
              </p>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Filter Options */}
      <motion.div
        className="mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`flex-1 px-4 py-2 rounded-md text-[10px] transition-colors ${
              selectedFilter === 'all'
                ? 'bg-[#686867] text-[#E9F0F1]'
                : 'bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1]'
            }`}
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter('income')}
            className={`flex-1 px-4 py-2 rounded-md text-[10px] transition-colors ${
              selectedFilter === 'income'
                ? 'bg-[#686867] text-[#E9F0F1]'
                : 'bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1]'
            }`}
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            Income
          </button>
          <button
            onClick={() => setSelectedFilter('expense')}
            className={`flex-1 px-4 py-2 rounded-md text-[10px] transition-colors ${
              selectedFilter === 'expense'
                ? 'bg-[#686867] text-[#E9F0F1]'
                : 'bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1]'
            }`}
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            Expenses
          </button>
          <button
            onClick={() => setShowAddTransaction(true)}
            className="px-2 py-2 rounded-md text-[10px] bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1] transition-colors flex items-center gap-1 whitespace-nowrap"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            <Plus className="size-3" />
            Add
          </button>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#686867]" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[40px] pl-10 pr-3 bg-white border border-[#686867]/20 rounded-md text-[12px] text-[#162a2c] placeholder:text-[#686867]/60 focus:outline-none focus:border-[#686867] transition-colors"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            />
          </div>
          <button
            onClick={() => setShowAdvancedSearch(true)}
            className="h-[40px] w-[40px] flex items-center justify-center bg-white border border-[#686867]/20 rounded-md hover:bg-[#E9F0F1] transition-colors"
          >
            <SlidersHorizontal className="size-4 text-[#686867]" />
          </button>
        </div>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        <h2 
          className="text-[#162a2c] mb-3"
          style={{ 
            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
            letterSpacing: '0.02em',
            fontWeight: 400
          }}
        >
          Transaction History
        </h2>

        <div className="space-y-4">
          {sortedDates.map((date, dateIndex) => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="size-4 text-[#686867]" />
                <h3 
                  className="text-[#686867] text-[12px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {formatDate(date)}
                </h3>
              </div>

              <div className="space-y-2 mb-4">
                {groupedTransactions[date].map((transaction, transactionIndex) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + dateIndex * 0.1 + transactionIndex * 0.05, duration: 0.3 }}
                  >
                    <Card 
                      className="bg-white border-[#686867]/20 p-4 cursor-pointer hover:bg-[#E9F0F1] transition-colors"
                      onClick={() => handleTransactionClick(transaction)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{
                              backgroundColor: transaction.type === 'income' ? '#e8ede7' : '#ffe8dc',
                              color: transaction.type === 'income' ? '#5e6c5b' : '#ffa47d'
                            }}
                          >
                            {transaction.type === 'income' ? (
                              <ArrowDownCircle className="size-5" />
                            ) : (
                              <ArrowUpCircle className="size-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p 
                              className="text-[#162a2c] text-[14px]"
                              style={{ 
                                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                                letterSpacing: '0.02em'
                              }}
                            >
                              {transaction.source}
                            </p>
                            <motion.p 
                              onClick={(e) => handleCategoryClick(e, transaction)}
                              className="text-[#686867] text-[12px] hover:text-[#5e6c5b] transition-colors cursor-pointer inline-block w-fit"
                              style={{ 
                                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                                letterSpacing: '0.02em'
                              }}
                              whileTap={{ 
                                scale: 1.05,
                                color: '#5e6c5b',
                                transition: { duration: 0.2 }
                              }}
                            >
                              {transaction.category}
                            </motion.p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p 
                            className="text-[14px]"
                            style={{ 
                              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                              letterSpacing: '0.02em',
                              color: transaction.type === 'income' ? '#5e6c5b' : '#162a2c'
                            }}
                          >
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                          </p>
                          {transaction.categoryGroup && (
                            <p 
                              className="text-[#686867] text-[10px]"
                              style={{ 
                                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                                letterSpacing: '0.02em'
                              }}
                            >
                              {transaction.categoryGroup}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedTransaction && (
          <TransactionDetailView
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
            onUpdateCategory={handleUpdateCategory}
            onUpdateLocation={handleUpdateLocation}
            onUpdateNotes={handleUpdateNotes}
            onDelete={handleDeleteTransaction}
          />
        )}
        {showAdvancedSearch && (
          <AdvancedSearchModal
            onClose={() => setShowAdvancedSearch(false)}
            onApplyFilters={handleApplyAdvancedFilters}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddTransaction && (
          <AddTransactionModal
            onClose={() => setShowAddTransaction(false)}
            onAddTransaction={handleAddTransaction}
          />
        )}
      </AnimatePresence>

      {/* Restore Deleted Transactions Link */}
      {deletedTransactions.length > 0 && (
        <motion.div
          className="mt-8 mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={async () => {
              // Re-add deleted transactions to backend
              for (const tx of deletedTransactions) {
                try {
                  await fetch(
                    `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/transactions`,
                    {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${publicAnonKey}`,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        type: tx.type,
                        merchant: tx.source,
                        amount: tx.amount,
                        date: tx.date,
                        category: tx.category,
                        categoryGroup: tx.categoryGroup,
                        location: tx.location,
                        notes: tx.notes || ''
                      })
                    }
                  );
                } catch (error) {
                  console.error('Error restoring transaction to backend:', error);
                }
              }
              
              // Add back to local state
              setTransactions(prev => [...prev, ...deletedTransactions]);
              setDeletedTransactions([]);
            }}
            className="text-[#5e6c5b] text-[14px] underline hover:text-[#162a2c] transition-colors"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            Restore deleted transactions ({deletedTransactions.length})
          </button>
        </motion.div>
      )}

      {/* Category Change Modal */}
      {showCategoryModal && categoryEditTransaction && (
        <AnimatePresence>
          <ChangeCategoryModal
            currentCategory={categoryEditTransaction.category}
            currentCategoryGroup={categoryEditTransaction.categoryGroup}
            onClose={() => {
              setShowCategoryModal(false);
              setCategoryEditTransaction(null);
            }}
            onChangeCategory={handleQuickCategoryChange}
          />
        </AnimatePresence>
      )}
    </div>
  );
}
