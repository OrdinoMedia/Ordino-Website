import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { X, MapPin, Calendar, Tag, Receipt as ReceiptIcon, Download, Share2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export interface ReceiptDetail {
  id: number;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  categoryGroup: string;
  items?: Array<{ name: string; price: number; quantity: number }>;
  paymentMethod?: string;
  location?: string;
  notes?: string;
}

interface ReceiptDetailViewProps {
  receipt: ReceiptDetail;
  onClose: () => void;
  onUpdateNotes?: (receiptId: number, notes: string) => void;
}

export function ReceiptDetailView({ receipt, onClose, onUpdateNotes }: ReceiptDetailViewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const [notes, setNotes] = useState(receipt.notes || '');
  const [isNotesEdited, setIsNotesEdited] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate a download process
    setTimeout(() => {
      setIsDownloading(false);
      toast.success('Receipt downloaded successfully!');
    }, 2000);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    setIsNotesEdited(true);
  };

  const handleSaveNotes = () => {
    if (onUpdateNotes && isNotesEdited) {
      onUpdateNotes(receipt.id, notes);
      setIsNotesEdited(false);
      toast.success('Notes updated successfully!');
    }
  };

  return (
    <motion.div
      className="absolute inset-0 bg-[#E9F0F1] z-60 flex flex-col"
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
          <div className="w-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-[#E9F0F1]"
            >
              <X className="size-5 text-[#686867]" />
            </Button>
          </div>
          
          <h1 
            className="text-[14px] absolute left-1/2 transform -translate-x-1/2"
            style={{ 
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              color: '#162a2c',
              letterSpacing: '0.02em'
            }}
          >
            Receipt Details
          </h1>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full hover:bg-[#E9F0F1]"
            >
              <Share2 className="size-4 text-[#686867]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full hover:bg-[#E9F0F1]"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <div className="animate-spin size-4 text-[#686867]">
                  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.928l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                <Download className="size-4 text-[#686867]" />
              )}
            </Button>
          </div>
        </div>

        {/* Merchant Name */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#686867]/10 flex items-center justify-center mx-auto mb-3">
            <ReceiptIcon className="size-8 text-[#686867]" />
          </div>
          <h2 
            className="text-[#162a2c] text-[20px] mb-1"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            {receipt.merchant}
          </h2>
          <p 
            className="text-[#686867] text-[32px]"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 500
            }}
          >
            ${receipt.amount.toFixed(2)}
          </p>
        </div>
      </motion.div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Transaction Info */}
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
            Transaction Info
          </h3>

          <Card className="bg-white border-[#686867]/20 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="size-4 text-[#686867]" />
                <span 
                  className="text-[#686867] text-[14px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Date
                </span>
              </div>
              <span 
                className="text-[#162a2c] text-[14px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                {formatDate(receipt.date)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Tag className="size-4 text-[#686867]" />
                <span 
                  className="text-[#686867] text-[14px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Category
                </span>
              </div>
              <div className="text-right">
                <p 
                  className="text-[#162a2c] text-[14px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {receipt.category}
                </p>
                <p 
                  className="text-[#686867] text-[11px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {receipt.categoryGroup}
                </p>
              </div>
            </div>

            {receipt.paymentMethod && (
              <div className="flex items-center justify-between">
                <span 
                  className="text-[#686867] text-[14px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Payment Method
                </span>
                <span 
                  className="text-[#162a2c] text-[14px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {receipt.paymentMethod}
                </span>
              </div>
            )}

            {receipt.location && (
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="size-4 text-[#686867]" />
                  <span 
                    className="text-[#686867] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Location
                  </span>
                </div>
                <span 
                  className="text-[#162a2c] text-[14px] text-right max-w-[60%]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {receipt.location}
                </span>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Items */}
        {receipt.items && receipt.items.length > 0 && (
          <motion.div
            className="mb-6"
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
              Items
            </h3>

            <Card className="bg-white border-[#686867]/20 divide-y divide-[#686867]/20">
              {receipt.items.map((item, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <p 
                      className="text-[#162a2c] text-[14px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      {item.name}
                    </p>
                    <p 
                      className="text-[#686867] text-[12px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </Card>
          </motion.div>
        )}

        {/* Notes */}
        <motion.div
          className="mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 
            className="text-[#162a2c] mb-3"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 400
            }}
          >
            Notes
          </h3>

          <Card className="bg-white border-[#686867]/20 p-4">
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Add notes about this receipt..."
              className="w-full min-h-[100px] bg-[#E9F0F1] border border-[#686867]/30 rounded-md p-3 text-[14px] text-[#162a2c] focus:outline-none focus:ring-2 focus:ring-[#686867]/50 resize-none"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            />
            {isNotesEdited && (
              <Button
                onClick={handleSaveNotes}
                className="w-full mt-3 bg-[#5e6c5b] text-white hover:bg-[#5e6c5b]/80 transition-colors"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontWeight: 400
                }}
              >
                Save Notes
              </Button>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}