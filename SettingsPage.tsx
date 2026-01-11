import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X, Bell, DollarSign, FolderOpen, Download, User, Shield, Trash2, LogOut, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SettingsPageProps {
  onClose: () => void;
}

export function SettingsPage({ onClose }: SettingsPageProps) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [currency, setCurrency] = useState('CAD');
  const [defaultView, setDefaultView] = useState('all');

  const handleExportData = () => {
    // Mock export functionality
    alert('Your data export will be sent to your email within 24 hours.');
  };

  const handleDeleteAccount = () => {
    // Mock delete functionality
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion request submitted. You will receive a confirmation email.');
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-[390px] h-[844px] bg-[#E9F0F1] rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
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
              Settings
            </h1>

            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {/* Notifications Section */}
          <motion.div
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Bell className="size-4 text-[#686867]" />
              <h2 
                className="text-[#162a2c]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontWeight: 400
                }}
              >
                Notifications
              </h2>
            </div>
            
            <Card className="bg-white border-[#686867]/20 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
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
                    Receive app notifications
                  </p>
                </div>
                <Switch 
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Email Notifications
                  </p>
                  <p 
                    className="text-[#686867] text-[11px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Receive email updates
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Budget Alerts
                  </p>
                  <p 
                    className="text-[#686867] text-[11px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Alert when nearing budget limits
                  </p>
                </div>
                <Switch 
                  checked={budgetAlerts}
                  onCheckedChange={setBudgetAlerts}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p 
                    className="text-[#162a2c] text-[14px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Weekly Reports
                  </p>
                  <p 
                    className="text-[#686867] text-[11px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Receive weekly spending summaries
                  </p>
                </div>
                <Switch 
                  checked={weeklyReports}
                  onCheckedChange={setWeeklyReports}
                />
              </div>
            </Card>
          </motion.div>

          {/* Preferences Section */}
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
                Preferences
              </h2>
            </div>
            
            <Card className="bg-white border-[#686867]/20 p-4 space-y-4">
              <div>
                <label 
                  className="text-[#162a2c] text-[14px] block mb-2"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Currency
                </label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-full h-[50px] bg-white border-[#686867]/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label 
                  className="text-[#162a2c] text-[14px] block mb-2"
                  style={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em'
                  }}
                >
                  Default Transaction View
                </label>
                <Select value={defaultView} onValueChange={setDefaultView}>
                  <SelectTrigger className="w-full h-[50px] bg-white border-[#686867]/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="income">Income Only</SelectItem>
                    <SelectItem value="expense">Expenses Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </motion.div>

          {/* Data Management Section */}
          <motion.div
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <FolderOpen className="size-4 text-[#686867]" />
              <h2 
                className="text-[#162a2c]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontWeight: 400
                }}
              >
                Data Management
              </h2>
            </div>
            
            <Card className="bg-white border-[#686867]/20 p-4 space-y-3">
              <button
                onClick={handleExportData}
                className="w-full flex items-center justify-between p-3 hover:bg-[#E9F0F1] rounded-md transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Download className="size-4 text-[#686867]" />
                  <div className="text-left">
                    <p 
                      className="text-[#162a2c] text-[14px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      Export Data
                    </p>
                    <p 
                      className="text-[#686867] text-[11px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      Download all your data as CSV
                    </p>
                  </div>
                </div>
                <ChevronRight className="size-4 text-[#686867]" />
              </button>
            </Card>
          </motion.div>

          {/* Account Section */}
          <motion.div
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Shield className="size-4 text-[#686867]" />
              <h2 
                className="text-[#162a2c]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontWeight: 400
                }}
              >
                Account
              </h2>
            </div>
            
            <Card className="bg-white border-[#686867]/20 p-4 space-y-3">
              <button
                className="w-full flex items-center justify-between p-3 hover:bg-[#E9F0F1] rounded-md transition-colors"
              >
                <div className="flex items-center gap-3">
                  <User className="size-4 text-[#686867]" />
                  <div className="text-left">
                    <p 
                      className="text-[#162a2c] text-[14px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      Change Password
                    </p>
                    <p 
                      className="text-[#686867] text-[11px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      Update your password
                    </p>
                  </div>
                </div>
                <ChevronRight className="size-4 text-[#686867]" />
              </button>

              <button
                className="w-full flex items-center justify-between p-3 hover:bg-[#E9F0F1] rounded-md transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="size-4 text-[#686867]" />
                  <div className="text-left">
                    <p 
                      className="text-[#162a2c] text-[14px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      Sign Out
                    </p>
                    <p 
                      className="text-[#686867] text-[11px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      Sign out of your account
                    </p>
                  </div>
                </div>
                <ChevronRight className="size-4 text-[#686867]" />
              </button>

              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center justify-between p-3 hover:bg-red-50 rounded-md transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Trash2 className="size-4" style={{ color: '#ffa47d' }} />
                  <div className="text-left">
                    <p 
                      className="text-[14px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em',
                        color: '#ffa47d'
                      }}
                    >
                      Delete Account
                    </p>
                    <p 
                      className="text-[#686867] text-[11px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      Permanently delete your account
                    </p>
                  </div>
                </div>
                <ChevronRight className="size-4" style={{ color: '#ffa47d' }} />
              </button>
            </Card>
          </motion.div>

          {/* App Info */}
          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p 
              className="text-[#686867] text-[11px]"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              Ordino v1.0.0
            </p>
            <p 
              className="text-[#686867] text-[10px] mt-1"
              style={{ 
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              © 2025 Ordino. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
