import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface OnboardingContextType {
  isFirstTimeUser: boolean;
  isOnboardingActive: boolean;
  currentOnboardingStep: number;
  startOnboarding: () => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
  nextOnboardingStep: () => void;
  setOnboardingStep: (step: number) => void;
  restartOnboarding: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}

interface OnboardingProviderProps {
  children: ReactNode;
  userId?: string;
}

export function OnboardingProvider({ children, userId }: OnboardingProviderProps) {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [isOnboardingActive, setIsOnboardingActive] = useState(false);
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0);
  const [isChecking, setIsChecking] = useState(true);

  // Check if user has completed onboarding
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!userId) {
        setIsChecking(false);
        return;
      }

      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/onboarding-status/${userId}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const hasCompletedOnboarding = data.completed || false;
          
          if (!hasCompletedOnboarding) {
            setIsFirstTimeUser(true);
            // Auto-start onboarding for first-time users
            setTimeout(() => {
              setIsOnboardingActive(true);
            }, 500);
          }
        } else {
          // If user doesn't exist in onboarding records, they're a first-time user
          setIsFirstTimeUser(true);
          setTimeout(() => {
            setIsOnboardingActive(true);
          }, 500);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkOnboardingStatus();
  }, [userId]);

  const startOnboarding = () => {
    setIsOnboardingActive(true);
    setCurrentOnboardingStep(0);
  };

  const completeOnboarding = async () => {
    setIsOnboardingActive(false);
    setIsFirstTimeUser(false);

    // Save completion status to backend
    if (userId) {
      try {
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/onboarding-complete`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
          }
        );
      } catch (error) {
        console.error('Error saving onboarding completion:', error);
      }
    }
  };

  const skipOnboarding = async () => {
    await completeOnboarding();
  };

  const nextOnboardingStep = () => {
    setCurrentOnboardingStep((prev) => prev + 1);
  };

  const setOnboardingStep = (step: number) => {
    setCurrentOnboardingStep(step);
  };

  const restartOnboarding = async () => {
    // Reset onboarding status in backend
    if (userId) {
      try {
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-f858851b/onboarding-reset`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
          }
        );
      } catch (error) {
        console.error('Error resetting onboarding:', error);
      }
    }

    // Reset local state
    setIsOnboardingActive(true);
    setCurrentOnboardingStep(0);
    setIsFirstTimeUser(true);
  };

  if (isChecking) {
    return null; // or a loading spinner
  }

  return (
    <OnboardingContext.Provider
      value={{
        isFirstTimeUser,
        isOnboardingActive,
        currentOnboardingStep,
        startOnboarding,
        completeOnboarding,
        skipOnboarding,
        nextOnboardingStep,
        setOnboardingStep,
        restartOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
