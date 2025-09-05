import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

interface WalletContextType {
  // Wallet state
  isConnected: boolean;
  walletAddress: string | null;
  isLoading: boolean;
  
  // Actions
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Removed auto-reconnect logic - users must manually connect from landing page

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      const ethereum = await detectEthereumProvider();
      
      if (!ethereum) {
        throw new Error('MetaMask not found. Please install MetaMask.');
      }

      if (!(ethereum as any).isMetaMask) {
        throw new Error('Please use MetaMask wallet.');
      }

      // Request account access
      await (ethereum as any).request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.BrowserProvider(ethereum as any);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      setIsConnected(true);

      // Set up event listeners
      (ethereum as any).on('accountsChanged', handleAccountsChanged);
      (ethereum as any).on('chainChanged', handleChainChanged);
      
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      throw new Error(error.message || 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsConnected(false);
    setIsLoading(false);
    
    // Remove any stored wallet connection data
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    
    // Clean up event listeners
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      ethereum.removeAllListeners('accountsChanged');
      ethereum.removeAllListeners('chainChanged');
    }
    
    // Force redirect to landing page
    window.location.href = '/';
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setWalletAddress(accounts[0]);
    }
  };

  const handleChainChanged = () => {
    // Reload the page to reset the dapp state
    window.location.reload();
  };

  const value: WalletContextType = {
    isConnected,
    walletAddress,
    isLoading,
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
