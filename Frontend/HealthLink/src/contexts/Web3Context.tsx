import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { CONTRACTS, NETWORKS } from '../config/contracts';

interface Web3ContextType {
  // Wallet state
  account: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  isConnected: boolean;
  isLoading: boolean;
  chainId: number | null;
  
  // Contract instances
  healthLinkContract: ethers.Contract | null;
  stablecoinContract: ethers.Contract | null;
  
  // Actions
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchToArbitrumSepolia: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chainId, setChainId] = useState<number | null>(null);
  const [healthLinkContract, setHealthLinkContract] = useState<ethers.Contract | null>(null);
  const [stablecoinContract, setStablecoinContract] = useState<ethers.Contract | null>(null);

  // Initialize contracts when signer is available
  useEffect(() => {
    if (signer && chainId === NETWORKS.ARBITRUM_SEPOLIA.chainId) {
      try {
        const healthLink = new ethers.Contract(
          CONTRACTS.HEALTHLINK.address,
          CONTRACTS.HEALTHLINK.abi,
          signer
        );
        
        const stablecoin = new ethers.Contract(
          CONTRACTS.MOCK_STABLECOIN.address,
          CONTRACTS.MOCK_STABLECOIN.abi,
          signer
        );
        
        setHealthLinkContract(healthLink);
        setStablecoinContract(stablecoin);
      } catch (error) {
        console.error('Error initializing contracts:', error);
      }
    } else {
      setHealthLinkContract(null);
      setStablecoinContract(null);
    }
  }, [signer, chainId]);

  // Check if wallet is already connected on page load
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const ethereum = await detectEthereumProvider();
      if (ethereum && (ethereum as any).isMetaMask) {
        const provider = new ethers.BrowserProvider(ethereum as any);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          const signer = await provider.getSigner();
          const network = await provider.getNetwork();
          
          setProvider(provider);
          setSigner(signer);
          setAccount(accounts[0].address);
          setChainId(Number(network.chainId));
          setIsConnected(true);
        }
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  };

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      const ethereum = await detectEthereumProvider();
      
      if (!ethereum) {
        throw new Error('MetaMask not found. Please install MetaMask.');
      }

      if (!ethereum.isMetaMask) {
        throw new Error('Please use MetaMask wallet.');
      }

      // Request account access
      await (ethereum as any).request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.BrowserProvider(ethereum as any);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      const address = await signer.getAddress();

      setProvider(provider);
      setSigner(signer);
      setAccount(address);
      setChainId(Number(network.chainId));
      setIsConnected(true);

      // Set up event listeners
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('chainChanged', handleChainChanged);
      
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      throw new Error(error.message || 'Failed to connect wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setIsConnected(false);
    setChainId(null);
    setHealthLinkContract(null);
    setStablecoinContract(null);
  };

  const switchToArbitrumSepolia = async () => {
    try {
      const ethereum = await detectEthereumProvider();
      if (!ethereum) throw new Error('MetaMask not found');

      try {
        // Try to switch to Arbitrum Sepolia
        await (ethereum as any).request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${NETWORKS.ARBITRUM_SEPOLIA.chainId.toString(16)}` }],
        });
      } catch (switchError: any) {
        // If the chain doesn't exist, add it
        if (switchError.code === 4902) {
          await (ethereum as any).request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${NETWORKS.ARBITRUM_SEPOLIA.chainId.toString(16)}`,
                chainName: NETWORKS.ARBITRUM_SEPOLIA.name,
                rpcUrls: [NETWORKS.ARBITRUM_SEPOLIA.rpcUrl],
                blockExplorerUrls: [NETWORKS.ARBITRUM_SEPOLIA.blockExplorer],
                nativeCurrency: NETWORKS.ARBITRUM_SEPOLIA.nativeCurrency,
              },
            ],
          });
        } else {
          throw switchError;
        }
      }
    } catch (error: any) {
      console.error('Error switching network:', error);
      throw new Error('Failed to switch to Arbitrum Sepolia');
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
    }
  };

  const handleChainChanged = (chainId: string) => {
    setChainId(parseInt(chainId, 16));
    // Reload the page to reset the dapp state
    window.location.reload();
  };

  const value: Web3ContextType = {
    account,
    provider,
    signer,
    isConnected,
    isLoading,
    chainId,
    healthLinkContract,
    stablecoinContract,
    connectWallet,
    disconnectWallet,
    switchToArbitrumSepolia,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};
