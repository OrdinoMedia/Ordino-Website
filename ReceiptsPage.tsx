import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Camera, Upload, Mail, Receipt, Edit, Eye, Trash2, X, Calendar, Search, Award, Fuel, Coffee, ShoppingCart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { ReceiptDetailView, ReceiptDetail } from './ReceiptDetailView';
import { EditReceiptModal } from './EditReceiptModal';
import { OCRStatusBanner } from './OCRStatusBanner';
import { getBadgeInfo } from './BadgeSystem';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { ChangeCategoryModal } from './ChangeCategoryModal';
import { CreateTransactionFromReceiptModal } from './CreateTransactionFromReceiptModal';
import { AddTransactionModal } from './AddTransactionModal';

// Mock receipt data with full details
export const mockReceipts: ReceiptDetail[] = [
  { 
    id: 1, 
    merchant: 'Whole Foods Market', 
    amount: 87.45, 
    date: '2025-10-28', 
    category: 'Groceries & Essentials',
    categoryGroup: 'Fixed Expenses',
    paymentMethod: 'Credit Card',
    location: '123 Main St, Toronto, ON',
    items: [
      { name: 'Organic Bananas', price: 4.99, quantity: 1 },
      { name: 'Almond Milk', price: 5.49, quantity: 2 },
      { name: 'Whole Grain Bread', price: 6.99, quantity: 1 },
      { name: 'Mixed Vegetables', price: 8.99, quantity: 3 },
      { name: 'Chicken Breast', price: 15.99, quantity: 2 }
    ],
    notes: 'Weekly grocery shopping'
  },
  { 
    id: 2, 
    merchant: 'Shell Gas Station', 
    amount: 52.30, 
    date: '2025-10-27', 
    category: 'Transportation',
    categoryGroup: 'Fixed Expenses',
    paymentMethod: 'Debit Card',
    location: '456 Highway 401, Mississauga, ON',
    notes: 'Regular fill-up'
  },
  { 
    id: 3, 
    merchant: 'Starbucks', 
    amount: 6.75, 
    date: '2025-10-27', 
    category: 'Dining/Drinking Out',
    categoryGroup: 'Variable Expenses',
    paymentMethod: 'Credit Card',
    location: '789 Queen St W, Toronto, ON',
    items: [
      { name: 'Grande Latte', price: 5.45, quantity: 1 },
      { name: 'Blueberry Muffin', price: 1.30, quantity: 1 }
    ]
  },
  { 
    id: 4, 
    merchant: 'Loblaws', 
    amount: 124.89, 
    date: '2025-10-26', 
    category: 'Groceries & Essentials',
    categoryGroup: 'Fixed Expenses',
    paymentMethod: 'Credit Card',
    location: '321 Yonge St, Toronto, ON',
    items: [
      { name: 'Fresh Produce', price: 25.99, quantity: 1 },
      { name: 'Dairy Products', price: 18.50, quantity: 1 },
      { name: 'Meat & Seafood', price: 45.20, quantity: 1 },
      { name: 'Bakery Items', price: 12.99, quantity: 1 },
      { name: 'Household Items', price: 22.21, quantity: 1 }
    ],
    notes: 'Big shopping trip for the week'
  },
  { 
    id: 5, 
    merchant: 'Tim Hortons', 
    amount: 4.50, 
    date: '2025-10-25', 
    category: 'Dining/Drinking Out',
    categoryGroup: 'Variable Expenses',
    paymentMethod: 'Cash',
    location: '555 King St, Toronto, ON',
    items: [
      { name: 'Medium Coffee', price: 2.50, quantity: 1 },
      { name: 'Donut', price: 2.00, quantity: 1 }
    ]
  },
  { 
    id: 6, 
    merchant: 'Petro-Canada', 
    amount: 68.20, 
    date: '2025-10-24', 
    category: 'Transportation',
    categoryGroup: 'Fixed Expenses',
    paymentMethod: 'Credit Card',
    location: '888 Lakeshore Blvd, Toronto, ON'
  }
];

interface ReceiptsPageProps {
  selectedReceiptId?: number | string;
  onReceiptSelect?: (id: number | string | null) => void;
}

// Helper to get icon for category
const getCategoryIcon = (category: string) => {
  if (category.includes('Groceries')) return <Edit className="size-4" />;
  if (category.includes('Transportation')) return <Fuel className="size-4" />;
  if (category.includes('Dining') || category.includes('Coffee')) return <Coffee className="size-4" />;
  return <Receipt className="size-4" />;
};

export function ReceiptsPage({ selectedReceiptId, onReceiptSelect }: ReceiptsPageProps = {}) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'week' | 'month'>('month');
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedReceipts, setUploadedReceipts] = useState<ReceiptDetail[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [categoryEditReceipt, setCategoryEditReceipt] = useState<ReceiptDetail | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showCreateTransactionModal, setShowCreateTransactionModal] = useState(false);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [newlyUploadedReceipt, setNewlyUploadedReceipt] = useState<ReceiptDetail | null>(null);

  // Load uploaded receipts on mount
  useEffect(() => {
    loadReceipts();
  }, []);

  const loadReceipts = async () => {
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
        setUploadedReceipts(data.receipts || []);
      } else {
        console.warn('Failed to load receipts:', response.status);
        // Don't show error to user, just use empty array
        setUploadedReceipts([]);
      }
    } catch (error) {
      console.error('Error loading receipts:', error);
      // Silently fail - receipts will show mock data only
      setUploadedReceipts([]);
    }
  };

  const handleFileSelected = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/receipts/upload`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: formData
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || 'Receipt uploaded successfully!');
        await loadReceipts();
        
        // Show the prompt to create a transaction
        if (data.receipt) {
          setNewlyUploadedReceipt(data.receipt);
          setShowCreateTransactionModal(true);
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to upload receipt');
      }
    } catch (error) {
      console.error('Error uploading receipt:', error);
      toast.error('Failed to upload receipt. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateTransaction = () => {
    // Close the prompt modal and open the add transaction modal
    setShowCreateTransactionModal(false);
    setShowAddTransactionModal(true);
  };

  const handleSkipTransaction = () => {
    // Just close the modal
    setShowCreateTransactionModal(false);
    setNewlyUploadedReceipt(null);
  };

  const handleSaveTransaction = async (transaction: any) => {
    // For now, we'll just show a success message
    // In the future, this would save to a transactions endpoint
    toast.success('Transaction created successfully!');
    setShowAddTransactionModal(false);
    setNewlyUploadedReceipt(null);
    console.log('Transaction saved:', transaction);
  };

  const handlePhotoCapture = () => {
    // Trigger the camera input
    cameraInputRef.current?.click();
  };

  const handleFileUpload = () => {
    // Trigger the file input
    fileInputRef.current?.click();
  };

  const handleEmailForward = () => {
    toast.info('Email forwarding setup! Forward receipts to receipts@ordino.app to automatically add them.');
  };

  // Handle initial receipt selection from props
  useEffect(() => {
    if (selectedReceiptId) {
      // Check both uploaded and mock receipts
      const allReceipts = [...uploadedReceipts, ...mockReceipts];
      const receipt = allReceipts.find(r => r.id === selectedReceiptId);
      if (receipt) {
        setSelectedReceipt(receipt);
      }
    }
  }, [selectedReceiptId, uploadedReceipts]);

  const handleReceiptClick = (receipt: ReceiptDetail) => {
    setSelectedReceipt(receipt);
    onReceiptSelect?.(receipt.id);
  };

  const handleCloseDetail = () => {
    setSelectedReceipt(null);
    onReceiptSelect?.(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    }
  };

  const handleCategoryClick = (e: React.MouseEvent, receipt: ReceiptDetail) => {
    e.stopPropagation(); // Prevent opening receipt detail
    setCategoryEditReceipt(receipt);
    setShowCategoryModal(true);
  };

  const handleCategoryChange = async (category: string, categoryGroup?: string) => {
    if (!categoryEditReceipt) return;

    try {
      // Check if it's an uploaded receipt (has string ID or is in uploadedReceipts)
      const isUploadedReceipt = uploadedReceipts.some(r => r.id === categoryEditReceipt.id);
      
      if (isUploadedReceipt) {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/receipts/${categoryEditReceipt.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`
            },
            body: JSON.stringify({
              category,
              categoryGroup
            })
          }
        );

        if (response.ok) {
          toast.success('Category updated successfully!');
          loadReceipts();
        } else {
          toast.error('Failed to update category');
        }
      } else {
        // Mock receipt - just update locally
        toast.success('Category updated successfully!');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    } finally {
      setShowCategoryModal(false);
      setCategoryEditReceipt(null);
    }
  };

  // Filter receipts by search query
  // Uploaded receipts should appear first (already sorted by server), then mock receipts
  const allReceipts = [...uploadedReceipts, ...mockReceipts];
  const filteredReceipts = allReceipts.filter(receipt => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    const merchantMatch = receipt.merchant.toLowerCase().includes(query);
    const dateMatch = receipt.date.includes(query) || formatDate(receipt.date).toLowerCase().includes(query);
    const amountMatch = receipt.amount.toString().includes(query);
    
    return merchantMatch || dateMatch || amountMatch;
  });

  // Group receipts by date
  const groupedReceipts: { [key: string]: typeof mockReceipts } = {};
  filteredReceipts.forEach(receipt => {
    if (!groupedReceipts[receipt.date]) {
      groupedReceipts[receipt.date] = [];
    }
    groupedReceipts[receipt.date].push(receipt);
  });

  const sortedDates = Object.keys(groupedReceipts).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="size-full overflow-y-auto px-6 pb-6">
      {/* Upload Options */}
      <motion.div
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h2 
          className="text-[#162a2c] mb-3"
          style={{ 
            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
            letterSpacing: '0.02em',
            fontWeight: 400
          }}
        >
          Add Receipt
        </h2>

        <div className="flex gap-3">
          <motion.div
            className="flex-1"
            whileTap={{ scale: 0.95 }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Button 
              className="w-full h-auto bg-white border border-[#686867]/20 hover:bg-[#E9F0F1] hover:border-[#686867] transition-colors py-4 flex flex-col items-center gap-2"
              variant="outline"
              onClick={handlePhotoCapture}
            >
              <Camera className="size-6 text-[#686867]" />
              <span 
                className="text-[#686867] text-[10px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                Photo
              </span>
            </Button>
          </motion.div>

          <motion.div
            className="flex-1"
            whileTap={{ scale: 0.95 }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            <Button 
              className="w-full h-auto bg-white border border-[#686867]/20 hover:bg-[#E9F0F1] hover:border-[#686867] transition-colors py-4 flex flex-col items-center gap-2"
              variant="outline"
              onClick={handleFileUpload}
            >
              <Upload className="size-6 text-[#686867]" />
              <span 
                className="text-[#686867] text-[10px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                Upload
              </span>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Badge Progress Bar */}
      <motion.div
        className="mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        {(() => {
          const receiptsCount = filteredReceipts.length;
          const badgeInfo = getBadgeInfo(receiptsCount);
          const nextBadgeThreshold = badgeInfo.level === 'Money Maestro' ? receiptsCount : 
            badgeInfo.level === 'Finance Pro' ? 401 :
            badgeInfo.level === 'Budget Builder' ? 151 :
            badgeInfo.level === 'Smart Saver' ? 51 :
            badgeInfo.level === 'Budget Beginner' ? 11 : 11;
          const progress = badgeInfo.level === 'Money Maestro' ? 100 : 
            (receiptsCount / nextBadgeThreshold) * 100;
          
          return (
            <Card className="bg-white border-[#686867]/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Award className="size-4 text-[#5e6c5b]" />
                  <span 
                    className="text-[#162a2c] text-[12px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    {badgeInfo.level}
                  </span>
                </div>
                <span 
                  className="text-[#686867] text-[11px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {receiptsCount} {badgeInfo.level === 'Money Maestro' ? 'receipts' : `/ ${nextBadgeThreshold}`}
                </span>
              </div>
              <div className="w-full h-2 bg-[#E9F0F1] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#5e6c5b]"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </div>
              {badgeInfo.level !== 'Money Maestro' && (
                <p 
                  className="text-[#686867] text-[10px] mt-2"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {nextBadgeThreshold - receiptsCount} more receipts to unlock next badge!
                </p>
              )}
            </Card>
          );
        })()}
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 rounded-md text-[9px] transition-colors ${
            selectedFilter === 'all'
              ? 'bg-[#686867] text-[#E9F0F1]'
              : 'bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1]'
          }`}
          style={{ 
            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
            letterSpacing: '0.02em'
          }}
        >
          All Time
        </button>
        <button
          onClick={() => setSelectedFilter('week')}
          className={`px-4 py-2 rounded-md text-[9px] transition-colors ${
            selectedFilter === 'week'
              ? 'bg-[#686867] text-[#E9F0F1]'
              : 'bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1]'
          }`}
          style={{ 
            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
            letterSpacing: '0.02em'
          }}
        >
          This Week
        </button>
        <button
          onClick={() => setSelectedFilter('month')}
          className={`px-4 py-2 rounded-md text-[9px] transition-colors ${
            selectedFilter === 'month'
              ? 'bg-[#686867] text-[#E9F0F1]'
              : 'bg-white text-[#686867] border border-[#686867]/20 hover:bg-[#E9F0F1]'
          }`}
          style={{ 
            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
            letterSpacing: '0.02em'
          }}
        >
          This Month
        </button>
      </div>

      {/* Search Bar */}
      <motion.div
        className="mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#686867]" />
          <input
            type="text"
            placeholder="Search by merchant, date, or amount..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[40px] pl-10 pr-4 bg-white border border-[#686867]/20 rounded-md text-[12px] text-[#162a2c] placeholder:text-[#686867]/60 focus:outline-none focus:border-[#686867] transition-colors"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          />
        </div>
      </motion.div>

      {/* Receipts List */}
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
          Recent Receipts
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
                {groupedReceipts[date].map((receipt, receiptIndex) => (
                  <motion.div
                    key={receipt.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + dateIndex * 0.1 + receiptIndex * 0.05, duration: 0.3 }}
                  >
                    <Card 
                      className="bg-white border-[#686867]/20 p-4 cursor-pointer hover:bg-[#E9F0F1] transition-colors"
                      onClick={() => handleReceiptClick(receipt)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-full bg-[#E9F0F1] flex items-center justify-center text-[#686867]">
                            {getCategoryIcon(receipt.category)}
                          </div>
                          <div className="flex-1">
                            <p 
                              className="text-[#162a2c] text-[14px]"
                              style={{ 
                                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                                letterSpacing: '0.02em'
                              }}
                            >
                              {receipt.merchant}
                            </p>
                            <motion.p 
                              onClick={(e) => handleCategoryClick(e, receipt)}
                              className="text-[#686867] text-[12px] hover:text-[#5e6c5b] transition-colors cursor-pointer"
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
                              {receipt.category}
                            </motion.p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p 
                            className="text-[#162a2c] text-[14px]"
                            style={{ 
                              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                              letterSpacing: '0.02em'
                            }}
                          >
                            ${receipt.amount.toFixed(2)}
                          </p>
                          <p 
                            className="text-[#686867] text-[10px]"
                            style={{ 
                              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                              letterSpacing: '0.02em'
                            }}
                          >
                            {receipt.categoryGroup}
                          </p>
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

      {/* Receipt Detail View */}
      <AnimatePresence>
        {selectedReceipt && (
          <ReceiptDetailView 
            receipt={selectedReceipt}
            onClose={handleCloseDetail}
            onReceiptUpdated={loadReceipts}
          />
        )}
      </AnimatePresence>

      {/* Hidden file input for camera */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        onChange={(e) => handleFileSelected(e.target.files?.[0] || null as any)}
        className="hidden"
      />

      {/* Hidden file input for file upload */}
      <input
        type="file"
        accept="image/*,application/pdf"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelected(file);
          // Reset input so same file can be uploaded again
          e.target.value = '';
        }}
        className="hidden"
      />

      {/* Category Change Modal */}
      {showCategoryModal && categoryEditReceipt && (
        <AnimatePresence>
          <ChangeCategoryModal
            currentCategory={categoryEditReceipt.category}
            currentCategoryGroup={categoryEditReceipt.categoryGroup}
            onClose={() => {
              setShowCategoryModal(false);
              setCategoryEditReceipt(null);
            }}
            onChangeCategory={handleCategoryChange}
          />
        </AnimatePresence>
      )}

      {/* Create Transaction from Receipt Modal */}
      {showCreateTransactionModal && newlyUploadedReceipt && (
        <AnimatePresence>
          <CreateTransactionFromReceiptModal
            receipt={newlyUploadedReceipt}
            onClose={() => {
              setShowCreateTransactionModal(false);
              setNewlyUploadedReceipt(null);
            }}
            onCreateTransaction={handleCreateTransaction}
            onSkip={handleSkipTransaction}
          />
        </AnimatePresence>
      )}

      {/* Add Transaction Modal */}
      {showAddTransactionModal && newlyUploadedReceipt && (
        <AnimatePresence>
          <AddTransactionModal
            onClose={() => {
              setShowAddTransactionModal(false);
              setNewlyUploadedReceipt(null);
            }}
            onSave={handleSaveTransaction}
            prefillData={newlyUploadedReceipt}
            linkedReceiptId={newlyUploadedReceipt.id}
          />
        </AnimatePresence>
      )}
    </div>
  );
}
