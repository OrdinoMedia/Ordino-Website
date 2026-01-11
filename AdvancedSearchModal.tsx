import { motion } from 'motion/react';
import { Card } from './ui/card';
import { X, Calendar, DollarSign, Filter } from 'lucide-react';
import { useState } from 'react';

interface AdvancedSearchModalProps {
  onClose: () => void;
  onApplyFilters: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  categories?: string[];
}

const availableCategories = [
  'Fixed Income',
  'Flexible Income',
  'Housing',
  'Groceries & Essentials',
  'Utilities',
  'Transportation',
  'Dining & Coffee',
  'Entertainment',
  'Health & Wellness',
  'Personal Care',
  'Emergency Fund',
  'Savings Goals',
  'RRSP / TFSA / Retirement',
  'Stocks & Crypto',
];

export function AdvancedSearchModal({ onClose, onApplyFilters }: AdvancedSearchModalProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleApply = () => {
    const filters: SearchFilters = {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      minAmount: minAmount ? parseFloat(minAmount) : undefined,
      maxAmount: maxAmount ? parseFloat(maxAmount) : undefined,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
    };
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    setMinAmount('');
    setMaxAmount('');
    setSelectedCategories([]);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-[390px] h-[844px] bg-[#E9F0F1] rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-white/50 flex items-center justify-center transition-colors"
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
              Advanced Search
            </h1>

            <button
              onClick={handleClear}
              className="px-3 py-1.5 rounded-md text-[10px] bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1] transition-colors"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Date Range */}
          <motion.div
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="size-4 text-[#686867]" />
              <h2 
                className="text-[#162a2c]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontWeight: 400
                }}
              >
                Date Range
              </h2>
            </div>
            
            <Card className="bg-white border-[#686867]/20 p-4 space-y-4">
              <div className="relative">
                <label 
                  className="absolute top-2 left-3 text-[11px] text-[#686867]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full h-[50px] pt-5 pb-2 px-3 bg-white border border-[#686867]/20 rounded-md focus:outline-none focus:border-[#686867] transition-colors"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    color: '#162a2c'
                  }}
                />
              </div>

              <div className="relative">
                <label 
                  className="absolute top-2 left-3 text-[11px] text-[#686867]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full h-[50px] pt-5 pb-2 px-3 bg-white border border-[#686867]/20 rounded-md focus:outline-none focus:border-[#686867] transition-colors"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    color: '#162a2c'
                  }}
                />
              </div>
            </Card>
          </motion.div>

          {/* Amount Range */}
          <motion.div
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="size-4 text-[#686867]" />
              <h2 
                className="text-[#162a2c]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontWeight: 400
                }}
              >
                Amount Range
              </h2>
            </div>
            
            <Card className="bg-white border-[#686867]/20 p-4 space-y-4">
              <div className="relative">
                <label 
                  className="absolute top-2 left-3 text-[11px] text-[#686867]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Minimum Amount
                </label>
                <input
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder="$0.00"
                  className="w-full h-[50px] pt-5 pb-2 px-3 bg-white border border-[#686867]/20 rounded-md focus:outline-none focus:border-[#686867] transition-colors"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    color: '#162a2c'
                  }}
                />
              </div>

              <div className="relative">
                <label 
                  className="absolute top-2 left-3 text-[11px] text-[#686867]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Maximum Amount
                </label>
                <input
                  type="number"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder="$0.00"
                  className="w-full h-[50px] pt-5 pb-2 px-3 bg-white border border-[#686867]/20 rounded-md focus:outline-none focus:border-[#686867] transition-colors"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    color: '#162a2c'
                  }}
                />
              </div>
            </Card>
          </motion.div>

          {/* Categories */}
          <motion.div
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Filter className="size-4 text-[#686867]" />
              <h2 
                className="text-[#162a2c]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontWeight: 400
                }}
              >
                Categories
              </h2>
            </div>
            
            <Card className="bg-white border-[#686867]/20 p-4">
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-3 py-1.5 rounded-full text-[10px] transition-colors ${
                      selectedCategories.includes(category)
                        ? 'bg-[#686867] text-white'
                        : 'bg-[#E9F0F1] text-[#686867] hover:bg-[#686867]/20'
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
            </Card>
          </motion.div>
        </div>

        {/* Apply Button */}
        <div className="px-6 pb-6 flex-shrink-0">
          <button
            onClick={handleApply}
            className="w-full h-[50px] bg-[#686867] hover:bg-[#162a2c] text-white rounded-full transition-colors"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
