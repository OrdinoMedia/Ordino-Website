import { Linkedin, Instagram, Twitter } from 'lucide-react';

interface MarketingFooterProps {
  onNavigate: (page: 'home' | 'features' | 'benefits' | 'resources' | 'support' | 'legal' | 'about') => void;
}

export function MarketingFooter({ onNavigate }: MarketingFooterProps) {
  const handleNavigate = (page: 'home' | 'features' | 'benefits' | 'resources' | 'support' | 'legal' | 'about') => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNavigate(page);
  };

  return (
    <footer className="bg-[#E9F0F1] border-t border-[#686867]/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <h3
              className="font-bold text-[#E9F0F1] text-[24px] sm:text-[32px] leading-none"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontVariationSettings: "'opsz' 14, 'wdth' 100",
                textShadow: 'rgba(0,0,0,0.33) 0px 3px 10px',
              }}
            >
              ORDINO
            </h3>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => handleNavigate('features')}
              className="transition-all px-3 py-2 border-2 border-transparent hover:border-[#686867] rounded-md text-[#686867] hover:text-[#162a2c] text-[13px]"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 400,
              }}
            >
              Features
            </button>
            <button
              onClick={() => handleNavigate('benefits')}
              className="transition-all px-3 py-2 border-2 border-transparent hover:border-[#686867] rounded-md text-[#686867] hover:text-[#162a2c] text-[13px]"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 400,
              }}
            >
              Benefits
            </button>
            <button
              onClick={() => handleNavigate('resources')}
              className="transition-all px-3 py-2 border-2 border-transparent hover:border-[#686867] rounded-md text-[#686867] hover:text-[#162a2c] text-[13px]"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 400,
              }}
            >
              Resources
            </button>
            <button
              onClick={() => handleNavigate('support')}
              className="transition-all px-3 py-2 border-2 border-transparent hover:border-[#686867] rounded-md text-[#686867] hover:text-[#162a2c] text-[13px]"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 400,
              }}
            >
              Support
            </button>
            <button
              onClick={() => handleNavigate('about')}
              className="transition-all px-3 py-2 border-2 border-transparent hover:border-[#686867] rounded-md text-[#686867] hover:text-[#162a2c] text-[13px]"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 400,
              }}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigate('legal')}
              className="transition-all px-3 py-2 border-2 border-transparent hover:border-[#686867] rounded-md text-[#686867] hover:text-[#162a2c] text-[13px]"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
                fontWeight: 400,
              }}
            >
              Legal
            </button>
          </div>

          {/* Social Media Links & Store Icons */}
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 text-[#686867] hover:text-[#162a2c] transition-colors duration-300" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 text-[#686867] hover:text-[#162a2c] transition-colors duration-300" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-5 h-5 text-[#686867] hover:text-[#162a2c] transition-colors duration-300" />
            </a>
            
            {/* Divider */}
            <div className="w-px h-5 bg-[#686867]/30"></div>
            
            {/* App Store Icon */}
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="group">
              <svg className="w-5 h-5 text-[#686867] group-hover:text-[#162a2c] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
            </a>
            
            {/* Google Play Icon */}
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="group">
              <svg className="w-5 h-5 text-[#686867] group-hover:text-[#162a2c] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div>
            <p
              className="text-[#686867] text-[14px]"
              style={{
                fontFamily: "'Helvetica World', 'Helvetica', sans-serif",
                letterSpacing: '0.02em',
              }}
            >
              © 2025 Ordino. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}