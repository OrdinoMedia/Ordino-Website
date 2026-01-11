import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  ChevronLeft, 
  FileText, 
  Image, 
  Download, 
  Trash2, 
  Edit,
  Search,
  Filter,
  BarChart3,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import { ReceiptDetail, ReceiptDetailView } from './ReceiptDetailView';
import { EditReceiptModal } from './EditReceiptModal';

interface StoredReceiptsViewProps {
  onClose: () => void;
}

export function StoredReceiptsView({ onClose }: StoredReceiptsViewProps) {
  const [receipts, setReceipts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptDetail | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    loadReceipts();
  }, []);

  const loadReceipts = async () => {
    setIsLoading(true);
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
        setReceipts(data.receipts || []);
      } else {
        console.warn('Failed to load receipts:', response.status);
        // Set empty array on error
        setReceipts([]);
      }
    } catch (error) {
      console.error('Error loading receipts:', error);
      // Silently fail - user will see empty state
      setReceipts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReceipt = async (receiptId: number) => {
    if (!confirm('Are you sure you want to delete this receipt?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/receipts/${receiptId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        toast.success('Receipt deleted successfully');
        loadReceipts();
      } else {
        toast.error('Failed to delete receipt');
      }
    } catch (error) {
      console.error('Error deleting receipt:', error);
      toast.error('Failed to delete receipt');
    }
  };

  const handleExportCSV = () => {
    if (receipts.length === 0) {
      toast.info('No receipts to export');
      return;
    }

    const csvContent = [
      ['Date', 'Merchant', 'Amount', 'Category', 'Payment Method', 'Location'],
      ...receipts.map(r => [
        r.date,
        r.merchant,
        r.amount.toFixed(2),
        r.category,
        r.paymentMethod || '',
        r.location || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipts_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success('Receipts exported to CSV');
  };

  const handleDownloadReceipt = async (receipt: any) => {
    try {
      if (!receipt.fileUrl) {
        toast.error('No file available for download');
        return;
      }

      const response = await fetch(receipt.fileUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = receipt.originalName || `receipt_${receipt.id}.jpg`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success('Receipt downloaded');
    } catch (error) {
      console.error('Error downloading receipt:', error);
      toast.error('Failed to download receipt');
    }
  };

  const filteredReceipts = receipts.filter(receipt => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      receipt.merchant?.toLowerCase().includes(query) ||
      receipt.category?.toLowerCase().includes(query) ||
      receipt.amount?.toString().includes(query) ||
      receipt.date?.includes(query)
    );
  });

  // Calculate analytics
  const totalAmount = filteredReceipts.reduce((sum, r) => sum + (r.amount || 0), 0);
  const avgAmount = filteredReceipts.length > 0 ? totalAmount / filteredReceipts.length : 0;
  const categoryBreakdown = filteredReceipts.reduce((acc: any, r) => {
    const cat = r.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + (r.amount || 0);
    return acc;
  }, {});

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
        className="p-6 pb-4 pt-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="text-[#686867] hover:text-[#162a2c] transition-colors"
          >
            <ChevronLeft className="size-6" />
          </button>
          
          <h1 
            className="text-[14px]"
            style={{ 
              fontFamily: "'Gill Sans Medium', 'Gill Sans', sans-serif",
              color: '#162a2c',
              letterSpacing: '0.02em'
            }}
          >
            Stored Receipts
          </h1>
          
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="text-[#686867] hover:text-[#162a2c] transition-colors"
          >
            <BarChart3 className="size-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#686867]" />
          <input
            type="text"
            placeholder="Search receipts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[40px] pl-10 pr-4 bg-white border border-[#686867]/20 rounded-md text-[12px] text-[#162a2c] placeholder:text-[#686867]/60 focus:outline-none focus:border-[#686867] transition-colors"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleExportCSV}
            className="flex-1 h-[40px] bg-[#5e6c5b] text-white hover:bg-[#5e6c5b]/90"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            <Download className="size-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </motion.div>

      {/* Analytics Section */}
      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            className="px-6 mb-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white border-[#686867]/20 p-4">
              <h3 
                className="text-[#162a2c] mb-3"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontWeight: 500
                }}
              >
                Receipt Analytics
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span 
                    className="text-[#686867] text-[12px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Total Receipts
                  </span>
                  <span 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em',
                      fontWeight: 500
                    }}
                  >
                    {filteredReceipts.length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span 
                    className="text-[#686867] text-[12px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Total Amount
                  </span>
                  <span 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em',
                      fontWeight: 500
                    }}
                  >
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span 
                    className="text-[#686867] text-[12px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Average Amount
                  </span>
                  <span 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em',
                      fontWeight: 500
                    }}
                  >
                    ${avgAmount.toFixed(2)}
                  </span>
                </div>

                {Object.keys(categoryBreakdown).length > 0 && (
                  <>
                    <div className="border-t border-[#686867]/20 my-2" />
                    <div className="space-y-2">
                      {Object.entries(categoryBreakdown).map(([category, amount]: [string, any]) => (
                        <div key={category} className="flex items-center justify-between">
                          <span 
                            className="text-[#686867] text-[11px]"
                            style={{ 
                              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                              letterSpacing: '0.02em'
                            }}
                          >
                            {category}
                          </span>
                          <span 
                            className="text-[#162a2c] text-[12px]"
                            style={{ 
                              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                              letterSpacing: '0.02em'
                            }}
                          >
                            ${amount.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <p 
              className="text-[#686867]"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Loading receipts...
            </p>
          </div>
        ) : filteredReceipts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FileText className="size-12 text-[#686867]/40 mb-4" />
            <p 
              className="text-[#686867] text-center"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              {searchQuery ? 'No receipts match your search' : 'No receipts uploaded yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredReceipts.map((receipt, index) => (
              <motion.div
                key={receipt.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Card className="bg-white border-[#686867]/20 p-4">
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-[#E9F0F1] flex items-center justify-center flex-shrink-0">
                      {receipt.fileType?.includes('pdf') ? (
                        <FileText className="size-5 text-[#686867]" />
                      ) : (
                        <Image className="size-5 text-[#686867]" />
                      )}
                    </div>

                    {/* Content */}
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => setSelectedReceipt(receipt)}
                    >
                      <p 
                        className="text-[#162a2c] text-[14px] mb-1"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em',
                          fontWeight: 500
                        }}
                      >
                        {receipt.merchant}
                      </p>
                      <div className="flex items-center gap-2 mb-1">
                        <span 
                          className="text-[#686867] text-[12px]"
                          style={{ 
                            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            letterSpacing: '0.02em'
                          }}
                        >
                          {receipt.category}
                        </span>
                        <span className="text-[#686867]/40">•</span>
                        <span 
                          className="text-[#686867] text-[12px]"
                          style={{ 
                            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            letterSpacing: '0.02em'
                          }}
                        >
                          {new Date(receipt.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <p 
                        className="text-[#162a2c] text-[16px]"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em',
                          fontWeight: 600
                        }}
                      >
                        ${receipt.amount.toFixed(2)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownloadReceipt(receipt)}
                        className="p-2 rounded-md hover:bg-[#E9F0F1] transition-colors"
                      >
                        <Download className="size-4 text-[#686867]" />
                      </button>
                      <button
                        onClick={() => handleDeleteReceipt(receipt.id)}
                        className="p-2 rounded-md hover:bg-[#E9F0F1] transition-colors"
                      >
                        <Trash2 className="size-4 text-[#ffa47d]" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReceipt(receipt);
                          setIsEditModalOpen(true);
                        }}
                        className="p-2 rounded-md hover:bg-[#E9F0F1] transition-colors"
                      >
                        <Edit className="size-4 text-[#686867]" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Receipt Detail View */}
      <AnimatePresence>
        {selectedReceipt && (
          <ReceiptDetailView 
            receipt={selectedReceipt}
            onClose={() => setSelectedReceipt(null)}
            onReceiptUpdated={loadReceipts}
          />
        )}
      </AnimatePresence>

      {/* Edit Receipt Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedReceipt && (
          <EditReceiptModal
            receipt={selectedReceipt}
            onClose={() => setIsEditModalOpen(false)}
            onSave={() => {
              setIsEditModalOpen(false);
              loadReceipts();
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
