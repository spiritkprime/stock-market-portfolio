import React, { InputHTMLAttributes, ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  helperText,
  className = '',
  ...props
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="w-full">
      {label && (
        <label className={`block text-sm font-medium mb-2 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {icon}
          </div>
        )}
        
        <input
          className={`
            block w-full rounded-lg border transition-all duration-200
            ${icon ? 'pl-10 pr-3' : 'px-3'} py-3
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : isDarkMode
                ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500'
                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500'
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 animate-fade-in">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;