import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { MarketingFooter } from './MarketingFooter';

interface GuideContentProps {
  onBack?: () => void;
  onNavigate?: (page: 'home' | 'features' | 'benefits' | 'resources' | 'support' | 'legal' | 'about') => void;
  guideId: string;
}

// Complete guide content with all 6 guides
const guideData: { [key: string]: any } = {
  'getting-started': {
    title: 'Getting Started with Ordino',
    subtitle: 'Set up your account and start tracking your finances in minutes',
    duration: '5 min read',
    category: 'Getting Started',
    color: '#5e6c5b',
    sections: [
      {
        heading: 'Welcome to Ordino',
        content: 'Ordino is your comprehensive financial management platform designed to simplify how you track, analyze, and optimize your spending. This guide will walk you through everything you need to know to get started.',
      },
      {
        heading: 'Creating Your Account',
        content: 'Getting started with Ordino is quick and easy:',
        steps: [
          'Visit the Ordino homepage and click "Get Started"',
          'Enter your email address and create a secure password',
          'Verify your email through the confirmation link sent to your inbox',
          'Complete your profile by adding your name and basic preferences',
        ],
      },
      {
        heading: 'Setting Up Your Dashboard',
        content: 'Once your account is created, you\'ll be guided through an interactive onboarding tour that introduces you to the five main sections:',
        steps: [
          'Home: Your financial overview with insights and quick actions',
          'Insights: Detailed analytics across your 28 spending subcategories',
          'Receipts: Upload and manage all your purchase receipts',
          'Transactions: Track every financial movement in one place',
          'Tools: Access budget planning, analytics comparison, and advanced search',
        ],
      },
      {
        heading: 'Configuring Your First Budget',
        content: 'Ordino uses a comprehensive 28-subcategory system organized into 5 main groups:',
        steps: [
          'Income (Fixed & Flexible)',
          'Fixed Expenses (Rent, Utilities, Insurance, and 8 more)',
          'Flexible Expenses (Groceries, Dining, Entertainment, and 6 more)',
          'Savings (TFSA, Savings Account, Emergency Fund)',
          'Investments (Stocks & Bonds, Retirement, Other)',
        ],
        additionalText: 'Navigate to Tools > Category Budgets to set monthly limits for each subcategory. Start with your essential expenses and adjust as you track your spending patterns.',
      },
      {
        heading: 'Understanding the Gamification System',
        content: 'Ordino makes financial management engaging through a badge system that rewards consistent tracking and smart financial decisions. You\'ll earn badges for:',
        steps: [
          'Uploading your first receipt',
          'Staying under budget in multiple categories',
          'Tracking transactions consistently',
          'Reaching savings milestones',
          'Maintaining financial streaks',
        ],
      },
      {
        heading: 'Next Steps',
        content: 'Now that you\'re set up, explore these features to maximize your Ordino experience:',
        steps: [
          'Upload your first receipt to start building your expense history',
          'Connect your bank accounts for automatic transaction tracking',
          'Chat with Vero AI for personalized financial advice',
          'Review your Insights page to understand your spending patterns',
          'Set up budget alerts to stay on track',
        ],
      },
    ],
  },
  'receipt-management': {
    title: 'Mastering Receipt Management',
    subtitle: 'Learn how to scan, upload, and organize receipts for seamless expense tracking',
    duration: '8 min read',
    category: 'Core Features',
    color: '#ffa47d',
    sections: [
      {
        heading: 'Why Receipt Management Matters',
        content: 'Digital receipt management is essential for accurate financial tracking, tax preparation, and warranty claims. Ordino\'s receipt system transforms paper clutter into an organized, searchable digital archive.',
      },
      {
        heading: 'Uploading Your First Receipt',
        content: 'Getting receipts into Ordino is simple:',
        steps: [
          'Navigate to the Receipts page from the main navigation',
          'Click the "+" button or "Upload Receipt" to open the upload interface',
          'Choose to take a photo with your device camera or upload an existing image',
          'Ordino automatically extracts key information: merchant name, date, amount, and items',
          'Review and confirm the extracted details',
          'Assign the receipt to one of your 28 subcategories',
        ],
      },
      {
        heading: 'Receipt Organization Best Practices',
        content: 'Maximize the value of your receipt database with these organizational strategies:',
        steps: [
          'Upload receipts immediately after purchases while details are fresh',
          'Use consistent categorization across similar expenses',
          'Add notes or tags for receipts you\'ll need to reference later',
          'Mark receipts for returns or exchanges with special tags',
          'Tag receipts that contain warranty information',
          'Create a monthly routine to review and organize uncategorized receipts',
        ],
      },
      {
        heading: 'Advanced Receipt Search',
        content: 'Ordino\'s powerful search capabilities help you find any receipt instantly. From the Receipts page, use the search function to filter by:',
        steps: [
          'Merchant name (e.g., "Whole Foods")',
          'Date range (last week, last month, custom dates)',
          'Amount range ($0-$50, $50-$100, etc.)',
          'Category or subcategory',
          'Payment method',
          'Custom tags or notes',
        ],
      },
      {
        heading: 'Linking Receipts to Transactions',
        content: 'When you have both automated transaction tracking and receipt uploads, Ordino helps you connect them for complete expense records:',
        steps: [
          'Open a transaction from your Transactions page',
          'Look for the "Attach Receipt" option',
          'Select from recent uploads or upload a new receipt',
          'Ordino automatically matches based on date, amount, and merchant',
          'Confirm the link to create a complete expense record',
        ],
      },
      {
        heading: 'Receipt Storage and Privacy',
        content: 'Your receipt images are stored securely with enterprise-grade encryption. All personal information is kept private and is never shared with third parties. You can export your receipt archive at any time or permanently delete individual receipts.',
      },
      {
        heading: 'Tax Time Made Easy',
        content: 'When tax season arrives, Ordino\'s receipt management system becomes invaluable:',
        steps: [
          'Use the date range filter to select the entire tax year',
          'Filter by deductible categories (home office, business meals, etc.)',
          'Export a PDF report with all relevant receipts',
          'Include transaction summaries alongside receipt images',
          'Share directly with your accountant or tax software',
        ],
      },
    ],
  },
  'budget-tracking': {
    title: 'Creating and Managing Budgets',
    subtitle: 'Set realistic budget goals across 28 subcategories and track your progress',
    duration: '10 min read',
    category: 'Core Features',
    color: '#5e6c5b',
    sections: [
      {
        heading: 'The Ordino Budget Philosophy',
        content: 'Ordino\'s budget system is built on granularity and flexibility. Rather than broad categories like "Food" or "Entertainment," our 28 subcategories provide precise control over every aspect of your financial life, making it easier to identify exactly where your money goes.',
      },
      {
        heading: 'Understanding the 28 Subcategories',
        content: 'Ordino organizes your finances into five main groups with 28 total subcategories:',
        steps: [
          'Income (2): Fixed Income, Flexible Income',
          'Fixed Expenses (11): Rent/Mortgage, Utilities, Insurance, Loan Payments, Subscriptions, Childcare, Education, Healthcare, Transportation, Phone/Internet, Other Fixed',
          'Flexible Expenses (9): Groceries & Essentials, Dining & Coffee, Entertainment, Shopping, Health & Wellness, Personal Care, Gifts & Donations, Travel, Other Flexible',
          'Savings (3): TFSA, Savings Account, Emergency Fund',
          'Investments (3): Stocks & Bonds, Retirement Fund, Other Investments',
        ],
      },
      {
        heading: 'Setting Your First Budget',
        content: 'To create an effective budget in Ordino:',
        steps: [
          'Navigate to Tools > Category Budgets',
          'Start with Fixed Expenses - these are usually the easiest to budget',
          'Enter your actual monthly amounts for rent, utilities, insurance, etc.',
          'Move to Flexible Expenses and estimate realistic monthly limits',
          'Set savings goals based on your income after expenses',
          'Review investment contributions if applicable',
          'Save your budget and return to the Home page to see your overview',
        ],
      },
      {
        heading: 'The 50/30/20 Rule in Ordino',
        content: 'Ordino\'s category system aligns perfectly with the popular 50/30/20 budgeting rule:',
        steps: [
          '50% to Fixed Expenses (Needs): Use Ordino\'s Fixed Expenses categories',
          '30% to Flexible Expenses (Wants): Allocate across Flexible Expenses categories',
          '20% to Savings & Investments: Distribute between Savings and Investment categories',
        ],
        additionalText: 'Ordino automatically calculates your percentages and shows visual breakdowns on the Insights page.',
      },
      {
        heading: 'Tracking Budget Progress',
        content: 'Once your budgets are set, Ordino provides multiple ways to monitor your progress:',
        steps: [
          'Home Dashboard: See at-a-glance spending vs. budget for your top categories',
          'Insights Page: Detailed breakdowns with charts showing category performance',
          'Budget Preview Cards: Quick snapshot of selected categories on your home screen',
          'Category Detail Views: Deep dive into any subcategory with transaction history',
          'Progress Bars: Visual indicators showing percentage of budget used',
          'Color-Coded Alerts: Green (under budget), Yellow (approaching limit), Red (over budget)',
        ],
      },
      {
        heading: 'Adjusting Budgets Over Time',
        content: 'Your budget should evolve with your life. Ordino makes adjustments easy:',
        steps: [
          'Review your budget monthly - first week of each month works well',
          'Identify categories where you consistently over or under-spend',
          'Adjust budgets to reflect realistic spending patterns',
          'Consider seasonal variations (higher heating bills in winter, travel in summer)',
          'Update budgets when major life changes occur (new job, moving, etc.)',
        ],
      },
      {
        heading: 'Advanced Budget Strategies',
        content: 'Take your budgeting to the next level with these techniques:',
        steps: [
          'Zero-Based Budgeting: Allocate every dollar of income to a specific category',
          'Envelope Method Digital: Treat each category like a separate envelope of money',
          'Savings First: Set savings budgets and only spend what remains',
          'Percentage-Based: Allocate fixed percentages of income to each category',
          'Rolling Budgets: Carry unused budget amounts forward to the next month',
        ],
      },
    ],
  },
  'analytics-insights': {
    title: 'Understanding Your Analytics',
    subtitle: 'Dive deep into financial data with comprehensive charts and insights',
    duration: '12 min read',
    category: 'Advanced',
    color: '#ffa47d',
    sections: [
      {
        heading: 'The Power of Financial Analytics',
        content: 'Data becomes valuable when it tells a story. Ordino\'s analytics transform your transactions into actionable insights, revealing spending patterns, trends, and opportunities for optimization that would be impossible to spot manually.',
      },
      {
        heading: 'Navigating the Insights Page',
        content: 'The Insights page is your financial command center, featuring:',
        steps: [
          'Top Overview Cards: Quick stats on total spending, budget status, and trends',
          'Category Breakdown Charts: Pie charts showing spending distribution',
          'Spending Trends: Line graphs tracking expenses over time',
          'Budget Performance: Visual comparison of actual vs. budgeted spending',
          'Category Rankings: Lists showing your highest spending categories',
          'Month-over-Month Comparisons: Track changes in spending patterns',
        ],
      },
      {
        heading: 'Reading the Category Breakdown',
        content: 'The category breakdown pie chart is one of your most powerful analytical tools:',
        steps: [
          'Each slice represents one of your 28 subcategories',
          'Slice size is proportional to spending in that category',
          'Colors correspond to the 5 main category groups',
          'Hover over any slice to see exact amounts and percentages',
          'Click a slice to drill down into that category\'s details',
          'Use the legend to hide/show specific categories',
        ],
        additionalText: 'Look for unexpectedly large slices - these often reveal areas where small changes can yield significant savings.',
      },
      {
        heading: 'Trend Analysis Over Time',
        content: 'The spending trends graph shows how your expenses change month-to-month:',
        steps: [
          'View spending patterns for any time period (week, month, quarter, year)',
          'Identify seasonal spending variations (holiday shopping, summer travel)',
          'Spot upward or downward trends in specific categories',
          'Compare multiple categories side-by-side',
          'Set targets and track progress toward spending reduction goals',
        ],
      },
      {
        heading: 'Budget Performance Analysis',
        content: 'Understanding where you exceed or stay under budget is crucial for financial health:',
        steps: [
          'Green indicators show categories under budget - these are your wins',
          'Yellow indicators warn you\'re approaching budget limits',
          'Red indicators signal overspending that needs attention',
          'Review the "Best Performing Categories" section for positive reinforcement',
          'Use the "Areas for Improvement" section to focus optimization efforts',
        ],
      },
      {
        heading: 'Using the Analytics Comparison Tool',
        content: 'Access Tools > Analytics Comparison for advanced multi-period analysis:',
        steps: [
          'Compare any two time periods side-by-side',
          'See percentage changes for each category',
          'Identify which categories are growing or shrinking',
          'Understand the impact of budget changes over time',
          'Export comparison reports for deeper analysis',
        ],
      },
      {
        heading: 'Transaction-Level Insights',
        content: 'Go beyond summaries to understand individual spending events:',
        steps: [
          'From any analytics chart, drill down to view underlying transactions',
          'Filter transactions by date, amount, merchant, or category',
          'Identify unusual or unexpected transactions',
          'Track specific merchants or spending patterns',
          'Link transactions to receipts for complete context',
        ],
      },
      {
        heading: 'Making Data-Driven Decisions',
        content: 'Transform insights into action with these strategies:',
        steps: [
          'Weekly Review: Spend 10 minutes each week reviewing top spending categories',
          'Monthly Deep Dive: Analyze full month trends and compare to previous months',
          'Quarterly Planning: Use three-month trends to adjust long-term budgets',
          'Annual Review: Year-end analysis reveals big-picture patterns and guides next year\'s goals',
          'Continuous Optimization: Use insights to make small, consistent improvements',
        ],
      },
    ],
  },
  'vero-ai-guide': {
    title: 'Maximizing Vero AI',
    subtitle: 'Get personalized financial advice and insights from your AI assistant',
    duration: '7 min read',
    category: 'Advanced',
    color: '#5e6c5b',
    sections: [
      {
        heading: 'Meet Vero: Your Financial AI',
        content: 'Vero is Ordino\'s intelligent AI assistant, trained on financial best practices and personalized to understand your unique spending patterns. Available 24/7, Vero provides instant answers, actionable advice, and helpful insights tailored to your financial situation.',
      },
      {
        heading: 'Getting Started with Vero',
        content: 'Accessing Vero is simple - look for the chat icon throughout the Ordino app:',
        steps: [
          'Click the Vero chat icon in the bottom-right corner of any page',
          'Visit Resources > Vero AI for the dedicated chat interface',
          'Type your question or financial concern in natural language',
          'Vero analyzes your question and your personal financial data',
          'Receive instant, personalized responses with specific recommendations',
        ],
      },
      {
        heading: 'What to Ask Vero',
        content: 'Vero can help with a wide range of financial questions and scenarios:',
        steps: [
          '"How can I reduce my dining expenses?" - Get specific strategies based on your spending',
          '"Am I on track with my savings goals?" - Vero reviews your savings rate and progress',
          '"What\'s my biggest spending category?" - Instant analysis of your expense breakdown',
          '"Should I adjust my budget?" - Recommendations based on spending patterns',
          '"How much can I afford for a vacation?" - Analysis of flexible spending capacity',
          '"What are my subscription costs?" - Summary of recurring charges',
          '"Compare my spending this month vs. last month" - Side-by-side analysis',
          '"Help me create an emergency fund" - Personalized savings plan',
        ],
      },
      {
        heading: 'Vero\'s Analysis Capabilities',
        content: 'Vero has access to all your Ordino data and can provide:',
        steps: [
          'Real-time budget status across all 28 subcategories',
          'Historical spending trends and patterns',
          'Comparisons between different time periods',
          'Predictions of future spending based on historical data',
          'Identification of unusual or unexpected transactions',
          'Optimization suggestions for budget reallocation',
          'Savings opportunities and recommendations',
        ],
      },
      {
        heading: 'Practical Vero Use Cases',
        content: 'Here are real-world scenarios where Vero adds value:',
        steps: [
          'Pre-Purchase Consultations: "Can I afford a $200 purchase this month?"',
          'Category Deep Dives: "Why did my grocery spending increase this month?"',
          'Goal Setting: "Help me save $5,000 in 6 months"',
          'Problem Solving: "I\'m over budget in entertainment - what should I do?"',
          'Financial Learning: "Explain the 50/30/20 rule and how I compare"',
          'Quick Facts: "What\'s my average monthly dining cost?"',
        ],
      },
      {
        heading: 'Tips for Better Vero Conversations',
        content: 'Get the most accurate and helpful responses from Vero:',
        steps: [
          'Be specific about time periods (this month, last quarter, this year)',
          'Mention specific categories when asking about spending',
          'Ask follow-up questions to dive deeper into any topic',
          'Request actionable recommendations, not just information',
          'Use Vero as a sounding board for financial decisions',
          'Share your financial goals so Vero can provide goal-oriented advice',
        ],
      },
      {
        heading: 'Privacy and Limitations',
        content: 'Important information about Vero:',
        steps: [
          'All conversations are private and encrypted',
          'Vero only accesses your personal Ordino data - never shared with others',
          'Vero provides general guidance, not professional financial advice',
          'For tax, legal, or investment advice, always consult a qualified professional',
          'Vero\'s responses are based on your data and general financial principles',
          'You can delete conversation history at any time from Settings',
        ],
      },
      {
        heading: 'Vero Pro Tips',
        content: 'Advanced users get even more from Vero:',
        steps: [
          'Start conversations with context: "I\'m planning a big purchase..."',
          'Ask Vero to create action plans: "Give me a step-by-step plan to reduce debt"',
          'Request regular check-ins: "Remind me to review spending weekly"',
          'Use Vero for motivation: "Show me my financial progress this year"',
          'Combine with other Ordino features: Ask Vero, then review in Analytics',
        ],
      },
    ],
  },
  'security-privacy': {
    title: 'Security & Privacy Settings',
    subtitle: 'Protect your financial data with advanced security features',
    duration: '6 min read',
    category: 'Account Management',
    color: '#ffa47d',
    sections: [
      {
        heading: 'Your Data Security is Our Priority',
        content: 'Ordino employs bank-level security measures to protect your sensitive financial information. Every aspect of the platform is designed with privacy and security at its core, giving you complete control over your data.',
      },
      {
        heading: 'Account Security Basics',
        content: 'Start with these essential security practices:',
        steps: [
          'Create a strong, unique password (12+ characters, mix of types)',
          'Never share your password or login credentials',
          'Use a password manager to store your Ordino credentials securely',
          'Enable two-factor authentication (2FA) for additional protection',
          'Log out of shared or public devices after use',
          'Keep your registered email address secure and monitored',
        ],
      },
      {
        heading: 'Enabling Two-Factor Authentication',
        content: 'Add an extra layer of security to your account:',
        steps: [
          'Navigate to Settings > Security',
          'Click "Enable Two-Factor Authentication"',
          'Choose your preferred 2FA method (authenticator app or SMS)',
          'Follow the setup instructions to link your device',
          'Save your backup codes in a secure location',
          'Test 2FA by logging out and back in',
        ],
        additionalText: 'With 2FA enabled, even if someone obtains your password, they cannot access your account without your second authentication factor.',
      },
      {
        heading: 'Data Encryption',
        content: 'Understanding how Ordino protects your data:',
        steps: [
          'All data is encrypted in transit using TLS 1.3 (the same security banks use)',
          'Financial information is encrypted at rest using AES-256 encryption',
          'Receipt images are stored with encrypted file names and content',
          'Your password is hashed using bcrypt - even Ordino can\'t see it',
          'Banking connection tokens are encrypted with multiple layers of security',
        ],
      },
      {
        heading: 'Privacy Controls',
        content: 'You have complete control over your personal information:',
        steps: [
          'Access Settings > Privacy to view and modify privacy settings',
          'Control whether usage data is collected for feature improvements',
          'Opt in or out of email communications',
          'Choose whether to participate in anonymized analytics',
          'Manage third-party data sharing preferences',
          'Set retention periods for old transactions and receipts',
        ],
      },
      {
        heading: 'Connected Accounts Security',
        content: 'When linking bank accounts and credit cards:',
        steps: [
          'Ordino uses Plaid, a certified financial data aggregator',
          'Your bank credentials are never stored on Ordino servers',
          'Connections are read-only - Ordino cannot move money',
          'You can disconnect any account instantly from Settings',
          'Review connected accounts regularly and remove unused ones',
          'Monitor transaction imports for any unusual activity',
        ],
      },
      {
        heading: 'Session Management',
        content: 'Control your active sessions and device access:',
        steps: [
          'View all active sessions in Settings > Security > Active Sessions',
          'See device type, location, and last active time for each session',
          'Remotely log out of any suspicious or forgotten sessions',
          'Set automatic logout preferences (after 15 minutes, 1 hour, etc.)',
          'Receive email notifications for new device logins',
        ],
      },
      {
        heading: 'Data Export and Deletion',
        content: 'Your data is always yours:',
        steps: [
          'Export all your data anytime from Settings > Data & Privacy',
          'Download includes transactions, receipts, budgets, and analytics',
          'Choose format: CSV for spreadsheets, JSON for complete data',
          'Request account deletion from Settings - all data is permanently removed',
          'Deletion is complete within 30 days (with 30-day grace period for recovery)',
          'You receive email confirmation when deletion is complete',
        ],
      },
      {
        heading: 'Best Practices for Ongoing Security',
        content: 'Maintain strong security with these habits:',
        steps: [
          'Review your transactions weekly for unauthorized charges',
          'Update your password every 3-6 months',
          'Keep your email account secure (it\'s the key to password resets)',
          'Be cautious of phishing emails - Ordino will never ask for your password via email',
          'Report suspicious activity immediately to support@ordino.com',
          'Stay informed about security updates through Ordino\'s newsletter',
        ],
      },
    ],
  },
};

export function GuideContent({ onBack, onNavigate, guideId }: GuideContentProps) {
  const guide = guideData[guideId];

  if (!guide) {
    return (
      <div className="min-h-screen w-full bg-[#E9F0F1] flex items-center justify-center">
        <p
          className="text-[#686867] text-[18px]"
          style={{
            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
          }}
        >
          Guide not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-73px)] w-full bg-[#E9F0F1]">
      {/* Header */}
      <section className="bg-white/50 pt-24 pb-8 lg:pt-32 lg:pb-12 border-b border-[#686867]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          {/* Category Badge & Duration */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="px-4 py-1 rounded-full text-[12px] text-white"
              style={{
                backgroundColor: guide.color,
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                fontWeight: 500,
              }}
            >
              {guide.category}
            </div>
            <p
              className="text-[#686867] text-[14px]"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              }}
            >
              {guide.duration}
            </p>
          </div>

          <h1
            className="text-[#162a2c] text-[32px] sm:text-[44px] lg:text-[56px] leading-tight mb-4"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontWeight: 700,
            }}
          >
            {guide.title}
          </h1>
          <p
            className="text-[#686867] text-[18px] sm:text-[20px] mb-6"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              lineHeight: '1.6',
            }}
          >
            {guide.subtitle}
          </p>
          
          {/* Back Button - Now under subtitle */}
          <Button
            onClick={onBack}
            className="bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] transition-all duration-300 h-10 px-3 sm:px-4"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
            }}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            Back to Guides
          </Button>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border-2 border-[#686867]/20 shadow-lg space-y-10">
          {guide.sections.map((section: any, index: number) => (
            <div key={index}>
              <h2
                className="text-[#162a2c] text-[24px] sm:text-[28px] mb-4"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  fontWeight: 700,
                }}
              >
                {section.heading}
              </h2>
              <p
                className="text-[#686867] text-[16px] sm:text-[18px] mb-4 leading-relaxed"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  lineHeight: '1.7',
                }}
              >
                {section.content}
              </p>

              {section.steps && (
                <div className="space-y-3 mb-4">
                  {section.steps.map((step: string, stepIndex: number) => (
                    <div key={stepIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#5e6c5b] flex-shrink-0 mt-0.5" />
                      <p
                        className="text-[#686867] text-[16px] leading-relaxed"
                        style={{
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          letterSpacing: '0.02em',
                          lineHeight: '1.6',
                        }}
                      >
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {section.additionalText && (
                <p
                  className="text-[#686867] text-[16px] sm:text-[18px] mt-4 p-4 bg-[#E9F0F1] rounded-lg leading-relaxed"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    lineHeight: '1.7',
                  }}
                >
                  {section.additionalText}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Related Guides */}
        <div className="mt-12 p-6 bg-white/50 rounded-xl border border-[#686867]/20">
          <h3
            className="text-[#162a2c] text-[20px] mb-4"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontWeight: 700,
            }}
          >
            Continue Learning
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={onBack}
              className="bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] transition-all duration-300"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              }}
            >
              Browse All Guides
            </Button>
            <Button
              onClick={() => onNavigate?.('resources')}
              className="bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] transition-all duration-300"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              }}
            >
              Back to Resources
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      {onNavigate && <MarketingFooter onNavigate={onNavigate} />}
    </div>
  );
}