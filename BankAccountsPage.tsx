import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  ChevronLeft,
  Building2,
  Plus,
  Check,
  Shield,
  X,
  AlertCircle,
  Trash2
} from 'lucide-react';
import { useState } from 'react';

interface BankAccountsPageProps {
  onClose: () => void;
  userId: string;
}

interface BankAccount {
  id: string;
  institutionName: string;
  accountType: string;
  lastFour: string;
  provider: 'plaid' | 'flinks';
  connectedDate: string;
  status: 'active' | 'error' | 'reconnect';
}

export function BankAccountsPage({ onClose, userId }: BankAccountsPageProps) {
  const [showProviderSelect, setShowProviderSelect] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'plaid' | 'flinks' | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showConnectionFlow, setShowConnectionFlow] = useState(false);

  // Mock connected accounts - in production, this would be fetched from backend
  const [connectedAccounts, setConnectedAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      institutionName: 'Chase Bank',
      accountType: 'Checking',
      lastFour: '4829',
      provider: 'plaid',
      connectedDate: 'Nov 15, 2024',
      status: 'active'
    },
    {
      id: '2',
      institutionName: 'Bank of America',
      accountType: 'Savings',
      lastFour: '7362',
      provider: 'flinks',
      connectedDate: 'Oct 3, 2024',
      status: 'active'
    }
  ]);

  const handleProviderSelect = (provider: 'plaid' | 'flinks') => {
    setSelectedProvider(provider);
    setShowProviderSelect(false);
    setShowConnectionFlow(true);
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      // Simulate successful connection
      setTimeout(() => {
        setShowConnectionFlow(false);
        setSelectedProvider(null);
      }, 1500);
    }, 2500);
  };

  const handleDisconnectAccount = (accountId: string) => {
    // In production, this would call backend to disconnect
    setConnectedAccounts(connectedAccounts.filter(acc => acc.id !== accountId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#5e6c5b';
      case 'error':
        return '#ffa47d';
      case 'reconnect':
        return '#ffa47d';
      default:
        return '#686867';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Connected';
      case 'error':
        return 'Error';
      case 'reconnect':
        return 'Reconnect Required';
      default:
        return 'Unknown';
    }
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
      <div className="p-6 pb-4 pt-12">
        <div className="flex items-center justify-between mb-4">
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
            Bank Accounts
          </h1>
          
          <div className="w-6" />
        </div>

        {/* Security Notice */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-start gap-2 bg-white border border-[#5e6c5b]/20 rounded-lg p-3 mb-4"
        >
          <Shield className="size-4 text-[#5e6c5b] flex-shrink-0 mt-0.5" />
          <div>
            <p 
              className="text-[11px] text-[#162a2c]"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Your banking credentials are encrypted and never stored on our servers. We use bank-level security to protect your data.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* Connected Accounts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 
              className="text-[#162a2c]"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 400
              }}
            >
              Connected Accounts
            </h3>
            <span 
              className="text-[#686867] text-[12px]"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              {connectedAccounts.length} {connectedAccounts.length === 1 ? 'account' : 'accounts'}
            </span>
          </div>

          {connectedAccounts.length === 0 ? (
            <Card className="bg-white border-[#686867]/20 p-8">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <span style={{ filter: 'grayscale(100%)', opacity: 0.3, fontSize: '48px' }}>
                    🏦
                  </span>
                </div>
                <h4 
                  className="text-[#162a2c] text-[14px] mb-2"
                  style={{ 
                    fontFamily: "'Gill Sans Medium', 'Gill Sans', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  No Accounts Connected
                </h4>
                <p 
                  className="text-[#686867] text-[13px] mb-4"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Connect your bank account to automatically track transactions
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {connectedAccounts.map((account, index) => (
                <motion.div
                  key={account.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="bg-white border-[#686867]/20 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          <span style={{ filter: 'grayscale(100%)', opacity: 0.6, fontSize: '24px' }}>
                            🏦
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 
                            className="text-[#162a2c] text-[14px] mb-1"
                            style={{ 
                              fontFamily: "'Gill Sans Medium', 'Gill Sans', sans-serif",
                              letterSpacing: '0.02em'
                            }}
                          >
                            {account.institutionName}
                          </h4>
                          <p 
                            className="text-[#686867] text-[12px] mb-1"
                            style={{ 
                              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                              letterSpacing: '0.02em'
                            }}
                          >
                            {account.accountType} ••••{account.lastFour}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: getStatusColor(account.status) }}
                            />
                            <span 
                              className="text-[10px]"
                              style={{ 
                                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                                letterSpacing: '0.02em',
                                color: getStatusColor(account.status)
                              }}
                            >
                              {getStatusText(account.status)}
                            </span>
                            <span className="text-[#686867] text-[10px]">•</span>
                            <span 
                              className="text-[#686867] text-[10px] uppercase"
                              style={{ 
                                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                                letterSpacing: '0.02em'
                              }}
                            >
                              via {account.provider}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDisconnectAccount(account.id)}
                        className="p-2 hover:bg-[#ffa47d]/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="size-4 text-[#ffa47d]" />
                      </button>
                    </div>
                    <div className="pt-3 border-t border-[#686867]/10">
                      <p 
                        className="text-[#686867] text-[10px]"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        Connected on {account.connectedDate}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Add Account Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={() => setShowProviderSelect(true)}
            className="w-full h-[50px] bg-[#5e6c5b] hover:bg-[#4a5548] text-white rounded-full transition-colors flex items-center justify-center gap-2"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            <Plus className="size-5" />
            Add Bank Account
          </Button>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <h3 
            className="text-[#162a2c] mb-3"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 400
            }}
          >
            Why Connect Your Bank?
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 flex items-center justify-center">
                <span style={{ filter: 'grayscale(100%)', opacity: 0.6, fontSize: '16px', lineHeight: '20px' }}>
                  ⚡
                </span>
              </div>
              <div className="flex-1">
                <h4 
                  className="text-[#162a2c] text-[13px] mb-1"
                  style={{ 
                    fontFamily: "'Gill Sans Medium', 'Gill Sans', sans-serif",
                    letterSpacing: '0.02em',
                    lineHeight: '20px'
                  }}
                >
                  Automatic Transaction Import
                </h4>
                <p 
                  className="text-[#686867] text-[12px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Transactions sync automatically - no more manual entry
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 flex items-center justify-center">
                <span style={{ filter: 'grayscale(100%)', opacity: 0.6, fontSize: '16px', lineHeight: '20px' }}>
                  📊
                </span>
              </div>
              <div className="flex-1">
                <h4 
                  className="text-[#162a2c] text-[13px] mb-1"
                  style={{ 
                    fontFamily: "'Gill Sans Medium', 'Gill Sans', sans-serif",
                    letterSpacing: '0.02em',
                    lineHeight: '20px'
                  }}
                >
                  Real-Time Insights
                </h4>
                <p 
                  className="text-[#686867] text-[12px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Get accurate spending insights based on actual transactions
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 flex items-center justify-center">
                <span style={{ filter: 'grayscale(100%)', opacity: 0.6, fontSize: '16px', lineHeight: '20px' }}>
                  🔒
                </span>
              </div>
              <div className="flex-1">
                <h4 
                  className="text-[#162a2c] text-[13px] mb-1"
                  style={{ 
                    fontFamily: "'Gill Sans Medium', 'Gill Sans', sans-serif",
                    letterSpacing: '0.02em',
                    lineHeight: '20px'
                  }}
                >
                  Bank-Level Security
                </h4>
                <p 
                  className="text-[#686867] text-[12px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  256-bit encryption and read-only access to your accounts
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Provider Selection Modal */}
      <AnimatePresence>
        {showProviderSelect && (
          <motion.div
            className="absolute inset-0 bg-[#E9F0F1] z-[60] flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="p-6 pb-4 pt-12">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setShowProviderSelect(false)}
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
                  Choose Provider
                </h1>
                
                <div className="w-6" />
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {/* Provider Options */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="space-y-4 mb-6"
              >
                {/* Plaid */}
                <motion.button
                  onClick={() => handleProviderSelect('plaid')}
                  className="w-full p-5 bg-white border-2 border-[#686867]/20 hover:border-[#5e6c5b] rounded-2xl transition-colors text-left"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#E9F0F1] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span style={{ filter: 'grayscale(100%)', opacity: 0.6, fontSize: '28px' }}>
                        🏦
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="text-[#162a2c] text-[15px] mb-1"
                        style={{ 
                          fontFamily: "'Gill Sans Medium', 'Gill Sans', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        Plaid
                      </h3>
                      <p 
                        className="text-[#686867] text-[13px]"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        Connect to 10,000+ US banks and credit unions
                      </p>
                    </div>
                    <ChevronLeft className="size-5 text-[#686867] rotate-180 flex-shrink-0" />
                  </div>
                </motion.button>

                {/* Flinks */}
                <motion.button
                  onClick={() => handleProviderSelect('flinks')}
                  className="w-full p-5 bg-white border-2 border-[#686867]/20 hover:border-[#5e6c5b] rounded-2xl transition-colors text-left"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#E9F0F1] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span style={{ filter: 'grayscale(100%)', opacity: 0.6, fontSize: '28px' }}>
                        🍁
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="text-[#162a2c] text-[15px] mb-1"
                        style={{ 
                          fontFamily: "'Gill Sans Medium', 'Gill Sans', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        Flinks
                      </h3>
                      <p 
                        className="text-[#686867] text-[13px]"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        Optimized for Canadian financial institutions
                      </p>
                    </div>
                    <ChevronLeft className="size-5 text-[#686867] rotate-180 flex-shrink-0" />
                  </div>
                </motion.button>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-2 bg-white border border-[#686867]/20 rounded-lg p-4"
              >
                <AlertCircle className="size-4 text-[#686867] flex-shrink-0 mt-0.5" />
                <p 
                  className="text-[#686867] text-[12px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Choose the provider that supports your financial institution. You can connect accounts from multiple providers.
                </p>
              </motion.div>

              {/* Security Info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <h3 
                  className="text-[#162a2c] mb-3"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    fontWeight: 400
                  }}
                >
                  What Happens Next?
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 flex items-center justify-center">
                      <span style={{ filter: 'grayscale(100%)', opacity: 0.6, fontSize: '16px', lineHeight: '20px' }}>
                        1️⃣
                      </span>
                    </div>
                    <div className="flex-1">
                      <p 
                        className="text-[#686867] text-[13px]"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em',
                          lineHeight: '20px'
                        }}
                      >
                        Select your bank from a secure list
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 flex items-center justify-center">
                      <span style={{ filter: 'grayscale(100%)', opacity: 0.6, fontSize: '16px', lineHeight: '20px' }}>
                        2️⃣
                      </span>
                    </div>
                    <div className="flex-1">
                      <p 
                        className="text-[#686867] text-[13px]"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em',
                          lineHeight: '20px'
                        }}
                      >
                        Log in with your online banking credentials
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 flex items-center justify-center">
                      <span style={{ filter: 'grayscale(100%)', opacity: 0.6, fontSize: '16px', lineHeight: '20px' }}>
                        3️⃣
                      </span>
                    </div>
                    <div className="flex-1">
                      <p 
                        className="text-[#686867] text-[13px]"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em',
                          lineHeight: '20px'
                        }}
                      >
                        Authorize read-only access to transactions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 flex items-center justify-center">
                      <span style={{ filter: 'grayscale(100%)', opacity: 0.6, fontSize: '16px', lineHeight: '20px' }}>
                        ✅
                      </span>
                    </div>
                    <div className="flex-1">
                      <p 
                        className="text-[#686867] text-[13px]"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em',
                          lineHeight: '20px'
                        }}
                      >
                        Start tracking your spending automatically!
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection Flow Page */}
      <AnimatePresence>
        {showConnectionFlow && (
          <motion.div
            className="absolute inset-0 bg-[#E9F0F1] z-[70] flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              {isConnecting ? (
                /* Connecting State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="mb-6"
                  >
                    <span style={{ filter: 'grayscale(100%)', opacity: 0.6, fontSize: '64px' }}>
                      🔄
                    </span>
                  </motion.div>
                  <h3 
                    className="text-[#162a2c] text-[18px] mb-3"
                    style={{ 
                      fontFamily: "'Gill Sans Medium', 'Gill Sans', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Connecting to {selectedProvider === 'plaid' ? 'Plaid' : 'Flinks'}
                  </h3>
                  <p 
                    className="text-[#686867] text-[14px] max-w-[280px] mx-auto"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Please wait while we securely connect your account
                  </p>
                  
                  {/* Progress Dots */}
                  <div className="flex justify-center gap-2 mt-8">
                    {[0, 1, 2].map((index) => (
                      <motion.div
                        key={index}
                        className="w-2 h-2 rounded-full bg-[#5e6c5b]"
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                    className="mb-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#5e6c5b]/10 flex items-center justify-center mx-auto">
                      <Check className="size-10 text-[#5e6c5b]" />
                    </div>
                  </motion.div>
                  <h3 
                    className="text-[#162a2c] text-[18px] mb-3"
                    style={{ 
                      fontFamily: "'Gill Sans Medium', 'Gill Sans', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Successfully Connected!
                  </h3>
                  <p 
                    className="text-[#686867] text-[14px] max-w-[280px] mx-auto"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Your bank account is now linked. Transactions will sync automatically.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
