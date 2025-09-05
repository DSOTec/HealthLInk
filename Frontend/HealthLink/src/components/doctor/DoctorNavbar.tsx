import React from 'react';
import { useNavigate } from 'react-router';
import { useWallet } from '../../contexts/WalletContext';
import { useDoctor } from '../../contexts/DoctorContext';

const DoctorNavbar: React.FC = () => {
  const { walletAddress, disconnectWallet } = useWallet();
  const { doctorProfile } = useDoctor();
  const navigate = useNavigate();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">MarpeLink</span>
              <span className="ml-2 text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                Doctor Portal
              </span>
            </div>
          </div>

          {/* Doctor Greeting and Wallet Info */}
          <div className="flex items-center space-x-4">
            {doctorProfile && walletAddress && (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-gray-700">
                    Welcome, Dr. {doctorProfile.name.split(' ').pop()}
                  </span>
                  <span className="text-xs text-gray-500">|</span>
                  <span className="text-xs font-mono text-gray-600">
                    {formatAddress(walletAddress)}
                  </span>
                </div>
                <div className="md:hidden">
                  <span className="text-sm text-gray-700">
                    Dr. {doctorProfile.name.split(' ').pop()}
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

export default DoctorNavbar;
