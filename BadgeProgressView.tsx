import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { X, Star, Sparkles, Zap, Trophy, Crown, Check, Lock } from 'lucide-react';

interface BadgeProgressViewProps {
  onClose: () => void;
  currentReceiptsCount: number;
}

interface BadgeTier {
  level: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  minReceipts: number;
  maxReceipts: number | null;
  description: string;
}

const badgeTiers: BadgeTier[] = [
  {
    level: 'Budget Beginner',
    icon: <Star className="size-6" />,
    color: '#8a9899',
    bgColor: '#d4dcdd',
    minReceipts: 0,
    maxReceipts: 10,
    description: 'Just getting started on your financial journey'
  },
  {
    level: 'Smart Saver',
    icon: <Sparkles className="size-6" />,
    color: '#5a8a9a',
    bgColor: '#c2dce5',
    minReceipts: 11,
    maxReceipts: 50,
    description: 'Building great financial habits'
  },
  {
    level: 'Budget Builder',
    icon: <Zap className="size-6" />,
    color: '#3a6a7a',
    bgColor: '#b0ccd7',
    minReceipts: 51,
    maxReceipts: 150,
    description: 'Mastering the art of budgeting'
  },
  {
    level: 'Finance Pro',
    icon: <Trophy className="size-6" />,
    color: '#2a4a5a',
    bgColor: '#9ebcc9',
    minReceipts: 151,
    maxReceipts: 400,
    description: 'Expert level financial management'
  },
  {
    level: 'Money Maestro',
    icon: <Crown className="size-6" />,
    color: '#162a2c',
    bgColor: '#8cadb9',
    minReceipts: 401,
    maxReceipts: null,
    description: 'Elite financial mastery achieved'
  }
];

export function BadgeProgressView({ onClose, currentReceiptsCount }: BadgeProgressViewProps) {
  const getCurrentTierIndex = () => {
    return badgeTiers.findIndex(tier => 
      currentReceiptsCount >= tier.minReceipts && 
      (tier.maxReceipts === null || currentReceiptsCount <= tier.maxReceipts)
    );
  };

  const currentTierIndex = getCurrentTierIndex();

  const getRequirementText = (tier: BadgeTier) => {
    if (tier.maxReceipts === null) {
      return `${tier.minReceipts}+ receipts`;
    }
    return `${tier.minReceipts}-${tier.maxReceipts} receipts`;
  };

  const isUnlocked = (index: number) => index <= currentTierIndex;
  const isCurrent = (index: number) => index === currentTierIndex;

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
        <div className="flex items-center justify-between">
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
            Badge Progress
          </h1>
          
          <div className="w-10" /> {/* Spacer */}
        </div>
      </motion.div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Current Status */}
        <motion.div
          className="mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="bg-white border-[#686867]/20 p-6">
            <div className="text-center">
              <p 
                className="text-[#686867] text-[12px] mb-3"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                Your Current Status
              </p>
              
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center border-2 shadow-sm mx-auto mb-3"
                style={{ 
                  backgroundColor: badgeTiers[currentTierIndex]?.bgColor || '#d4dcdd',
                  borderColor: badgeTiers[currentTierIndex]?.color || '#8a9899'
                }}
              >
                <div style={{ color: badgeTiers[currentTierIndex]?.color || '#8a9899' }}>
                  <div className="scale-150">{badgeTiers[currentTierIndex]?.icon}</div>
                </div>
              </div>

              <h2 
                className="text-[#162a2c] text-[16px] mb-2"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontWeight: 500
                }}
              >
                {badgeTiers[currentTierIndex]?.level}
              </h2>

              <div className="bg-[#E9F0F1] rounded-lg p-3 mt-4">
                <div className="flex items-center justify-between">
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
                    {currentReceiptsCount}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* All Badge Tiers */}
        <motion.div
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
            All Badge Levels
          </h3>

          <div className="space-y-3">
            {badgeTiers.map((tier, index) => {
              const unlocked = isUnlocked(index);
              const current = isCurrent(index);

              return (
                <motion.div
                  key={tier.level}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                >
                  <Card 
                    className={`border-[#686867]/20 p-4 ${
                      current 
                        ? 'bg-white ring-2' 
                        : unlocked 
                        ? 'bg-white' 
                        : 'bg-[#686867]/5'
                    }`}
                    style={current ? { ringColor: tier.color } : {}}
                  >
                    <div className="flex items-center gap-4">
                      {/* Badge Icon */}
                      <div 
                        className={`w-16 h-16 rounded-full flex items-center justify-center border-2 flex-shrink-0 relative ${
                          !unlocked ? 'opacity-40' : ''
                        }`}
                        style={{ 
                          backgroundColor: tier.bgColor,
                          borderColor: tier.color
                        }}
                      >
                        {unlocked ? (
                          <div style={{ color: tier.color }}>
                            <div className="scale-110">{tier.icon}</div>
                          </div>
                        ) : (
                          <Lock className="size-6 text-[#686867]" />
                        )}
                        
                        {current && (
                          <div 
                            className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: tier.color }}
                          >
                            <Check className="size-3 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Badge Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 
                            className={`text-[14px] ${
                              unlocked ? 'text-[#162a2c]' : 'text-[#686867]'
                            }`}
                            style={{ 
                              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                              letterSpacing: '0.02em',
                              fontWeight: unlocked ? 500 : 400
                            }}
                          >
                            {tier.level}
                          </h4>
                          {current && (
                            <span 
                              className="text-[10px] px-2 py-0.5 rounded"
                              style={{ 
                                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                                letterSpacing: '0.02em',
                                backgroundColor: tier.bgColor,
                                color: tier.color
                              }}
                            >
                              Current
                            </span>
                          )}
                        </div>
                        
                        <p 
                          className="text-[#686867] text-[11px] mb-2"
                          style={{ 
                            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            letterSpacing: '0.02em'
                          }}
                        >
                          {tier.description}
                        </p>

                        <div className="flex items-center gap-1">
                          <span 
                            className={`text-[10px] px-2 py-1 rounded ${
                              unlocked 
                                ? 'bg-[#5e6c5b]/10 text-[#5e6c5b]' 
                                : 'bg-[#686867]/10 text-[#686867]'
                            }`}
                            style={{ 
                              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                              letterSpacing: '0.02em'
                            }}
                          >
                            {getRequirementText(tier)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Next Goal */}
        {currentTierIndex < badgeTiers.length - 1 && (
          <motion.div
            className="mt-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Card className="bg-white border-[#686867]/20 p-4">
              <h3 
                className="text-[#162a2c] text-[12px] mb-2"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontWeight: 500
                }}
              >
                Next Goal
              </h3>
              <p 
                className="text-[#686867] text-[11px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                Upload {badgeTiers[currentTierIndex + 1].minReceipts - currentReceiptsCount} more receipt{badgeTiers[currentTierIndex + 1].minReceipts - currentReceiptsCount !== 1 ? 's' : ''} to unlock <span style={{ color: badgeTiers[currentTierIndex + 1].color, fontWeight: 500 }}>{badgeTiers[currentTierIndex + 1].level}</span>
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
