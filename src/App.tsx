import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import AdviceScreen from './screens/AdviceScreen';
import BillingScreen from './screens/BillingScreen';
import Navigation from './components/Navigation';
import LoadingSpinner from './components/LoadingSpinner';

type Screen = 'login' | 'signup' | 'forgot-password' | 'dashboard' | 'profile' | 'portfolio' | 'advice' | 'billing';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useAuth();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
      if (user) {
        setCurrentScreen('dashboard');
      }
    }
  }, [user, loading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onNavigate={setCurrentScreen} />;
      case 'signup':
        return <SignupScreen onNavigate={setCurrentScreen} />;
      case 'forgot-password':
        return <ForgotPasswordScreen onNavigate={setCurrentScreen} />;
      case 'dashboard':
        return <DashboardScreen onNavigate={setCurrentScreen} />;
      case 'profile':
        return <ProfileScreen onNavigate={setCurrentScreen} />;
      case 'portfolio':
        return <PortfolioScreen onNavigate={setCurrentScreen} />;
      case 'advice':
        return <AdviceScreen onNavigate={setCurrentScreen} />;
      case 'billing':
        return <BillingScreen onNavigate={setCurrentScreen} />;
      default:
        return <DashboardScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {user && <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />}
      <main className={user ? 'pb-16 md:pb-0 md:ml-64' : ''}>
        {renderScreen()}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;