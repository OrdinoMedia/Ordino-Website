import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface MarketingNavProps {
  currentPage: 'home' | 'features' | 'resources' | 'support' | 'benefits' | 'legal' | 'about';
  onNavigate: (page: 'home' | 'features' | 'resources' | 'support' | 'benefits' | 'legal' | 'about') => void;
  onLogin: () => void;
  onSignup: () => void;
}

export function MarketingNav({ currentPage, onNavigate, onLogin, onSignup }: MarketingNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'home' as const, label: 'Home' },
    { id: 'features' as const, label: 'Features' },
    { id: 'benefits' as const, label: 'Benefits' },
    { id: 'resources' as const, label: 'Resources' },
    { id: 'support' as const, label: 'Support' },
  ];

  const handleNavClick = (page: 'home' | 'features' | 'resources' | 'support' | 'benefits' | 'legal' | 'about') => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-[#E9F0F1] lg:border-b-2 lg:border-[#686867]/20 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center z-50"
        >
          <h1
            className="font-bold text-[#E9F0F1] text-[24px] sm:text-[32px] leading-none"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontVariationSettings: "'opsz' 14, 'wdth' 100",
              textShadow: 'rgba(0,0,0,0.33) 0px 3px 10px',
            }}
          >
            ORDINO
          </h1>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`transition-all px-4 py-2 border-2 rounded-md ${
                currentPage === item.id
                  ? 'text-[#162a2c] border-transparent'
                  : 'text-[#686867] hover:text-[#162a2c] border-transparent hover:border-[#686867]'
              }`}
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 700,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Button
            onClick={onLogin}
            variant="ghost"
            className="text-[#686867] hover:text-[#162a2c] hover:bg-transparent border-2 border-transparent hover:border-[#686867] transition-all"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 400,
            }}
          >
            Login
          </Button>
          <Button
            onClick={onSignup}
            className="bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] transition-colors"
            style={{
              fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
              letterSpacing: '0.02em',
              fontWeight: 400,
            }}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden z-50 p-2"
        >
          {mobileMenuOpen ? (
            <X className="size-6 text-[#686867]" />
          ) : (
            <Menu className="size-6 text-[#686867]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#E9F0F1] border-t border-[#686867]/20 absolute top-full left-0 right-0 z-40 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left transition-all px-4 py-3 border-2 rounded-md ${
                    currentPage === item.id
                      ? 'text-[#162a2c] border-[#686867]'
                      : 'text-[#686867] hover:text-[#162a2c] border-transparent hover:border-[#686867]'
                  }`}
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    fontWeight: 700,
                  }}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 space-y-3 border-t border-[#686867]/20">
                <Button
                  onClick={() => {
                    onLogin();
                    setMobileMenuOpen(false);
                  }}
                  variant="ghost"
                  className="w-full text-[#686867] hover:text-[#162a2c] hover:bg-transparent border-2 border-transparent hover:border-[#686867] transition-all"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    fontWeight: 400,
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    onSignup();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#E9F0F1] text-[#686867] border-2 border-[#686867] hover:bg-[#686867] hover:text-[#E9F0F1] transition-colors"
                  style={{
                    fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                    letterSpacing: '0.02em',
                    fontWeight: 400,
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}