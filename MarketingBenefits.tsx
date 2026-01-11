import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Check, X, Sparkles, Zap, Crown, Star } from 'lucide-react';
import { MarketingFooter } from './MarketingFooter';

interface MarketingBenefitsProps {
  onGetStarted: () => void;
  onNavigate?: (page: 'home' | 'features' | 'resources' | 'support' | 'benefits' | 'legal' | 'about') => void;
}

export function MarketingBenefits({ onGetStarted, onNavigate }: MarketingBenefitsProps) {
  const plans = [
    {
      name: 'Basic',
      price: '$4.99',
      priceDetail: 'per month',
      description: 'Financial insights and receipt management through manual uploads.',
      icon: Zap,
      color: '#D4E4D8',
      highlighted: false,
      hasTrial: true,
    },
    {
      name: 'Standard',
      price: '$9.99',
      priceDetail: 'per month',
      description: 'Automatic tracking through connected accounts.',
      icon: Crown,
      color: '#94a291',
      highlighted: true,
      hasTrial: true,
    },
    {
      name: 'Premium',
      price: '$14.99',
      priceDetail: 'per month',
      description: 'Expanded connections, history, and AI access.',
      icon: Star,
      color: '#ffa47d',
      highlighted: false,
      hasTrial: true,
    },
  ];

  // Feature comparison data
  const features = [
    { 
      category: 'Bank Connections',
      basic: '✖',
      standard: '1-3',
      premium: '4-5'
    },
    { 
      category: 'Manual Refreshes',
      basic: '✖',
      standard: '25 / month',
      premium: '40 / month'
    },
    { 
      category: 'AI Tokens',
      basic: '500K',
      standard: '500K',
      premium: '1M'
    },
    { 
      category: 'Receipt Uploads',
      basic: '✔',
      standard: '✔',
      premium: '✔'
    },
    { 
      category: 'Transaction Storage',
      basic: '✔',
      standard: '18 Months',
      premium: '24 Months'
    },
    { 
      category: 'Receipt Storage',
      basic: '18 months',
      standard: '3 years',
      premium: '5 years'
    },
    { 
      category: 'Categorization',
      basic: '✔',
      standard: '✔',
      premium: '✔'
    },
    { 
      category: 'Smart Alerts',
      basic: '✔',
      standard: '✔',
      premium: '✔'
    },
    { 
      category: 'Spending Insights',
      basic: '✔',
      standard: '✔',
      premium: '✔'
    },
    { 
      category: 'Receipt Matching',
      basic: '✔',
      standard: '✔',
      premium: '✔'
    },
    { 
      category: 'Upload Statements',
      basic: '✔',
      standard: '✖',
      premium: '✖'
    },
  ];

  return (
    <div className="min-h-[calc(100vh-73px)] w-full bg-[#E9F0F1]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-24 pb-12 sm:pt-32 sm:pb-20">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1
            className="text-[#162a2c] text-[36px] sm:text-[48px] lg:text-[56px] leading-tight mb-6"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontWeight: 700,
            }}
          >
            Plan Benefits
          </h1>
          <p
            className="text-[#686867] text-[16px] sm:text-[18px] lg:text-[20px] mb-8 px-4"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
            }}
          >
            Choose the perfect plan for your financial journey.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              className={`relative rounded-3xl p-6 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-white shadow-2xl scale-105 border-2 border-[#5e6c5b]'
                  : 'bg-white shadow-lg hover:shadow-xl hover:scale-102'
              }`}
            >
              {plan.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5e6c5b] text-white px-4 py-1 rounded-full text-[11px]"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: plan.color }}
              >
                <plan.icon className="w-7 h-7 text-[#162a2c]" strokeWidth={1.5} />
              </div>

              {/* Plan Name */}
              <h3
                className="text-[#162a2c] text-[24px] mb-2"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  fontWeight: 700,
                }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-3">
                <span
                  className="text-[#162a2c] text-[40px] leading-none"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {plan.price}
                </span>
                <span
                  className="text-[#686867] text-[14px] ml-2"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  }}
                >
                  {plan.priceDetail}
                </span>
              </div>

              {/* Description */}
              <p
                className="text-[#686867] text-[13px] mb-5"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  lineHeight: '1.5',
                }}
              >
                {plan.description}
              </p>

              {/* 30-Day Free Trial Badge */}
              {plan.hasTrial && (
                <div className="mb-4 py-2 px-3 rounded-lg bg-[#E9F0F1] border border-[#686867]/20 text-center">
                  <span
                    className="text-[#686867] text-[12px]"
                    style={{
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                    }}
                  >
                    30-Day Free Trial
                  </span>
                </div>
              )}

              {/* CTA Button */}
              <Button
                onClick={onGetStarted}
                className={`w-full h-12 transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-[#5e6c5b] text-white border-2 border-[#5e6c5b] hover:bg-white hover:text-[#5e6c5b]'
                    : 'bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1]'
                }`}
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontWeight: 400,
                }}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <h2
              className="text-[#162a2c] text-[36px] mb-8 text-center"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                fontWeight: 700,
              }}
            >
              Compare All Features
            </h2>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Header */}
                <thead>
                  <tr className="border-b-2 border-[#E9F0F1]">
                    <th
                      className="text-left py-4 px-4 text-[#162a2c] text-[16px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      Feature
                    </th>
                    <th
                      className="text-center py-4 px-4 text-[#162a2c] text-[16px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      Basic
                    </th>
                    <th
                      className="text-center pt-8 pb-4 px-4 text-[#162a2c] text-[16px] relative"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#5e6c5b] text-white px-3 py-1 rounded-full text-[10px]">
                        POPULAR
                      </div>
                      Standard
                    </th>
                    <th
                      className="text-center py-4 px-4 text-[#162a2c] text-[16px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontWeight: 700,
                      }}
                    >
                      Premium
                    </th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {features.map((feature, index) => (
                    <tr
                      key={feature.category}
                      className={`border-b border-[#E9F0F1] ${
                        index % 2 === 0 ? 'bg-[#E9F0F1]/30' : ''
                      }`}
                    >
                      <td
                        className="py-4 px-4 text-[#162a2c] text-[14px]"
                        style={{
                          fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {feature.category}
                      </td>
                      <td className="text-center py-4 px-4">
                        {feature.basic === '✔' ? (
                          <Check className="w-5 h-5 text-[#5e6c5b] mx-auto" strokeWidth={2.5} />
                        ) : feature.basic === '✖' ? (
                          <X className="w-5 h-5 text-[#686867] mx-auto" strokeWidth={2} />
                        ) : (
                          <span
                            className="text-[#686867] text-[13px]"
                            style={{
                              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            }}
                          >
                            {feature.basic}
                          </span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4 bg-[#5e6c5b]/5">
                        {feature.standard === '✔' ? (
                          <Check className="w-5 h-5 text-[#5e6c5b] mx-auto" strokeWidth={2.5} />
                        ) : feature.standard === '✖' ? (
                          <X className="w-5 h-5 text-[#686867] mx-auto" strokeWidth={2} />
                        ) : (
                          <span
                            className="text-[#686867] text-[13px]"
                            style={{
                              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            }}
                          >
                            {feature.standard}
                          </span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {feature.premium === '✔' ? (
                          <Check className="w-5 h-5 text-[#5e6c5b] mx-auto" strokeWidth={2.5} />
                        ) : feature.premium === '✖' ? (
                          <X className="w-5 h-5 text-[#686867] mx-auto" strokeWidth={2} />
                        ) : (
                          <span
                            className="text-[#686867] text-[13px]"
                            style={{
                              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                            }}
                          >
                            {feature.premium}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer Section */}
      <MarketingFooter onNavigate={onNavigate} />
    </div>
  );
}