import { motion } from 'motion/react';
import { Card } from './ui/card';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock comparison data
const monthlyComparison = [
  { month: 'Sep', income: 3050, expenses: 2380, savings: 670 },
  { month: 'Oct', income: 3050, expenses: 2580, savings: 470 },
];

const yearOverYearData = [
  { month: 'Jan', '2024': 2200, '2025': 2580 },
  { month: 'Feb', '2024': 2100, '2025': 2450 },
  { month: 'Mar', '2024': 2300, '2025': 2520 },
  { month: 'Apr', '2024': 2250, '2025': 2490 },
  { month: 'May', '2024': 2400, '2025': 2610 },
  { month: 'Jun', '2024': 2350, '2025': 2570 },
  { month: 'Jul', '2024': 2280, '2025': 2500 },
  { month: 'Aug', '2024': 2320, '2025': 2550 },
  { month: 'Sep', '2024': 2380, '2025': 2580 },
  { month: 'Oct', '2024': 2450, '2025': 0 },
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

interface AnalyticsComparisonProps {
  view: 'monthly' | 'yearly' | 'daily';
}

export function AnalyticsComparison({ view }: AnalyticsComparisonProps) {
  const lastMonth = monthlyComparison[0];
  const thisMonth = monthlyComparison[1];
  const expenseChange = ((thisMonth.expenses - lastMonth.expenses) / lastMonth.expenses) * 100;
  const savingsChange = ((thisMonth.savings - lastMonth.savings) / lastMonth.savings) * 100;

  return (
    <div className="space-y-6">
      {view === 'monthly' && (
        <>
          {/* Month-over-Month Summary */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
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
        </>
      )}

      {view === 'yearly' && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h3 
            className="text-[#162a2c] mb-3"
            style={{ 
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 400
            }}
          >
            Year-over-Year Comparison
          </h3>
          <Card className="bg-white border-[#686867]/20 p-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yearOverYearData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9F0F1" />
                <XAxis 
                  dataKey="month" 
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
                <Legend 
                  wrapperStyle={{ 
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    fontSize: '10px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="2024" 
                  stroke="#686867" 
                  strokeWidth={2}
                  dot={{ fill: '#686867', r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="2025" 
                  stroke="#5e6c5b" 
                  strokeWidth={2}
                  dot={{ fill: '#5e6c5b', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="mt-4 p-3 bg-[#E9F0F1] rounded-lg">
              <p 
                className="text-[#162a2c] text-[12px]"
                style={{ 
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em'
                }}
              >
                Average monthly expenses increased by 8.4% compared to 2024
              </p>
            </div>
          </Card>
        </motion.div>
      )}

      {view === 'daily' && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
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
      )}
    </div>
  );
}
