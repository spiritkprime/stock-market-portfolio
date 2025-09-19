import React, { useState } from 'react';
import { Download, Share2, TrendingUp, TrendingDown, Minus, Target, AlertTriangle, FileText, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';

interface AdviceScreenProps {
  onNavigate: (screen: string) => void;
}

interface StockAdvice {
  ticker: string;
  company: string;
  currentPrice: number;
  change: number;
  advice: 'Buy' | 'Sell' | 'Hold' | 'Reduce';
  reason: string;
  riskNote: string;
  confidence: number;
  targetPrice?: number;
  quantity: number;
}

const AdviceScreen: React.FC<AdviceScreenProps> = ({ onNavigate }) => {
  const { isDarkMode } = useTheme();
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const stockAdvice: StockAdvice[] = [
    {
      ticker: 'RELIANCE',
      company: 'Reliance Industries Ltd',
      currentPrice: 2456.75,
      change: 2.34,
      advice: 'Hold',
      reason: 'Strong quarterly earnings with robust petrochemical margins. Company showing resilience in volatile market conditions.',
      riskNote: 'Energy sector facing regulatory headwinds',
      confidence: 85,
      targetPrice: 2650,
      quantity: 50,
    },
    {
      ticker: 'INFY',
      company: 'Infosys Limited',
      currentPrice: 1543.20,
      change: -1.12,
      advice: 'Buy',
      reason: 'IT sector recovery underway with strong deal pipeline. Digital transformation demand remains robust.',
      riskNote: 'Currency fluctuation risks persist',
      confidence: 92,
      targetPrice: 1750,
      quantity: 100,
    },
    {
      ticker: 'HDFCBANK',
      company: 'HDFC Bank Ltd',
      currentPrice: 1675.50,
      change: -0.85,
      advice: 'Reduce',
      reason: 'Banking sector facing margin pressure due to rising interest rates. Credit growth concerns in retail segment.',
      riskNote: 'High market volatility detected',
      confidence: 78,
      targetPrice: 1500,
      quantity: 75,
    },
  ];

  const portfolioSummary = {
    totalValue: 245000,
    recommendation: 'Your portfolio shows good diversification across IT and Energy sectors. Consider adding pharma or FMCG stocks for better balance.',
    riskScore: '6.5/10',
    expectedReturn: '12-15%',
    timeHorizon: '1-2 years',
  };

  const getAdviceColor = (advice: string) => {
    switch (advice.toLowerCase()) {
      case 'buy':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'sell':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'hold':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'reduce':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getAdviceIcon = (advice: string) => {
    switch (advice.toLowerCase()) {
      case 'buy':
        return <TrendingUp className="h-4 w-4" />;
      case 'sell':
        return <TrendingDown className="h-4 w-4" />;
      case 'hold':
        return <Minus className="h-4 w-4" />;
      case 'reduce':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const handleDownload = async (format: 'pdf' | 'csv') => {
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
      // Create a simple download simulation
      const blob = new Blob([`Stock Analysis Report - ${format.toUpperCase()}`], { 
        type: format === 'pdf' ? 'application/pdf' : 'text/csv' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio-analysis.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    }, 2000);
  };

  const handleShare = (method: string) => {
    // Simulate sharing
    console.log(`Sharing via ${method}`);
    setShowShareModal(false);
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
          Portfolio Analysis & Advice
        </h1>
        <p className={`mt-2 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Personalized recommendations for your stock portfolio
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className={`mb-8 p-6 rounded-xl shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-xl font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Portfolio Overview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Total Portfolio Value
            </h3>
            <p className={`text-2xl font-bold mt-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              ₹{portfolioSummary.totalValue.toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Risk Score
            </h3>
            <p className={`text-2xl font-bold mt-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {portfolioSummary.riskScore}
            </p>
          </div>
          <div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Expected Return
            </h3>
            <p className={`text-2xl font-bold mt-1 text-green-600`}>
              {portfolioSummary.expectedReturn}
            </p>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${
          isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
        }`}>
          <h4 className={`font-medium mb-2 ${
            isDarkMode ? 'text-blue-200' : 'text-blue-900'
          }`}>
            Key Recommendation
          </h4>
          <p className={`text-sm ${
            isDarkMode ? 'text-blue-100' : 'text-blue-800'
          }`}>
            {portfolioSummary.recommendation}
          </p>
        </div>
      </div>

      {/* Stock-wise Advice Cards */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Individual Stock Recommendations
          </h2>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowShareModal(true)}
              icon={<Share2 className="h-4 w-4" />}
            >
              Share Report
            </Button>
            <Button
              variant="primary"
              onClick={() => handleDownload('pdf')}
              disabled={isDownloading}
              icon={<Download className="h-4 w-4" />}
            >
              Download Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {stockAdvice.map((stock) => (
            <div
              key={stock.ticker}
              className={`p-6 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-lg font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {stock.ticker}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                      isDarkMode 
                        ? getAdviceColor(stock.advice).replace('bg-', 'bg-opacity-20 ').replace('text-', 'text-')
                        : getAdviceColor(stock.advice)
                    }`}>
                      <span className="flex items-center">
                        {getAdviceIcon(stock.advice)}
                        <span className="ml-1">{stock.advice}</span>
                      </span>
                    </span>
                  </div>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stock.company}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    ₹{stock.currentPrice.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-end">
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className={`text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Analysis
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {stock.reason}
                  </p>
                </div>

                {stock.riskNote && (
                  <div className={`p-3 rounded-lg ${
                    isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'
                  }`}>
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p className={`text-sm ${
                        isDarkMode ? 'text-yellow-200' : 'text-yellow-800'
                      }`}>
                        <strong>Risk Note:</strong> {stock.riskNote}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Confidence: {stock.confidence}%
                      </span>
                      <div className={`w-20 h-1 rounded-full mt-1 ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${stock.confidence}%` }}
                        />
                      </div>
                    </div>
                    
                    {stock.targetPrice && (
                      <div>
                        <span className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Target Price
                        </span>
                        <p className={`text-sm font-medium ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}>
                          ₹{stock.targetPrice}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <span className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Holdings: {stock.quantity} shares
                    </span>
                    <p className={`text-sm font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      ₹{(stock.currentPrice * stock.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`p-6 rounded-xl shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Save & Share Analysis
        </h3>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Button
            variant="primary"
            onClick={() => {
              // Save to profile logic
              console.log('Saving analysis to profile');
            }}
            icon={<FileText className="h-4 w-4" />}
            className="flex-1"
          >
            Save to Profile
          </Button>
          
          <Button
            variant="outline"
            onClick={() => onNavigate('portfolio')}
            className="flex-1"
          >
            Analyze Another Portfolio
          </Button>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-md w-full rounded-xl shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6 border-b border-gray-200">
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Share Analysis Report
              </h3>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Your personal data will be kept private
              </p>
            </div>
            
            <div className="p-6 space-y-3">
              <Button
                variant="outline"
                onClick={() => handleShare('email')}
                icon={<Mail className="h-4 w-4" />}
                className="w-full justify-start"
              >
                Share via Email
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleDownload('pdf')}
                icon={<Download className="h-4 w-4" />}
                className="w-full justify-start"
              >
                Download PDF Report
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleDownload('csv')}
                icon={<Download className="h-4 w-4" />}
                className="w-full justify-start"
              >
                Download CSV Data
              </Button>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setShowShareModal(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdviceScreen;