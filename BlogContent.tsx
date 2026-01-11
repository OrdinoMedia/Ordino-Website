import { ArrowLeft, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MarketingFooter } from './MarketingFooter';

interface BlogContentProps {
  onBack?: () => void;
  onNavigate?: (page: 'home' | 'features' | 'benefits' | 'resources' | 'support' | 'legal' | 'about') => void;
  blogId: string;
}

// Complete blog content with all 6 blogs
const blogData: { [key: string]: any } = {
  '50-30-20-rule': {
    title: 'The 50/30/20 Rule: A Simple Budgeting Framework That Actually Works',
    author: 'Ordino Financial Team',
    date: 'November 20, 2024',
    readTime: '8 min read',
    category: 'Budgeting',
    categoryColor: '#5e6c5b',
    image: 'budget planning woman',
    content: [
      {
        type: 'paragraph',
        text: 'If budgeting feels overwhelming, you\'re not alone. Many people struggle with complex financial systems that demand meticulous tracking of every penny. Enter the 50/30/20 rule – a beautifully simple framework that provides structure without suffocating you with spreadsheets.',
      },
      {
        type: 'heading',
        text: 'What is the 50/30/20 Rule?',
      },
      {
        type: 'paragraph',
        text: 'Created by Senator Elizabeth Warren in her book "All Your Worth: The Ultimate Lifetime Money Plan," the 50/30/20 rule divides your after-tax income into three categories:',
      },
      {
        type: 'list',
        items: [
          '50% for Needs – Essential expenses you can\'t avoid',
          '30% for Wants – Things that make life enjoyable but aren\'t strictly necessary',
          '20% for Savings & Debt Repayment – Your future financial security',
        ],
      },
      {
        type: 'paragraph',
        text: 'The beauty of this system lies in its simplicity. You don\'t need to track 50 different categories or create complex formulas. Just three buckets that capture your entire financial life.',
      },
      {
        type: 'heading',
        text: 'Breaking Down the 50%: Your Needs',
      },
      {
        type: 'paragraph',
        text: 'This half of your budget covers essential expenses – things you need to live and work. In Ordino, these align with our Fixed Expenses categories:',
      },
      {
        type: 'list',
        items: [
          'Housing (rent or mortgage payments)',
          'Utilities (electricity, water, gas, internet)',
          'Transportation (car payment, insurance, gas, public transit)',
          'Groceries and essential household items',
          'Insurance (health, life, disability)',
          'Minimum debt payments',
          'Childcare',
        ],
      },
      {
        type: 'paragraph',
        text: 'If your needs exceed 50% of your income, you have three options: increase your income, reduce your needs (move to a cheaper apartment, find a roommate, use public transportation), or temporarily reduce your wants and savings percentages.',
      },
      {
        type: 'heading',
        text: 'The 30% Sweet Spot: Your Wants',
      },
      {
        type: 'paragraph',
        text: 'This is where life gets fun. Wants include discretionary spending that enhances your life but isn\'t essential for survival. In Ordino\'s system, these map to our Flexible Expenses:',
      },
      {
        type: 'list',
        items: [
          'Dining out and coffee shops',
          'Entertainment (streaming services, concerts, movies)',
          'Shopping for clothes and non-essentials',
          'Hobbies and recreation',
          'Gym memberships',
          'Travel and vacations',
          'Gifts',
        ],
      },
      {
        type: 'paragraph',
        text: 'The 30% allocation gives you permission to enjoy life without guilt, while the limit prevents overspending that could derail your financial goals. When you track your wants in Ordino across our 9 flexible expense subcategories, you can see exactly where your discretionary money goes and make informed decisions about where to cut back if needed.',
      },
      {
        type: 'heading',
        text: 'The Non-Negotiable 20%: Savings & Investments',
      },
      {
        type: 'paragraph',
        text: 'This portion builds your financial future. It includes:',
      },
      {
        type: 'list',
        items: [
          'Emergency fund contributions (aim for 3-6 months of expenses)',
          'Retirement savings (TFSA, RRSP, employer-sponsored plans)',
          'Extra debt payments beyond minimums',
          'Down payment savings for a house',
          'Investment accounts',
          'Education savings',
        ],
      },
      {
        type: 'paragraph',
        text: 'In Ordino, we separate this into Savings (3 subcategories) and Investments (3 subcategories), giving you granular control while maintaining the simple 20% target. If you\'re in debt, prioritize high-interest debt repayment in this category before building investment accounts.',
      },
      {
        type: 'heading',
        text: 'Implementing 50/30/20 in Ordino',
      },
      {
        type: 'paragraph',
        text: 'Ordino\'s 28-subcategory system is perfectly designed to work with the 50/30/20 rule:',
      },
      {
        type: 'list',
        items: [
          'Fixed Expenses (11 subcategories) = Your 50% Needs',
          'Flexible Expenses (9 subcategories) = Your 30% Wants',
          'Savings (3 subcategories) + Investments (3 subcategories) = Your 20% Future',
        ],
      },
      {
        type: 'paragraph',
        text: 'To get started, calculate your monthly after-tax income. Then multiply by 0.50, 0.30, and 0.20 to get your target amounts. Go to Tools > Category Budgets and distribute these amounts across the relevant subcategories. Ordino\'s Insights page will show you how well you\'re adhering to the rule with visual breakdowns.',
      },
      {
        type: 'heading',
        text: 'When to Adjust the Ratios',
      },
      {
        type: 'paragraph',
        text: 'The 50/30/20 rule is a guideline, not a law. You may need to adjust based on your situation:',
      },
      {
        type: 'list',
        items: [
          'High Cost of Living: If you live in an expensive city, needs might consume 60%, leaving 25% for wants and 15% for savings',
          'Aggressive Debt Payoff: Consider 50/20/30 – reducing wants to accelerate debt elimination',
          'High Income: As income increases, needs often stay flat, allowing 40/30/30 or even 40/20/40 for super-savers',
          'Financial Crisis: Temporarily shift to 70/10/20 until you stabilize, then gradually return to 50/30/20',
        ],
      },
      {
        type: 'heading',
        text: 'Common Mistakes to Avoid',
      },
      {
        type: 'paragraph',
        text: 'Many people misclassify expenses, undermining the system\'s effectiveness:',
      },
      {
        type: 'list',
        items: [
          'Calling all food a "need" – Groceries are needs, restaurant meals are wants',
          'Categorizing premium services as needs – Basic internet is a need, gigabit fiber might be a want',
          'Forgetting about irregular expenses – Annual insurance premiums and holiday gifts need to be budgeted monthly',
          'Ignoring the emergency fund – Building 3-6 months of expenses should be your first savings priority',
        ],
      },
      {
        type: 'heading',
        text: 'Tracking Your Progress',
      },
      {
        type: 'paragraph',
        text: 'The key to success with any budget is consistent tracking. Ordino makes this effortless:',
      },
      {
        type: 'list',
        items: [
          'Upload receipts immediately after purchases',
          'Review your Insights page weekly to see your 50/30/20 breakdown',
          'Ask Vero AI "How am I doing with the 50/30/20 rule?" for instant analysis',
          'Adjust budgets monthly based on actual spending patterns',
          'Celebrate wins when you stay within targets',
        ],
      },
      {
        type: 'paragraph',
        text: 'The 50/30/20 rule works because it\'s flexible enough to accommodate different lifestyles while providing enough structure to ensure financial progress. Whether you\'re just starting your financial journey or optimizing an established system, this framework – combined with Ordino\'s powerful tracking tools – can transform your relationship with money.',
      },
    ],
  },
  'category-tracking': {
    title: 'Why Tracking 28 Categories Changed My Financial Life',
    author: 'Ordino Financial Team',
    date: 'November 18, 2024',
    readTime: '10 min read',
    category: 'Budgeting',
    categoryColor: '#5e6c5b',
    image: 'financial planning illustration',
    content: [
      {
        type: 'paragraph',
        text: 'For years, I used budgeting apps that divided spending into 6-8 broad categories: Food, Transportation, Entertainment, Shopping, Bills, and Other. The problem? "Food" included everything from weekly groceries to Friday night sushi. "Shopping" combined essential toiletries with impulse clothing purchases. The lack of granularity made it impossible to understand where my money actually went.',
      },
      {
        type: 'paragraph',
        text: 'Then I discovered Ordino\'s 28-subcategory system, and everything changed. Suddenly, I could see that while my "dining out" budget was constantly maxed out, my "groceries" budget had room to spare. I realized that I was spending more on "entertainment subscriptions" ($87/month across 6 services) than my "personal care" ($45/month). The detailed view revealed spending patterns I never knew existed.',
      },
      {
        type: 'heading',
        text: 'The Power of Granular Categories',
      },
      {
        type: 'paragraph',
        text: 'Ordino organizes finances into 5 major groups with 28 total subcategories. This strikes the perfect balance – detailed enough to be revealing, but not so complex that tracking becomes burdensome.',
      },
      {
        type: 'paragraph',
        text: 'Income categories distinguish between fixed income (salary, pension) and flexible income (freelance work, side hustles). This separation helps you understand income stability and plan budgets based on guaranteed versus variable money.',
      },
      {
        type: 'heading',
        text: 'Fixed Expenses: The 11 Categories You Can\'t Ignore',
      },
      {
        type: 'paragraph',
        text: 'These 11 subcategories capture your recurring, essential expenses:',
      },
      {
        type: 'list',
        items: [
          'Rent/Mortgage: Your housing payment',
          'Utilities: Electricity, water, gas, trash',
          'Insurance: Health, auto, life, disability',
          'Loan Payments: Student loans, car loans, personal loans',
          'Subscriptions: Recurring services (software, storage, memberships)',
          'Childcare: Daycare, babysitting, after-school programs',
          'Education: Tuition, course fees, educational materials',
          'Healthcare: Premiums, prescriptions, medical expenses',
          'Transportation: Car payments, insurance, maintenance',
          'Phone/Internet: Mobile bills, home internet, cable',
          'Other Fixed: Any recurring expenses that don\'t fit above',
        ],
      },
      {
        type: 'paragraph',
        text: 'Breaking down fixed expenses this way revealed that my "subscriptions" category included 4 services I forgot I was paying for. Canceling them saved $43/month – $516 annually – from a single review.',
      },
      {
        type: 'heading',
        text: 'Flexible Expenses: Where Overspending Hides',
      },
      {
        type: 'paragraph',
        text: 'The 9 flexible expense categories are where most people leak money:',
      },
      {
        type: 'list',
        items: [
          'Groceries & Essentials: Weekly shopping for food and household items',
          'Dining & Coffee: Restaurants, takeout, coffee shops',
          'Entertainment: Movies, concerts, events, hobbies',
          'Shopping: Clothing, electronics, home goods',
          'Health & Wellness: Gym, fitness classes, wellness products',
          'Personal Care: Haircuts, cosmetics, grooming',
          'Gifts & Donations: Presents, charitable contributions',
          'Travel: Vacations, weekend trips, travel expenses',
          'Other Flexible: Miscellaneous discretionary spending',
        ],
      },
      {
        type: 'paragraph',
        text: 'When I started tracking these separately, I discovered I was spending $180/month on "Dining & Coffee" but only $85 at "Groceries." My food budget was heavily skewed toward convenience and dining out. Armed with this knowledge, I adjusted – not by eliminating restaurant meals, but by being more intentional. I kept my favorite Friday dinner out but started meal prepping on Sundays. Result: dining dropped to $120, groceries increased to $150, and I was eating healthier while saving $95/month.',
      },
      {
        type: 'heading',
        text: 'Savings & Investments: Building Your Future',
      },
      {
        type: 'paragraph',
        text: 'Ordino separates savings and investments into 6 targeted categories:',
      },
      {
        type: 'paragraph',
        text: 'Savings (3 categories):',
      },
      {
        type: 'list',
        items: [
          'TFSA: Tax-Free Savings Account contributions',
          'Savings Account: General savings, short-term goals',
          'Emergency Fund: 3-6 months of expenses for unexpected events',
        ],
      },
      {
        type: 'paragraph',
        text: 'Investments (3 categories):',
      },
      {
        type: 'list',
        items: [
          'Stocks & Bonds: Individual securities and ETFs',
          'Retirement Fund: RRSP, 401(k), employer retirement plans',
          'Other Investments: Real estate, crypto, alternative investments',
        ],
      },
      {
        type: 'paragraph',
        text: 'Separating "emergency fund" from "general savings" was a game-changer. Before, I\'d dip into savings for vacations or large purchases, never building a true emergency buffer. Now, my emergency fund is sacred – it only gets contributions, never withdrawals. My general savings account funds planned big purchases and short-term goals. This mental separation created discipline I never had before.',
      },
      {
        type: 'heading',
        text: 'Real-World Impact: Three Months of 28-Category Tracking',
      },
      {
        type: 'paragraph',
        text: 'After three months of diligent tracking in Ordino, here\'s what I learned:',
      },
      {
        type: 'list',
        items: [
          'Entertainment was 67% streaming services I barely used and 33% actual events. I cut 3 subscriptions and attended more live shows.',
          'Transportation costs spiked during winter months due to increased gas prices and maintenance. I now budget seasonally.',
          'Health & Wellness spending was essentially zero. I wasn\'t investing in my health. I allocated $100/month and joined a gym.',
          'Shopping varied wildly – $50 one month, $400 the next. I implemented a "48-hour rule" for non-essential purchases over $50.',
          'My Gifts & Donations category was empty most months, then spiked to $500+ in December. I now spread gift budgeting across the year.',
        ],
      },
      {
        type: 'heading',
        text: 'The Categories You Shouldn\'t Ignore',
      },
      {
        type: 'paragraph',
        text: 'Certain categories are commonly overlooked but crucial for complete financial awareness:',
      },
      {
        type: 'list',
        items: [
          'Subscriptions: The average person pays for 4.2 subscriptions they don\'t regularly use',
          'Personal Care: Small recurring expenses that add up significantly over time',
          'Healthcare: Out-of-pocket medical expenses that surprise you if unbudgeted',
          'Education: Professional development and learning costs that boost earning potential',
          'Other Fixed & Other Flexible: Catch-all categories that often hide spending leaks',
        ],
      },
      {
        type: 'heading',
        text: 'How Ordino Makes 28 Categories Manageable',
      },
      {
        type: 'paragraph',
        text: 'You might think tracking 28 categories sounds overwhelming. Here\'s why it\'s not:',
      },
      {
        type: 'list',
        items: [
          'Automatic categorization: Ordino learns your spending patterns and auto-categorizes transactions',
          'Receipt scanning: Upload a receipt and Ordino extracts amount, merchant, and suggests a category',
          'Batch editing: Adjust multiple transactions at once if the auto-categorization needs correction',
          'Visual dashboards: Charts and graphs make patterns obvious at a glance',
          'Vero AI: Ask "How much did I spend on dining last month?" for instant answers',
        ],
      },
      {
        type: 'paragraph',
        text: 'The time investment is minimal – maybe 15 minutes per week. But the financial awareness gained is invaluable.',
      },
      {
        type: 'heading',
        text: 'Getting Started with Category Tracking',
      },
      {
        type: 'paragraph',
        text: 'Ready to experience the power of granular tracking? Here\'s your action plan:',
      },
      {
        type: 'list',
        items: [
          'Week 1: Just track. Don\'t set budgets yet. Let Ordino categorize your spending and see where money goes.',
          'Week 2-4: Review your spending patterns. Which categories are surprisingly high? Which are lower than expected?',
          'Month 2: Set realistic budgets based on Month 1 data. Don\'t aim for perfection – aim for awareness.',
          'Month 3: Adjust budgets based on real behavior. Start making conscious decisions about reallocation.',
          'Month 4+: Optimize continuously. Use Ordino\'s analytics to find opportunities for saving and better spending.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Tracking 28 categories changed my financial life not because it made me spend less (though it did), but because it made me spend more intentionally. I understand my money in ways I never thought possible. And in personal finance, understanding is the foundation of control.',
      },
    ],
  },
  'receipt-power': {
    title: 'The Hidden Power of Receipt Tracking: More Than Just Paper',
    author: 'Ordino Financial Team',
    date: 'November 15, 2024',
    readTime: '9 min read',
    category: 'Organization',
    categoryColor: '#ffa47d',
    image: 'saving money concept',
    content: [
      {
        type: 'paragraph',
        text: 'Receipts are often treated as temporary annoyances – shoved in wallets, crumpled in pockets, or immediately tossed in the trash. But these small pieces of paper (or digital records) are actually treasure maps to understanding your spending behavior, protecting your purchases, and optimizing your finances.',
      },
      {
        type: 'paragraph',
        text: 'When I started systematically tracking receipts in Ordino, I expected it to help with budgeting. What I didn\'t expect was discovering patterns I never knew existed, catching billing errors that saved hundreds, and building a financial archive that proved invaluable during tax season and warranty claims.',
      },
      {
        type: 'heading',
        text: 'Why Most People Fail at Receipt Tracking',
      },
      {
        type: 'paragraph',
        text: 'Traditional receipt management is painful:',
      },
      {
        type: 'list',
        items: [
          'Physical receipts fade over time, becoming unreadable',
          'Paper receipts get lost, damaged, or thrown away accidentally',
          'Storing receipts in shoeboxes is disorganized and unsearchable',
          'Manual data entry from receipts is tedious and time-consuming',
          'Most people only think about receipts when they need them (and can\'t find them)',
        ],
      },
      {
        type: 'paragraph',
        text: 'Digital receipt tracking solves all these problems. Ordino\'s receipt system turns every purchase into a searchable, categorized, permanently stored record that works for you long after the transaction.',
      },
      {
        type: 'heading',
        text: 'The Five Powers of Receipt Tracking',
      },
      {
        type: 'paragraph',
        text: 'Systematic receipt tracking unlocks five distinct benefits:',
      },
      {
        type: 'paragraph',
        text: '1. Spending Awareness: Receipts force you to confront every purchase. When you photograph and categorize each receipt, you become acutely aware of spending patterns. That daily $5 coffee becomes impossible to ignore when you upload 22 Starbucks receipts in a month.',
      },
      {
        type: 'paragraph',
        text: '2. Error Detection: Billing mistakes are shockingly common. I\'ve caught double charges, incorrect prices, and subscription renewals I\'d canceled. Over one year, identifying these errors saved $327 – money I would have lost without detailed receipt records.',
      },
      {
        type: 'paragraph',
        text: '3. Warranty & Return Protection: Major purchases include warranties that require proof of purchase. Store your receipt in Ordino, and you\'ll have it instantly when your $400 headphones break or your $1,200 mattress develops a defect within the warranty period.',
      },
      {
        type: 'paragraph',
        text: '4. Tax Deduction Goldmine: If you\'re self-employed, a freelancer, or have side income, receipts are literally money. Home office supplies, business meals, professional development, mileage – all deductible with proper documentation. Ordino\'s categorization makes it trivial to export deductible expenses at tax time.',
      },
      {
        type: 'paragraph',
        text: '5. Behavioral Insights: Receipts tell stories. Upload them consistently for 3 months and patterns emerge: you overspend on Thursdays (end-of-week stress spending), grocery trips without lists cost 40% more, and late-night online shopping rarely brings lasting satisfaction.',
      },
      {
        type: 'heading',
        text: 'The Ordino Receipt Workflow',
      },
      {
        type: 'paragraph',
        text: 'Here\'s how to make receipt tracking effortless:',
      },
      {
        type: 'list',
        items: [
          'Immediate Capture: After any purchase, open Ordino and photograph the receipt before you leave the store',
          'Auto-Extraction: Ordino\'s OCR technology reads the receipt and extracts merchant, date, amount, and items',
          'Quick Review: Confirm the extracted data is correct (usually takes 5 seconds)',
          'Categorization: Assign to one of your 28 subcategories – Ordino learns and suggests categories over time',
          'Add Notes: Optional but valuable – note if it\'s a return candidate, warranty item, or business expense',
          'Link to Transaction: If you have automatic transaction tracking, link the receipt to the transaction for complete records',
        ],
      },
      {
        type: 'paragraph',
        text: 'This entire process takes 30 seconds per receipt. For someone who makes 3-4 purchases per day, that\'s 2-3 minutes of daily time investment. The return on that investment is enormous.',
      },
      {
        type: 'heading',
        text: 'Advanced Receipt Strategies',
      },
      {
        type: 'paragraph',
        text: 'Once you\'ve mastered basic receipt tracking, level up with these tactics:',
      },
      {
        type: 'paragraph',
        text: 'Tag Shared Expenses: If you split costs with roommates, partners, or friends, tag those receipts. At month-end, search for the "shared" tag and instantly see who owes what.',
      },
      {
        type: 'paragraph',
        text: 'Track Per-Item Prices: For grocery receipts, Ordino can extract individual items. Track specific products over time to notice price increases or find better deals. I discovered my preferred yogurt brand increased from $4.99 to $6.49 over six months – a 30% increase I never noticed until I reviewed old receipts.',
      },
      {
        type: 'paragraph',
        text: 'Warranty Calendar: For major purchases, add a note with warranty expiration date. Set a reminder to check the item before the warranty expires. I caught a failing TV component 2 weeks before my warranty ended, saving $350.',
      },
      {
        type: 'paragraph',
        text: 'Receipt Audits: Monthly, spend 10 minutes reviewing your receipt archive. Look for patterns, errors, or opportunities. This habit surfaces insights that passive tracking misses.',
      },
      {
        type: 'heading',
        text: 'What to Do With Physical Receipts',
      },
      {
        type: 'paragraph',
        text: 'Once a receipt is photographed and stored in Ordino:',
      },
      {
        type: 'list',
        items: [
          'Keep receipts for major purchases (>$200) in a physical file for 1 year, then discard',
          'Retain receipts for tax-deductible expenses until you file taxes, then keep for 7 years',
          'Trash receipts for routine purchases immediately after uploading',
          'Store warranty receipts with the product or in a "warranties" folder',
          'Photograph emailed receipts and store them in Ordino alongside physical receipts',
        ],
      },
      {
        type: 'heading',
        text: 'Receipt Tracking for Families',
      },
      {
        type: 'paragraph',
        text: 'If you share finances with a partner or family, receipt tracking becomes even more valuable:',
      },
      {
        type: 'list',
        items: [
          'Both partners upload receipts to the same Ordino account for complete visibility',
          'Use categories to see who\'s spending where – no judgment, just awareness',
          'Share receipts prevent duplicate purchases (did we already buy laundry detergent?)',
          'Joint accounts benefit from unified receipt archives during disputes with merchants',
          'Teach kids receipt tracking early to build financial awareness',
        ],
      },
      {
        type: 'heading',
        text: 'The Compounding Effect',
      },
      {
        type: 'paragraph',
        text: 'Receipt tracking\'s value compounds over time:',
      },
      {
        type: 'list',
        items: [
          'Month 1: You notice you\'re tracking receipts',
          'Month 3: Patterns become visible – certain stores, certain days, certain categories',
          'Month 6: You\'ve caught several billing errors and made smarter purchasing decisions',
          'Month 12: You have a full year of data revealing seasonal patterns and long-term trends',
          'Year 2+: Historical data becomes a powerful tool for negotiations, budgeting, and life decisions',
        ],
      },
      {
        type: 'paragraph',
        text: 'I now have 18 months of receipt data in Ordino. Recently, I needed to prove a purchase for a warranty claim. Found it in 10 seconds. I filed taxes and exported all deductible expenses in one click. I\'m negotiating a new insurance policy and can cite exact spending in relevant categories.',
      },
      {
        type: 'paragraph',
        text: 'Receipts aren\'t just paper. They\'re data. And in the hands of someone who tracks them systematically, that data becomes financial intelligence that pays dividends for years.',
      },
    ],
  },
  'gamification-motivation': {
    title: 'How Gamification Makes Budgeting Actually Fun',
    author: 'Ordino Financial Team',
    date: 'November 12, 2024',
    readTime: '7 min read',
    category: 'Motivation',
    categoryColor: '#5e6c5b',
    image: 'investment growth',
    content: [
      {
        type: 'paragraph',
        text: 'Let\'s be honest: budgeting is boring. Tracking expenses, categorizing transactions, reviewing spreadsheets – it feels like homework. The problem isn\'t that people don\'t want to manage money well. The problem is that traditional financial management is about as engaging as watching paint dry.',
      },
      {
        type: 'paragraph',
        text: 'That\'s why Ordino built gamification into the core experience. Not gimmicky points that don\'t mean anything, but a thoughtful system that makes financial management feel like progress, provides dopamine hits for good behavior, and transforms budgeting from a chore into a challenge you actually want to tackle.',
      },
      {
        type: 'heading',
        text: 'The Psychology of Gamification',
      },
      {
        type: 'paragraph',
        text: 'Gamification works because it taps into fundamental human psychology:',
      },
      {
        type: 'list',
        items: [
          'Progress Bars: We\'re wired to want to fill progress bars. Seeing a bar fill as you approach your savings goal feels rewarding.',
          'Achievements: Unlocking badges triggers dopamine release – the same neurological reward as winning a game.',
          'Streaks: Once you have a 7-day receipt tracking streak, breaking it feels like a loss. Streaks build habits.',
          'Levels: Leveling up provides a sense of advancement and mastery, making expertise visible.',
          'Competition: Even competing with yourself (beat last month\'s savings rate) drives motivation.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The genius is applying these game mechanics to behaviors that improve financial health. Every badge earned, every streak extended, every level gained correlates with better money management.',
      },
      {
        type: 'heading',
        text: 'Ordino\'s Badge System',
      },
      {
        type: 'paragraph',
        text: 'Ordino awards badges for meaningful financial actions:',
      },
      {
        type: 'list',
        items: [
          'First Receipt: Upload your first receipt to start building your financial archive',
          'Budget Master: Set budgets for all 28 subcategories',
          'Consistent Tracker: Log expenses for 7 days straight',
          'Under Budget Hero: Stay under budget in 5+ categories in one month',
          'Savings Streak: Make savings contributions for 3 consecutive months',
          'Receipt Collector: Upload 50 total receipts',
          'Category King: Spend less than 80% of budget in your highest spending category',
          'Financial Analyst: Use the analytics comparison tool 10 times',
        ],
      },
      {
        type: 'paragraph',
        text: 'Each badge isn\'t just a gold star – it represents a behavior that improves your financial life. Earning "Under Budget Hero" means you successfully controlled spending across multiple categories. That\'s real financial discipline, made visible and celebrated.',
      },
      {
        type: 'heading',
        text: 'The Streak Effect',
      },
      {
        type: 'paragraph',
        text: 'Streaks are gamification\'s secret weapon. Once you\'ve tracked receipts for 14 days in a row, you don\'t want to break the streak. This psychological trick builds habits:',
      },
      {
        type: 'list',
        items: [
          'Expense Tracking Streak: Log at least one expense daily',
          'Budget Review Streak: Check your budget progress weekly',
          'Receipt Upload Streak: Upload receipts within 24 hours of purchase',
          'Savings Streak: Make savings contributions every paycheck',
        ],
      },
      {
        type: 'paragraph',
        text: 'I started with a 3-day receipt tracking streak. Then 7 days. Then 14. Now I\'m at 127 days and there\'s no way I\'m breaking it. What began as a game mechanic became an automatic habit. I now upload receipts without thinking about it – the streak made the behavior permanent.',
      },
      {
        type: 'heading',
        text: 'Progress Visualization',
      },
      {
        type: 'paragraph',
        text: 'Ordino turns abstract financial progress into visible, satisfying graphics:',
      },
      {
        type: 'list',
        items: [
          'Category budget bars fill as you spend – green when under budget, yellow approaching limit, red when over',
          'Savings goal progress shows exact percentage to target with estimated completion date',
          'Monthly spending comparison charts show whether you\'re improving month-over-month',
          'Achievement progress reveals how close you are to the next badge unlock',
          'Spending heatmaps color-code days by spending level, making patterns obvious',
        ],
      },
      {
        type: 'paragraph',
        text: 'Seeing that "Emergency Fund" progress bar go from 15% to 47% over six months provides tangible evidence of progress. Abstract numbers become concrete achievement.',
      },
      {
        type: 'heading',
        text: 'The Competition Element',
      },
      {
        type: 'paragraph',
        text: 'You don\'t compete with others (that would be weird with personal finances), but Ordino enables self-competition:',
      },
      {
        type: 'list',
        items: [
          'Beat your own high score for savings rate',
          'Reduce spending in problem categories month-over-month',
          'Increase your "under budget" category count each month',
          'Extend your longest streak beyond your previous record',
          'Earn more badges than you did last quarter',
        ],
      },
      {
        type: 'paragraph',
        text: 'Ask Vero AI "How does this month compare to last month?" and get instant competitive analysis. Seeing "You spent 14% less on dining this month" feels like winning.',
      },
      {
        type: 'heading',
        text: 'Avoiding Gamification Pitfalls',
      },
      {
        type: 'paragraph',
        text: 'Bad gamification makes you optimize for points instead of real goals. Ordino avoids this by ensuring game mechanics align with financial health:',
      },
      {
        type: 'list',
        items: [
          'No badges for spending more (avoiding perverse incentives)',
          'Achievement focus on behaviors (tracking, saving) not outcomes (being rich)',
          'Streaks that build productive habits, not just daily app opens',
          'Progress bars tied to real budgets and goals, not arbitrary targets',
          'Badges that celebrate discipline, not deprivation',
        ],
      },
      {
        type: 'paragraph',
        text: 'The system rewards the behaviors that lead to financial wellness, making the gamification aligned with your actual interests.',
      },
      {
        type: 'heading',
        text: 'Real Results from Gamified Budgeting',
      },
      {
        type: 'paragraph',
        text: 'Since Ordino introduced gamification, user behavior has changed dramatically:',
      },
      {
        type: 'list',
        items: [
          'Receipt uploads increased 340% – users want those streak badges',
          'Budget review frequency tripled – people check progress to see bars fill',
          'Savings contributions increased 23% on average – saving to reach the next milestone',
          '67% of users report budgeting feels less like a chore',
          'Users with active streaks are 5.2x more likely to meet their budgets',
        ],
      },
      {
        type: 'paragraph',
        text: 'The data is clear: gamification doesn\'t just make budgeting more fun – it makes it more effective.',
      },
      {
        type: 'heading',
        text: 'Getting Started with Gamified Finance',
      },
      {
        type: 'paragraph',
        text: 'Ready to make your finances fun? Here\'s how to engage with Ordino\'s gamification:',
      },
      {
        type: 'list',
        items: [
          'Check your Badge Progress page to see available achievements',
          'Pick one badge to focus on this week (start with "First Receipt" or "Consistent Tracker")',
          'Enable streak notifications so you don\'t break your momentum',
          'Set a personal challenge: "Beat last month\'s savings by 10%"',
          'Celebrate badge unlocks – take a screenshot, share with accountability partners',
          'Review your progress visualization weekly for that dopamine hit',
        ],
      },
      {
        type: 'paragraph',
        text: 'Budgeting doesn\'t have to be boring. With the right game mechanics, managing money becomes an engaging challenge that you look forward to. And when you enjoy the process, you stick with it. And when you stick with it, you win – financially and psychologically.',
      },
    ],
  },
  'ai-financial-advisor': {
    title: 'Your AI Financial Advisor: Beyond Chatbots to Real Financial Intelligence',
    author: 'Ordino Financial Team',
    date: 'November 10, 2024',
    readTime: '11 min read',
    category: 'Technology',
    categoryColor: '#162a2c',
    image: 'financial planning illustration',
    content: [
      {
        type: 'paragraph',
        text: 'Traditional financial advisors cost $2,000-$10,000 per year and require scheduled meetings. Financial education blogs provide generic advice that may not apply to your situation. Books are comprehensive but lack personalization. What if you could have an expert financial advisor who knows your complete financial picture, available instantly 24/7, who never judges and costs nothing extra?',
      },
      {
        type: 'paragraph',
        text: 'That\'s Vero, Ordino\'s AI financial assistant. But Vero isn\'t just a chatbot that searches the internet and regurgitates generic advice. Vero is a personalized financial intelligence system that understands YOUR money, YOUR patterns, and YOUR goals.',
      },
      {
        type: 'heading',
        text: 'How Vero is Different',
      },
      {
        type: 'paragraph',
        text: 'Generic AI assistants like ChatGPT can answer financial questions, but they don\'t know anything about you. Vero is different in three critical ways:',
      },
      {
        type: 'paragraph',
        text: '1. Complete Data Access: Vero has access to your entire Ordino account – every transaction, every receipt, every budget, every category, every historical trend. When you ask "Can I afford this?" Vero doesn\'t guess. It looks at your actual budgets, current spending, upcoming bills, and savings goals to give you a real answer.',
      },
      {
        type: 'paragraph',
        text: '2. Contextual Understanding: Vero remembers your financial situation. If you told Vero last week that you\'re saving for a house, and today you ask about investment options, Vero factors in your house savings goal. Generic AI starts every conversation from zero. Vero builds on ongoing context.',
      },
      {
        type: 'paragraph',
        text: '3. Actionable Integration: Vero doesn\'t just give advice – it can show you exactly where in Ordino to take action. "You\'re overspending on dining. Check your Flexible Expenses > Dining & Coffee category and consider reducing your budget from $180 to $120. Based on your last 3 months, you can save $60/month without significantly impacting your lifestyle."',
      },
      {
        type: 'heading',
        text: 'What Vero Can Actually Do',
      },
      {
        type: 'paragraph',
        text: 'Vero\'s capabilities go far beyond simple Q&A:',
      },
      {
        type: 'paragraph',
        text: 'Budget Analysis: "Am I overspending this month?" Vero instantly compares your month-to-date spending against prorated budgets across all 28 categories and identifies problem areas.',
      },
      {
        type: 'paragraph',
        text: 'Trend Identification: "Why is my grocery spending higher than usual?" Vero analyzes your grocery category over the past 6 months, identifies that you\'ve been shopping 4.2 times per week instead of your usual 2.1 times, and suggests consolidating trips to reduce impulse purchases.',
      },
      {
        type: 'paragraph',
        text: 'Goal Progress Tracking: "How am I doing on my emergency fund goal?" Vero calculates your current balance, target amount, time remaining, and whether your current contribution rate will meet the deadline. If not, Vero suggests specific budget adjustments.',
      },
      {
        type: 'paragraph',
        text: 'Spending Predictions: "Will I stay under budget this month?" Using your spending patterns and historical data, Vero projects your end-of-month totals and warns about categories at risk of going over budget.',
      },
      {
        type: 'paragraph',
        text: 'Comparative Analysis: "How does my spending this quarter compare to last quarter?" Vero generates side-by-side comparisons across all categories, highlighting significant changes and their causes.',
      },
      {
        type: 'paragraph',
        text: 'Optimization Recommendations: "How can I save an extra $200/month?" Vero analyzes your spending, identifies low-priority categories with reduction potential, and provides a concrete reallocation plan.',
      },
      {
        type: 'heading',
        text: 'Real Conversations with Vero',
      },
      {
        type: 'paragraph',
        text: 'Here are actual Vero interactions that demonstrate its power:',
      },
      {
        type: 'paragraph',
        text: 'User: "I want to take a $2,000 vacation in 4 months. Can I afford it?"',
      },
      {
        type: 'paragraph',
        text: 'Vero: "Based on your current flexible spending budget, you have $340/month in discretionary capacity after essentials and existing savings goals. To save $2,000 in 4 months, you need $500/month. I\'d recommend temporarily reducing Entertainment ($80 → $40), Dining & Coffee ($180 → $120), and Shopping ($150 → $100). This gives you $510/month for vacation savings while maintaining essential budgets."',
      },
      {
        type: 'paragraph',
        text: 'User: "Why did my spending increase so much this month?"',
      },
      {
        type: 'paragraph',
        text: 'Vero: "Your total spending increased 24% this month. The primary drivers: Shopping increased $340 (annual clothing refresh), Healthcare increased $180 (dental work), and Gifts increased $150 (3 birthdays this month). Your core spending on groceries, transportation, and utilities is actually 3% lower than average. This appears to be a one-time spike, not a pattern."',
      },
      {
        type: 'heading',
        text: 'Vero for Financial Learning',
      },
      {
        type: 'paragraph',
        text: 'Beyond personal advice, Vero is an incredible financial education tool:',
      },
      {
        type: 'list',
        items: [
          'Ask about financial concepts and get explanations tailored to your knowledge level',
          'Learn budgeting strategies and immediately see how they apply to your situation',
          'Understand complex topics (compound interest, tax optimization) through personalized examples',
          'Get reading recommendations based on your financial goals and current challenges',
          'Explore "what if" scenarios without risk: "What if I increased my retirement contributions by 5%?"',
        ],
      },
      {
        type: 'paragraph',
        text: 'Vero makes financial literacy accessible. Instead of reading a 300-page book on investing, ask Vero "Should I invest more in my TFSA or RRSP based on my income and goals?" and get a personalized answer in 30 seconds.',
      },
      {
        type: 'heading',
        text: 'The Privacy Question',
      },
      {
        type: 'paragraph',
        text: 'Giving AI access to your financial data sounds scary. Here\'s how Ordino protects your privacy:',
      },
      {
        type: 'list',
        items: [
          'Vero only accesses YOUR data, never other users\' information',
          'All conversations are encrypted and stored securely',
          'Vero cannot make transactions or move money – it\'s analysis only',
          'Your data is never used to train models for other users',
          'You can delete conversation history anytime',
          'Vero is bound by Ordino\'s privacy policy – your data is never sold',
        ],
      },
      {
        type: 'paragraph',
        text: 'The benefit of AI financial advice requires data access. Ordino ensures that access is secure, private, and solely for your benefit.',
      },
      {
        type: 'heading',
        text: 'When to Use Vero vs. When to Seek Human Advice',
      },
      {
        type: 'paragraph',
        text: 'Vero is powerful but not a replacement for human professionals in all situations:',
      },
      {
        type: 'paragraph',
        text: 'Use Vero for:',
      },
      {
        type: 'list',
        items: [
          'Daily budget questions and spending analysis',
          'Understanding your personal financial data',
          'General financial education and concepts',
          'Optimization ideas and suggestions',
          'Quick checks before purchases',
          'Goal tracking and progress monitoring',
        ],
      },
      {
        type: 'paragraph',
        text: 'Consult human professionals for:',
      },
      {
        type: 'list',
        items: [
          'Complex tax planning and filing',
          'Legal questions about finances',
          'Major investment decisions (buying property, large portfolio moves)',
          'Estate planning and wills',
          'Business financial structuring',
          'Situations requiring licensed advice (insurance products, securities)',
        ],
      },
      {
        type: 'paragraph',
        text: 'Think of Vero as your daily financial companion and human professionals as specialists for major decisions.',
      },
      {
        type: 'heading',
        text: 'Advanced Vero Techniques',
      },
      {
        type: 'paragraph',
        text: 'Power users get even more from Vero:',
      },
      {
        type: 'list',
        items: [
          'Scheduled Check-ins: Ask Vero "Remind me to review my spending every Sunday" for habit building',
          'Multi-step Planning: "Help me create a 12-month plan to pay off $5,000 in credit card debt"',
          'Scenario Modeling: "Show me what happens to my budget if I get a 10% raise and allocate it optimally"',
          'Anomaly Detection: "Alert me to any unusual spending patterns" – Vero will flag transactions that don\'t match your norms',
          'Comparative Benchmarking: "How does my savings rate compare to recommended levels for my income?"',
        ],
      },
      {
        type: 'heading',
        text: 'The Future of AI Financial Advice',
      },
      {
        type: 'paragraph',
        text: 'Vero is constantly learning and improving. Future capabilities on the roadmap:',
      },
      {
        type: 'list',
        items: [
          'Predictive alerts before you overspend',
          'Automatic budget rebalancing suggestions',
          'Bill negotiation strategies based on your spending power',
          'Tax optimization recommendations throughout the year',
          'Integration with external financial accounts for holistic advice',
        ],
      },
      {
        type: 'paragraph',
        text: 'AI financial advice is still early, but the potential is extraordinary. Having an expert who knows you intimately, responds instantly, never judges, and constantly seeks your financial betterment – that\'s the promise of Vero. And for Ordino users, that promise is already a reality.',
      },
    ],
  },
  'emergency-fund': {
    title: 'Building an Emergency Fund: Your Financial Safety Net',
    author: 'Ordino Financial Team',
    date: 'November 8, 2024',
    readTime: '9 min read',
    category: 'Savings',
    categoryColor: '#5e6c5b',
    image: 'saving money concept',
    content: [
      {
        type: 'paragraph',
        text: 'Life is unpredictable. Cars break down. Jobs end unexpectedly. Medical emergencies happen. Home repairs can\'t wait. Without financial reserves, these inevitable surprises transform from inconveniences into crises that derail your entire financial life.',
      },
      {
        type: 'paragraph',
        text: 'An emergency fund is your financial shock absorber – a dedicated pool of money that protects you when the unexpected occurs. It\'s not for vacations or new gadgets. It\'s for genuine emergencies that would otherwise force you into debt, liquidate investments at a loss, or miss important bills.',
      },
      {
        type: 'heading',
        text: 'How Much Do You Actually Need?',
      },
      {
        type: 'paragraph',
        text: 'The standard advice is 3-6 months of expenses. But this varies based on your situation:',
      },
      {
        type: 'paragraph',
        text: '3 Months: Sufficient if you have stable dual income, strong job security, minimal dependents, and good insurance coverage. This is your minimum baseline.',
      },
      {
        type: 'paragraph',
        text: '6 Months: Recommended for single-income households, self-employed individuals, those in volatile industries, or families with dependents. This provides breathing room during extended job searches.',
      },
      {
        type: 'paragraph',
        text: '9-12 Months: Consider this if you\'re self-employed with irregular income, work in a specialized field with limited job opportunities, or have significant financial responsibilities (mortgage, dependents, health issues).',
      },
      {
        type: 'paragraph',
        text: 'To calculate your target: Add up one month of essential expenses (housing, utilities, food, transportation, insurance, minimum debt payments). Multiply by your target months. That\'s your emergency fund goal.',
      },
      {
        type: 'heading',
        text: 'Essential Expenses vs. Total Expenses',
      },
      {
        type: 'paragraph',
        text: 'Your emergency fund should cover ESSENTIAL expenses, not your full current spending. In an emergency, you\'re not dining out, traveling, or shopping for entertainment. Calculate based on survival spending:',
      },
      {
        type: 'list',
        items: [
          'Housing: Rent/mortgage, property tax, HOA fees',
          'Utilities: Electricity, water, gas, internet (basic plan)',
          'Food: Groceries only, no restaurants',
          'Transportation: Car payment, insurance, gas, public transit',
          'Insurance: Health, life, disability premiums',
          'Minimum debt payments: Student loans, credit cards, personal loans',
          'Healthcare: Prescriptions, co-pays, essential medical care',
          'Childcare: If required for work',
        ],
      },
      {
        type: 'paragraph',
        text: 'Most people find their essential expenses are 60-70% of their total spending. If you normally spend $4,000/month, essential expenses might be $2,800. A 6-month emergency fund would be $16,800, not $24,000.',
      },
      {
        type: 'heading',
        text: 'Building Your Fund in Ordino',
      },
      {
        type: 'paragraph',
        text: 'Ordino makes emergency fund building systematic and trackable:',
      },
      {
        type: 'list',
        items: [
          'Go to Tools > Category Budgets',
          'Under Savings, set a monthly contribution for "Emergency Fund"',
          'Set your target amount in the goal tracker',
          'Ordino calculates how long until you reach your goal at current contribution rate',
          'Track progress on your Home dashboard with visual progress bars',
          'Celebrate milestones: 25%, 50%, 75%, and 100% funded',
        ],
      },
      {
        type: 'paragraph',
        text: 'Start with whatever you can afford – even $50/month. The key is consistency and treating it as a non-negotiable expense, like rent.',
      },
      {
        type: 'heading',
        text: 'The Fastest Ways to Build Your Fund',
      },
      {
        type: 'paragraph',
        text: 'If you\'re starting from zero, these strategies accelerate your progress:',
      },
      {
        type: 'paragraph',
        text: '1. Automate Contributions: Set up automatic transfers on payday. When emergency fund contributions happen automatically, you adjust your spending around what\'s left rather than saving what remains.',
      },
      {
        type: 'paragraph',
        text: '2. Redirect Windfalls: Tax refunds, bonuses, gifts, rebates – any unexpected income goes 100% to your emergency fund until it\'s fully funded. A $2,000 tax refund can accelerate your timeline by months.',
      },
      {
        type: 'paragraph',
        text: '3. Temporary Austerity: For 3 months, slash discretionary spending. Cancel subscriptions, eat out zero times, pause entertainment spending. This intensive approach can build substantial reserves quickly.',
      },
      {
        type: 'paragraph',
        text: '4. Side Income: Dedicate all side gig money to your fund. Freelance projects, selling items, part-time work – every dollar accelerates your progress.',
      },
      {
        type: 'paragraph',
        text: '5. Expense Reduction: Review your Fixed Expenses in Ordino. Negotiate bills, shop for better insurance rates, refinance loans. Redirect any savings to your emergency fund.',
      },
      {
        type: 'paragraph',
        text: 'Using these strategies, a typical person can build a 3-month emergency fund in 6-12 months. It requires discipline, but the financial security is worth it.',
      },
      {
        type: 'heading',
        text: 'Where to Keep Your Emergency Fund',
      },
      {
        type: 'paragraph',
        text: 'Your emergency fund should be safe, liquid, and easily accessible:',
      },
      {
        type: 'paragraph',
        text: 'High-Yield Savings Account: Ideal location. FDIC insured, earns interest (typically 4-5%), accessible within 1-2 days. Most banks offer online savings accounts with no fees.',
      },
      {
        type: 'paragraph',
        text: 'Money Market Account: Similar to savings accounts but may require higher minimums. Offers check-writing or debit card access for faster withdrawals.',
      },
      {
        type: 'paragraph',
        text: 'DO NOT use:',
      },
      {
        type: 'list',
        items: [
          'Checking accounts (too tempting to spend, low/no interest)',
          'Stocks/investments (can lose value when you need them)',
          'Locked CDs (can\'t access without penalties)',
          'Retirement accounts (penalties and taxes for early withdrawal)',
        ],
      },
      {
        type: 'paragraph',
        text: 'Your emergency fund should be boring. The goal is preservation and accessibility, not growth.',
      },
      {
        type: 'heading',
        text: 'What Qualifies as an Emergency?',
      },
      {
        type: 'paragraph',
        text: 'Be strict about what constitutes an emergency. These DO qualify:',
      },
      {
        type: 'list',
        items: [
          'Job loss or significant income reduction',
          'Major medical expenses not covered by insurance',
          'Essential home repairs (broken furnace, leaking roof)',
          'Critical car repairs needed for work commute',
          'Emergency travel for family crisis',
          'Unexpected legal fees for serious matters',
        ],
      },
      {
        type: 'paragraph',
        text: 'These DO NOT qualify:',
      },
      {
        type: 'list',
        items: [
          'Vacations or travel',
          'Holiday shopping',
          'Upgrading functional items',
          'Sales or "good deals"',
          'Regular expenses you forgot to budget for',
          'Investment opportunities',
        ],
      },
      {
        type: 'paragraph',
        text: 'When in doubt, ask: "If I don\'t spend this money right now, will it cause immediate harm to my health, safety, or ability to earn income?" If the answer is no, it\'s not an emergency.',
      },
      {
        type: 'heading',
        text: 'After You Use Your Emergency Fund',
      },
      {
        type: 'paragraph',
        text: 'If you need to tap your emergency fund, here\'s the recovery process:',
      },
      {
        type: 'list',
        items: [
          'Immediately pause other savings goals temporarily',
          'Redirect all previous savings contributions to rebuild the emergency fund',
          'Temporarily reduce discretionary spending to accelerate recovery',
          'Update your target in Ordino to show remaining amount needed',
          'Resume regular savings goals only after emergency fund is restored to 50%',
          'Fully refund to original target before celebrating and returning to normal',
        ],
      },
      {
        type: 'paragraph',
        text: 'The emergency fund is your financial priority. Everything else waits until it\'s rebuilt.',
      },
      {
        type: 'heading',
        text: 'The Peace of Mind Factor',
      },
      {
        type: 'paragraph',
        text: 'The psychological benefit of an emergency fund exceeds its mathematical value. When you have 6 months of expenses saved:',
      },
      {
        type: 'list',
        items: [
          'You negotiate from strength (can leave bad jobs, walk away from bad deals)',
          'Financial stress decreases dramatically',
          'You make better decisions (not desperate, not rushed)',
          'You sleep better at night',
          'You can take calculated risks (career changes, entrepreneurship)',
          'Unexpected expenses become inconveniences, not crises',
        ],
      },
      {
        type: 'paragraph',
        text: 'Building an emergency fund is the single most impactful financial action you can take. It\'s your foundation. Everything else – investing, optimizing, wealth building – becomes possible only after your foundation is solid. Start today, even if it\'s just $25. Use Ordino to track every dollar. And watch your financial stress decrease as your emergency fund grows.',
      },
    ],
  },
};

export function BlogContent({ onBack, onNavigate, blogId }: BlogContentProps) {
  const blog = blogData[blogId];

  if (!blog) {
    return (
      <div className="min-h-screen w-full bg-[#E9F0F1] flex items-center justify-center">
        <p
          className="text-[#686867] text-[18px]"
          style={{
            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
          }}
        >
          Blog post not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-73px)] w-full bg-[#E9F0F1]">
      {/* Header */}
      <section className="bg-white/50 pt-24 pb-8 lg:pt-32 lg:pb-12 border-b border-[#686867]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={onBack}
              className="bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] transition-all duration-300 h-10 px-3 sm:px-4"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              }}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Back to Blogs
            </Button>
          </div>

          {/* Category Badge */}
          <div
            className="inline-block px-4 py-1 rounded-full text-[12px] text-white mb-4"
            style={{
              backgroundColor: blog.categoryColor,
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontWeight: 500,
            }}
          >
            {blog.category}
          </div>

          <h1
            className="text-[#162a2c] text-[32px] sm:text-[40px] lg:text-[52px] leading-tight mb-4"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontWeight: 700,
            }}
          >
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-[#686867] text-[14px] sm:text-[16px] mb-6"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
            }}
          >
            <span>By {blog.author}</span>
            <span>•</span>
            <span>{blog.date}</span>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
        <div className="rounded-2xl overflow-hidden border-2 border-[#686867]/20 shadow-lg">
          <ImageWithFallback
            src={`https://images.unsplash.com/photo-${blog.image}?w=1200&h=600&fit=crop`}
            alt={blog.title}
            className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 pb-16">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border-2 border-[#686867]/20 shadow-lg space-y-6">
          {blog.content.map((block: any, index: number) => {
            if (block.type === 'heading') {
              return (
                <h2
                  key={index}
                  className="text-[#162a2c] text-[24px] sm:text-[28px] mt-8 mb-4"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === 'paragraph') {
              return (
                <p
                  key={index}
                  className="text-[#686867] text-[16px] sm:text-[18px] leading-relaxed"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    lineHeight: '1.8',
                  }}
                >
                  {block.text}
                </p>
              );
            }

            if (block.type === 'list') {
              return (
                <ul key={index} className="space-y-3 my-4">
                  {block.items.map((item: string, itemIndex: number) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-3 text-[#686867] text-[16px] sm:text-[18px] leading-relaxed"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em',
                        lineHeight: '1.7',
                      }}
                    >
                      <span className="text-[#5e6c5b] mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            return null;
          })}
        </div>

        {/* Related Posts */}
        <div className="mt-12 p-6 bg-white/50 rounded-xl border border-[#686867]/20">
          <h3
            className="text-[#162a2c] text-[20px] mb-4"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontWeight: 700,
            }}
          >
            Continue Reading
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={onBack}
              className="bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] transition-all duration-300"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              }}
            >
              Browse All Articles
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
