import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Activity, Target, ArrowUpRight, Plus, AlertTriangle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [portfolioCount, setPortfolioCount] = useState(3);
  const [usageQuota, setUsageQuota] = useState({ used: 7, limit: 10 });

  const stats = [
    {
      name: 'Total Portfolio Value',
      value: '₹2,45,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      name: 'Monthly Return',
      value: '+8.2%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      name: 'Active Stocks',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: PieChart,
    },
    {
      name: 'Risk Score',
      value: '6.5/10',
      change: '-0.5',
      trend: 'down',
      icon: Activity,
    },
  ];

  const recentAdvice = [
    {
      stock: 'Reliance Industries',
      ticker: 'RELIANCE',
      advice: 'Hold',
      reason: 'Strong quarterly results expected',
      confidence: 85,
    },
    {
      stock: 'Infosys',
      ticker: 'INFY',
      advice: 'Buy',
      reason: 'IT sector showing recovery signs',
      confidence: 92,
    },
    {
      stock: 'HDFC Bank',
      ticker: 'HDFCBANK',
      advice: 'Reduce',
      reason: 'Banking sector facing headwinds',
      confidence: 78,
    },
  ];

  const getAdviceColor = (advice: string) => {
    switch (advice.toLowerCase()) {
      case 'buy':
        return 'text-green-600 bg-green-100';
      case 'sell':
        return 'text-red-600 bg-red-100';
      case 'hold':
        return 'text-yellow-600 bg-yellow-100';
      case 'reduce':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
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
          Welcome back, {user?.fullName}
        </h1>
        <p className={`mt-2 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Here's your investment overview for today
        </p>
      </div>

      {/* Usage Warning */}
      {usageQuota.used >= usageQuota.limit * 0.8 && (
        <div className={`mb-6 p-4 rounded-lg border-l-4 border-orange-400 ${
          isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50'
        }`}>
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-orange-400 mr-2" />
            <p className={`text-sm font-medium ${
              isDarkMode ? 'text-orange-200' : 'text-orange-800'
            }`}>
              You're nearing your monthly analysis limit ({usageQuota.used}/{usageQuota.limit})
            </p>
          </div>
          <div className="mt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate('billing')}
            >
              Upgrade Plan
            </Button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className={`p-6 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.name}
                  </p>
                  <p className={`text-2xl font-bold mt-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Advice */}
        <div className={`rounded-xl shadow-sm ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Recent Stock Advice
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('advice')}
                icon={<ArrowUpRight className="h-4 w-4" />}
              >
                View All
              </Button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {recentAdvice.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                  isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.stock}
                    </h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {item.ticker}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode 
                      ? getAdviceColor(item.advice).replace('bg-', 'bg-opacity-20 ')
                      : getAdviceColor(item.advice)
                  }`}>
                    {item.advice}
                  </span>
                </div>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {item.reason}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Confidence: {item.confidence}%
                  </span>
                  <div className={`w-16 h-1 rounded-full ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${item.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`rounded-xl shadow-sm ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="p-6 border-b border-gray-200">
            <h3 className={`text-lg font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Actions
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => onNavigate('portfolio')}
              icon={<Plus className="h-5 w-5" />}
              iconPosition="left"
            >
              Analyze New Portfolio
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => onNavigate('advice')}
              icon={<Target className="h-5 w-5" />}
              iconPosition="left"
            >
              View All Recommendations
            </Button>
            
            <div className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <h4 className={`font-medium mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Usage This Month
              </h4>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {usageQuota.used} of {usageQuota.limit} analyses used
                </span>
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {Math.round((usageQuota.used / usageQuota.limit) * 100)}%
                </span>
              </div>
              <div className={`w-full h-2 rounded-full ${
                isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
              }`}>
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${(usageQuota.used / usageQuota.limit) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className={`rounded-xl shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6 border-b border-gray-200">
          <h3 className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Market Overview
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'SENSEX', value: '65,945', change: '+0.85%', trend: 'up' },
              { name: 'NIFTY', value: '19,674', change: '+0.92%', trend: 'up' },
              { name: 'BANK NIFTY', value: '44,123', change: '-0.23%', trend: 'down' },
              { name: 'IT INDEX', value: '29,856', change: '+1.34%', trend: 'up' },
            ].map((index) => (
              <div key={index.name} className="text-center">
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {index.name}
                </p>
                <p className={`text-lg font-bold mt-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {index.value}
                </p>
                <div className="flex items-center justify-center mt-1">
                  {index.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs font-medium ${
                    index.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {index.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;