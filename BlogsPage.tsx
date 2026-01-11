import { motion } from 'motion/react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { MarketingFooter } from './MarketingFooter';
import { useState } from 'react';
import { BlogContent } from './BlogContent';

interface BlogsPageProps {
  onBack?: () => void;
  onNavigate?: (page: 'home' | 'features' | 'benefits' | 'resources' | 'support' | 'legal' | 'about') => void;
}

export function BlogsPage({ onBack, onNavigate }: BlogsPageProps) {
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Topics');

  // If a blog is selected, show the blog content
  if (selectedBlog) {
    return (
      <BlogContent
        blogId={selectedBlog}
        onBack={() => setSelectedBlog(null)}
        onNavigate={onNavigate}
      />
    );
  }

  const blogPosts = [
    {
      title: 'The 50/30/20 Rule: A Simple Budgeting Framework That Actually Works',
      description: 'Learn how to allocate your income effectively using this proven budgeting method that helps you balance needs, wants, and savings.',
      image: 'https://images.unsplash.com/photo-1592911559798-43acbbba7c4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRnZXQlMjBwbGFubmluZyUyMHdvbWFufGVufDF8fHx8MTc2NDAyNjk0OXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Budgeting',
      date: 'Nov 20, 2024',
      readTime: '8 min read',
      id: '50-30-20-rule',
    },
    {
      title: 'Why Tracking 28 Categories Changed My Financial Life',
      description: 'Discover how granular category tracking reveals spending patterns and transforms your relationship with money.',
      image: 'https://images.unsplash.com/photo-1574884280706-7342ca3d4231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjQwMjY5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Budgeting',
      date: 'Nov 18, 2024',
      readTime: '10 min read',
      id: 'category-tracking',
    },
    {
      title: 'The Hidden Power of Receipt Tracking: More Than Just Paper',
      description: 'Learn how systematic receipt management unlocks financial insights, protects purchases, and simplifies tax season.',
      image: 'https://images.unsplash.com/photo-1587403335644-fa8fef06b261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXZpbmclMjBtb25leSUyMGNvbmNlcHR8ZW58MXx8fHwxNzY0MDI2OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Organization',
      date: 'Nov 15, 2024',
      readTime: '9 min read',
      id: 'receipt-power',
    },
    {
      title: 'How Gamification Makes Budgeting Actually Fun',
      description: 'Explore how game mechanics, badges, and streaks transform financial management from a chore into an engaging challenge.',
      image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwZ3Jvd3RofGVufDF8fHx8MTc2MzkyMDE4OXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Motivation',
      date: 'Nov 12, 2024',
      readTime: '7 min read',
      id: 'gamification-motivation',
    },
    {
      title: 'Your AI Financial Advisor: Beyond Chatbots to Real Financial Intelligence',
      description: 'Understand how Vero AI provides personalized financial guidance by analyzing your complete spending history and goals.',
      image: 'https://images.unsplash.com/photo-1574884280706-7342ca3d4231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjQwMjY5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Technology',
      date: 'Nov 10, 2024',
      readTime: '11 min read',
      id: 'ai-financial-advisor',
    },
    {
      title: 'Building an Emergency Fund: Your Financial Safety Net',
      description: 'A comprehensive guide to calculating, building, and maintaining an emergency fund that protects you from financial shocks.',
      image: 'https://images.unsplash.com/photo-1587403335644-fa8fef06b261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXZpbmclMjBtb25leSUyMGNvbmNlcHR8ZW58MXx8fHwxNzY0MDI2OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Savings',
      date: 'Nov 8, 2024',
      readTime: '9 min read',
      id: 'emergency-fund',
    },
  ];

  const categories = ['All Topics', 'Budgeting', 'Saving', 'Organization', 'Motivation', 'Technology'];

  const categoryColors: { [key: string]: string } = {
    Budgeting: '#5e6c5b',
    Saving: '#ffa47d',
    Savings: '#ffa47d',
    Investing: '#5e6c5b',
    Credit: '#ffa47d',
    Tax: '#5e6c5b',
    Organization: '#ffa47d',
    Motivation: '#5e6c5b',
    Technology: '#162a2c',
  };

  // Filter blog posts based on selected category
  const filteredBlogPosts = selectedCategory === 'All Topics' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory || (selectedCategory === 'Saving' && post.category === 'Savings'));

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
            Ordino Insights & Tips
          </h1>
        </div>
      </section>

      {/* Filter/Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search articles..."
              className="flex-1 px-4 py-3 rounded-lg border-2 border-[#686867]/20 bg-white text-[#162a2c] placeholder:text-[#686867]/60 focus:outline-none focus:border-[#686867]/40"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              }}
            />
            <div className="relative">
              <select
                className="appearance-none w-full sm:w-auto px-4 py-3 pr-10 rounded-lg border-2 border-[#686867]/20 bg-white text-[#686867] focus:outline-none focus:border-[#686867]/40 cursor-pointer"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#686867] pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-lg text-[14px] border-2 transition-all ${
                  selectedCategory === category
                    ? 'bg-[#686867] text-white border-[#686867]'
                    : 'bg-white text-[#686867] border-[#686867]/20 hover:border-[#686867] hover:bg-[#E9F0F1]'
                }`}
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  fontWeight: 500,
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#686867] transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-lg"
              onClick={() => setSelectedBlog(post.id)}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-56">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-[12px] text-white"
                  style={{
                    backgroundColor: categoryColors[post.category] || '#5e6c5b',
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <p
                    className="text-[#686867] text-[12px]"
                    style={{
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    }}
                  >
                    {post.date}
                  </p>
                  <span className="text-[#686867]">•</span>
                  <p
                    className="text-[#686867] text-[12px]"
                    style={{
                      fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    }}
                  >
                    {post.readTime}
                  </p>
                </div>
                <h3
                  className="text-[#162a2c] text-[20px] mb-3"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {post.title}
                </h3>
                <p
                  className="text-[#686867] text-[14px] mb-4 leading-relaxed"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    lineHeight: '1.5',
                  }}
                >
                  {post.description}
                </p>
                <Button
                  className="bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] transition-all duration-300 w-full"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    fontWeight: 500,
                  }}
                  onClick={() => setSelectedBlog(post.id)}
                >
                  Read More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="bg-white/50 py-12 sm:py-16 border-t border-[#686867]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
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