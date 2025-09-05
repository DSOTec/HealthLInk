import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: Date;
  time: string;
  service: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: 'consultation' | 'follow-up' | 'checkup';
}

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  getPatientAppointments: (patientName: string) => Appointment[];
  getDoctorAppointments: (doctorName: string) => Appointment[];
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

// Mock initial appointments
const initialAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Current Patient',
    doctorName: 'Dr. Sarah Wilson',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    time: '2:00 PM',
    service: 'Cardiology Consultation',
    status: 'upcoming',
    type: 'consultation'
  },
  {
    id: '2',
    patientName: 'Current Patient',
    doctorName: 'Dr. Michael Chen',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    time: '10:30 AM',
    service: 'Dermatology Checkup',
    status: 'completed',
    type: 'checkup'
  }
];

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString()
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev =>
      prev.map(appointment =>
        appointment.id === id ? { ...appointment, ...updates } : appointment
      )
    );
  };

  const getPatientAppointments = (patientName: string) => {
    return appointments.filter(appointment => appointment.patientName === patientName);
  };

  const getDoctorAppointments = (doctorName: string) => {
    return appointments.filter(appointment => appointment.doctorName === doctorName);
  };

  return (
    <AppointmentContext.Provider value={{
      appointments,
      addAppointment,
      updateAppointment,
      getPatientAppointments,
      getDoctorAppointments
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};
