import React from 'react';
import { useNavigate } from 'react-router';
import { useWallet } from '../contexts/WalletContext';
import ThemeToggle from './common/ThemeToggle';

const DashboardNavbar: React.FC = () => {
  const { walletAddress, disconnectWallet } = useWallet();
  const navigate = useNavigate();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">MarpeLink</span>
            </div>
          </div>

          {/* Theme Toggle, Greeting and Disconnect */}
          <div className="flex items-center space-x-4">
            <ThemeToggle size="sm" />
            {walletAddress && (
              <>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Welcome, {formatAddress(walletAddress)}
                </span>
                <button
                  onClick={handleDisconnect}
                  className="bg-red-500 text-white rounded px-3 py-1 text-sm font-medium hover:bg-red-600 transition duration-200"
                >
                  Disconnect Wallet
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
