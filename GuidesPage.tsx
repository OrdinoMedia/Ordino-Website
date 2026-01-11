import { motion } from 'motion/react';
import { BookOpen, Target, CreditCard, TrendingUp, Receipt, PieChart, Shield, Bell, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { MarketingFooter } from './MarketingFooter';
import { useState } from 'react';
import { GuideContent } from './GuideContent';

interface GuidesPageProps {
  onBack?: () => void;
  onNavigate?: (page: 'home' | 'features' | 'benefits' | 'resources' | 'support' | 'legal' | 'about') => void;
}

export function GuidesPage({ onBack, onNavigate }: GuidesPageProps) {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  // If a guide is selected, show the guide content
  if (selectedGuide) {
    return (
      <GuideContent
        guideId={selectedGuide}
        onBack={() => setSelectedGuide(null)}
        onNavigate={onNavigate}
      />
    );
  }

  const allGuides = [
    {
      title: 'Getting Started with Ordino',
      description: 'Set up your account and start tracking your finances in minutes. Learn how to configure your dashboard, understand the 28 subcategories, and make the most of Ordino\'s features from day one.',
      icon: Target,
      color: '#5e6c5b',
      duration: '5 min read',
      category: 'Getting Started',
      id: 'getting-started',
    },
    {
      title: 'Mastering Receipt Management',
      description: 'Learn how to scan, upload, and organize receipts for seamless expense tracking. Discover advanced search techniques and best practices for building a comprehensive receipt archive.',
      icon: Receipt,
      color: '#ffa47d',
      duration: '8 min read',
      category: 'Core Features',
      id: 'receipt-management',
    },
    {
      title: 'Creating and Managing Budgets',
      description: 'Set realistic budget goals across all 28 subcategories and track your progress with visual analytics. Master the 50/30/20 rule and learn strategies for continuous budget optimization.',
      icon: TrendingUp,
      color: '#5e6c5b',
      duration: '10 min read',
      category: 'Core Features',
      id: 'budget-tracking',
    },
    {
      title: 'Understanding Your Analytics',
      description: 'Dive deep into your financial data with comprehensive analytics, charts, and reports that reveal spending patterns. Learn to read category breakdowns, trend analysis, and make data-driven financial decisions.',
      icon: PieChart,
      color: '#ffa47d',
      duration: '12 min read',
      category: 'Advanced',
      id: 'analytics-insights',
    },
    {
      title: 'Maximizing Vero AI',
      description: 'Get personalized financial advice and insights from your AI assistant. Discover how to ask the right questions, interpret Vero\'s recommendations, and use AI to optimize your finances.',
      icon: BookOpen,
      color: '#5e6c5b',
      duration: '7 min read',
      category: 'Advanced',
      id: 'vero-ai-guide',
    },
    {
      title: 'Security & Privacy Settings',
      description: 'Learn how to manage your security settings, enable two-factor authentication, and protect your financial data with Ordino\'s bank-level security features.',
      icon: Shield,
      color: '#ffa47d',
      duration: '6 min read',
      category: 'Account Management',
      id: 'security-privacy',
    },
  ];

  const categories = ['All Guides', 'Getting Started', 'Core Features', 'Advanced', 'Account Management'];

  return (
    <div className="min-h-[calc(100vh-73px)] w-full bg-[#E9F0F1]">
      {/* Header */}
      <section className="bg-white/50 pt-24 pb-6 sm:py-8 border-b border-[#686867]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={onBack}
              className="bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] transition-all duration-300 h-10 px-3 sm:px-4 text-sm sm:text-base"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              }}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Back to Resources
            </Button>
          </div>
          <h1
            className="text-[#162a2c] text-[32px] sm:text-[44px] lg:text-[56px] leading-tight"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontWeight: 700,
            }}
          >
            Ordino Guides
          </h1>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-between"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-5 py-2 bg-white text-[#686867] rounded-lg text-[14px] border-2 border-[#686867]/20 hover:border-[#686867] hover:bg-[#E9F0F1] transition-all"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  fontWeight: 500,
                }}
              >
                {category}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search guides..."
            className="px-4 py-2 rounded-lg border-2 border-[#686867]/20 bg-white text-[#162a2c] placeholder:text-[#686867]/60 focus:outline-none focus:border-[#686867]/40 w-full sm:w-64"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
            }}
          />
        </motion.div>
      </section>

      {/* Guides Grid */}
      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allGuides.map((guide, index) => (
            <motion.div
              key={guide.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 border-2 border-transparent hover:border-[#686867] transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-lg"
              onClick={() => setSelectedGuide(guide.id)}
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="px-3 py-1 rounded-full text-[11px] text-white"
                  style={{
                    backgroundColor: guide.color,
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {guide.category}
                </div>
                <p
                  className="text-[#686867] text-[12px]"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  }}
                >
                  {guide.duration}
                </p>
              </div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: guide.color }}
              >
                <guide.icon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>

              {/* Content */}
              <h3
                className="text-[#162a2c] text-[20px] mb-3"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  fontWeight: 700,
                }}
              >
                {guide.title}
              </h3>
              <p
                className="text-[#686867] text-[14px] mb-4 leading-relaxed"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  lineHeight: '1.5',
                }}
              >
                {guide.description}
              </p>

              {/* Read More Button */}
              <div
                className="text-[#5e6c5b] text-[14px] flex items-center gap-1 group-hover:gap-2 transition-all"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  fontWeight: 500,
                }}
              >
                Read Full Guide
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="bg-white/50 py-12 sm:py-20 border-t border-[#686867]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 sm:p-12 text-center border-2 border-[#686867]/20 shadow-lg"
          >
            <h2
              className="text-[#162a2c] text-[32px] sm:text-[40px] lg:text-[48px] mb-4"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                fontWeight: 700,
              }}
            >
              Ordino Insights Newsletter
            </h2>
            <p
              className="text-[#686867] text-[16px] sm:text-[18px] mb-8"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                lineHeight: '1.6',
              }}
            >
              Simplifying your financial life, one issue at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-[#686867]/20 bg-[#E9F0F1] text-[#162a2c] placeholder:text-[#686867]/60 focus:outline-none focus:border-[#686867]/40"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                }}
              />
              <Button
                className="bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] transition-all duration-300 px-8"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontWeight: 500,
                }}
              >
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      {onNavigate && <MarketingFooter onNavigate={onNavigate} />}
    </div>
  );
}