import { motion } from 'motion/react';
import { 
  Receipt, 
  PieChart, 
  TrendingUp, 
  Target, 
  Award, 
  Bell,
  FileText,
  Lock,
  Smartphone,
  Zap,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Button } from '../ui/button';
import { MarketingFooter } from './MarketingFooter';

interface FeaturesPageProps {
  onGetStarted: () => void;
  onNavigate?: (page: 'home' | 'features' | 'resources' | 'support' | 'benefits' | 'legal' | 'about') => void;
}

export function FeaturesPage({ onGetStarted, onNavigate }: FeaturesPageProps) {
  const mainFeatures = [
    {
      icon: TrendingUp,
      title: 'Insights & Analytics',
      description: 'Understand your financial patterns with clear visual insights powered by intelligent analysis. See trends, compare periods, and stay financially aware.',
      color: '#5e6c5b',
    },
    {
      icon: PieChart,
      title: 'Budget Tracking',
      description: 'Create flexible budgets across all spending categories and monitor your progress in real time—without the stress.',
      color: '#ffa47d',
    },
    {
      icon: Receipt,
      title: 'Receipt Management',
      description: 'Digitize and store every receipt in one secure place with smart search and instant upload options. Never lose track of a purchase again.',
      color: '#5e6c5b',
    },
    {
      icon: Target,
      title: 'Goal Setting',
      description: 'Set meaningful financial goals and track your progress with intuitive milestones that keep you motivated over time.',
      color: '#ffa47d',
    },
    {
      icon: Award,
      title: 'Gamification System',
      description: 'Build better habits through positive reinforcement. Earn badges, celebrate milestones, and stay consistent with your financial routine.',
      color: '#5e6c5b',
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Stay informed with timely alerts for budgets, spending patterns, and important account activity—never surprised, always aware.',
      color: '#ffa47d',
    },
  ];

  const additionalFeatures = [
    { icon: FileText, text: 'Detailed transaction history' },
    { icon: Lock, text: 'Bank-level security & encryption' },
    { icon: Smartphone, text: 'Responsive design for all devices' },
    { icon: Zap, text: 'Lightning-fast performance' },
    { icon: Calendar, text: 'Custom date range filtering' },
    { icon: DollarSign, text: 'Smart Auto-Categorization' },
  ];

  return (
    <div className="min-h-[calc(100vh-73px)] w-full bg-[#E9F0F1]">
      {/* Hero Section */}
      <section className="bg-white/50 pt-24 pb-12 sm:pt-32 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[#162a2c] text-[40px] sm:text-[56px] lg:text-[64px] mb-6"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontWeight: 700,
            }}
          >
            Powerful Features for Complete Control
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[#686867] text-[16px] sm:text-[18px] lg:text-[20px] max-w-3xl mx-auto px-4"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
            }}
          >
            Discover all the tools and features that make Ordino the most comprehensive 
            financial management platform for individuals and families.
          </motion.p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white p-8 rounded-lg border border-[#686867]/20 hover:border-[#686867]/40 transition-all hover:shadow-lg"
            >
              <div 
                className="size-14 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: feature.color }}
              >
                <feature.icon className="size-7 text-white" />
              </div>
              <h3
                className="text-[#162a2c] text-[24px] mb-3"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}
              >
                {feature.title}
              </h3>
              <p
                className="text-[#686867] text-[16px]"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  lineHeight: '1.6',
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Features */}
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
              className="text-[#162a2c] text-[32px] sm:text-[40px] lg:text-[48px] mb-4"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                fontWeight: 700,
              }}
            >
              And Much More...
            </h2>
            <p
              className="text-[#686867] text-[16px] sm:text-[18px] px-4"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
              }}
            >
              Everything you need for complete financial management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="flex items-center gap-4 bg-[#E9F0F1] p-4 rounded-lg"
              >
                <div className="size-10 rounded-full bg-[#5e6c5b] flex items-center justify-center flex-shrink-0">
                  <feature.icon className="size-5 text-white" />
                </div>
                <p
                  className="text-[#162a2c]"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    fontWeight: 400,
                  }}
                >
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Button
              onClick={onGetStarted}
              className="bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] hover:border-[#686867] transition-all duration-300 h-14 px-8"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 400,
              }}
            >
              Start Using These Features Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <MarketingFooter onNavigate={onNavigate} />
    </div>
  );
}