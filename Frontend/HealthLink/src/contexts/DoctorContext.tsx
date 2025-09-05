import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useWallet } from './WalletContext';

export interface DoctorProfile {
  id: string;
  name: string;
  specialty: string;
  specialization: string;
  yearsOfExperience: number;
  consultationFee: number;
  walletAddress: string;
  licenseNumber: string;
  rating: number;
  totalPatients: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  symptoms: string[];
  lastConsultation: Date;
  walletAddress: string;
  phone: string;
  email: string;
  medicalHistory: string[];
  allergies: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: Date;
  duration: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  type: 'consultation' | 'follow-up' | 'emergency';
  symptoms: string;
  notes?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  appointmentId: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }[];
  diagnosis: string;
  notes: string;
  createdAt: Date;
}

export interface DoctorPayment {
  id: string;
  patientId: string;
  patientName: string;
  amount: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  transactionHash: string;
  service: string;
}

interface DoctorContextType {
  // Doctor profile
  doctorProfile: DoctorProfile | null;
  setDoctorProfile: (profile: DoctorProfile) => void;
  updateDoctorProfile: (updates: Partial<DoctorProfile>) => void;
  
  // Patients
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  
  // Appointments
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  
  // Prescriptions
  prescriptions: Prescription[];
  addPrescription: (prescription: Prescription) => void;
  
  // Payments
  payments: DoctorPayment[];
  
  // UI State
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  
  // Statistics
  getTotalEarnings: () => number;
  getUpcomingAppointments: () => Appointment[];
  getRecentPatients: () => Patient[];
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const useDoctor = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctor must be used within a DoctorProvider');
  }
  return context;
};

interface DoctorProviderProps {
  children: ReactNode;
}

export const DoctorProvider: React.FC<DoctorProviderProps> = ({ children }) => {
  const { walletAddress } = useWallet();
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [payments, setPayments] = useState<DoctorPayment[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Initialize with mock data when wallet is connected
  useEffect(() => {
    if (walletAddress && !doctorProfile) {
      // Initialize doctor profile
      const mockDoctorProfile: DoctorProfile = {
        id: '1',
        name: 'Dr. Sarah Wilson',
        specialty: 'Cardiology',
        specialization: 'Cardiology',
        yearsOfExperience: 12,
        consultationFee: 150,
        walletAddress: walletAddress,
        licenseNumber: 'MD-12345',
        rating: 4.9,
        totalPatients: 247
      };
      setDoctorProfile(mockDoctorProfile);

      // Initialize mock patients
      const mockPatients: Patient[] = [
        {
          id: '1',
          name: 'John Smith',
          age: 45,
          gender: 'male',
          symptoms: ['Chest pain', 'Shortness of breath'],
          lastConsultation: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          walletAddress: '0x1234567890123456789012345678901234567890',
          phone: '+1 (555) 123-4567',
          email: 'john.smith@email.com',
          medicalHistory: ['Hypertension', 'High cholesterol'],
          allergies: ['Penicillin']
        },
        {
          id: '2',
          name: 'Emily Johnson',
          age: 32,
          gender: 'female',
          symptoms: ['Fatigue', 'Irregular heartbeat'],
          lastConsultation: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          walletAddress: '0x2345678901234567890123456789012345678901',
          phone: '+1 (555) 234-5678',
          email: 'emily.johnson@email.com',
          medicalHistory: ['Anxiety disorder'],
          allergies: []
        },
        {
          id: '3',
          name: 'Michael Brown',
          age: 58,
          gender: 'male',
          symptoms: ['Dizziness', 'Heart palpitations'],
          lastConsultation: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          walletAddress: '0x3456789012345678901234567890123456789012',
          phone: '+1 (555) 345-6789',
          email: 'michael.brown@email.com',
          medicalHistory: ['Diabetes Type 2', 'Atrial fibrillation'],
          allergies: ['Aspirin', 'Shellfish']
        }
      ];
      setPatients(mockPatients);

      // Initialize mock appointments
      const mockAppointments: Appointment[] = [
        {
          id: '1',
          patientId: '1',
          patientName: 'John Smith',
          date: new Date(Date.now() + 2 * 60 * 60 * 1000),
          duration: 30,
          status: 'confirmed',
          type: 'consultation',
          symptoms: 'Follow-up for chest pain'
        },
        {
          id: '2',
          patientId: '2',
          patientName: 'Emily Johnson',
          date: new Date(Date.now() + 24 * 60 * 60 * 1000),
          duration: 45,
          status: 'pending',
          type: 'consultation',
          symptoms: 'Heart rhythm evaluation'
        },
        {
          id: '3',
          patientId: '3',
          patientName: 'Michael Brown',
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          duration: 30,
          status: 'confirmed',
          type: 'follow-up',
          symptoms: 'Diabetes and heart health checkup'
        }
      ];
      setAppointments(mockAppointments);

      // Initialize mock payments
      const mockPayments: DoctorPayment[] = [
        {
          id: '1',
          patientId: '1',
          patientName: 'John Smith',
          amount: 150,
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          status: 'completed',
          transactionHash: '0x742d35Cc6634C0532925a3b8D4C9db96590c2b02',
          service: 'Cardiology Consultation'
        },
        {
          id: '2',
          patientId: '2',
          patientName: 'Emily Johnson',
          amount: 150,
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          status: 'completed',
          transactionHash: '0x8f2a7b1c9d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
          service: 'Heart Rhythm Evaluation'
        },
        {
          id: '3',
          patientId: '3',
          patientName: 'Michael Brown',
          amount: 200,
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          status: 'pending',
          transactionHash: '',
          service: 'Comprehensive Cardiac Assessment'
        }
      ];
      setPayments(mockPayments);
    }
  }, [walletAddress, doctorProfile]);

  const addPatient = (patient: Patient) => {
    setPatients(prev => [...prev, patient]);
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, status } : apt)
    );
  };

  const addPrescription = (prescription: Prescription) => {
    setPrescriptions(prev => [...prev, prescription]);
  };

  const updateDoctorProfile = (updates: Partial<DoctorProfile>) => {
    setDoctorProfile(prev => prev ? { ...prev, ...updates } : null);
  };

  const getTotalEarnings = () => {
    return payments
      .filter(payment => payment.status === 'completed')
      .reduce((total, payment) => total + payment.amount, 0);
  };

  const getUpcomingAppointments = () => {
    return appointments
      .filter(apt => apt.date > new Date() && apt.status !== 'cancelled')
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const getRecentPatients = () => {
    return patients
      .sort((a, b) => b.lastConsultation.getTime() - a.lastConsultation.getTime())
      .slice(0, 5);
  };

  const value = {
    doctorProfile,
    setDoctorProfile,
    updateDoctorProfile,
    patients,
    addPatient,
    appointments,
    addAppointment,
    updateAppointmentStatus,
    prescriptions,
    addPrescription,
    payments,
    selectedPatient,
    setSelectedPatient,
    getTotalEarnings,
    getUpcomingAppointments,
    getRecentPatients
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};
