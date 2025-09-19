import React, { useState } from 'react';
import { User, Mail, Lock, Camera, Shield, Bell, LogOut, Save, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import LoadingSpinner from '../components/LoadingSpinner';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate }) => {
  const { isDarkMode } = useTheme();
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketUpdates: false,
    portfolioAlerts: true,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleProfileSave = async () => {
    setIsLoading(true);
    setErrors({});

    const newErrors: typeof errors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      setErrors({ general: 'Failed to update profile' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    setIsLoading(true);
    setErrors({});

    const newErrors: typeof errors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate password change
    setTimeout(() => {
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsLoading(false);
      // Show success message
    }, 1500);
  };

  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  return (
    <div className={`min-h-screen p-4 md:p-6 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-2xl md:text-3xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Profile Settings
        </h1>
        <p className={`mt-2 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Manage your account settings and preferences
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Information */}
        <div className={`rounded-xl shadow-sm ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Profile Information
              </h3>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        fullName: user?.fullName || '',
                        email: user?.email || '',
                      });
                      setErrors({});
                    }}
                    icon={<X className="h-4 w-4" />}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleProfileSave}
                    disabled={isLoading}
                    icon={isLoading ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4" />}
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-6 mb-6">
              <div className="relative">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className={`w-10 h-10 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  )}
                </div>
                <button className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  isDarkMode 
                    ? 'bg-gray-600 border-gray-800 text-gray-200' 
                    : 'bg-white border-gray-200 text-gray-600'
                } hover:opacity-80 transition-opacity`}>
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h4 className={`text-lg font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {user?.fullName}
                </h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {user?.email}
                </p>
                {user?.isPremium && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                    Premium Member
                  </span>
                )}
              </div>
            </div>

            {/* Profile Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                error={errors.fullName}
                icon={<User className="h-5 w-5" />}
                disabled={!isEditing}
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                icon={<Mail className="h-5 w-5" />}
                disabled={!isEditing}
                required
              />
            </div>

            {errors.general && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{errors.general}</p>
              </div>
            )}
          </div>
        </div>

        {/* Change Password */}
        <div className={`rounded-xl shadow-sm ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="p-6 border-b border-gray-200">
            <h3 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Change Password
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <Input
                label="Current Password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                error={errors.currentPassword}
                icon={<Lock className="h-5 w-5" />}
                placeholder="Enter current password"
                autoComplete="current-password"
              />
              
              <Input
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                error={errors.newPassword}
                icon={<Lock className="h-5 w-5" />}
                placeholder="Enter new password"
                autoComplete="new-password"
              />
              
              <Input
                label="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                error={errors.confirmPassword}
                icon={<Lock className="h-5 w-5" />}
                placeholder="Confirm new password"
                autoComplete="new-password"
              />
            </div>

            <div className="mt-6">
              <Button
                variant="primary"
                onClick={handlePasswordChange}
                disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword}
                icon={isLoading ? <LoadingSpinner size="sm" /> : <Lock className="h-5 w-5" />}
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className={`rounded-xl shadow-sm ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="p-6 border-b border-gray-200">
            <h3 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Notification Preferences
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {[
                { key: 'email', label: 'Email Notifications', description: 'Receive important updates via email' },
                { key: 'push', label: 'Push Notifications', description: 'Get real-time alerts on your device' },
                { key: 'marketUpdates', label: 'Market Updates', description: 'Daily market news and analysis' },
                { key: 'portfolioAlerts', label: 'Portfolio Alerts', description: 'Notifications about your portfolio changes' },
              ].map((notification) => (
                <div key={notification.key} className="flex items-center justify-between">
                  <div>
                    <h4 className={`text-sm font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {notification.label}
                    </h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {notification.description}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[notification.key as keyof typeof notifications]}
                      onChange={(e) => setNotifications({
                        ...notifications,
                        [notification.key]: e.target.checked,
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security */}
        <div className={`rounded-xl shadow-sm ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="p-6 border-b border-gray-200">
            <h3 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Security
            </h3>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <h4 className={`text-sm font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Two-Factor Authentication
                    </h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Add an extra layer of security to your account
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Recent Activity
                </h4>
                <div className="space-y-2">
                  {[
                    { action: 'Signed in', location: 'Mumbai, India', time: '2 hours ago' },
                    { action: 'Portfolio analyzed', location: 'Mumbai, India', time: '5 hours ago' },
                    { action: 'Password changed', location: 'Mumbai, India', time: '2 days ago' },
                  ].map((activity, index) => (
                    <div key={index} className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {activity.action} • {activity.location} • {activity.time}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className={`rounded-xl shadow-sm border-2 border-red-200 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="p-6 border-b border-red-200">
            <h3 className="text-lg font-semibold text-red-600">
              Danger Zone
            </h3>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Sign Out
                </h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Sign out of your account on this device
                </p>
              </div>
              <Button
                variant="danger"
                onClick={handleLogout}
                icon={<LogOut className="h-4 w-4" />}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;