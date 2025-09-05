// Types for all pages
export interface Symptom {
  id: string;
  name: string;
  category: string;
  severity: 'mild' | 'moderate' | 'severe';
  description?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  availability: 'available' | 'busy' | 'offline';
  nextAvailable: Date;
  image: string;
  experience: number;
  consultationFee: number;
}

export interface HealthRecord {
  id: string;
  date: Date;
  type: 'consultation' | 'prescription' | 'lab_result' | 'imaging' | 'vaccination';
  title: string;
  doctorName: string;
  description: string;
  fileUrl?: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface Payment {
  id: string;
  date: Date;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  doctorName: string;
  service: string;
  transactionHash?: string;
  paymentMethod: 'HLUSD' | 'ETH' | 'Credit Card';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  walletAddress?: string;
  isWalletConnected: boolean;
  twoFactorEnabled: boolean;
}

export interface SymptomSubmission {
  selectedSymptoms: string[];
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  timestamp: Date;
}

export interface AIResponse {
  id: string;
  suggestions: string[];
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
  recommendedActions: string[];
  shouldSeeDoctor: boolean;
  estimatedWaitTime?: string;
}
