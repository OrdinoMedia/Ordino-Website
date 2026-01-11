import { motion } from 'motion/react';
import { MessageSquare, Send, Sparkles, ArrowLeft, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { MarketingFooter } from './MarketingFooter';

interface VeroAIPageProps {
  onBack?: () => void;
  onNavigate?: (page: 'home' | 'features' | 'benefits' | 'resources' | 'support' | 'legal' | 'about') => void;
}

export function VeroAIPage({ onBack, onNavigate }: VeroAIPageProps) {
  const [veroInput, setVeroInput] = useState('');
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'vero', text: string }>>([
    {
      type: 'vero',
      text: "Hi! I'm Vero, your AI financial assistant. How can I help you today?"
    }
  ]);

  const veroPrompts = [
    'How can I save $200 this month?',
    'Show me my spending trends',
    'What are my biggest expenses?',
    'Help me create a budget',
    'Tips for reducing dining out costs',
    'How to build an emergency fund',
  ];

  const handleSendMessage = () => {
    if (veroInput.trim()) {
      // Add user message
      setMessages([...messages, { type: 'user', text: veroInput }]);
      
      // Simulate Vero response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'vero',
          text: "I'm here to help! In a live version, I would provide personalized financial guidance based on your specific question."
        }]);
      }, 800);
      
      setVeroInput('');
    }
  };

  const handlePromptClick = (prompt: string) => {
    setVeroInput(prompt);
  };

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
            className="text-[#162a2c] text-[32px] sm:text-[44px] lg:text-[56px] leading-tight mb-4"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              fontWeight: 700,
            }}
          >
            Vero AI Assistant
          </h1>
          <p
            className="text-[#686867] text-[16px] sm:text-[18px] lg:text-[20px]"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
            }}
          >
            Financial Insights Made Easy
          </p>
        </div>
      </section>

      {/* Main Chat Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Sidebar */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#E9F0F1] to-white rounded-3xl p-8 border-2 border-[#686867]/20 lg:col-span-1 h-fit shadow-lg"
          >
            <Sparkles className="w-12 h-12 mb-4 text-[#5e6c5b]" />
            <h3
              className="text-[#162a2c] text-[28px] mb-4"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                fontWeight: 700,
              }}
            >
              Meet Vero
            </h3>
            <p
              className="text-[#686867] text-[16px] leading-relaxed mb-6"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                lineHeight: '1.6',
              }}
            >
              Vero is your personal AI assistant designed to help you make smarter financial decisions and grow your money with confidence.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#5e6c5b] mt-2"></div>
                <p
                  className="text-[#686867] text-[14px]"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  }}
                >
                  Personalized financial advice
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#5e6c5b] mt-2"></div>
                <p
                  className="text-[#686867] text-[14px]"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  }}
                >
                  Budget optimization tips
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#5e6c5b] mt-2"></div>
                <p
                  className="text-[#686867] text-[14px]"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  }}
                >
                  Spending pattern analysis
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#5e6c5b] mt-2"></div>
                <p
                  className="text-[#686867] text-[14px]"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  }}
                >
                  Available 24/7
                </p>
              </div>
            </div>
            <div
              className="bg-[#ffa47d]/10 border border-[#ffa47d]/30 rounded-lg p-4 mt-6"
            >
              <button
                onClick={() => setIsDisclaimerOpen(!isDisclaimerOpen)}
                className="flex items-center gap-2 text-[#162a2c] text-[13px] hover:text-[#686867] transition-colors cursor-pointer"
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
                  className="text-[#686867] text-[12px] leading-relaxed mt-2"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    lineHeight: '1.6',
                  }}
                >
                  The AI features within this app, including insights, suggestions, and responses generated by Vero, are provided for general informational purposes only. They are not intended to constitute financial, legal, or professional advice. While we strive for accuracy, the AI may at times produce incomplete or incorrect information.
                  <br /><br />
                  You should always verify important details independently and consider consulting a qualified professional before making financial decisions. By using the AI features, you acknowledge and agree that all decisions you make are your own responsibility and that the app and its creators are not liable for any actions taken based on AI-generated content.
                </p>
              )}
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl border-2 border-[#686867]/20 p-8 lg:col-span-2 shadow-lg flex flex-col"
            style={{ height: '700px' }}
          >
            {/* Chat Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#686867]/10">
              <div className="w-12 h-12 rounded-full bg-[#E9F0F1] border-2 border-[#686867]/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[#686867]" />
              </div>
              <div>
                <h4
                  className="text-[#162a2c] text-[20px]"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Vero AI Assistant
                </h4>
                <p
                  className="text-[#686867] text-[14px]"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  }}
                >
                  Online • Ready to help
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto mb-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'vero' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E9F0F1] border-2 border-[#686867]/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[#686867]" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                      message.type === 'user'
                        ? 'bg-[#5e6c5b] text-white rounded-tr-none'
                        : 'bg-[#E9F0F1] text-[#162a2c] border border-[#686867]/10 rounded-tl-none'
                    }`}
                  >
                    <p
                      className="text-[15px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        lineHeight: '1.5',
                      }}
                    >
                      {message.text}
                    </p>
                  </div>
                  {message.type === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#686867] flex items-center justify-center text-white text-[14px]"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      U
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Prompt Suggestions */}
            {messages.length <= 1 && (
              <div className="mb-4">
                <p
                  className="text-[#686867] text-[13px] mb-3"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                  }}
                >
                  Try asking:
                </p>
                <div className="flex flex-wrap gap-2">
                  {veroPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handlePromptClick(prompt)}
                      className="px-4 py-2 bg-white text-[#686867] rounded-full text-[13px] border-2 border-[#686867]/20 hover:border-[#686867] transition-all"
                      style={{
                        fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Field */}
            <div className="flex gap-2">
              <input
                type="text"
                value={veroInput}
                onChange={(e) => setVeroInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask Vero anything..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-[#686867]/20 bg-white text-[#162a2c] placeholder:text-[#686867]/60 focus:outline-none focus:border-[#686867]/40"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                }}
              />
              <Button
                onClick={handleSendMessage}
                className="bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] transition-all duration-300 px-6"
                style={{
                  fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                }}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
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