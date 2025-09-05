import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import DashboardNavbar from '../components/DashboardNavbar';
// Removed Chatbot import - will be replaced with floating chatbot
import QuickActions from '../components/Dashboard/QuickActions';
import ActivityFeed from '../components/Dashboard/ActivityFeed';
import Notifications from '../components/Dashboard/Notifications';
// Removed unused modal imports
// Removed ThemeToggle import - now handled in navbar
import FloatingChatbot from '../components/common/FloatingChatbot';
import { useToast } from '../components/ToastContainer';
// import { useAppointments } from '../contexts/AppointmentContext';
import type { 
  Activity, 
  Notification, 
  HealthTip, 
  QuickAction 
} from '../types/dashboard';

const Dashboard: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  // Removed modal states - will be handled elsewhere
  const navigate = useNavigate();
  const { showToast } = useToast();
  // const { getPatientAppointments } = useAppointments();
  // Get current patient's appointments (for future use)
  // const patientAppointments = getPatientAppointments('Current Patient');

  // Mock data

  const mockActivities: Activity[] = [
    {
      id: '1',
      type: 'consultation',
      title: 'Video Consultation with Dr. Smith',
      description: 'General health checkup completed successfully',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed',
      amount: 75.00
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Processed',
      description: 'Consultation fee paid via HLUSD',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      status: 'completed',
      amount: 75.00
    },
    {
      id: '3',
      type: 'appointment',
      title: 'Upcoming Appointment',
      description: 'Follow-up with Dr. Wilson tomorrow at 2:00 PM',
      timestamp: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: 'upcoming'
    },
    {
      id: '4',
      type: 'record',
      title: 'Health Record Updated',
      description: 'Blood test results added to your profile',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'completed'
    }
  ];

  const mockHealthTip: HealthTip = {
    id: '1',
    title: 'Stay Hydrated',
    content: 'Drinking 8 glasses of water daily helps maintain optimal body function, improves skin health, and boosts energy levels. Start your day with a glass of water!',
    category: 'Wellness'
  };

  // Button handlers
  const handleBookDoctor = () => {
    navigate('/doctors');
  };

  const handleViewRecords = () => {
    navigate('/records');
  };

  const handleCheckPayments = () => {
    navigate('/payments');
  };

  // Removed unused handlers

  const handleSettings = () => {
    navigate('/settings');
  };

  // Removed unused handlers

  const mockQuickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Upload Medical Records',
      description: 'Securely store your health documents',
      color: 'bg-gradient-to-r from-blue-400 to-blue-600',
      icon: 'upload',
      action: () => showToast('success', 'Upload feature coming soon!')
    },
    {
      id: '2',
      title: 'Make Payment',
      description: 'Pay for consultations and services',
      color: 'bg-gradient-to-r from-green-400 to-green-600',
      icon: 'credit-card',
      action: () => navigate('/payments')
    },
    {
      id: '3',
      title: 'Check Payments',
      description: 'Review payment history',
      icon: 'credit-card',
      color: 'purple',
      action: handleCheckPayments
    },
    {
      id: '4',
      title: 'Book Doctor',
      description: 'Schedule consultation',
      icon: 'calendar',
      color: 'bg-gradient-to-r from-purple-400 to-purple-600',
      action: handleBookDoctor
    },
    {
      id: '5',
      title: 'View Records',
      description: 'Access medical history',
      icon: 'file-text',
      color: 'bg-gradient-to-r from-orange-400 to-orange-600',
      action: handleViewRecords
    },
    {
      id: '6',
      title: 'Settings',
      description: 'Manage your account',
      icon: 'settings',
      color: 'bg-gradient-to-r from-gray-400 to-gray-600',
      action: handleSettings
    }
  ];


  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  return (
    <Layout>
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <DashboardNavbar />
        <motion.div 
          className="p-4 md:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div 
              className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Welcome back, John!
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Here's what's happening with your health today.
                </p>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6">
              {/* Left Column - Main Content */}
              <div className="xl:col-span-3 space-y-4 md:space-y-6">
                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4">Quick Actions</h2>
                  <QuickActions actions={mockQuickActions} />
                </motion.div>

                {/* Activity Feed */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <ActivityFeed activities={mockActivities} />
                </motion.div>
              </div>

              {/* Right Column - Notifications */}
              <div className="xl:col-span-1">
                <Notifications 
                  notifications={notifications}
                  healthTip={mockHealthTip}
                  onMarkAsRead={handleMarkAsRead}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modals removed - functionality moved to dedicated pages */}
      <FloatingChatbot />
    </Layout>
  );
};

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Appointment Reminder',
    message: 'Your consultation with Dr. Wilson is tomorrow at 2:00 PM',
    type: 'info',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    isRead: false
  },
  {
    id: '2',
    title: 'Payment Successful',
    message: 'Your consultation fee of $75 has been processed',
    type: 'success',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false
  },
  {
    id: '3',
    title: 'Health Record Updated',
    message: 'New test results have been added to your profile',
    type: 'info',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true
  }
];

export default Dashboard;
