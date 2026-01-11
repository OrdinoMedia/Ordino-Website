import { motion } from 'motion/react';
import { Mail, Phone, HelpCircle, Search, Clock, BookOpen, Shield, Sparkles, X } from 'lucide-react';
import { Button } from '../ui/button';
import { MarketingFooter } from './MarketingFooter';
import { useState, useRef, useEffect } from 'react';

interface SupportPageProps {
  onNavigate?: (page: 'home' | 'features' | 'resources' | 'support' | 'benefits' | 'legal' | 'about') => void;
}

export function SupportPage({ onNavigate }: SupportPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCharIndex, setHoveredCharIndex] = useState<number | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      setMousePosition({ x: mouseX, y: mouseY });
      
      // Find closest character
      let closestIndex = null;
      let closestDistance = Infinity;
      
      charRefs.current.forEach((charEl, index) => {
        if (charEl) {
          const charRect = charEl.getBoundingClientRect();
          const charCenterX = charRect.left - rect.left + charRect.width / 2;
          const charCenterY = charRect.top - rect.top + charRect.height / 2;
          
          const distance = Math.sqrt(
            Math.pow(mouseX - charCenterX, 2) +
            Math.pow(mouseY - charCenterY, 2)
          );
          
          if (distance < closestDistance && distance < 150) {
            closestDistance = distance;
            closestIndex = index;
          }
        }
      });
      
      setHoveredCharIndex(closestIndex);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCharIndex(null);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      color: '#5e6c5b',
    },
  ];

  const faqs = [
    {
      category: 'Getting Started',
      icon: BookOpen,
      color: '#5e6c5b',
      questions: [
        {
          q: 'How do I create my first budget?',
          a: 'Navigate to the Budgets page from your dashboard, click "Create Budget", select a category, and set your monthly limit. You can create budgets for any of our 28 categories.',
        },
        {
          q: 'How do I upload receipts?',
          a: 'Click the "+" button on the Receipts page, take a photo or upload an image of your receipt. Ordino will automatically extract key information like amount, date, and merchant.',
        },
        {
          q: 'Can I manually add transactions?',
          a: 'Yes! Click the "Add Transaction" button on the Transactions page. Fill in the details including amount, category, date, and any notes you want to add.',
        },
        {
          q: 'What are the 28 subcategories available?',
          a: 'Ordino offers comprehensive categorization across Groceries, Dining, Transportation, Entertainment, Shopping, Healthcare, Bills & Utilities, Housing, Education, Travel, Personal Care, Gifts, Investments, Savings, Insurance, Taxes, Subscriptions, Fees, Income, Refunds, and more.',
        },
        {
          q: 'How do I connect my bank account?',
          a: 'Go to Settings > Connected Accounts > Add Bank Account. You\'ll be securely redirected to Plaid where you can search for your financial institution and enter your credentials.',
        },
        {
          q: 'What is Vero AI?',
          a: 'Vero is your personal AI financial assistant that can help you create budgets, analyze spending patterns, provide insights, and answer questions about your financial data in natural language.',
        },
      ],
    },
    {
      category: 'Account & Security',
      icon: Shield,
      color: '#686867',
      questions: [
        {
          q: 'Does Ordino ever see my banking username or password?',
          a: 'No. Ordino never sees, stores, or has access to your banking login credentials at any time. These credentials are entered securely through Plaid, a trusted, industry-standard provider used by leading financial apps.',
        },
        {
          q: 'If I connect my bank, what information does Ordino receive?',
          a: 'When you choose to connect a bank account, Plaid securely provides Ordino with read-only financial data such as transaction amounts, merchant names, dates, and account balances. This information is encrypted and delivered automatically so that Ordino can generate spending insights and match transactions with your receipts.',
        },
        {
          q: 'Can anyone at Ordino view my transactions or banking activity?',
          a: 'No. Although Ordino\'s systems receive the data needed to provide insights, human access is restricted and not permitted. Your financial information is processed automatically, and Ordino employees cannot view your banking activity.',
        },
        {
          q: 'Can Ordino move money or make changes in my bank account?',
          a: 'No. Ordino has read-only access. We cannot move funds, modify accounts, transfer money, or take any action within your bank account.',
        },
        {
          q: 'Why does Ordino need read-only access to financial data?',
          a: 'Read-only access allows Ordino to provide essential features such as: Spending summaries, Category breakdowns, Transaction timelines, Receipt matching, and Financial insights. This access is strictly informational and cannot be used to perform transactions.',
        },
        {
          q: 'How does Ordino protect my information?',
          a: 'Ordino follows industry-standard security measures, including: End-to-end encryption of all data, Encrypted storage, Secure AWS cloud infrastructure, Multi-factor authentication, Continuous monitoring, Strict internal access controls, and A no-human-access policy for banking information.',
        },
        {
          q: 'Does Ordino ever store my banking credentials?',
          a: 'No. Banking credentials never pass through, touch, or are stored on Ordino systems. They are handled solely by Plaid.',
        },
        {
          q: 'Does Ordino sell or share my personal information?',
          a: 'No. Ordino does not sell, rent, or trade your personal information with third parties.',
        },
        {
          q: 'What happens if I disconnect my bank?',
          a: 'Ordino immediately stops receiving new financial data. You may also request full account deletion at any time.',
        },
        {
          q: 'Can I delete my personal and financial information?',
          a: 'Yes. When you delete your account, we remove or anonymize your personal and financial information unless retention is required by law for fraud prevention or compliance.',
        },
        {
          q: 'Where can I learn more?',
          a: 'You can review our full Privacy Policy or contact us at: privacy@ordino.ca',
        },
      ],
    },
    {
      category: 'Features & Usage',
      icon: Sparkles,
      color: '#ffa47d',
      questions: [
        {
          q: 'What are the badge levels?',
          a: 'Ordino has 5 badge levels (Bronze, Silver, Gold, Platinum, Diamond) that you earn by uploading receipts. Each level unlocks new achievements and rewards.',
        },
        {
          q: 'How do I view spending insights?',
          a: 'Navigate to the Insights page to see detailed analytics, spending trends, category breakdowns, and comparison views across different time periods.',
        },
        {
          q: 'Can I export my data?',
          a: 'Yes! Go to Settings > Data & Privacy > Export Data to download your transactions, receipts, and budget information in CSV format.',
        },
        {
          q: 'What is receipt matching?',
          a: 'Receipt matching automatically links uploaded receipt images with corresponding bank transactions, helping you maintain organized records and verify all purchases have proper documentation.',
        },
        {
          q: 'How does AI forecasting work?',
          a: 'AI forecasting analyzes your historical spending patterns, seasonal trends, and budget behaviors to predict future expenses and help you plan ahead. Available on Standard and Premium plans.',
        },
        {
          q: 'Can I share my account with family members?',
          a: 'Yes! Premium plan subscribers can enable account sharing to collaborate with family members on budgets, track shared expenses, and maintain joint financial records.',
        },
      ],
    },
  ];

  const titleText = 'How Can We Help?';

  return (
    <div className="min-h-[calc(100vh-73px)] w-full bg-[#E9F0F1]">
      {/* Hero Section */}
      <section className="bg-white/50 pt-24 pb-12 sm:pt-32 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[32px] sm:text-[56px] lg:text-[64px] mb-6 cursor-default"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontWeight: 700,
            }}
            ref={titleRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {titleText.split('').map((char, index) => {
              // Calculate if this character should have gradient
              let isGradient = false;
              if (hoveredCharIndex !== null) {
                const distance = Math.abs(index - hoveredCharIndex);
                isGradient = distance <= 3; // Apply gradient to hovered char and 3 neighbors on each side
              }
              
              return (
                <span
                  key={index}
                  ref={(el) => {
                    charRefs.current[index] = el;
                  }}
                  style={{
                    display: 'inline-block',
                    transition: 'all 0.3s ease-out',
                    ...(isGradient
                      ? {
                          background: 'linear-gradient(135deg, #E9F0F1 0%, #000000 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          transform: 'scale(1.05)',
                        }
                      : {
                          color: '#162a2c',
                        }),
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </motion.h1>

          {/* Search Bar */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#686867]" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-[#686867]/20 bg-white text-[#162a2c] placeholder:text-[#686867] focus:outline-none focus:border-[#686867]/40"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-[#162a2c] text-[48px] mb-4"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontWeight: 700,
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className="text-[#686867] text-[18px]"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
            }}
          >
            Find quick answers to common questions
          </p>
        </motion.div>

        {/* FAQs - Category Selection Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {faqs.map((category, index) => (
            <motion.button
              key={category.category}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => setSelectedCategory(category.category)}
              className="bg-white p-8 rounded-lg border-2 border-[#686867]/20 hover:border-[#686867]/60 transition-all cursor-pointer group aspect-square flex flex-col items-center justify-center gap-4"
            >
              <div
                className="size-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: category.color }}
              >
                <category.icon className="size-10 text-white" />
              </div>
              <h3
                className="text-[#162a2c] text-[22px] text-center"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}
              >
                {category.category}
              </h3>
              <p
                className="text-[#686867] text-[14px] text-center"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                }}
              >
                Read More
              </p>
            </motion.button>
          ))}
        </div>

        {/* FAQ Modal Overlay */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl max-h-[80vh] bg-white rounded-lg border-2 border-[#686867]/30 p-6 sm:p-8 overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                {(() => {
                  const category = faqs.find(f => f.category === selectedCategory);
                  if (!category) return null;
                  const IconComponent = category.icon;
                  return (
                    <>
                      <div
                        className="size-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: category.color }}
                      >
                        <IconComponent className="size-6 text-white" />
                      </div>
                      <h3
                        className="text-[#162a2c] text-[28px]"
                        style={{
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {selectedCategory}
                      </h3>
                    </>
                  );
                })()}
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="size-10 rounded-full hover:bg-[#E9F0F1] flex items-center justify-center transition-colors"
              >
                <X className="size-6 text-[#686867]" />
              </button>
            </div>

            {/* FAQ Content */}
            <div className="space-y-6 overflow-y-auto pr-2 flex-1">
              {faqs
                .find(f => f.category === selectedCategory)
                ?.questions.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="border-b border-[#686867]/10 pb-6 last:border-b-0"
                  >
                    <p
                      className="text-[#162a2c] mb-3"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {faq.q}
                    </p>
                    <p
                      className="text-[#686867] text-[15px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        letterSpacing: '0.02em',
                        lineHeight: '1.7',
                      }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                ))}
            </div>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Contact Methods */}
      <section className="bg-white/50 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-[#162a2c] text-[48px] mb-4"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                fontWeight: 700,
              }}
            >
              Get In Touch
            </h2>
            <p
              className="text-[#686867] text-[18px]"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
              }}
            >
              Choose the best way to reach our support team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 max-w-xl mx-auto">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white p-8 rounded-lg border border-[#686867]/20 hover:border-[#686867]/40 transition-all text-center"
              >
                <div 
                  className="size-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: method.color }}
                >
                  <method.icon className="size-8 text-white" />
                </div>
                <h3
                  className="text-[#162a2c] text-[24px] mb-2"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                  }}
                >
                  {method.title}
                </h3>
                <p
                  className="text-[#686867] text-[16px] mb-4"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    lineHeight: '1.6',
                  }}
                >
                  {method.description}
                </p>
                <div className="flex items-center justify-center gap-2 text-[#5e6c5b] mb-6">
                  <Clock className="size-4" />
                  <p
                    className="text-[14px]"
                    style={{
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em',
                    }}
                  >
                    {method.availability}
                  </p>
                </div>
                <Button
                  className="w-full bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] transition-colors"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    fontWeight: 400,
                  }}
                >
                  {method.action}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Footer */}
      <MarketingFooter onNavigate={onNavigate} />
    </div>
  );
}