import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { ArrowRight, Sparkles, Lock, Lightbulb, TrendingUp, Award, MessageSquare } from 'lucide-react';
import heroImage from 'figma:asset/91cbf559df13bd2ff31c706a8ade4028425ba517.png';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MarketingFooter } from './MarketingFooter';
import { useState, useEffect } from 'react';

interface MarketingHomeProps {
  onGetStarted: () => void;
  onNavigate?: (page: 'home' | 'features' | 'resources' | 'support' | 'benefits' | 'legal' | 'about') => void;
}

export function MarketingHome({ onGetStarted, onNavigate }: MarketingHomeProps) {
  const [barcelonaAmount, setBarcelonaAmount] = useState(0);
  const [veroPromptText, setVeroPromptText] = useState('');
  const [floatingCardRotations, setFloatingCardRotations] = useState({
    vero: { x: 0, y: 0 },
    income: { x: 0, y: 0 },
    budget: { x: 0, y: 0 },
    badge: { x: 0, y: 0 },
    investment: { x: 0, y: 0 },
    spending: { x: 0, y: 0 },
  });

  useEffect(() => {
    const target = 862;
    const duration = 10000;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const animate = () => {
      if (current < target) {
        current += increment;
        if (current > target) current = target;
        setBarcelonaAmount(Math.floor(current));
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const fullText = 'Help me make a budget for a trip to Banff, Alberta';
    let currentIndex = 0;
    
    const typewriterInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setVeroPromptText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, 39);

    return () => clearInterval(typewriterInterval);
  }, []);

  const handleVeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    setFloatingCardRotations(prev => ({ ...prev, vero: { x: rotateX, y: rotateY } }));
  };

  const handleIncomeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    setFloatingCardRotations(prev => ({ ...prev, income: { x: rotateX, y: rotateY } }));
  };

  const handleBudgetMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    setFloatingCardRotations(prev => ({ ...prev, budget: { x: rotateX, y: rotateY } }));
  };

  const handleBadgeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    setFloatingCardRotations(prev => ({ ...prev, badge: { x: rotateX, y: rotateY } }));
  };

  const handleInvestmentMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    setFloatingCardRotations(prev => ({ ...prev, investment: { x: rotateX, y: rotateY } }));
  };

  const handleSpendingMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    setFloatingCardRotations(prev => ({ ...prev, spending: { x: rotateX, y: rotateY } }));
  };

  const handleMouseLeave = (card: 'vero' | 'income' | 'budget' | 'badge' | 'investment' | 'spending') => {
    setFloatingCardRotations(prev => ({ ...prev, [card]: { x: 0, y: 0 } }));
  };

  const featureCards = [
    {
      icon: Sparkles,
      title: 'Automated Tracking',
      description: 'Effortlessly track receipts and transactions with smart categorization.',
      color: '#D4E4D8',
    },
    {
      icon: Lock,
      title: 'Secure Infrastructure',
      description: 'Enterprise-grade encryption protects your financial data.',
      color: '#E8DDD4',
    },
    {
      icon: Lightbulb,
      title: 'AI-Powered Insights',
      description: 'Vero AI provides personalized guidance for confident planning.',
      color: '#D4E4D8',
    },
    {
      icon: TrendingUp,
      title: 'Smart Analytics',
      description: 'Deep insights into spending patterns with visual reports.',
      color: '#E8DDD4',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-73px)] w-full bg-[#E9F0F1]">
      {/* Hero Section */}
      <section className="lg:max-w-7xl lg:mx-auto lg:px-4 sm:lg:px-8 lg:py-12 sm:lg:py-20">
        {/* Mobile: Full-screen Hero Image with Title Overlay */}
        <div className="lg:hidden relative w-full h-[calc(100vh-73px)]">
          {/* Hero Image - Full Screen */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src={heroImage}
              alt="Young woman checking Ordino app on smartphone in her kitchen"
              className="w-full h-full object-cover object-right"
            />
            {/* Fade overlay at top */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#E9F0F1] to-transparent"></div>
          </div>

          {/* Title Overlay - Top of Image */}
          <div className="absolute top-0 left-0 right-0 flex justify-center px-6 pt-24 lg:pt-12">
            <motion.h1
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[#E9F0F1] text-[40px] sm:text-[48px] leading-[1.1] lg:leading-tight text-center drop-shadow-lg"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                fontWeight: 700,
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}
            >
              Financial Insights<br />Made Easy
            </motion.h1>
          </div>

          {/* Floating Vero Chat Prompt */}
          <div
            className="absolute right-4 bottom-88 bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-xl w-[180px] cursor-pointer"
            onMouseMove={handleVeroMouseMove}
            onMouseLeave={() => handleMouseLeave('vero')}
            style={{
              transform: `perspective(1000px) rotateX(${floatingCardRotations.vero.x}deg) rotateY(${floatingCardRotations.vero.y}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div className="flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-[#5e6c5b] flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-h-[32px]">
                <p className="text-[#686867] text-[9px] mb-1" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                  Ask Vero
                </p>
                <p className="text-[#162a2c] text-[10px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 600 }}>
                  {veroPromptText}
                  <span className="inline-block w-[2px] h-[10px] bg-[#162a2c] ml-0.5 animate-pulse"></span>
                </p>
              </div>
            </div>
          </div>

          {/* Floating Net Income Card */}
          <div
            className="absolute left-4 bottom-32 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl cursor-pointer"
            onMouseMove={handleIncomeMouseMove}
            onMouseLeave={() => handleMouseLeave('income')}
            style={{
              transform: `perspective(1000px) rotateX(${floatingCardRotations.income.x}deg) rotateY(${floatingCardRotations.income.y}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <p className="text-[#686867] text-[10px] mb-1" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
              Total Net Income
            </p>
            <p className="text-[#5e6c5b] text-[28px] mb-1" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 700 }}>
              $1,050
            </p>
            <p className="text-[#686867] text-[9px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
              +12% from last month
            </p>
          </div>

          {/* Floating Banff Budget Card */}
          <div
            className="absolute right-4 bottom-8 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-xl cursor-pointer max-w-[160px]"
            onMouseMove={handleBudgetMouseMove}
            onMouseLeave={() => handleMouseLeave('budget')}
            style={{
              transform: `perspective(1000px) rotateX(${floatingCardRotations.budget.x}deg) rotateY(${floatingCardRotations.budget.y}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <p className="text-[#686867] text-[9px] mb-1" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
              Banff Trip Budget
            </p>
            <div className="flex items-baseline gap-1 mb-2">
              <p className="text-[#5e6c5b] text-[22px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 700 }}>
                ${barcelonaAmount}
              </p>
              <p className="text-[#686867] text-[9px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                saved
              </p>
            </div>
            <div className="w-full h-1.5 bg-[#E9F0F1] rounded-full mb-1">
              <div 
                className="h-full bg-[#5e6c5b] rounded-full transition-all duration-300"
                style={{ width: '75%' }}
              ></div>
            </div>
            <p className="text-[#686867] text-[8px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
              75% of $1,150 goal
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center px-4 sm:px-8 py-12 sm:py-20">
          {/* Left - Text Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1
              className="text-black text-[72px] leading-none mb-6"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                fontWeight: 700,
              }}
            >
              Financial Insights <span className="whitespace-nowrap">Made Easy</span>
            </h1>
            
            <p
              className="text-[#686867] text-[20px] mb-8 leading-relaxed"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
              }}
            >
              Ordino brings clarity to your finances by turning everyday spending into meaningful, simple, and powerful insights that inspire healthier habits, greater confidence, and long-term financial wellbeing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onGetStarted}
                className="group bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] hover:border-[#686867] transition-all duration-300 h-16 px-12 text-[18px]"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  fontWeight: 400,
                }}
              >
                Get Started
                <ArrowRight className="ml-2 size-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>

          {/* Right - Hero Image */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="relative -ml-32">
              <div className="overflow-hidden rounded-[40px] shadow-2xl">
                <ImageWithFallback
                  src={heroImage}
                  alt="Young woman checking Ordino app on smartphone in her kitchen"
                  className="w-full max-w-[450px] h-[600px] object-cover"
                />
              </div>
              
              {/* Floating Vero Chat Prompt */}
              <div
                className="absolute -right-12 top-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl max-w-[220px] cursor-pointer"
                onMouseMove={handleVeroMouseMove}
                onMouseLeave={() => handleMouseLeave('vero')}
                style={{
                  transform: `perspective(1000px) rotateX(${floatingCardRotations.vero.x}deg) rotateY(${floatingCardRotations.vero.y}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-5 h-5 text-[#5e6c5b] flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-h-[32px]">
                    <p className="text-[#686867] text-[10px] mb-1" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                      Ask Vero
                    </p>
                    <p className="text-[#162a2c] text-[11px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 600 }}>
                      {veroPromptText}
                      <span className="inline-block w-[2px] h-[11px] bg-[#162a2c] ml-0.5 animate-pulse"></span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Net Income Card */}
              <div
                className="absolute -left-24 bottom-16 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl cursor-pointer"
                onMouseMove={handleIncomeMouseMove}
                onMouseLeave={() => handleMouseLeave('income')}
                style={{
                  transform: `perspective(1000px) rotateX(${floatingCardRotations.income.x}deg) rotateY(${floatingCardRotations.income.y}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <p className="text-[#686867] text-[12px] mb-2" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                  Total Net Income
                </p>
                <p className="text-[#5e6c5b] text-[36px] mb-2" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 700 }}>
                  $1,050
                </p>
                <p className="text-[#686867] text-[11px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                  +12% from last month
                </p>
              </div>

              {/* Floating Banff Budget Card */}
              <div
                className="absolute -right-12 bottom-3 bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-xl cursor-pointer"
                onMouseMove={handleBudgetMouseMove}
                onMouseLeave={() => handleMouseLeave('budget')}
                style={{
                  transform: `perspective(1000px) rotateX(${floatingCardRotations.budget.x}deg) rotateY(${floatingCardRotations.budget.y}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <p className="text-[#686867] text-[11px] mb-2" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                  Banff Trip Budget
                </p>
                <div className="flex items-baseline gap-2 mb-3">
                  <p className="text-[#5e6c5b] text-[28px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 700 }}>
                    ${barcelonaAmount}
                  </p>
                  <p className="text-[#686867] text-[11px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                    saved
                  </p>
                </div>
                <div className="w-full h-2 bg-[#E9F0F1] rounded-full mb-2">
                  <div 
                    className="h-full bg-[#5e6c5b] rounded-full transition-all duration-300"
                    style={{ width: '75%' }}
                  ></div>
                </div>
                <p className="text-[#686867] text-[9px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                  75% of $1,150 goal
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Mobile: Subtext and Button below full-screen image */}
        <div className="lg:hidden bg-[#E9F0F1] px-6 py-12">
          <p
            className="text-[#686867] text-[16px] sm:text-[18px] mb-8 leading-relaxed text-center"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
            }}
          >
            Ordino brings clarity to your finances by turning everyday spending into meaningful, simple, and powerful insights that inspire healthier habits, greater confidence, and long-term financial wellbeing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGetStarted}
              className="group bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] hover:border-[#686867] transition-all duration-300 h-14 sm:h-16 px-8 sm:px-12 text-[16px] sm:text-[18px]"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 400,
              }}
            >
              Get Started
              <ArrowRight className="ml-2 size-6 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Phone Mockup + Feature Cards Section */}
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2
              className="text-[#162a2c] text-[32px] sm:text-[40px] lg:text-[48px] mb-4 leading-tight px-4"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                fontWeight: 700,
              }}
            >
              Built to Transform the Way <br className="hidden sm:block" />You Understand Your Money
            </h2>
            <p
              className="text-[#686867] text-[16px] sm:text-[18px] px-4"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
              }}
            >
              Through smart budgets, seamless receipt management, and AI-powered <br className="hidden sm:block" />insights that turn everyday spending into true financial clarity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Phone Mockup */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-start lg:ml-8"
            >
              <div className="relative scale-75 sm:scale-90 lg:scale-100">
                {/* Phone Frame */}
                <div className="relative w-[300px] h-[600px] bg-gradient-to-br from-[#162a2c] to-[#5e6c5b] rounded-[50px] p-3 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-[#162a2c] rounded-b-3xl z-10"></div>
                  
                  {/* Screen Content - HomeHub Preview */}
                  <div className="w-full h-full bg-white rounded-[40px] overflow-hidden">
                    {/* App Content */}
                    <div className="h-full bg-[#E9F0F1] p-6">
                      {/* Status Bar */}
                      <div className="flex items-center justify-between mb-4 pt-2">
                        <p className="text-[#162a2c] text-[11px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 600 }}>
                          9:41
                        </p>
                        <div className="flex items-center gap-1">
                          {/* Cellular Signal */}
                          <div className="flex items-end gap-[1px]">
                            <div className="w-[3px] h-[4px] bg-[#162a2c] rounded-[1px]"></div>
                            <div className="w-[3px] h-[6px] bg-[#162a2c] rounded-[1px]"></div>
                            <div className="w-[3px] h-[8px] bg-[#162a2c] rounded-[1px]"></div>
                            <div className="w-[3px] h-[10px] bg-[#162a2c] rounded-[1px]"></div>
                          </div>
                          {/* WiFi */}
                          <svg className="w-[15px] h-[11px] ml-1" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7.5" cy="9.5" r="1.5" fill="#162a2c"/>
                            <path d="M7.5 7C8.48 7 9.39 7.37 10.08 7.97L11 7.05C10.04 6.23 8.81 5.75 7.5 5.75C6.19 5.75 4.96 6.23 4 7.05L4.92 7.97C5.61 7.37 6.52 7 7.5 7Z" fill="#162a2c"/>
                            <path d="M7.5 3.5C9.51 3.5 11.38 4.23 12.84 5.43L13.76 4.51C12.03 2.95 9.85 2 7.5 2C5.15 2 2.97 2.95 1.24 4.51L2.16 5.43C3.62 4.23 5.49 3.5 7.5 3.5Z" fill="#162a2c"/>
                          </svg>
                          {/* Battery */}
                          <div className="flex items-center ml-1">
                            <div className="relative">
                              <div className="w-[20px] h-[10px] border-[1.5px] border-[#162a2c] rounded-[2px]"></div>
                              <div className="absolute top-[2px] left-[2px] w-[14px] h-[6px] bg-[#162a2c] rounded-[1px]"></div>
                              <div className="absolute top-[3px] -right-[2px] w-[1.5px] h-[4px] bg-[#162a2c] rounded-r-[1px]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Header */}
                      <div className="mb-6">
                        <h3
                          className="text-[#162a2c] text-[20px] mb-1"
                          style={{
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            fontWeight: 700,
                          }}
                        >
                          Ordino
                        </h3>
                        <p
                          className="text-[#686867] text-[12px]"
                          style={{
                            fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                          }}
                        >
                          Welcome back
                        </p>
                      </div>

                      {/* Budget Card */}
                      <div className="bg-white rounded-2xl p-4 mb-4 shadow-md">
                        <p className="text-[#686867] text-[10px] mb-1" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                          Monthly Budget
                        </p>
                        <p className="text-[#162a2c] text-[24px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 700 }}>
                          $2,450 <span className="text-[14px] text-[#686867]">/ $3,000</span>
                        </p>
                        <div className="w-full h-2 bg-[#E9F0F1] rounded-full mt-2">
                          <div className="w-[82%] h-full bg-[#5e6c5b] rounded-full"></div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                          <p className="text-[#686867] text-[10px] mb-1" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                            Receipts
                          </p>
                          <p className="text-[#162a2c] text-[18px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 700 }}>
                            127
                          </p>
                        </div>
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                          <p className="text-[#686867] text-[10px] mb-1" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                            Savings
                          </p>
                          <p className="text-[#5e6c5b] text-[18px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 700 }}>
                            $550
                          </p>
                        </div>
                      </div>

                      {/* Recent Transactions */}
                      <div className="bg-white rounded-2xl p-4 shadow-md">
                        <p className="text-[#162a2c] text-[12px] mb-3" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 600 }}>
                          Recent Transactions
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-[#162a2c] text-[11px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 600 }}>
                                Banff Trip Budget
                              </p>
                              <p className="text-[#686867] text-[9px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                                Savings
                              </p>
                            </div>
                            <p className="text-[#162a2c] text-[11px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 600 }}>
                              -$250.00
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-[#162a2c] text-[11px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 600 }}>
                                TFSA
                              </p>
                              <p className="text-[#686867] text-[9px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                                Investment
                              </p>
                            </div>
                            <p className="text-[#162a2c] text-[11px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 600 }}>
                              -$150.00
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-[#162a2c] text-[11px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 600 }}>
                                Walmart
                              </p>
                              <p className="text-[#686867] text-[9px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                                Groceries
                              </p>
                            </div>
                            <p className="text-[#162a2c] text-[11px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 600 }}>
                              -$87.45
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-[#162a2c] text-[11px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 600 }}>
                                Blue Jays Tickets
                              </p>
                              <p className="text-[#686867] text-[9px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                                Entertainment
                              </p>
                            </div>
                            <p className="text-[#162a2c] text-[11px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 600 }}>
                              -$200.00
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div
                  className="flex absolute -right-2 sm:-right-3 lg:-right-4 top-16 sm:top-20 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl cursor-pointer flex-col items-center"
                  onMouseMove={handleBadgeMouseMove}
                  onMouseLeave={() => handleMouseLeave('badge')}
                  style={{
                    transform: `perspective(1000px) rotateX(${floatingCardRotations.badge.x}deg) rotateY(${floatingCardRotations.badge.y}deg)`,
                    transition: 'transform 0.1s ease-out',
                  }}
                >
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 text-[#ffa47d] mb-1" />
                  <p className="text-[#162a2c] text-[9px] sm:text-[10px] text-center" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 600 }}>
                    Gold Badge
                  </p>
                </div>

                {/* Floating Investment Chart */}
                <div
                  className="absolute -right-4 sm:-right-8 lg:-right-32 xl:-right-52 bottom-8 sm:bottom-12 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl cursor-pointer w-[180px] sm:w-[200px] lg:w-[220px] xl:w-[240px]"
                  onMouseMove={handleInvestmentMouseMove}
                  onMouseLeave={() => handleMouseLeave('investment')}
                  style={{
                    transform: `perspective(1000px) rotateX(${floatingCardRotations.investment.x}deg) rotateY(${floatingCardRotations.investment.y}deg)`,
                    transition: 'transform 0.1s ease-out',
                  }}
                >
                  <p className="text-[#162a2c] text-[9px] sm:text-[10px] mb-2 sm:mb-3" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 600 }}>
                    Investment Portfolio
                  </p>
                  <div className="relative h-16 sm:h-20 mb-2">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      <div className="w-full h-px bg-[#E9F0F1]"></div>
                      <div className="w-full h-px bg-[#E9F0F1]"></div>
                      <div className="w-full h-px bg-[#E9F0F1]"></div>
                      <div className="w-full h-px bg-[#E9F0F1]"></div>
                    </div>
                    
                    {/* Line graph */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                      {/* Gradient for area under line */}
                      <defs>
                        <linearGradient id="investmentGradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#5e6c5b" stopOpacity="0.3"/>
                          <stop offset="100%" stopColor="#5e6c5b" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Area under line */}
                      <path
                        d="M 0 44 L 40 36 L 80 38 L 120 20 L 160 24 L 200 12 L 200 80 L 0 80 Z"
                        fill="url(#investmentGradient)"
                      />
                      
                      {/* Line */}
                      <path
                        d="M 0 44 L 40 36 L 80 38 L 120 20 L 160 24 L 200 12"
                        fill="none"
                        stroke="#5e6c5b"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      
                      {/* Data points */}
                      <circle cx="0" cy="44" r="3" fill="#5e6c5b"/>
                      <circle cx="40" cy="36" r="3" fill="#5e6c5b"/>
                      <circle cx="80" cy="38" r="3" fill="#5e6c5b"/>
                      <circle cx="120" cy="20" r="3" fill="#5e6c5b"/>
                      <circle cx="160" cy="24" r="3" fill="#5e6c5b"/>
                      <circle cx="200" cy="12" r="3" fill="#5e6c5b"/>
                    </svg>
                  </div>
                  <div className="flex items-center justify-between gap-1 sm:gap-2 mb-2">
                    <p className="text-[#686867] text-[7px] sm:text-[8px] flex-1 text-center" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>Jul</p>
                    <p className="text-[#686867] text-[7px] sm:text-[8px] flex-1 text-center" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>Aug</p>
                    <p className="text-[#686867] text-[7px] sm:text-[8px] flex-1 text-center" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>Sep</p>
                    <p className="text-[#686867] text-[7px] sm:text-[8px] flex-1 text-center" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>Oct</p>
                    <p className="text-[#686867] text-[7px] sm:text-[8px] flex-1 text-center" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>Nov</p>
                    <p className="text-[#686867] text-[7px] sm:text-[8px] flex-1 text-center" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>Dec</p>
                  </div>
                  <div className="flex items-baseline gap-1 pt-1.5 sm:pt-2 border-t border-[#E9F0F1]">
                    <p className="text-[#5e6c5b] text-[14px] sm:text-[16px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 700 }}>
                      $12,450
                    </p>
                    <p className="text-[#5e6c5b] text-[8px] sm:text-[9px]" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>
                      +18.5%
                    </p>
                  </div>
                </div>

                {/* Floating Weekly Spending Chart */}
                <div
                  className="absolute -left-2 sm:-left-4 lg:-left-20 xl:-left-30 top-48 sm:top-56 lg:top-64 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl cursor-pointer"
                  onMouseMove={handleSpendingMouseMove}
                  onMouseLeave={() => handleMouseLeave('spending')}
                  style={{
                    transform: `perspective(1000px) rotateX(${floatingCardRotations.spending.x}deg) rotateY(${floatingCardRotations.spending.y}deg)`,
                    transition: 'transform 0.1s ease-out',
                  }}
                >
                  <p className="text-[#162a2c] text-[9px] sm:text-[10px] mb-2" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif", fontWeight: 600 }}>
                    Weekly Spending
                  </p>
                  <div className="flex items-end justify-between gap-0.5 sm:gap-1 h-12 sm:h-16 mb-1">
                    <div className="flex flex-col items-center h-full">
                      <div className="w-2.5 sm:w-3 bg-[#5e6c5b] rounded-t mt-auto" style={{ height: '60%' }}></div>
                    </div>
                    <div className="flex flex-col items-center h-full">
                      <div className="w-2.5 sm:w-3 bg-[#5e6c5b] rounded-t mt-auto" style={{ height: '45%' }}></div>
                    </div>
                    <div className="flex flex-col items-center h-full">
                      <div className="w-2.5 sm:w-3 bg-[#5e6c5b] rounded-t mt-auto" style={{ height: '80%' }}></div>
                    </div>
                    <div className="flex flex-col items-center h-full">
                      <div className="w-2.5 sm:w-3 bg-[#5e6c5b] rounded-t mt-auto" style={{ height: '55%' }}></div>
                    </div>
                    <div className="flex flex-col items-center h-full">
                      <div className="w-2.5 sm:w-3 bg-[#5e6c5b] rounded-t mt-auto" style={{ height: '70%' }}></div>
                    </div>
                    <div className="flex flex-col items-center h-full">
                      <div className="w-2.5 sm:w-3 bg-[#ffa47d] rounded-t mt-auto" style={{ height: '90%' }}></div>
                    </div>
                    <div className="flex flex-col items-center h-full">
                      <div className="w-2.5 sm:w-3 bg-[#686867] rounded-t opacity-30 mt-auto" style={{ height: '40%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-0.5 sm:gap-1">
                    <p className="text-[#686867] text-[7px] sm:text-[8px] w-2.5 sm:w-3 text-center" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>M</p>
                    <p className="text-[#686867] text-[7px] sm:text-[8px] w-2.5 sm:w-3 text-center" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>T</p>
                    <p className="text-[#686867] text-[7px] sm:text-[8px] w-2.5 sm:w-3 text-center" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>W</p>
                    <p className="text-[#686867] text-[7px] sm:text-[8px] w-2.5 sm:w-3 text-center" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>T</p>
                    <p className="text-[#686867] text-[7px] sm:text-[8px] w-2.5 sm:w-3 text-center" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>F</p>
                    <p className="text-[#686867] text-[7px] sm:text-[8px] w-2.5 sm:w-3 text-center" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>S</p>
                    <p className="text-[#686867] text-[7px] sm:text-[8px] w-2.5 sm:w-3 text-center" style={{ fontFamily: "'Helvetica World', 'Helvetica', sans-serif" }}>S</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featureCards.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="rounded-3xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon className="w-10 h-10 mb-4 text-[#162a2c]" strokeWidth={1.5} />
                  <h3
                    className="text-[#162a2c] text-[18px] mb-2"
                    style={{
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-[#162a2c] text-[14px]"
                    style={{
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      letterSpacing: '0.02em',
                      lineHeight: '1.5',
                    }}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <MarketingFooter onNavigate={onNavigate} />
    </div>
  );
}