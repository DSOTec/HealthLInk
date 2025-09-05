import React from 'react';
import type { Patient } from '../../types/dashboard';

interface HeaderProps {
  patient: Patient;
  upcomingConsultations: number;
  onConnectWallet: () => void;
}

const Header: React.FC<HeaderProps> = ({ patient, upcomingConsultations, onConnectWallet }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Greeting and Summary */}
        <div className="flex items-center space-x-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {getGreeting()}, {patient.name}
            </h2>
            <p className="text-gray-600 mt-1">
              {upcomingConsultations > 0 
                ? `${upcomingConsultations} upcoming consultation${upcomingConsultations > 1 ? 's' : ''}`
                : 'No upcoming consultations'
              }
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">💊</span>
                <div>
                  <p className="text-sm font-medium text-blue-800">Health Score</p>
                  <p className="text-lg font-bold text-blue-600">85%</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-green-600">⚡</span>
                <div>
                  <p className="text-sm font-medium text-green-800">Active Plan</p>
                  <p className="text-lg font-bold text-green-600">Premium</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Wallet and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Wallet Connection */}
          <button
            onClick={onConnectWallet}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              patient.walletAddress
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {patient.walletAddress ? (
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{formatWalletAddress(patient.walletAddress)}</span>
              </div>
            ) : (
              'Connect Wallet'
            )}
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <img
              src={patient.avatar}
              alt={patient.name}
              className="w-10 h-10 rounded-full border-2 border-gray-200"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800">{patient.name}</p>
              <p className="text-xs text-gray-500">{patient.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
