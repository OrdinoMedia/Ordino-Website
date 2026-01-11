import { useState } from 'react';
import { motion } from 'motion/react';
import { Home, BarChart3, Receipt, DollarSign, User, ChevronRight, Bell, HelpCircle, ArrowLeftRight, BookOpen, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { HomeHub } from './HomeHub';
import { InsightsPage } from './InsightsPage';
import { ReceiptsPage } from './ReceiptsPage';
import { TransactionsPage } from './TransactionsPage';
import { ToolsPage } from './ToolsPage';
import { CategoryBudgetPage } from './CategoryBudgetPage';
import { CategoryDetailView, CategoryDetail } from './CategoryDetailView';
import { ReceiptDetailView, ReceiptDetail } from './ReceiptDetailView';
import { TransactionDetailView, TransactionDetail } from './TransactionDetailView';
import { BreakdownDetailPage } from './BreakdownDetailPage';
import { AllBudgetsPage } from './AllBudgetsPage';
import { PickPreviewBudgetsModal } from './PickPreviewBudgetsModal';
import { AddTransactionModal } from './AddTransactionModal';
import { UploadReceiptModal } from './UploadReceiptModal';
import { getBadgeInfo, BadgeDisplay } from './BadgeSystem';
import { BadgeProgressView } from './BadgeProgressView';
import { ProfilePage } from './ProfilePage';
import { BankAccountsPage } from './BankAccountsPage';
import { useOnboarding } from './OnboardingProvider';
import { OnboardingTour } from './OnboardingTour';
import { toast } from 'sonner@2.0.3';

interface DesktopHomeHubProps {
  userName?: string;
  userEmail?: string;
  userId?: string;
  onLogout?: () => void;
}

export function DesktopHomeHub({ userName = 'User', userEmail = 'user@email.com', userId, onLogout }: DesktopHomeHubProps) {
  const [currentPage, setCurrentPage] = useState<'Home' | 'Insights' | 'Receipts' | 'Transactions' | 'Tools'>('Home');
  const [showCategoryBudget, setShowCategoryBudget] = useState(false);
  const [showBadgeProgress, setShowBadgeProgress] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const [showAllBudgets, setShowAllBudgets] = useState(false);
  const [showPickPreviewBudgets, setShowPickPreviewBudgets] = useState(false);
  const [showBreakdownDetail, setShowBreakdownDetail] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDetail | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptDetail | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionDetail | null>(null);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showUploadReceipt, setShowUploadReceipt] = useState(false);
  const [showBankAccounts, setShowBankAccounts] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);

  const receiptsCount = 6;
  const badgeInfo = getBadgeInfo(receiptsCount);
  
  // Onboarding hook
  const { isOnboardingActive, restartOnboarding } = useOnboarding();

  // Handle View Guide click
  const handleViewGuide = async () => {
    await restartOnboarding();
    setCurrentPage('Home'); // Navigate to Home to start the tour
    toast.success('Starting guided tour!', {
      description: 'Follow along to learn about all Ordino features'
    });
  };

  // Handle navigation click
  const handleNavClick = (page: 'Home' | 'Insights' | 'Receipts' | 'Transactions' | 'Tools') => {
    setCurrentPage(page);
  };

  // Get page title for the top bar
  const getPageTitle = () => {
    switch (currentPage) {
      case 'Home':
        return 'Dashboard';
      case 'Insights':
        return 'Financial Insights';
      case 'Receipts':
        return 'Receipt Management';
      case 'Transactions':
        return 'Transaction History';
      case 'Tools':
        return 'Vero AI & Tools';
      default:
        return 'Dashboard';
    }
  };

  // Render the current page content
  const renderPageContent = () => {
    if (currentPage === 'Home') {
      return (
        <div className="px-8 hidden-mobile-nav">
          <HomeHub userName={userName} userEmail={userEmail} userId={userId} onLogout={onLogout} />
        </div>
      );
    }

    if (currentPage === 'Insights') {
      return (
        <div className="size-full pt-8 pb-8">
          <InsightsPage
            onCategoryBudgetOpen={() => setShowCategoryBudget(true)}
            onAllBudgetsOpen={() => setShowAllBudgets(true)}
            onCategorySelect={(category) => setSelectedCategory(category)}
            onPickPreviewBudgetsOpen={() => setShowPickPreviewBudgets(true)}
            onBreakdownDetailOpen={() => setShowBreakdownDetail(true)}
          />
        </div>
      );
    }

    if (currentPage === 'Receipts') {
      return (
        <div className="size-full pt-8 pb-8">
          <ReceiptsPage
            onReceiptClick={(receipt) => setSelectedReceipt(receipt)}
          />
        </div>
      );
    }

    if (currentPage === 'Transactions') {
      return (
        <div className="size-full pt-8 pb-8">
          <TransactionsPage
            onTransactionClick={(transaction) => setSelectedTransaction(transaction)}
          />
        </div>
      );
    }

    if (currentPage === 'Tools') {
      return (
        <div className="size-full pt-8 pb-8">
          <ToolsPage />
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {showProfile ? (
        // Profile Page - Full Screen
        <div className="size-full bg-[#E9F0F1]">
          <ProfilePage
            userName={userName}
            userEmail={userEmail}
            receiptsCount={receiptsCount}
            userId={userId}
            onClose={() => setShowProfile(false)}
            onLogout={onLogout}
          />
        </div>
      ) : (
        <>
          {/* Desktop View - Show sidebar layout */}
          <div className="hidden lg:flex size-full bg-[#E9F0F1]">
            {/* Desktop Sidebar */}
            <motion.div
              className="w-64 bg-white border-r border-[#686867]/20 flex flex-col"
              initial={{ x: -264, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Logo/Brand */}
              <div className="p-6 border-b border-[#686867]/10">
                <h1
                  className="text-[24px]"
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontVariationSettings: "'opsz' 14, 'wdth' 100",
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #686867 0%, #162a2c 50%, #686867 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '0.02em'
                  }}
                >
                  Ordino
                </h1>
                <p
                  className="text-[#686867] text-[12px] mt-1"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Financial Insights Made Easy
                </p>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-2">
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      currentPage === 'Home'
                        ? 'bg-[#5e6c5b] text-white shadow-lg'
                        : 'text-[#686867] hover:bg-[#E9F0F1]'
                    }`}
                    onClick={() => handleNavClick('Home')}
                  >
                    <Home className="size-5" />
                    <span
                      className="text-[14px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontWeight: currentPage === 'Home' ? 600 : 400,
                      }}
                    >
                      Home
                    </span>
                  </button>

                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      currentPage === 'Insights'
                        ? 'bg-[#5e6c5b] text-white shadow-lg'
                        : 'text-[#686867] hover:bg-[#E9F0F1]'
                    }`}
                    onClick={() => handleNavClick('Insights')}
                  >
                    <BarChart3 className="size-5" />
                    <span
                      className="text-[14px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontWeight: currentPage === 'Insights' ? 600 : 400,
                      }}
                    >
                      Insights
                    </span>
                  </button>

                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      currentPage === 'Tools'
                        ? 'bg-[#5e6c5b] text-white shadow-lg'
                        : 'text-[#686867] hover:bg-[#E9F0F1]'
                    }`}
                    onClick={() => handleNavClick('Tools')}
                  >
                    <div
                      className="text-[20px] leading-none"
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontVariationSettings: "'opsz' 14, 'wdth' 100",
                        fontWeight: 700,
                      }}
                    >
                      V
                    </div>
                    <span
                      className="text-[14px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontWeight: currentPage === 'Tools' ? 600 : 400,
                      }}
                    >
                      Vero
                    </span>
                  </button>

                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      currentPage === 'Receipts'
                        ? 'bg-[#5e6c5b] text-white shadow-lg'
                        : 'text-[#686867] hover:bg-[#E9F0F1]'
                    }`}
                    onClick={() => handleNavClick('Receipts')}
                  >
                    <Receipt className="size-5" />
                    <span
                      className="text-[14px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontWeight: currentPage === 'Receipts' ? 600 : 400,
                      }}
                    >
                      Receipts
                    </span>
                  </button>

                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      currentPage === 'Transactions'
                        ? 'bg-[#5e6c5b] text-white shadow-lg'
                        : 'text-[#686867] hover:bg-[#E9F0F1]'
                    }`}
                    onClick={() => handleNavClick('Transactions')}
                  >
                    <ArrowLeftRight className="size-5" />
                    <span
                      className="text-[14px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontWeight: currentPage === 'Transactions' ? 600 : 400,
                      }}
                    >
                      Transactions
                    </span>
                  </button>
                </div>

                {/* Quick Actions Section */}
                <div className="mt-8 pt-8 border-t border-[#686867]/10">
                  <p
                    className="text-[#686867] text-[12px] px-4 mb-3"
                    style={{
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                    }}
                  >
                    QUICK ACTIONS
                  </p>
                  <div className="space-y-2">
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#686867] hover:bg-[#E9F0F1] transition-all text-[13px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      }}
                      onClick={() => setShowCategoryBudget(!showCategoryBudget)}
                    >
                      <DollarSign className="size-4" />
                      Set Budget
                    </button>
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#686867] hover:bg-[#E9F0F1] transition-all text-[13px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      }}
                      onClick={() => setShowAddTransaction(!showAddTransaction)}
                    >
                      <ArrowLeftRight className="size-4" />
                      Add Transaction
                    </button>
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#686867] hover:bg-[#E9F0F1] transition-all text-[13px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      }}
                      onClick={() => setShowUploadReceipt(!showUploadReceipt)}
                    >
                      <Receipt className="size-4" />
                      Upload Receipt
                    </button>
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#686867] hover:bg-[#E9F0F1] transition-all text-[13px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      }}
                      onClick={() => setShowBankAccounts(!showBankAccounts)}
                    >
                      <Building2 className="size-4" />
                      Bank Accounts
                    </button>
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#686867] hover:bg-[#E9F0F1] transition-all text-[13px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      }}
                      onClick={handleViewGuide}
                    >
                      <BookOpen className="size-4" />
                      View Guide
                    </button>
                  </div>
                </div>

                {/* Monthly Tip Card */}
                <div className="mt-6 p-4 bg-[#E9F0F1] rounded-xl border border-[#686867]/10">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#5e6c5b] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[12px]">💡</span>
                    </div>
                    <p
                      className="text-[#162a2c] text-[11px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontWeight: 600,
                        letterSpacing: '0.03em',
                      }}
                    >
                      MONTHLY TIP
                    </p>
                  </div>
                  <p
                    className="text-[#686867] text-[11px] leading-relaxed"
                    style={{
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      lineHeight: '1.5',
                    }}
                  >
                    {new Date().getMonth() === 11 ? 'Year-end reflection: Calculate your total savings and celebrate your financial wins!' : 'Holiday season approaching! Create a gift budget now to prevent January stress.'}
                  </p>
                </div>
              </nav>

              {/* User Profile Section at Bottom */}
              <div className="p-4 border-t border-[#686867]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#5e6c5b] flex items-center justify-center">
                    <User className="size-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[#162a2c] text-[14px] truncate"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {userName}
                    </p>
                    <p
                      className="text-[#686867] text-[11px] truncate"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      }}
                    >
                      {userEmail}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-full hover:bg-[#E9F0F1]"
                    onClick={() => setShowProfile(!showProfile)}
                  >
                    <ChevronRight className="size-4 text-[#686867]" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Desktop Content Area with embedded HomeHub */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Scrollable Content Area - Embedded HomeHub */}
              <div className="flex-1 overflow-y-auto pt-8">
                {renderPageContent()}
              </div>
            </div>
          </div>

          {/* Mobile View - Original HomeHub */}
          <div className="flex lg:hidden size-full">
            <HomeHub userName={userName} userEmail={userEmail} userId={userId} onLogout={onLogout} />
          </div>

          {/* Modals and Detail Views (Desktop only) */}
          {showCategoryBudget && (
            <div className="hidden lg:block">
              <CategoryBudgetPage onClose={() => setShowCategoryBudget(false)} />
            </div>
          )}

          {showBadgeProgress && (
            <div className="hidden lg:block">
              <BadgeProgressView
                currentBadge={badgeInfo}
                onClose={() => setShowBadgeProgress(false)}
              />
            </div>
          )}

          {showAllBudgets && (
            <div className="hidden lg:block">
              <AllBudgetsPage
                onClose={() => setShowAllBudgets(false)}
                onCategoryBudgetOpen={() => {
                  setShowAllBudgets(false);
                  setShowCategoryBudget(true);
                }}
              />
            </div>
          )}

          {showPickPreviewBudgets && (
            <div className="hidden lg:block">
              <PickPreviewBudgetsModal
                onClose={() => setShowPickPreviewBudgets(false)}
                onSave={() => setShowPickPreviewBudgets(false)}
              />
            </div>
          )}

          {showBreakdownDetail && (
            <div className="hidden lg:block">
              <BreakdownDetailPage onClose={() => setShowBreakdownDetail(false)} />
            </div>
          )}

          {selectedCategory && (
            <div className="hidden lg:block">
              <CategoryDetailView
                categoryDetail={selectedCategory}
                onClose={() => setSelectedCategory(null)}
              />
            </div>
          )}

          {selectedReceipt && (
            <div className="hidden lg:block">
              <ReceiptDetailView
                receipt={selectedReceipt}
                onClose={() => setSelectedReceipt(null)}
                onEdit={(id) => {
                  toast.info('Edit receipt', { description: `Editing receipt ${id}` });
                }}
                onDelete={(id) => {
                  toast.success('Receipt deleted', { description: `Receipt ${id} has been deleted` });
                  setSelectedReceipt(null);
                }}
                onCategoryChange={(id) => {
                  toast.info('Change category', { description: `Changing category for receipt ${id}` });
                }}
                onLocationChange={(id) => {
                  toast.info('Change location', { description: `Changing location for receipt ${id}` });
                }}
              />
            </div>
          )}

          {selectedTransaction && (
            <div className="hidden lg:block">
              <TransactionDetailView
                transaction={selectedTransaction}
                onClose={() => setSelectedTransaction(null)}
                onEdit={(id) => {
                  toast.info('Edit transaction', { description: `Editing transaction ${id}` });
                }}
                onDelete={(id) => {
                  toast.success('Transaction deleted', { description: `Transaction ${id} has been deleted` });
                  setSelectedTransaction(null);
                }}
                onCategoryChange={(id) => {
                  toast.info('Change category', { description: `Changing category for transaction ${id}` });
                }}
              />
            </div>
          )}

          {showAddTransaction && (
            <div className="hidden lg:block">
              <AddTransactionModal
                onClose={() => setShowAddTransaction(false)}
                onAddTransaction={(transaction) => {
                  setTransactions([...transactions, transaction]);
                  setShowAddTransaction(false);
                  toast.success('Transaction added successfully!');
                }}
              />
            </div>
          )}

          {showUploadReceipt && (
            <div className="hidden lg:block">
              <UploadReceiptModal
                onClose={() => setShowUploadReceipt(false)}
              />
            </div>
          )}

          {showBankAccounts && userId && (
            <div className="hidden lg:block">
              <BankAccountsPage
                onClose={() => setShowBankAccounts(false)}
                userId={userId}
              />
            </div>
          )}

          {/* Onboarding Tour - Shows on Desktop */}
          {isOnboardingActive && (
            <div className="hidden lg:block">
              <OnboardingTour
                currentPage={currentPage}
                onNavigate={(page) => setCurrentPage(page)}
              />
            </div>
          )}

          <style>{`
            /* Hide mobile header on desktop in embedded view */
            @media (min-width: 1024px) {
              .hidden-mobile-nav > div {
                background: transparent !important;
              }
              
              /* Hide the mobile header (first child) */
              .hidden-mobile-nav > div > motion-div:first-child,
              .hidden-mobile-nav > div > div:first-child {
                display: none !important;
              }
              
              /* Show the content area (second child) */
              .hidden-mobile-nav > div > div:nth-child(2) {
                display: block !important;
                flex: 1 !important;
                overflow-y: auto !important;
                padding-top: 0 !important;
              }
              
              /* Hide bottom navigation if it exists (last child) */
              .hidden-mobile-nav > div > div:last-child:not(:nth-child(2)) {
                display: none !important;
              }
            }
          `}</style>
        </>
      )}
    </>
  );
}