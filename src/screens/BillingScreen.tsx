import React, { useState } from 'react';
import { CreditCard, Download, Check, Crown, Zap, Shield, TrendingUp, AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

interface BillingScreenProps {
  onNavigate: (screen: string) => void;
}

const BillingScreen: React.FC<BillingScreenProps> = ({ onNavigate }) => {
  const { isDarkMode } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'enterprise'>('premium');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 99,
      period: 'month',
      features: [
        '5 portfolio analyses per month',
        'Basic stock recommendations',
        'Email support',
        'Mobile app access',
      ],
      recommended: false,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 299,
      period: 'month',
      features: [
        'Unlimited portfolio analyses',
        'Advanced AI recommendations',
        'Real-time market alerts',
        'Priority support',
        'Detailed risk analysis',
        'Export reports (PDF/CSV)',
      ],
      recommended: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 999,
      period: 'month',
      features: [
        'Everything in Premium',
        'Multi-portfolio management',
        'Custom risk models',
        'API access',
        'Dedicated account manager',
        'White-label solutions',
      ],
      recommended: false,
    },
  ];

  const transactions = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 299,
      description: 'Premium Plan - Monthly',
      status: 'Paid',
    },
    {
      id: '2',
      date: '2023-12-15',
      amount: 299,
      description: 'Premium Plan - Monthly',
      status: 'Paid',
    },
    {
      id: '3',
      date: '2023-11-15',
      amount: 299,
      description: 'Premium Plan - Monthly',
      status: 'Paid',
    },
  ];

  const currentUsage = {
    analyses: 7,
    limit: 10,
    resetDate: '2024-02-01',
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    setShowPaymentModal(true);
    
    // Simulate Flexprice payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowPaymentModal(false);
      // Show success message
    }, 3000);
  };

  const downloadReceipt = (transactionId: string) => {
    // Simulate receipt download
    const blob = new Blob([`Receipt for transaction ${transactionId}`], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${transactionId}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
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
          Billing & Subscription
        </h1>
        <p className={`mt-2 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current Usage */}
      <div className={`mb-8 p-6 rounded-xl shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-xl font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Current Usage
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Analyses This Month
            </h3>
            <p className={`text-2xl font-bold mt-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {currentUsage.analyses}/{currentUsage.limit}
            </p>
            <div className={`w-full h-2 rounded-full mt-2 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${(currentUsage.analyses / currentUsage.limit) * 100}%` }}
              />
            </div>
          </div>
          
          <div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Current Plan
            </h3>
            <p className={`text-2xl font-bold mt-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Basic
            </p>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              ₹99/month
            </p>
          </div>
          
          <div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Next Billing
            </h3>
            <p className={`text-2xl font-bold mt-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Feb 1
            </p>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Auto-renewal
            </p>
          </div>
        </div>

        {currentUsage.analyses >= currentUsage.limit * 0.8 && (
          <div className={`mt-6 p-4 rounded-lg border-l-4 border-orange-400 ${
            isDarkMode ? 'bg-orange-900/20' : 'bg-orange-50'
          }`}>
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-orange-400 mr-2" />
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-orange-200' : 'text-orange-800'
              }`}>
                You're nearing your monthly limit. Consider upgrading for unlimited analyses.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pricing Plans */}
      <div className={`mb-8 p-6 rounded-xl shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-xl font-semibold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Subscription Plans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedPlan === plan.id
                  ? isDarkMode
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-blue-500 bg-blue-50'
                  : isDarkMode
                    ? 'border-gray-700 hover:border-gray-600'
                    : 'border-gray-200 hover:border-gray-300'
              } ${plan.recommended ? 'transform scale-105' : ''}`}
              onClick={() => setSelectedPlan(plan.id as any)}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Recommended
                  </span>
                </div>
              )}

              <div className="text-center mb-4">
                <h3 className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {plan.name}
                </h3>
                <div className="mt-2">
                  <span className={`text-3xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    ₹{plan.price}
                  </span>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    /{plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {selectedPlan === plan.id && (
                <div className="mt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handlePayment}
                    icon={<CreditCard className="h-4 w-4" />}
                  >
                    Choose {plan.name}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            All plans include SSL encryption, 24/7 monitoring, and data backup. Cancel anytime.
          </p>
        </div>
      </div>

      {/* Payment Features */}
      <div className={`mb-8 p-6 rounded-xl shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className={`text-xl font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Secure Payment with Flexprice
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <h3 className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Secure Payments
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Bank-grade encryption
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <h3 className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Instant Processing
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Immediate activation
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Crown className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <h3 className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Flexible Billing
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Monthly or yearly
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className={`rounded-xl shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6 border-b border-gray-200">
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Transaction History
          </h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div>
                  <h3 className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {transaction.description}
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {new Date(transaction.date).toLocaleDateString('en-IN')}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      ₹{transaction.amount}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadReceipt(transaction.id)}
                    icon={<Download className="h-4 w-4" />}
                  >
                    Receipt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Processing Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-md w-full rounded-xl shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6 text-center">
              {isProcessingPayment ? (
                <>
                  <LoadingSpinner size="lg" className="mx-auto mb-4" />
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Processing Payment
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Please wait while we process your payment with Flexprice...
                  </p>
                </>
              ) : (
                <>
                  <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Payment Successful!
                  </h3>
                  <p className={`text-sm mb-6 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Your subscription has been activated. You can now enjoy unlimited portfolio analyses.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => setShowPaymentModal(false)}
                    className="w-full"
                  >
                    Continue
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingScreen;