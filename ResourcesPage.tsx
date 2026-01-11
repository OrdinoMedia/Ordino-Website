import { motion } from 'motion/react';
import { BookOpen, MessageSquare, FileText, ArrowRight, Sparkles, Target, CreditCard, TrendingUp, Info, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MarketingFooter } from './MarketingFooter';
import { useState } from 'react';
import heroImage from 'figma:asset/9cf6f2eeb95a1e768e7940c2603d33c433329389.png';
import { GuideContent } from './GuideContent';
import { BlogContent } from './BlogContent';

interface ResourcesPageProps {
  onNavigateToSubpage?: (subpage: 'vero' | 'guides' | 'blogs') => void;
  onNavigate?: (page: 'home' | 'features' | 'resources' | 'support' | 'benefits' | 'legal' | 'about') => void;
}

export function ResourcesPage({ onNavigateToSubpage, onNavigate }: ResourcesPageProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);

  // If a guide is selected, show guide content
  if (selectedGuide) {
    return (
      <GuideContent
        guideId={selectedGuide}
        onBack={() => {
          setSelectedGuide(null);
          onNavigateToSubpage?.('guides');
        }}
        onNavigate={onNavigate}
      />
    );
  }

  // If a blog is selected, show blog content
  if (selectedBlog) {
    return (
      <BlogContent
        blogId={selectedBlog}
        onBack={() => {
          setSelectedBlog(null);
          onNavigateToSubpage?.('blogs');
        }}
        onNavigate={onNavigate}
      />
    );
  }

  const scrollToResources = () => {
    const resourcesSection = document.getElementById('resources-section');
    if (resourcesSection) {
      resourcesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -20;
    const rotateY = ((x - centerX) / centerX) * 20;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const guidePreview = [
    {
      title: 'Set Up Your Account',
      description: 'Get started with Ordino in minutes',
      icon: Target,
      color: '#5e6c5b',
      id: 'getting-started',
    },
    {
      title: 'Link Your Cards',
      description: 'Connect your bank accounts seamlessly',
      icon: CreditCard,
      color: '#ffa47d',
      id: 'receipt-management',
    },
    {
      title: 'Track Your Spending',
      description: 'Monitor across 28 subcategories',
      icon: TrendingUp,
      color: '#5e6c5b',
      id: 'budget-tracking',
    },
  ];

  const blogPreview = [
    {
      title: 'The 50/30/20 Rule: A Simple Framework',
      category: 'Budgeting',
      categoryColor: '#5e6c5b',
      id: '50-30-20-rule',
    },
    {
      title: 'Building an Emergency Fund',
      category: 'Saving',
      categoryColor: '#ffa47d',
      id: 'emergency-fund',
    },
    {
      title: 'Gamification Makes Budgeting Fun',
      category: 'Motivation',
      categoryColor: '#5e6c5b',
      id: 'gamification-motivation',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-73px)] w-full bg-[#E9F0F1]">
      {/* Hero Section */}
      <section className="bg-white/50 pt-24 pb-4 sm:pt-5 sm:pb-3 border-b border-[#686867]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 text-center lg:text-left mb-[-40px] lg:mb-0"
            >
              <h1
                className="text-[#162a2c] text-[36px] sm:text-[48px] lg:text-[56px] leading-tight mb-3 lg:mb-6 sm:whitespace-nowrap"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  fontWeight: 700,
                }}
              >
                Financial Learning Hub
              </h1>
              <p
                className="text-[#686867] text-[16px] sm:text-[18px] lg:text-[20px] mb-4 lg:mb-8 leading-relaxed"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  letterSpacing: '0.02em',
                  lineHeight: '1.6',
                }}
              >
                Explore resources, tips, and tools to simplify your financial life with Ordino.
              </p>
              
              {/* Learn More Button */}
              <button
                onClick={scrollToResources}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#686867] bg-transparent text-[#686867] rounded-full hover:bg-[#686867] hover:text-white transition-all duration-300 mb-6"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                }}
              >
                Learn More
                <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Right Visual - Hero Graphic with Tilt */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex items-center justify-center cursor-pointer"
              style={{ minHeight: '200px', width: '100%' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                className="w-full max-w-[400px] sm:max-w-[600px]"
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                  transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <ImageWithFallback
                  src={heroImage}
                  alt="Ordino financial dashboard visualization"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Resources Sections */}
      <section id="resources-section" className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vero AI Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#E9F0F1] to-white rounded-3xl p-8 border-2 border-[#686867]/20 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#5e6c5b] mb-6">
              <MessageSquare className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h2
              className="text-[#162a2c] text-[32px] mb-4"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                fontWeight: 700,
              }}
            >
              Vero AI
            </h2>
            <p
              className="text-[#686867] text-[16px] mb-6 leading-relaxed"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                lineHeight: '1.6',
              }}
            >
              Chat with your personal AI financial assistant. Get instant guidance, insights, and personalized tips to make smarter money decisions.
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-2">
                <Sparkles className="w-5 h-5 text-[#5e6c5b] flex-shrink-0 mt-0.5" />
                <p
                  className="text-[#686867] text-[14px]"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  }}
                >
                  Instant financial Insights
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-5 h-5 text-[#5e6c5b] flex-shrink-0 mt-0.5" />
                <p
                  className="text-[#686867] text-[14px]"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  }}
                >
                  Personalized budget tips
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-5 h-5 text-[#5e6c5b] flex-shrink-0 mt-0.5" />
                <p
                  className="text-[#686867] text-[14px]"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  }}
                >
                  24/7 availability
                </p>
              </div>
            </div>
            <div
              className="bg-[#ffa47d]/10 border border-[#ffa47d]/30 rounded-lg p-4 mb-6"
            >
              <button
                onClick={() => setIsDisclaimerOpen(!isDisclaimerOpen)}
                className="flex items-center gap-2 text-[#162a2c] text-[12px] hover:text-[#686867] transition-colors cursor-pointer"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}
              >
                <Info className="w-4 h-4" />
                AI Disclaimer
              </button>
              {isDisclaimerOpen && (
                <p
                  className="text-[#686867] text-[11px] leading-relaxed mt-2"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    lineHeight: '1.5',
                  }}
                >
                  The AI features within this app, including insights, suggestions, and responses generated by Vero, are provided for general informational purposes only. They are not intended to constitute financial, legal, or professional advice. While we strive for accuracy, the AI may at times produce incomplete or incorrect information.
                </p>
              )}
            </div>
            <Button
              onClick={() => {
                window.scrollTo(0, 0);
                onNavigateToSubpage?.('vero');
              }}
              className="bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] transition-all duration-300 w-full h-12"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 400,
              }}
            >
              Chat with Vero
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Guides Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-white to-[#E9F0F1] rounded-3xl p-8 border-2 border-[#686867]/20 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#ffa47d] mb-6">
              <BookOpen className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h2
              className="text-[#162a2c] text-[32px] mb-4"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                fontWeight: 700,
              }}
            >
              Guides
            </h2>
            <p
              className="text-[#686867] text-[16px] mb-6 leading-relaxed"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                lineHeight: '1.6',
              }}
            >
              Step-by-step tutorials to help you master Ordino and take control of your finances with confidence.
            </p>
            <div className="space-y-3 mb-8">
              {guidePreview.map((guide) => (
                <div 
                  key={guide.title} 
                  className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-[#686867]/10 hover:border-[#686867]/40 hover:bg-white transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setSelectedGuide(guide.id);
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: guide.color }}
                  >
                    <guide.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p
                      className="text-[#162a2c] text-[14px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {guide.title}
                    </p>
                    <p
                      className="text-[#686867] text-[12px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      }}
                    >
                      {guide.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={() => {
                window.scrollTo(0, 0);
                onNavigateToSubpage?.('guides');
              }}
              className="bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] transition-all duration-300 w-full h-12"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 400,
              }}
            >
              Browse All Guides
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Blogs Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-[#E9F0F1] to-white rounded-3xl p-8 border-2 border-[#686867]/20 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#5e6c5b] mb-6">
              <FileText className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h2
              className="text-[#162a2c] text-[32px] mb-4"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                fontWeight: 700,
              }}
            >
              Blogs
            </h2>
            <p
              className="text-[#686867] text-[16px] mb-6 leading-relaxed"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                lineHeight: '1.6',
              }}
            >
              Expert insights, tips, and strategies to help you understand your finances and make smarter money choices.
            </p>
            <div className="space-y-3 mb-8">
              {blogPreview.map((blog) => (
                <div 
                  key={blog.title} 
                  className="p-4 bg-white/60 rounded-xl border border-[#686867]/10 hover:border-[#686867]/40 hover:bg-white transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setSelectedBlog(blog.id);
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="px-2 py-1 text-white rounded-full text-[10px]"
                      style={{
                        backgroundColor: blog.categoryColor,
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {blog.category}
                    </div>
                  </div>
                  <p
                    className="text-[#162a2c] text-[14px]"
                    style={{
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {blog.title}
                  </p>
                </div>
              ))}
            </div>
            <Button
              onClick={() => {
                window.scrollTo(0, 0);
                onNavigateToSubpage?.('blogs');
              }}
              className="bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] transition-all duration-300 w-full h-12"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 400,
              }}
            >
              Read All Blogs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="bg-white/50 py-20 border-t border-[#686867]/10">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-12 text-center border-2 border-[#686867]/20 shadow-lg"
          >
            <h2
              className="text-[#162a2c] text-[48px] mb-4"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                fontWeight: 700,
              }}
            >
              Ordino Insights Newsletter
            </h2>
            <p
              className="text-[#686867] text-[18px] mb-8"
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
                  fontWeight: 400,
                }}
              >
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <MarketingFooter onNavigate={onNavigate} />
    </div>
  );
}