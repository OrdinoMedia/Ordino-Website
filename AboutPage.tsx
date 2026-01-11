import { motion } from 'motion/react';
import { MarketingNav } from '../MarketingNav';
import { MarketingFooter } from './MarketingFooter';
import { Target, Shield, TrendingUp, Eye, Lightbulb, Zap } from 'lucide-react';

interface AboutPageProps {
  onNavigate?: (page: 'home' | 'features' | 'resources' | 'support' | 'benefits' | 'legal' | 'about') => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const handleNavigate = (page: 'home' | 'features' | 'resources' | 'support' | 'benefits' | 'legal') => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const values = [
    {
      icon: Shield,
      title: 'Secure',
      description: 'We protect every transaction with the highest standards of privacy and data security.',
    },
    {
      icon: Eye,
      title: 'Transparent',
      description: 'We communicate with clarity, act with honesty, and build trust through openness.',
    },
    {
      icon: Target,
      title: 'Reliable',
      description: 'We deliver consistent, dependable solutions that work every time, without compromise.',
    },
    {
      icon: Lightbulb,
      title: 'Innovative',
      description: 'We continuously push boundaries, creating smarter ways to power everyday transactions.',
    },
    {
      icon: TrendingUp,
      title: 'Valuable',
      description: 'We provide meaningful financial insights and outcomes that matter for people and businesses.',
    },
    {
      icon: Zap,
      title: 'Effortless',
      description: 'We design intuitive, simple experiences that remove friction from transactions.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#E9F0F1] flex flex-col">
      <MarketingNav
        currentPage="home"
        onNavigate={handleNavigate}
        onLogin={() => {}}
        onSignup={() => {}}
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-[#162a2c] mb-6"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontSize: 'clamp(32px, 5vw, 56px)',
              letterSpacing: '0.02em',
              fontWeight: 700,
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            About Ordino
          </motion.h1>
          
          <motion.p
            className="text-[#686867] max-w-2xl mx-auto"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontSize: 'clamp(16px, 2vw, 20px)',
              letterSpacing: '0.02em',
              lineHeight: '1.6',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We're on a mission to make personal finance simple, transparent, and empowering for everyone.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-[#686867]/10"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="size-8 text-[#5e6c5b]" />
              <h2
                className="text-[#162a2c]"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  letterSpacing: '0.02em',
                  fontWeight: 500,
                }}
              >
                About Us
              </h2>
            </div>
            
            <div className="space-y-4 text-[#686867]"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                fontSize: '16px',
                letterSpacing: '0.02em',
                lineHeight: '1.7',
              }}
            >
              <p>
                Ordino exists to make financial clarity part of everyday life.
              </p>
              
              <p>
                Managing personal finances has become increasingly complex. Between rising costs, multiple payment methods, subscriptions, and fragmented financial tools, many people feel overwhelmed by their money rather than in control of it. In today's economic environment, where financial pressure is a reality for so many, understanding where money goes is no longer optional. It is essential.
              </p>
              
              <p>
                Ordino was built to help solve this problem. We provide tools that bring financial activity into one clear view, allowing people to organize their spending, keep accurate records, and develop a better understanding of their financial habits. By turning everyday transactions into meaningful insight, Ordino helps people regain control and make more informed financial decisions.
              </p>
              
              <p>
                We focus on building practical solutions that fit naturally into real life. The platform is designed to be simple, secure, and reliable, designed to keep financial management straightforward.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 sm:px-8 bg-gradient-to-br from-[#5e6c5b] to-[#5e6c5b]/80">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TrendingUp className="size-10 text-white" />
          </motion.div>

          <motion.h2
            className="text-white mb-6"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontSize: 'clamp(28px, 4vw, 40px)',
              letterSpacing: '0.02em',
              fontWeight: 500,
            }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our Mission
          </motion.h2>

          <motion.p
            className="text-white/90 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontSize: 'clamp(16px, 2vw, 20px)',
              letterSpacing: '0.02em',
              lineHeight: '1.7',
            }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Provide simple, itemized financial insights that help people understand their spending and stay in control of their money.
          </motion.p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-[#162a2c] text-center mb-12"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontSize: 'clamp(28px, 4vw, 40px)',
              letterSpacing: '0.02em',
              fontWeight: 500,
            }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-[#E9F0F1] rounded-xl p-8 border border-[#686867]/10"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#5e6c5b] flex items-center justify-center flex-shrink-0">
                    <value.icon className="size-6 text-white" />
                  </div>
                  
                  <div>
                    <h3
                      className="text-[#162a2c] mb-2"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontSize: '20px',
                        letterSpacing: '0.02em',
                        fontWeight: 500,
                      }}
                    >
                      {value.title}
                    </h3>
                    
                    <p
                      className="text-[#686867]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontSize: '15px',
                        letterSpacing: '0.02em',
                        lineHeight: '1.6',
                      }}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MarketingFooter onNavigate={handleNavigate} />
    </div>
  );
}