import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Layout from '../components/Layout';
import { useToast } from '../components/ToastContainer';
import type { Payment } from '../types/pages';

// Payment Modal Component
const PaymentModal: React.FC<{
  showMakePayment: boolean;
  setShowMakePayment: (show: boolean) => void;
  walletBalance: { eth: number; usd: number };
  handleMakePayment: (amount: string, recipient: string, description: string) => Promise<void>;
  showToast: (type: 'success' | 'error' | 'warning', message: string, duration?: number) => void;
}> = ({ showMakePayment, setShowMakePayment, walletBalance, handleMakePayment, showToast }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handleSubmitPayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      showToast('error', 'Please enter a valid amount');
      return;
    }

    if (!recipient || !ethers.isAddress(recipient)) {
      showToast('error', 'Please enter a valid recipient address');
      return;
    }

    if (parseFloat(amount) > walletBalance.eth) {
      showToast('error', 'Insufficient balance');
      return;
    }

    setPaymentLoading(true);
    await handleMakePayment(amount, recipient, description);
    setPaymentLoading(false);
    
    // Reset form
    setAmount('');
    setRecipient('');
    setDescription('');
  };

  if (!showMakePayment) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Make Payment</h3>
            <button
              onClick={() => setShowMakePayment(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (ETH)
              </label>
              <input
                type="number"
                step="0.0001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Available: {walletBalance.eth.toFixed(4)} ETH
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Payment description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Network Info */}
            <div className="bg-blue-50 p-3 rounded-md">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-blue-700 font-medium">Arbitrum Sepolia Testnet</span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Transaction will be sent on Arbitrum Sepolia testnet
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowMakePayment(false)}
              disabled={paymentLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitPayment}
              disabled={paymentLoading || !amount || !recipient}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {paymentLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Send Payment</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Payments: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMakePayment, setShowMakePayment] = useState(false);
  const [walletBalance, setWalletBalance] = useState({ eth: 0, usd: 0 });
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      date: new Date('2024-01-15'),
      amount: 0.075,
      status: 'completed',
      doctorName: 'Dr. Sarah Wilson',
      service: 'Cardiology Consultation',
      transactionHash: '0x742d35Cc6634C0532925a3b8D4C9db96590c2b02',
      paymentMethod: 'ETH'
    },
    {
      id: '2',
      date: new Date('2024-01-10'),
      amount: 0.0375,
      status: 'completed',
      doctorName: 'Dr. Michael Chen',
      service: 'Dermatology Checkup',
      transactionHash: '0x8f2a7b1c9d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
      paymentMethod: 'ETH'
    },
    {
      id: '3',
      date: new Date('2024-01-08'),
      amount: 0.1,
      status: 'pending',
      doctorName: 'Dr. Emily Rodriguez',
      service: 'Pediatric Consultation',
      paymentMethod: 'ETH'
    },
    {
      id: '4',
      date: new Date('2024-01-05'),
      amount: 0.06,
      status: 'completed',
      doctorName: 'Dr. James Thompson',
      service: 'Orthopedic Assessment',
      transactionHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
      paymentMethod: 'ETH'
    },
    {
      id: '5',
      date: new Date('2024-01-03'),
      amount: 0.045,
      status: 'failed',
      doctorName: 'Dr. Lisa Park',
      service: 'Neurology Consultation',
      paymentMethod: 'ETH'
    }
  ]);

  // Arbitrum Sepolia testnet configuration
  const ARBITRUM_SEPOLIA = {
    chainId: '0x66eee', // 421614 in hex
    chainName: 'Arbitrum Sepolia',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://sepolia.arbiscan.io/'],
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodColor = (method: Payment['paymentMethod']) => {
    switch (method) {
      case 'HLUSD':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ETH':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Credit Card':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Connect to MetaMask and switch to Arbitrum Sepolia
  const connectWallet = async () => {
    if (!window.ethereum) {
      showToast('error', 'MetaMask is not installed!');
      return;
    }

    try {
      setIsLoading(true);
      
      // Request account access
      const accounts = await window.ethereum!.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        
        // Switch to Arbitrum Sepolia
        await switchToArbitrumSepolia();
        
        // Get balance
        await getWalletBalance(accounts[0]);
        
        showToast('success', 'Wallet connected successfully!');
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      showToast('error', error.message || 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const switchToArbitrumSepolia = async () => {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ARBITRUM_SEPOLIA.chainId }],
      });
    } catch (switchError: any) {
      // Chain not added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum!.request({
            method: 'wallet_addEthereumChain',
            params: [ARBITRUM_SEPOLIA],
          });
        } catch (addError) {
          throw new Error('Failed to add Arbitrum Sepolia network');
        }
      } else {
        throw switchError;
      }
    }
  };

  const getWalletBalance = async (address: string) => {
    if (!window.ethereum) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      const ethBalance = parseFloat(ethers.formatEther(balance));
      
      // Mock USD conversion (in real app, use price API)
      const ethToUsd = 2000; // Approximate ETH price
      const usdBalance = ethBalance * ethToUsd;
      
      setWalletBalance({
        eth: ethBalance,
        usd: usdBalance
      });
    } catch (error) {
      console.error('Error getting balance:', error);
      showToast('error', 'Failed to get wallet balance');
    }
  };

  const handleMakePayment = async (amount: string, recipient: string, description: string) => {
    if (!isConnected) {
      showToast('error', 'Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      
      const provider = new ethers.BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();
      
      // Convert amount to wei
      const amountInWei = ethers.parseEther(amount);
      
      // Create transaction
      const transaction = {
        to: recipient || '0x742d35Cc6634C0532925a3b8D4C9db96590c2b02', // Default recipient
        value: amountInWei,
        gasLimit: 21000,
      };
      
      // Send transaction
      const txResponse = await signer.sendTransaction(transaction);
      
      showToast('success', `Transaction sent! Hash: ${txResponse.hash.substring(0, 10)}...`);
      
      // Add to payments list
      const newPayment: Payment = {
        id: Date.now().toString(),
        date: new Date(),
        amount: parseFloat(amount),
        status: 'pending',
        doctorName: 'Dr. New Payment',
        service: description || 'Custom Payment',
        transactionHash: txResponse.hash,
        paymentMethod: 'ETH'
      };
      
      setPayments(prev => [newPayment, ...prev]);
      setShowMakePayment(false);
      
      // Wait for confirmation
      const receipt = await txResponse.wait();
      if (receipt) {
        showToast('success', 'Transaction confirmed!');
        // Update payment status
        setPayments(prev => 
          prev.map(p => 
            p.id === newPayment.id 
              ? { ...p, status: 'completed' as const }
              : p
          )
        );
        // Refresh balance
        await getWalletBalance(walletAddress);
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      showToast('error', error.message || 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  const totalSpent = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
            await getWalletBalance(accounts[0]);
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };
    
    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          getWalletBalance(accounts[0]);
        } else {
          setWalletAddress('');
          setIsConnected(false);
          setWalletBalance({ eth: 0, usd: 0 });
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        window.ethereum!.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  return (
    <Layout>
      <div className="min-h-full bg-gray-50 py-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payments & Wallet</h1>
          <p className="mt-2 text-gray-600">
            Manage your payments and wallet balance
          </p>
        </div>

        {/* Wallet Connection & Balance */}
        {!isConnected ? (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
              <p className="text-gray-600 mb-6">Connect your MetaMask wallet to view balance and make payments on Arbitrum Sepolia testnet.</p>
              <button
                onClick={connectWallet}
                disabled={isLoading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Connect MetaMask</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Wallet Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Wallet Connected</h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Arbitrum Sepolia</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-mono text-sm text-gray-900">{walletAddress.substring(0, 6)}...{walletAddress.substring(38)}</p>
                </div>
              </div>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">ETH Balance</p>
                    <p className="text-2xl font-bold">{walletBalance.eth.toFixed(4)} ETH</p>
                    <p className="text-purple-100 text-xs mt-1">Arbitrum Sepolia</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-full p-3">
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2L3 10.5l7 4 7-4L10 2z"/>
                      <path d="M3 10.5L10 18l7-7.5"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">USD Value</p>
                    <p className="text-2xl font-bold">${walletBalance.usd.toFixed(2)}</p>
                    <p className="text-green-100 text-xs mt-1">Approximate</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-full p-3">
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Payment Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-semibold text-gray-900">{totalSpent.toFixed(4)} ETH</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-semibold text-gray-900">{pendingAmount.toFixed(4)} ETH</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-semibold text-gray-900">{payments.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Make Payment Button */}
        {isConnected && (
          <div className="mb-8">
            <button
              onClick={() => setShowMakePayment(true)}
              disabled={isLoading}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )}
              <span>Make Payment</span>
            </button>
          </div>
        )}

        {/* Payment History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Payment History</h2>
            
            <div className="flex space-x-4">
              {/* Search */}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search payments..."
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          {filteredPayments.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.date.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{payment.service}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.doctorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.amount.toFixed(4)} ETH
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPaymentMethodColor(payment.paymentMethod)}`}>
                          {payment.paymentMethod}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.transactionHash ? (
                          <a 
                            href={`https://sepolia.arbiscan.io/tx/${payment.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 font-mono text-xs"
                          >
                            {payment.transactionHash.substring(0, 10)}...
                          </a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Make Payment Modal */}
        <PaymentModal 
          showMakePayment={showMakePayment}
          setShowMakePayment={setShowMakePayment}
          walletBalance={walletBalance}
          handleMakePayment={handleMakePayment}
          showToast={showToast}
        />
      </div>
      </div>
    </Layout>
  );
};

export default Payments;
