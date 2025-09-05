import { useState } from 'react';
import Layout from '../components/Layout';
import DashboardNavbar from '../components/DashboardNavbar';
import Chatbot from '../components/Dashboard/Chatbot';
import QuickActions from '../components/Dashboard/QuickActions';
import ActivityFeed from '../components/Dashboard/ActivityFeed';
import Notifications from '../components/Dashboard/Notifications';
import type { 
  ChatMessage, 
  Activity, 
  Notification, 
  HealthTip, 
  QuickAction 
} from '../types/dashboard';

const Dashboard: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

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

  const mockQuickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Book a Doctor',
      description: 'Schedule consultation with verified healthcare providers',
      icon: '👨‍⚕️',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      action: () => console.log('Book doctor clicked')
    },
    {
      id: '2',
      title: 'View Records',
      description: 'Access your secure health records on blockchain',
      icon: '📋',
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      action: () => console.log('View records clicked')
    },
    {
      id: '3',
      title: 'Check Payments',
      description: 'Review payment history and manage billing',
      icon: '💳',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      action: () => console.log('Check payments clicked')
    }
  ];

  const handleSendMessage = (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(message),
        sender: 'ai',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('symptom')) {
      return "I can help you track your symptoms. Please describe what you're experiencing, and I'll provide some guidance and suggest if you should consult with a doctor.";
    } else if (lowerMessage.includes('appointment') || lowerMessage.includes('book')) {
      return "I can help you book an appointment! We have several verified doctors available. Would you like to see specialists in a particular area?";
    } else if (lowerMessage.includes('record')) {
      return "Your health records are securely stored on the blockchain. You can view your complete medical history, test results, and prescriptions in the Health Records section.";
    } else if (lowerMessage.includes('payment')) {
      return "You can view all your payment history and manage billing through your wallet. All transactions are secure and recorded on the blockchain using HLUSD tokens.";
    } else {
      return "Hello! I'm your AI health assistant. I can help you with booking appointments, tracking symptoms, accessing health records, and managing payments. How can I assist you today?";
    }
  };

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
      <div className="flex flex-col h-full bg-gray-100">
        {/* Simplified Navbar */}
        <DashboardNavbar />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Left Column - Main Content */}
              <div className="xl:col-span-3 space-y-6">
                {/* AI Chatbot */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Health Assistant</h2>
                  <Chatbot 
                    messages={chatMessages}
                    onSendMessage={handleSendMessage}
                  />
                </div>

                {/* Quick Actions */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                  <QuickActions actions={mockQuickActions} />
                </div>

                {/* Activity Feed */}
                <div>
                  <ActivityFeed activities={mockActivities} />
                </div>
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
        </main>
      </div>
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
