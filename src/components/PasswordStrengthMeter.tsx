import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const { isDarkMode } = useTheme();

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    return strength;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500'];

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded-full transition-colors ${
              level <= strength ? strengthColors[strength - 1] : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${
        strength < 3 ? 'text-red-500' : strength < 4 ? 'text-yellow-500' : 'text-green-500'
      }`}>
        Password strength: {strengthLabels[strength - 1] || 'Very Weak'}
      </p>
      <div className={`text-xs space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <p className={password.length >= 8 ? 'text-green-500' : ''}>
          ✓ At least 8 characters
        </p>
        <p className={/[a-z]/.test(password) ? 'text-green-500' : ''}>
          ✓ One lowercase letter
        </p>
        <p className={/[A-Z]/.test(password) ? 'text-green-500' : ''}>
          ✓ One uppercase letter
        </p>
        <p className={/[0-9]/.test(password) ? 'text-green-500' : ''}>
          ✓ One number
        </p>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;