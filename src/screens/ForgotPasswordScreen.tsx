import React, { useState } from 'react';
import { ArrowLeft, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';
import Input from '../components/Input';
import LoadingSpinner from '../components/LoadingSpinner';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: string) => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<'email' | 'sent' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { resetPassword } = useAuth();
  const { isDarkMode } = useTheme();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Please enter a valid email' });
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      await resetPassword(email);
      setStep('sent');
    } catch (error) {
      setErrors({ email: 'Email not found in our system' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: typeof errors = {};
    
    if (!newPassword) {
      newErrors.password = 'Password is required';
    } else if (newPassword.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('login');
    }, 1500);
  };

  if (step === 'email') {
    return (
      <div className={`min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-green-50'
      }`}>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className={`rounded-full p-3 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className={`mt-6 text-center text-3xl font-bold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Reset Your Password
          </h2>
          <p className={`mt-2 text-center text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Enter your email address and we'll send you a reset link
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className={`py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <form className="space-y-6" onSubmit={handleEmailSubmit}>
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="Enter your email"
                icon={<Mail className="h-5 w-5" />}
                autoComplete="email"
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={!email || isLoading}
                icon={isLoading ? <LoadingSpinner size="sm" /> : <ArrowRight className="h-5 w-5" />}
              >
                {isLoading ? 'Sending reset link...' : 'Send Reset Link'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => onNavigate('login')}
                className={`inline-flex items-center text-sm font-medium transition-colors ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'sent') {
    return (
      <div className={`min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-green-50'
      }`}>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="rounded-full p-3 bg-green-500">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className={`mt-6 text-center text-3xl font-bold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Check Your Email
          </h2>
          <p className={`mt-2 text-center text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We've sent a password reset link to <strong>{email}</strong>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className={`py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="space-y-4">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Didn't receive the email? Check your spam folder or click below to resend.
              </p>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => setStep('email')}
              >
                Resend Email
              </Button>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setStep('reset')}
              >
                I have the reset code
              </Button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => onNavigate('login')}
                className={`inline-flex items-center text-sm font-medium transition-colors ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                }`}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-green-50'
    }`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className={`mt-6 text-center text-3xl font-bold tracking-tight ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Set New Password
        </h2>
        <p className={`mt-2 text-center text-sm ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Choose a strong password for your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <form className="space-y-6" onSubmit={handleResetSubmit}>
            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={errors.password}
              placeholder="Enter new password"
              autoComplete="new-password"
              required
            />

            <Input
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              placeholder="Confirm new password"
              autoComplete="new-password"
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!newPassword || !confirmPassword || isLoading}
              icon={isLoading ? <LoadingSpinner size="sm" /> : <ArrowRight className="h-5 w-5" />}
            >
              {isLoading ? 'Updating password...' : 'Update Password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;