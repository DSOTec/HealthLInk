export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  avatar: string;
  isOnline: boolean;
  consultationFee: number;
}

export interface Activity {
  id: string;
  type: 'consultation' | 'payment' | 'appointment' | 'record';
  title: string;
  description: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'upcoming';
  amount?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: Date;
  isRead: boolean;
}

export interface HealthTip {
  id: string;
  title: string;
  content: string;
  category: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  avatar: string;
  walletAddress?: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  action: () => void;
}
