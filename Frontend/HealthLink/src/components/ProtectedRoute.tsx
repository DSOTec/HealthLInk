import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useWallet } from '../contexts/WalletContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isConnected, walletAddress } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected || !walletAddress) {
      navigate('/');
    }
  }, [isConnected, walletAddress, navigate]);

  // Don't render children if wallet is not connected
  if (!isConnected || !walletAddress) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to landing page...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
