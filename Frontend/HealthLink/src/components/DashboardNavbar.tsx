import React from 'react';
import { useWallet } from '../contexts/WalletContext';

const DashboardNavbar: React.FC = () => {
  const { walletAddress, disconnectWallet } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleDisconnect = () => {
    disconnectWallet();
    // Redirect will happen automatically via route protection
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">HealthLink</span>
            </div>
          </div>

          {/* Wallet Info */}
          <div className="flex items-center space-x-4">
            {walletAddress && (
              <>
                <div className="hidden sm:block">
                  <span className="text-sm text-gray-600">Welcome, </span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatAddress(walletAddress)}
                  </span>
                </div>
                <div className="sm:hidden">
                  <span className="text-sm font-medium text-gray-900">
                    {formatAddress(walletAddress)}
                  </span>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="bg-red-500 text-white rounded px-3 py-1 text-sm font-medium hover:bg-red-600 transition duration-200"
                >
                  Disconnect
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
