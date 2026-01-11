import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { LoadingPage } from './components/LoadingPage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { HomeHub } from './components/HomeHub';
import { DesktopHomeHub } from './components/DesktopHomeHub';
import { OnboardingProvider } from './components/OnboardingProvider';
import { MarketingNav } from './components/MarketingNav';
import { MarketingHome } from './components/marketing/MarketingHome';
import { FeaturesPage } from './components/marketing/FeaturesPage';
import { ResourcesPage } from './components/marketing/ResourcesPage';
import { VeroAIPage } from './components/marketing/VeroAIPage';
import { GuidesPage } from './components/marketing/GuidesPage';
import { BlogsPage } from './components/marketing/BlogsPage';
import { SupportPage } from './components/marketing/SupportPage';
import { LegalPage } from './components/marketing/LegalPage';
import { AboutPage } from './components/marketing/AboutPage';
import { MarketingBenefits } from './components/marketing/MarketingBenefits';
import { Toaster } from './components/ui/sonner';
import { createClient } from './utils/supabase/client';

type AppState = 'loading' | 'marketing-home' | 'marketing-features' | 'marketing-resources' | 'marketing-resources-vero' | 'marketing-resources-guides' | 'marketing-resources-blogs' | 'marketing-support' | 'marketing-legal' | 'marketing-about' | 'marketing-benefits' | 'login' | 'signup' | 'app';
type MarketingPage = 'home' | 'features' | 'resources' | 'support' | 'legal' | 'about' | 'benefits';

export default function App() {
  const [appState, setAppState] = useState<AppState>('loading');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // User is already logged in
        const name = session.user?.user_metadata?.name || session.user?.email?.split('@')[0] || 'User';
        setUserName(name);
        setUserEmail(session.user?.email || '');
        setUserId(session.user?.id || '');
        setAppState('app');
      } else {
        // No session, show marketing homepage
        setTimeout(() => {
          setAppState('marketing-home');
        }, 2500);
      }
    };

    checkSession();
  }, []);

  const handleLoginSuccess = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    // Get userId from session
    const getUserId = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user?.id || '');
      }
    };
    getUserId();
    setAppState('app');
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserName('');
    setUserEmail('');
    setUserId('');
    setAppState('marketing-home');
  };

  const handleMarketingNavigate = (page: MarketingPage) => {
    setAppState(`marketing-${page}` as AppState);
  };

  const getCurrentMarketingPage = (): MarketingPage => {
    if (appState.startsWith('marketing-')) {
      return appState.replace('marketing-', '') as MarketingPage;
    }
    return 'home';
  };

  const isMarketingPage = appState.startsWith('marketing-');
  const isAuthPage = appState === 'login' || appState === 'signup';

  return (
    <>
      <div className="min-h-screen w-full bg-[#E9F0F1]">
        {/* Marketing Navigation */}
        {isMarketingPage && (
          <MarketingNav
            currentPage={getCurrentMarketingPage()}
            onNavigate={handleMarketingNavigate}
            onLogin={() => setAppState('login')}
            onSignup={() => setAppState('signup')}
          />
        )}

        <AnimatePresence mode="wait">
          {appState === 'loading' && <LoadingPage key="loading" />}
          
          {/* Marketing Pages */}
          {appState === 'marketing-home' && (
            <MarketingHome 
              key="marketing-home" 
              onGetStarted={() => setAppState('signup')}
              onNavigate={handleMarketingNavigate}
            />
          )}
          {appState === 'marketing-features' && (
            <FeaturesPage 
              key="marketing-features"
              onGetStarted={() => setAppState('signup')}
              onNavigate={handleMarketingNavigate}
            />
          )}
          {appState === 'marketing-resources' && (
            <ResourcesPage 
              key="marketing-resources" 
              onNavigateToSubpage={(subpage) => setAppState(`marketing-resources-${subpage}` as AppState)}
              onNavigate={handleMarketingNavigate}
            />
          )}
          {appState === 'marketing-resources-vero' && (
            <VeroAIPage 
              key="marketing-resources-vero" 
              onBack={() => setAppState('marketing-resources')}
              onNavigate={handleMarketingNavigate}
            />
          )}
          {appState === 'marketing-resources-guides' && (
            <GuidesPage 
              key="marketing-resources-guides" 
              onBack={() => setAppState('marketing-resources')}
              onNavigate={handleMarketingNavigate}
            />
          )}
          {appState === 'marketing-resources-blogs' && (
            <BlogsPage 
              key="marketing-resources-blogs" 
              onBack={() => setAppState('marketing-resources')}
              onNavigate={handleMarketingNavigate}
            />
          )}
          {appState === 'marketing-support' && (
            <SupportPage 
              key="marketing-support"
              onNavigate={handleMarketingNavigate}
            />
          )}
          {appState === 'marketing-legal' && (
            <LegalPage 
              key="marketing-legal"
              onNavigate={handleMarketingNavigate}
            />
          )}
          {appState === 'marketing-about' && (
            <AboutPage 
              key="marketing-about"
              onNavigate={handleMarketingNavigate}
            />
          )}
          {appState === 'marketing-benefits' && (
            <MarketingBenefits 
              key="marketing-benefits" 
              onGetStarted={() => setAppState('signup')}
              onNavigate={handleMarketingNavigate}
            />
          )}

          {/* Auth Pages */}
          {appState === 'login' && (
            <LoginPage 
              key="login" 
              onLoginSuccess={handleLoginSuccess}
              onBack={() => setAppState('marketing-home')}
            />
          )}
          {appState === 'signup' && (
            <SignupPage 
              key="signup" 
              onSignupSuccess={() => setAppState('app')}
              onBack={() => setAppState('marketing-home')}
            />
          )}

          {/* App */}
          {appState === 'app' && (
            <OnboardingProvider userId={userId}>
              <DesktopHomeHub 
                key="app" 
                userName={userName} 
                userEmail={userEmail}
                userId={userId}
                onLogout={handleLogout} 
              />
            </OnboardingProvider>
          )}
        </AnimatePresence>
      </div>
      <Toaster position="top-center" />
    </>
  );
}