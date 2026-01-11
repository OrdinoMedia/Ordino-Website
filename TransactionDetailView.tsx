import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { X, MapPin, Calendar, Tag, CreditCard, Building2, Hash, CheckCircle2, Share2, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ChangeCategoryModal } from './ChangeCategoryModal';
import { ChangeLocationModal } from './ChangeLocationModal';
import { toast } from 'sonner@2.0.3';

export interface TransactionDetail {
  id: number;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  categoryGroup: string;
  paymentMethod?: string;
  accountName?: string;
  accountLastFour?: string;
  transactionId?: string;
  status?: string;
  location?: string;
  notes?: string;
}

interface TransactionDetailViewProps {
  transaction: TransactionDetail;
  onClose: () => void;
  onUpdateCategory?: (transactionId: number, category: string, categoryGroup?: string) => void;
  onUpdateLocation?: (transactionId: number, location: string) => void;
  onUpdateNotes?: (transactionId: number, notes: string) => void;
  onDelete?: (transactionId: number) => void;
}

export function TransactionDetailView({ transaction, onClose, onUpdateCategory, onUpdateLocation, onUpdateNotes, onDelete }: TransactionDetailViewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit',
      day: '2-digit', 
      year: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [notes, setNotes] = useState(transaction.notes || '');
  const [isNotesEdited, setIsNotesEdited] = useState(false);

  const handleCategoryChange = (category: string, categoryGroup?: string) => {
    if (onUpdateCategory) {
      onUpdateCategory(transaction.id, category, categoryGroup);
    }
  };

  const handleLocationChange = (location: string) => {
    if (onUpdateLocation) {
      onUpdateLocation(transaction.id, location);
    }
  };

  const handleSaveNotes = () => {
    if (onUpdateNotes) {
      onUpdateNotes(transaction.id, notes);
      setIsNotesEdited(false);
      toast.success('Notes saved successfully!');
    }
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    setIsNotesEdited(true);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(transaction.id);
      onClose();
      toast.success('Transaction deleted successfully!');
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
            Transaction Details
          </h1>
          
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full hover:bg-[#E9F0F1]"
          >
            <Share2 className="size-4 text-[#686867]" />
          </Button>
        </div>

        {/* Merchant Name */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#686867]/10 flex items-center justify-center mx-auto mb-3">
            <CreditCard className="size-8 text-[#686867]" />
          </div>
          <h2 
            className="text-[#162a2c] text-[20px] mb-1"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            {transaction.merchant}
          </h2>
          <p 
            className="text-[#686867] text-[32px]"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 500
            }}
          >
            ${transaction.amount.toFixed(2)}
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
                  Date & Time
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
                  {formatDate(transaction.date)}
                </p>
                <p 
                  className="text-[#686867] text-[11px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {formatTime(transaction.date)}
                </p>
              </div>
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
                  {transaction.category}
                </p>
                <p 
                  className="text-[#686867] text-[11px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {transaction.categoryGroup}
                </p>
              </div>
            </div>

            {transaction.status && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-4 text-[#686867]" />
                  <span 
                    className="text-[#686867] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Status
                  </span>
                </div>
                <span 
                  className="text-[14px] px-2 py-1 rounded"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    backgroundColor: transaction.status === 'Completed' ? '#5e6c5b20' : '#ffa47d20',
                    color: transaction.status === 'Completed' ? '#5e6c5b' : '#ffa47d'
                  }}
                >
                  {transaction.status}
                </span>
              </div>
            )}

            {transaction.location && (
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
                  {transaction.location}
                </span>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Payment Details */}
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
            Payment Details
          </h3>

          <Card className="bg-white border-[#686867]/20 p-4 space-y-3">
            {transaction.accountName && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="size-4 text-[#686867]" />
                  <span 
                    className="text-[#686867] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Account
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
                    {transaction.accountName}
                  </p>
                  {transaction.accountLastFour && (
                    <p 
                      className="text-[#686867] text-[11px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      •••• {transaction.accountLastFour}
                    </p>
                  )}
                </div>
              </div>
            )}

            {transaction.paymentMethod && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="size-4 text-[#686867]" />
                  <span 
                    className="text-[#686867] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Payment Method
                  </span>
                </div>
                <span 
                  className="text-[#162a2c] text-[14px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {transaction.paymentMethod}
                </span>
              </div>
            )}

            {transaction.transactionId && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Hash className="size-4 text-[#686867]" />
                  <span 
                    className="text-[#686867] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Transaction ID
                  </span>
                </div>
                <span 
                  className="text-[#686867] text-[11px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {transaction.transactionId}
                </span>
              </div>
            )}
          </Card>
        </motion.div>

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
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Add notes about this transaction..."
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

        {/* Change Category Button */}
        <motion.div
          className="mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-[#686867] text-white hover:bg-[#162a2c] transition-colors flex items-center justify-center gap-2"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 400
            }}
          >
            <Edit className="size-4" />
            Change Category
          </Button>
        </motion.div>

        {/* Change Location Button */}
        <motion.div
          className="mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            onClick={() => setIsLocationModalOpen(true)}
            className="w-full bg-[#686867] text-white hover:bg-[#162a2c] transition-colors flex items-center justify-center gap-2"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 400
            }}
          >
            <Edit className="size-4" />
            Change Location
          </Button>
        </motion.div>

        {/* Delete Transaction Button */}
        <motion.div
          className="mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            onClick={handleDelete}
            className="w-full bg-[#ff4d4f] text-white hover:bg-[#ff4d4f]/80 transition-colors flex items-center justify-center gap-2"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 400
            }}
          >
            <Trash2 className="size-4" />
            Delete Transaction
          </Button>
        </motion.div>
      </div>

      {/* Change Category Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <ChangeCategoryModal
            currentCategory={transaction.category}
            currentCategoryGroup={transaction.categoryGroup}
            onClose={() => setIsModalOpen(false)}
            onChangeCategory={handleCategoryChange}
          />
        )}
      </AnimatePresence>

      {/* Change Location Modal */}
      <AnimatePresence>
        {isLocationModalOpen && (
          <ChangeLocationModal
            currentLocation={transaction.location}
            onClose={() => setIsLocationModalOpen(false)}
            onChangeLocation={handleLocationChange}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}