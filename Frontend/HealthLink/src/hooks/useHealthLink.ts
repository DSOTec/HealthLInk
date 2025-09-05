import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../contexts/Web3Context';

export interface Doctor {
  name: string;
  specialty: string;
  walletAddress: string;
  isRegistered: boolean;
  totalRatings: number;
  ratingSum: number;
  averageRating: number;
}

export interface Consultation {
  id: number;
  patient: string;
  doctor: string;
  amount: string;
  isCompleted: boolean;
  isCancelled: boolean;
  isRated: boolean;
  timestamp: number;
}

export const useHealthLink = () => {
  const { healthLinkContract, stablecoinContract, account } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: any) => {
    console.error('HealthLink contract error:', error);
    let message = 'An error occurred';
    
    if (error.reason) {
      message = error.reason;
    } else if (error.message) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }
    
    setError(message);
    throw new Error(message);
  }, []);

  // Doctor functions
  const registerDoctor = useCallback(async (name: string, specialty: string) => {
    if (!healthLinkContract) throw new Error('Contract not initialized');
    
    setLoading(true);
    setError(null);
    
    try {
      const tx = await healthLinkContract.registerDoctor(name, specialty);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [healthLinkContract, handleError]);

  const getDoctorInfo = useCallback(async (doctorAddress: string): Promise<Doctor | null> => {
    if (!healthLinkContract) throw new Error('Contract not initialized');
    
    try {
      const result = await healthLinkContract.getDoctorInfo(doctorAddress);
      return {
        name: result[0],
        specialty: result[1],
        walletAddress: doctorAddress,
        isRegistered: result[2],
        totalRatings: Number(result[3]),
        averageRating: Number(result[4]),
        ratingSum: 0, // Not returned by getDoctorInfo
      };
    } catch (error) {
      handleError(error);
      return null;
    }
  }, [healthLinkContract, handleError]);

  // Consultation functions
  const requestConsultation = useCallback(async (doctorAddress: string, amount: string) => {
    if (!healthLinkContract || !stablecoinContract) throw new Error('Contracts not initialized');
    
    setLoading(true);
    setError(null);
    
    try {
      // First approve the HealthLink contract to spend tokens
      const amountWei = ethers.parseUnits(amount, 6); // HLUSD has 6 decimals
      const approveTx = await stablecoinContract.approve(
        await healthLinkContract.getAddress(),
        amountWei
      );
      await approveTx.wait();
      
      // Then request the consultation
      const tx = await healthLinkContract.requestConsultation(doctorAddress, amountWei);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [healthLinkContract, stablecoinContract, handleError]);

  const completeConsultation = useCallback(async (consultationId: number) => {
    if (!healthLinkContract) throw new Error('Contract not initialized');
    
    setLoading(true);
    setError(null);
    
    try {
      const tx = await healthLinkContract.completeConsultation(consultationId);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [healthLinkContract, handleError]);

  const cancelConsultation = useCallback(async (consultationId: number) => {
    if (!healthLinkContract) throw new Error('Contract not initialized');
    
    setLoading(true);
    setError(null);
    
    try {
      const tx = await healthLinkContract.cancelConsultation(consultationId);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [healthLinkContract, handleError]);

  const rateDoctor = useCallback(async (consultationId: number, rating: number) => {
    if (!healthLinkContract) throw new Error('Contract not initialized');
    if (rating < 1 || rating > 5) throw new Error('Rating must be between 1 and 5');
    
    setLoading(true);
    setError(null);
    
    try {
      const tx = await healthLinkContract.rateDoctor(consultationId, rating);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [healthLinkContract, handleError]);

  // Query functions
  const getConsultationDetails = useCallback(async (consultationId: number): Promise<Consultation | null> => {
    if (!healthLinkContract) throw new Error('Contract not initialized');
    
    try {
      const result = await healthLinkContract.getConsultationDetails(consultationId);
      return {
        id: consultationId,
        patient: result[0],
        doctor: result[1],
        amount: ethers.formatUnits(result[2], 6), // Format from wei to HLUSD
        isCompleted: result[3],
        isCancelled: result[4],
        isRated: result[5],
        timestamp: Number(result[6]),
      };
    } catch (error) {
      handleError(error);
      return null;
    }
  }, [healthLinkContract, handleError]);

  const getPatientConsultations = useCallback(async (patientAddress?: string): Promise<number[]> => {
    if (!healthLinkContract) throw new Error('Contract not initialized');
    
    const address = patientAddress || account;
    if (!address) throw new Error('No patient address provided');
    
    try {
      const consultationIds = await healthLinkContract.getPatientConsultations(address);
      return consultationIds.map((id: any) => Number(id));
    } catch (error) {
      handleError(error);
      return [];
    }
  }, [healthLinkContract, account, handleError]);

  const getDoctorConsultations = useCallback(async (doctorAddress?: string): Promise<number[]> => {
    if (!healthLinkContract) throw new Error('Contract not initialized');
    
    const address = doctorAddress || account;
    if (!address) throw new Error('No doctor address provided');
    
    try {
      const consultationIds = await healthLinkContract.getDoctorConsultations(address);
      return consultationIds.map((id: any) => Number(id));
    } catch (error) {
      handleError(error);
      return [];
    }
  }, [healthLinkContract, account, handleError]);

  // Token functions
  const getTokenBalance = useCallback(async (address?: string): Promise<string> => {
    if (!stablecoinContract) throw new Error('Stablecoin contract not initialized');
    
    const userAddress = address || account;
    if (!userAddress) throw new Error('No address provided');
    
    try {
      const balance = await stablecoinContract.balanceOf(userAddress);
      return ethers.formatUnits(balance, 6); // HLUSD has 6 decimals
    } catch (error) {
      handleError(error);
      return '0';
    }
  }, [stablecoinContract, account, handleError]);

  const requestTokens = useCallback(async () => {
    if (!stablecoinContract) throw new Error('Stablecoin contract not initialized');
    
    setLoading(true);
    setError(null);
    
    try {
      const tx = await stablecoinContract.faucet();
      await tx.wait();
      return tx.hash;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [stablecoinContract, handleError]);

  const approveTokens = useCallback(async (spender: string, amount: string) => {
    if (!stablecoinContract) throw new Error('Stablecoin contract not initialized');
    
    setLoading(true);
    setError(null);
    
    try {
      const amountWei = ethers.parseUnits(amount, 6);
      const tx = await stablecoinContract.approve(spender, amountWei);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [stablecoinContract, handleError]);

  return {
    // State
    loading,
    error,
    
    // Doctor functions
    registerDoctor,
    getDoctorInfo,
    
    // Consultation functions
    requestConsultation,
    completeConsultation,
    cancelConsultation,
    rateDoctor,
    
    // Query functions
    getConsultationDetails,
    getPatientConsultations,
    getDoctorConsultations,
    
    // Token functions
    getTokenBalance,
    requestTokens,
    approveTokens,
  };
};
