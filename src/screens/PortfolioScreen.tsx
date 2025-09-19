import React, { useState, useEffect } from 'react';
import { Search, Plus, Trash2, Edit2, ArrowUpDown, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/Button';
import Input from '../components/Input';
import LoadingSpinner from '../components/LoadingSpinner';

interface Stock {
  id: string;
  ticker: string;
  company: string;
  sector: string;
  quantity: number;
  price: number;
  change: number;
}

interface PortfolioScreenProps {
  onNavigate: (screen: string) => void;
}

const PortfolioScreen: React.FC<PortfolioScreenProps> = ({ onNavigate }) => {
  const { isDarkMode } = useTheme();
  const [stocks, setStocks] = useState<Stock[]>([
    {
      id: '1',
      ticker: 'RELIANCE',
      company: 'Reliance Industries Ltd',
      sector: 'Energy',
      quantity: 50,
      price: 2456.75,
      change: 2.34,
    },
    {
      id: '2',
      ticker: 'INFY',
      company: 'Infosys Limited',
      sector: 'Technology',
      quantity: 100,
      price: 1543.20,
      change: -1.12,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Stock[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock stock data for search
  const mockStocks = [
    { ticker: 'TCS', company: 'Tata Consultancy Services', sector: 'Technology' },
    { ticker: 'HDFCBANK', company: 'HDFC Bank Ltd', sector: 'Banking' },
    { ticker: 'ICICIBANK', company: 'ICICI Bank Ltd', sector: 'Banking' },
    { ticker: 'SBIN', company: 'State Bank of India', sector: 'Banking' },
    { ticker: 'BHARTIARTL', company: 'Bharti Airtel Ltd', sector: 'Telecom' },
    { ticker: 'ITC', company: 'ITC Limited', sector: 'FMCG' },
    { ticker: 'WIPRO', company: 'Wipro Limited', sector: 'Technology' },
    { ticker: 'MARUTI', company: 'Maruti Suzuki India Ltd', sector: 'Automotive' },
  ];

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true);
      setTimeout(() => {
        const results = mockStocks.filter(
          stock =>
            stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stock.company.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(
          results.map(stock => ({
            id: Math.random().toString(),
            ...stock,
            quantity: 0,
            price: Math.random() * 3000 + 500,
            change: (Math.random() - 0.5) * 10,
          }))
        );
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const addStock = (stock: Stock, quantity: number) => {
    const newStock = {
      ...stock,
      id: Math.random().toString(),
      quantity,
    };
    setStocks([...stocks, newStock]);
    setShowAddModal(false);
    setSelectedStock(null);
    setSearchQuery('');
  };

  const removeStock = (id: string) => {
    setStocks(stocks.filter(stock => stock.id !== id));
  };

  const updateStockQuantity = (id: string, quantity: number) => {
    setStocks(stocks.map(stock => 
      stock.id === id ? { ...stock, quantity } : stock
    ));
  };

  const analyzePortfolio = async () => {
    if (stocks.length < 2) return;
    
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      onNavigate('advice');
    }, 3000);
  };

  const totalValue = stocks.reduce((sum, stock) => sum + (stock.price * stock.quantity), 0);

  return (
    <div className={`min-h-screen p-4 md:p-6 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-2xl md:text-3xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Portfolio Management
        </h1>
        <p className={`mt-2 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Add and manage your stock holdings
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className={`mb-8 p-6 rounded-xl shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Total Portfolio Value
            </h3>
            <p className={`text-2xl font-bold mt-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              ₹{totalValue.toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Total Stocks
            </h3>
            <p className={`text-2xl font-bold mt-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {stocks.length}
            </p>
          </div>
          <div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Sectors
            </h3>
            <p className={`text-2xl font-bold mt-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {new Set(stocks.map(s => s.sector)).size}
            </p>
          </div>
        </div>
      </div>

      {/* Add Stock Section */}
      <div className={`mb-8 p-6 rounded-xl shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Add Stocks to Portfolio
        </h3>
        
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search stocks by ticker or company name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-5 w-5" />}
            className="w-full"
          />
          
          {(isSearching || searchResults.length > 0) && (
            <div className={`absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto rounded-lg border shadow-lg z-10 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              {isSearching ? (
                <div className="p-4 text-center">
                  <LoadingSpinner size="sm" />
                  <span className={`ml-2 text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Searching...
                  </span>
                </div>
              ) : (
                searchResults.map((stock) => (
                  <button
                    key={stock.ticker}
                    onClick={() => {
                      setSelectedStock(stock);
                      setShowAddModal(true);
                    }}
                    className={`w-full p-4 text-left hover:bg-opacity-50 transition-colors border-b ${
                      isDarkMode 
                        ? 'hover:bg-gray-700 border-gray-700' 
                        : 'hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className={`font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {stock.ticker}
                        </h4>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {stock.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {stock.sector}
                        </span>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {searchQuery.length > 0 && searchQuery.length <= 2 && (
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Type at least 3 characters to search for stocks
          </p>
        )}
      </div>

      {/* Current Portfolio */}
      <div className={`mb-8 rounded-xl shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6 border-b border-gray-200">
          <h3 className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Your Portfolio ({stocks.length} stocks)
          </h3>
        </div>

        {stocks.length === 0 ? (
          <div className="p-12 text-center">
            <TrendingUp className={`mx-auto h-12 w-12 mb-4 ${
              isDarkMode ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <h4 className={`text-lg font-medium mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              No stocks in your portfolio
            </h4>
            <p className={`${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Start by searching and adding stocks above
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div className="space-y-4">
              {stocks.map((stock) => (
                <div
                  key={stock.id}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h4 className={`font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {stock.ticker}
                          </h4>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {stock.company}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {stock.sector}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Qty: {stock.quantity}
                        </span>
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Price: ₹{stock.price.toFixed(2)}
                        </span>
                        <span className={`text-sm font-medium ${
                          stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          ₹{(stock.price * stock.quantity).toLocaleString('en-IN')}
                        </p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Total Value
                        </p>
                      </div>
                      <button
                        onClick={() => removeStock(stock.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                        }`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Analysis Section */}
      <div className={`rounded-xl shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Portfolio Analysis
              </h3>
              <p className={`text-sm mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stocks.length < 2 
                  ? 'Add at least 2 stocks to analyze your portfolio' 
                  : 'Ready to analyze your portfolio for personalized advice'
                }
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={analyzePortfolio}
              disabled={stocks.length < 2 || isAnalyzing}
              icon={isAnalyzing ? <LoadingSpinner size="sm" /> : <TrendingUp className="h-5 w-5" />}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Portfolio'}
            </Button>
          </div>
          
          {stocks.length >= 2 && (
            <div className={`mt-4 p-4 rounded-lg ${
              isDarkMode ? 'bg-green-900/20' : 'bg-green-50'
            }`}>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-green-200' : 'text-green-800'
                }`}>
                  Portfolio ready for analysis
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Stock Modal */}
      {showAddModal && selectedStock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`max-w-md w-full rounded-xl shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6 border-b border-gray-200">
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Add Stock to Portfolio
              </h3>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h4 className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedStock.ticker}
                </h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {selectedStock.company}
                </p>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Current Price: ₹{selectedStock.price.toFixed(2)}
                </p>
              </div>
              
              <Input
                label="Quantity"
                type="number"
                placeholder="Enter number of shares"
                min="1"
                onChange={(e) => {
                  const quantity = parseInt(e.target.value) || 0;
                  setSelectedStock({ ...selectedStock, quantity });
                }}
              />
              
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedStock(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => addStock(selectedStock, selectedStock.quantity)}
                  disabled={!selectedStock.quantity || selectedStock.quantity <= 0}
                  className="flex-1"
                >
                  Add Stock
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioScreen;