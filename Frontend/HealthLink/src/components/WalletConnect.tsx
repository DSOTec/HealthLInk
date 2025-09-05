import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { NETWORKS } from '../config/contracts';

const WalletConnect: React.FC = () => {
  const {
    account,
    isConnected,
    isLoading,
    chainId,
    connectWallet,
    disconnectWallet,
    switchToArbitrumSepolia,
  } = useWeb3();

  const isCorrectNetwork = chainId === NETWORKS.ARBITRUM_SEPOLIA.chainId;

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSwitchNetwork = async () => {
    try {
      await switchToArbitrumSepolia();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-sm text-gray-600">Connecting...</span>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Connect Your Wallet</h3>
          <p className="text-sm text-gray-500 mb-6">
            Connect your MetaMask wallet to access HealthLink features
          </p>
          <button
            onClick={handleConnect}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Connect MetaMask
          </button>
        </div>
      </div>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Wrong Network</h3>
          <p className="text-sm text-gray-500 mb-4">
            Please switch to Arbitrum Sepolia testnet to use HealthLink
          </p>
          <p className="text-xs text-gray-400 mb-6">
            Connected to: {chainId ? `Chain ID ${chainId}` : 'Unknown network'}
          </p>
          <button
            onClick={handleSwitchNetwork}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Switch to Arbitrum Sepolia
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">
              Connected: {formatAddress(account!)}
            </p>
            <p className="text-xs text-green-600">
              Arbitrum Sepolia Testnet
            </p>
          </div>
        </div>
        <button
          onClick={disconnectWallet}
          className="text-sm text-green-600 hover:text-green-800 font-medium"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default WalletConnect;
