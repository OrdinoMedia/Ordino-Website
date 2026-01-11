import { motion } from 'motion/react';
import { Card } from './ui/card';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock comparison data
const monthlyComparison = [
  { month: 'Sep', income: 3050, expenses: 2380, savings: 670 },
  { month: 'Oct', income: 3050, expenses: 2580, savings: 470 },
];

const dailySpendingPattern = [
  { day: 'Mon', amount: 85 },
  { day: 'Tue', amount: 120 },
  { day: 'Wed', amount: 95 },
  { day: 'Thu', amount: 145 },
  { day: 'Fri', amount: 220 },
  { day: 'Sat', amount: 180 },
  { day: 'Sun', amount: 110 },
];

interface BreakdownDetailPageProps {
  onClose: () => void;
}

export function BreakdownDetailPage({ onClose }: BreakdownDetailPageProps) {
  const [view, setView] = useState<'weekly' | 'monthly'>('monthly');
  
  const lastMonth = monthlyComparison[0];
  const thisMonth = monthlyComparison[1];
  const expenseChange = ((thisMonth.expenses - lastMonth.expenses) / lastMonth.expenses) * 100;
  const savingsChange = ((thisMonth.savings - lastMonth.savings) / lastMonth.savings) * 100;

  return (
    <motion.div
      className="absolute inset-0 bg-[#E9F0F1] z-50 flex flex-col"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      {/* Header */}
      <div className="p-6 pb-4 pt-12 border-b border-[#686867]/20 bg-white">
        <div className="flex items-center justify-between">
          <div />
          <h1 
            className="text-[#162a2c] text-center"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 500
            }}
          >
            Breakdown Details
          </h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#E9F0F1] rounded-full transition-colors"
          >
            <X className="size-5 text-[#686867]" />
          </button>
        </div>
      </div>

      {/* Toggle View */}
      <div className="px-6 pt-4 pb-3 bg-white border-b border-[#686867]/20">
        <div className="flex gap-2">
          <button
            onClick={() => setView('weekly')}
            className={`flex-1 py-2 rounded-md text-[12px] transition-colors flex items-center justify-center ${
              view === 'weekly'
                ? 'bg-[#686867] text-[#E9F0F1]'
                : 'bg-[#E9F0F1] text-[#686867] hover:bg-[#686867]/10'
            }`}
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            Weekly
          </button>
          <button
            onClick={() => setView('monthly')}
            className={`flex-1 py-2 rounded-md text-[12px] transition-colors flex items-center justify-center ${
              view === 'monthly'
                ? 'bg-[#686867] text-[#E9F0F1]'
                : 'bg-[#E9F0F1] text-[#686867] hover:bg-[#686867]/10'
            }`}
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em'
            }}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="size-full overflow-y-auto px-6 py-6 pb-24">
        {view === 'monthly' && (
          <>
            {/* Month-over-Month Summary */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-6"
            >
              <h3 
                className="text-[#162a2c] mb-3"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontWeight: 400
                }}
              >
                This Month vs Last Month
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-white border-[#686867]/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-2 rounded-full ${expenseChange > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
                      {expenseChange > 0 ? (
                        <TrendingUp className="size-4" style={{ color: '#ffa47d' }} />
                      ) : (
                        <TrendingDown className="size-4" style={{ color: '#5e6c5b' }} />
                      )}
                    </div>
                    <span 
                      className="text-[#686867] text-[11px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      Expenses
                    </span>
                  </div>
                  <p 
                    className="text-[#162a2c] text-[20px] mb-1"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    ${thisMonth.expenses}
                  </p>
                  <p 
                    className={`text-[11px] ${expenseChange > 0 ? 'text-[#ffa47d]' : 'text-[#5e6c5b]'}`}
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    {expenseChange > 0 ? '+' : ''}{expenseChange.toFixed(1)}% from last month
                  </p>
                </Card>

                <Card className="bg-white border-[#686867]/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-2 rounded-full ${savingsChange < 0 ? 'bg-red-50' : 'bg-green-50'}`}>
                      {savingsChange < 0 ? (
                        <TrendingDown className="size-4" style={{ color: '#ffa47d' }} />
                      ) : (
                        <TrendingUp className="size-4" style={{ color: '#5e6c5b' }} />
                      )}
                    </div>
                    <span 
                      className="text-[#686867] text-[11px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      Savings
                    </span>
                  </div>
                  <p 
                    className="text-[#162a2c] text-[20px] mb-1"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    ${thisMonth.savings}
                  </p>
                  <p 
                    className={`text-[11px] ${savingsChange < 0 ? 'text-[#ffa47d]' : 'text-[#5e6c5b]'}`}
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    {savingsChange > 0 ? '+' : ''}{savingsChange.toFixed(1)}% from last month
                  </p>
                </Card>
              </div>
            </motion.div>

            {/* Monthly Insights */}
            <motion.div
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
                Monthly Insights
              </h3>
              <Card className="bg-white border-[#686867]/20 p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-[18px]">💡</span>
                    <p 
                      className="text-[#686867] text-[12px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      Your expenses increased by ${(thisMonth.expenses - lastMonth.expenses).toFixed(0)} this month. Consider reviewing your Flexible Expenses category.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[18px]">🎯</span>
                    <p 
                      className="text-[#686867] text-[12px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      Your savings rate decreased to 15.4% this month. Aim to maintain at least 20% for healthy financial growth.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}

        {view === 'weekly' && (
          <>
            {/* Weekly Spending Pattern */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-6"
            >
              <h3 
                className="text-[#162a2c] mb-3"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontWeight: 400
                }}
              >
                Weekly Spending Pattern
              </h3>
              <Card className="bg-white border-[#686867]/20 p-4">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dailySpendingPattern}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E9F0F1" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fill: '#686867', fontSize: 10 }}
                      style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}
                    />
                    <YAxis 
                      tick={{ fill: '#686867', fontSize: 10 }}
                      style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #E9F0F1',
                        borderRadius: '8px',
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontSize: '11px'
                      }}
                    />
                    <Bar dataKey="amount" fill="#ffa47d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-4 p-3 bg-[#E9F0F1] rounded-lg">
                  <p 
                    className="text-[#162a2c] text-[12px] mb-1"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    💡 Insight: You tend to spend most on Fridays
                  </p>
                  <p 
                    className="text-[#686867] text-[11px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Consider setting a Friday budget to manage weekend spending
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Weekly Summary Stats */}
            <motion.div
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
                This Week's Summary
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Card className="bg-white border-[#686867]/20 p-4">
                  <span 
                    className="text-[#686867] text-[11px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Total Spent
                  </span>
                  <p 
                    className="text-[#162a2c] text-[20px] mt-1"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    $955
                  </p>
                </Card>

                <Card className="bg-white border-[#686867]/20 p-4">
                  <span 
                    className="text-[#686867] text-[11px]"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    Daily Average
                  </span>
                  <p 
                    className="text-[#162a2c] text-[20px] mt-1"
                    style={{ 
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em'
                    }}
                  >
                    $136
                  </p>
                </Card>
              </div>

              <Card className="bg-white border-[#686867]/20 p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-[18px]">📊</span>
                    <p 
                      className="text-[#686867] text-[12px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      Weekend spending (Fri-Sun) accounts for 53% of your weekly expenses. Try planning weekend activities within a set budget.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[18px]">✅</span>
                    <p 
                      className="text-[#686867] text-[12px]"
                      style={{ 
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em'
                      }}
                    >
                      Weekday spending is well-controlled. Your Monday-Thursday average is $111/day.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
