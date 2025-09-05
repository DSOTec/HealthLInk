import React, { useState, useEffect } from 'react';
import { useHealthLink } from '../hooks/useHealthLink';
import { useWeb3 } from '../contexts/Web3Context';

const ConsultationRequest: React.FC = () => {
  const { requestConsultation, getTokenBalance, requestTokens, loading, error } = useHealthLink();
  const { isConnected, account } = useWeb3();
  const [formData, setFormData] = useState({
    doctorAddress: '',
    amount: '',
  });
  const [balance, setBalance] = useState('0');
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && account) {
      loadBalance();
    }
  }, [isConnected, account]);

  const loadBalance = async () => {
    try {
      const userBalance = await getTokenBalance();
      setBalance(userBalance);
    } catch (err) {
      console.error('Failed to load balance:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRequestTokens = async () => {
    try {
      const txHash = await requestTokens();
      setSuccess(`Tokens requested successfully! Transaction: ${txHash}`);
      // Reload balance after getting tokens
      setTimeout(loadBalance, 2000);
    } catch (err: any) {
      console.error('Failed to request tokens:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);

    if (!formData.doctorAddress.trim() || !formData.amount.trim()) {
      return;
    }

    try {
      const txHash = await requestConsultation(formData.doctorAddress.trim(), formData.amount);
      setSuccess(`Consultation requested successfully! Transaction: ${txHash}`);
      setFormData({ doctorAddress: '', amount: '' });
      // Reload balance after transaction
      setTimeout(loadBalance, 2000);
    } catch (err: any) {
      console.error('Consultation request failed:', err);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-600">Please connect your wallet to request a consultation.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Consultation</h2>
      
      {/* Balance Display */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Your HLUSD Balance</p>
            <p className="text-2xl font-bold text-gray-900">{balance} HLUSD</p>
          </div>
          <button
            onClick={handleRequestTokens}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
          >
            Get Test Tokens
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-600">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="doctorAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Doctor's Wallet Address *
          </label>
          <input
            type="text"
            id="doctorAddress"
            name="doctorAddress"
            value={formData.doctorAddress}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0x..."
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter the Ethereum address of the registered doctor
          </p>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Consultation Fee (HLUSD) *
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="100.00"
          />
          <p className="mt-1 text-xs text-gray-500">
            Amount will be held in escrow until consultation is completed
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">How it works</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Your payment is held securely in escrow</li>
                  <li>Doctor receives payment only after consultation completion</li>
                  <li>You can cancel and get a refund if doctor agrees</li>
                  <li>Rate the doctor after successful consultation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !formData.doctorAddress.trim() || !formData.amount.trim() || parseFloat(formData.amount) <= 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            'Request Consultation'
          )}
        </button>
      </form>
    </div>
  );
};

export default ConsultationRequest;
