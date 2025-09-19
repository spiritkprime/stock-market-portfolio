import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const { isDarkMode } = useTheme();

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`animate-spin ${sizeClasses[size]} ${className}`}>
      <div className={`w-full h-full border-2 border-transparent rounded-full ${
        isDarkMode ? 'border-t-blue-400' : 'border-t-blue-600'
      }`} />
    </div>
  );
};

export default LoadingSpinner;