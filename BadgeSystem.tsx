import { Trophy, Star, Sparkles, Crown, Zap } from 'lucide-react';

export type BadgeLevel = 'Budget Beginner' | 'Smart Saver' | 'Budget Builder' | 'Finance Pro' | 'Money Maestro';

export interface BadgeInfo {
  level: BadgeLevel;
  receiptsCount: number;
  nextLevel?: BadgeLevel;
  receiptsToNext?: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
}

export function getBadgeInfo(receiptsCount: number): BadgeInfo {
  if (receiptsCount <= 10) {
    return {
      level: 'Budget Beginner',
      receiptsCount,
      nextLevel: 'Smart Saver',
      receiptsToNext: 11 - receiptsCount,
      icon: <Star className="size-5" />,
      color: '#8a9899',
      bgColor: '#d4dcdd',
      description: 'Just getting started on your financial journey'
    };
  } else if (receiptsCount <= 50) {
    return {
      level: 'Smart Saver',
      receiptsCount,
      nextLevel: 'Budget Builder',
      receiptsToNext: 51 - receiptsCount,
      icon: <Sparkles className="size-5" />,
      color: '#5a8a9a',
      bgColor: '#c2dce5',
      description: 'Building great financial habits'
    };
  } else if (receiptsCount <= 150) {
    return {
      level: 'Budget Builder',
      receiptsCount,
      nextLevel: 'Finance Pro',
      receiptsToNext: 151 - receiptsCount,
      icon: <Zap className="size-5" />,
      color: '#3a6a7a',
      bgColor: '#b0ccd7',
      description: 'Mastering the art of budgeting'
    };
  } else if (receiptsCount <= 400) {
    return {
      level: 'Finance Pro',
      receiptsCount,
      nextLevel: 'Money Maestro',
      receiptsToNext: 401 - receiptsCount,
      icon: <Trophy className="size-5" />,
      color: '#2a4a5a',
      bgColor: '#9ebcc9',
      description: 'Expert level financial management'
    };
  } else {
    return {
      level: 'Money Maestro',
      receiptsCount,
      icon: <Crown className="size-5" />,
      color: '#162a2c',
      bgColor: '#8cadb9',
      description: 'Elite financial mastery achieved'
    };
  }
}

interface BadgeDisplayProps {
  badgeInfo: BadgeInfo;
  size?: 'small' | 'medium' | 'large';
  showProgress?: boolean;
}

export function BadgeDisplay({ badgeInfo, size = 'medium', showProgress = false }: BadgeDisplayProps) {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  const iconSizeClasses = {
    small: 'size-5',
    medium: 'size-6',
    large: 'size-10'
  };

  const textSizeClasses = {
    small: 'text-[10px]',
    medium: 'text-[12px]',
    large: 'text-[14px]'
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center border-2 shadow-sm relative`}
        style={{ 
          backgroundColor: badgeInfo.bgColor,
          borderColor: badgeInfo.color
        }}
      >
        <div style={{ color: badgeInfo.color }}>
          {size === 'small' ? (
            badgeInfo.icon
          ) : size === 'medium' ? (
            <div className="scale-110">{badgeInfo.icon}</div>
          ) : (
            <div className="scale-150">{badgeInfo.icon}</div>
          )}
        </div>
      </div>
      
      <div className="text-center">
        <p 
          className={`${textSizeClasses[size]}`}
          style={{ 
            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
            letterSpacing: '0.02em',
            color: badgeInfo.color,
            fontWeight: 500
          }}
        >
          {badgeInfo.level}
        </p>
        {showProgress && badgeInfo.nextLevel && (
          <p 
            className="text-[#686867] text-[10px] mt-1"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            {badgeInfo.receiptsToNext} receipts to {badgeInfo.nextLevel}
          </p>
        )}
      </div>
    </div>
  );
}
