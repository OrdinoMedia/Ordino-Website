import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { 
  User, 
  Bell, 
  Lock, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Mail,
  Calendar,
  Award,
  Settings,
  Shield,
  FileText,
  Info,
  Building2,
  FolderOpen
} from 'lucide-react';
import { getBadgeInfo, BadgeDisplay } from './BadgeSystem';
import { BadgeProgressView } from './BadgeProgressView';
import { SettingsPage } from './SettingsPage';
import { BankAccountsPage } from './BankAccountsPage';
import { StoredReceiptsView } from './StoredReceiptsView';
import { Separator } from './ui/separator';
import { useState } from 'react';

interface ProfilePageProps {
  userName?: string;
  userEmail?: string;
  receiptsCount?: number;
  onClose: () => void;
  onLogout?: () => void;
  userId?: string;
}

export function ProfilePage({ 
  userName = 'User', 
  userEmail = 'user@email.com',
  receiptsCount = 6,
  onClose,
  onLogout,
  userId = ''
}: ProfilePageProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [showBadgeProgress, setShowBadgeProgress] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showBankAccounts, setShowBankAccounts] = useState(false);
  const [showStoredReceipts, setShowStoredReceipts] = useState(false);

  const badgeInfo = getBadgeInfo(receiptsCount);
  const memberSince = `${new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}`;

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
            <ChevronRight className="size-6 rotate-180" />
          </button>
          
          <h1 
            className="text-[14px]"
            style={{ 
              fontFamily: "'Gill Sans Medium', 'Gill Sans', sans-serif",
              color: '#162a2c',
              letterSpacing: '0.02em'
            }}
          >
            Profile
          </h1>
          
          <div className="w-6" /> {/* Spacer for alignment */}
        </div>
      </motion.div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* User Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="bg-white border-[#686867]/20 p-6 mb-6">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-[#686867]/20 flex items-center justify-center mb-4">
                <User className="size-10 text-[#686867]" />
              </div>

              {/* User Details */}
              <h2 
                className="text-[#162a2c] text-[18px] mb-1"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                {userName}
              </h2>
              
              <div className="flex items-center gap-2 mb-1">
                <Mail className="size-3 text-[#686867]" />
                <p 
                  className="text-[#686867] text-[12px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {userEmail}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Calendar className="size-3 text-[#686867]" />
                <p 
                  className="text-[#686867] text-[12px]"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Member since {memberSince}
                </p>
              </div>

              <Separator className="my-4 bg-[#686867]/20" />

              {/* Badge Display */}
              <div className="w-full">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Award className="size-4 text-[#686867]" />
                  <p 
                    className="text-[#686867] text-[12px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Your Status
                  </p>
                </div>
                <div 
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setShowBadgeProgress(true)}
                >
                  <BadgeDisplay badgeInfo={badgeInfo} size="large" showProgress />
                </div>
                
                <p 
                  className="text-[#686867] text-[11px] text-center mt-3"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  {badgeInfo.description}
                </p>

                <div className="mt-4 bg-[#E9F0F1] rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="text-[#686867] text-[11px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      Receipts Uploaded
                    </span>
                    <span 
                      className="text-[#162a2c] text-[12px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em',
                        fontWeight: 500
                      }}
                    >
                      {receiptsCount}
                    </span>
                  </div>
                  {badgeInfo.nextLevel && (
                    <>
                      <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                        <motion.div
                          className="h-full"
                          style={{ backgroundColor: badgeInfo.color }}
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${Math.min(100, (receiptsCount / (receiptsCount + (badgeInfo.receiptsToNext || 0))) * 100)}%` 
                          }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        />
                      </div>
                      <p 
                        className="text-[#686867] text-[10px] mt-1 text-center"
                        style={{ 
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em'
                        }}
                      >
                        {badgeInfo.receiptsToNext} more to reach {badgeInfo.nextLevel}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Settings Section */}
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
            Settings
          </h3>

          <Card className="bg-white border-[#686867]/20 divide-y divide-[#686867]/20">
            {/* Notifications */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <Bell className="size-5 text-[#686867]" />
                <div>
                  <p 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Push Notifications
                  </p>
                  <p 
                    className="text-[#686867] text-[11px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Get updates on your spending
                  </p>
                </div>
              </div>
              <Switch 
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            {/* Email Updates */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <Mail className="size-5 text-[#686867]" />
                <div>
                  <p 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Email Updates
                  </p>
                  <p 
                    className="text-[#686867] text-[11px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Weekly financial summaries
                  </p>
                </div>
              </div>
              <Switch 
                checked={emailUpdates}
                onCheckedChange={setEmailUpdates}
              />
            </div>

            {/* Biometric */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <Shield className="size-5 text-[#686867]" />
                <div>
                  <p 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Biometric Lock
                  </p>
                  <p 
                    className="text-[#686867] text-[11px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Use Face ID or fingerprint
                  </p>
                </div>
              </div>
              <Switch 
                checked={biometricEnabled}
                onCheckedChange={setBiometricEnabled}
              />
            </div>
          </Card>
        </motion.div>

        {/* Account Section */}
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
            Account
          </h3>

          <Card className="bg-white border-[#686867]/20 overflow-hidden">
            <div className="divide-y divide-[#686867]/20">
              {/* Settings */}
              <button 
                className="w-full py-4 px-4 flex items-center justify-between hover:bg-[#E9F0F1] transition-colors"
                onClick={() => setShowSettings(true)}
              >
                <div className="flex items-center gap-3">
                  <Settings className="size-5 text-[#686867] flex-shrink-0" />
                  <p 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Settings
                  </p>
                </div>
                <ChevronRight className="size-5 text-[#686867] flex-shrink-0" />
              </button>

              {/* Bank Accounts */}
              <button 
                className="w-full py-4 px-4 flex items-center justify-between hover:bg-[#E9F0F1] transition-colors"
                onClick={() => setShowBankAccounts(true)}
              >
                <div className="flex items-center gap-3">
                  <Building2 className="size-5 text-[#686867] flex-shrink-0" />
                  <p 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Bank Accounts
                  </p>
                </div>
                <ChevronRight className="size-5 text-[#686867] flex-shrink-0" />
              </button>

              {/* Change Password */}
              <button className="w-full py-4 px-4 flex items-center justify-between hover:bg-[#E9F0F1] transition-colors">
                <div className="flex items-center gap-3">
                  <Lock className="size-5 text-[#686867] flex-shrink-0" />
                  <p 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Change Password
                  </p>
                </div>
                <ChevronRight className="size-5 text-[#686867] flex-shrink-0" />
              </button>

              {/* Privacy Policy */}
              <button className="w-full py-4 px-4 flex items-center justify-between hover:bg-[#E9F0F1] transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-[#686867] flex-shrink-0" />
                  <p 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Privacy Policy
                  </p>
                </div>
                <ChevronRight className="size-5 text-[#686867] flex-shrink-0" />
              </button>

              {/* Help & Support */}
              <button className="w-full py-4 px-4 flex items-center justify-between hover:bg-[#E9F0F1] transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle className="size-5 text-[#686867] flex-shrink-0" />
                  <p 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Help & Support
                  </p>
                </div>
                <ChevronRight className="size-5 text-[#686867] flex-shrink-0" />
              </button>

              {/* About */}
              <button className="w-full py-4 px-4 flex items-center justify-between hover:bg-[#E9F0F1] transition-colors">
                <div className="flex items-center gap-3">
                  <Info className="size-5 text-[#686867] flex-shrink-0" />
                  <p 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    About Ordino
                  </p>
                </div>
                <ChevronRight className="size-5 text-[#686867] flex-shrink-0" />
              </button>

              {/* Stored Receipts */}
              <button 
                className="w-full py-4 px-4 flex items-center justify-between hover:bg-[#E9F0F1] transition-colors"
                onClick={() => setShowStoredReceipts(true)}
              >
                <div className="flex items-center gap-3">
                  <FolderOpen className="size-5 text-[#686867] flex-shrink-0" />
                  <p 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Stored Receipts
                  </p>
                </div>
                <ChevronRight className="size-5 text-[#686867] flex-shrink-0" />
              </button>
            </div>
          </Card>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            onClick={onLogout}
            className="w-full bg-white border-2 border-[#686867]/30 text-[#686867] hover:bg-[#E9F0F1] hover:border-[#686867] transition-colors py-6 flex items-center justify-center gap-2"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 400
            }}
          >
            <LogOut className="size-5" />
            Log Out
          </Button>
        </motion.div>

        {/* Version */}
        <p 
          className="text-[#686867] text-[10px] text-center mt-6"
          style={{ 
            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
            letterSpacing: '0.02em'
          }}
        >
          Ordino v1.0.0
        </p>
      </div>

      <AnimatePresence>
        {showBadgeProgress && (
          <BadgeProgressView
            onClose={() => setShowBadgeProgress(false)}
            currentReceiptsCount={receiptsCount}
          />
        )}
        {showSettings && (
          <SettingsPage onClose={() => setShowSettings(false)} />
        )}
        {showBankAccounts && (
          <BankAccountsPage onClose={() => setShowBankAccounts(false)} userId={userId} />
        )}
        {showStoredReceipts && (
          <StoredReceiptsView onClose={() => setShowStoredReceipts(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}