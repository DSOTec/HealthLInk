import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ethers } from 'ethers';
import { useDoctor } from '../../contexts/DoctorContext';
import { useAppointments } from '../../contexts/AppointmentContext';
import { useToast } from '../../components/ToastContainer';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Star,
  Check,
  X,
  Pill,
  Wallet,
  LogOut,
  Menu,
  Bell
} from 'lucide-react';


interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
  date: Date;
}

const DoctorDashboard: React.FC = () => {
  const { 
    doctorProfile, 
    patients, 
    getRecentPatients
  } = useDoctor();
  const { appointments, updateAppointment } = useAppointments();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Wallet state
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState({ eth: 0, usd: 0 });
  const [isLoading, setIsLoading] = useState(false);
  
  // UI state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'patients' | 'appointments' | 'prescriptions' | 'payments'>('overview');
  
  // Mock prescriptions data
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      patientId: '1',
      patientName: 'John Smith',
      medication: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '7 days',
      notes: 'Take with food',
      date: new Date()
    }
  ]);

  const recentPatients = getRecentPatients();

  // Check wallet connection on mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (!window.ethereum) {
        showToast('error', 'MetaMask is required for doctor access');
        navigate('/');
        return;
      }

      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length === 0) {
          showToast('error', 'Please connect your wallet to access doctor dashboard');
          navigate('/');
          return;
        }
        
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        await getWalletBalance(accounts[0]);
      } catch (error) {
        console.error('Error checking wallet:', error);
        navigate('/');
      }
    };

    checkWalletConnection();
  }, [navigate, showToast]);

  const getWalletBalance = async (address: string) => {
    if (!window.ethereum) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      const ethBalance = parseFloat(ethers.formatEther(balance));
      
      // Mock USD conversion
      const ethToUsd = 2000;
      const usdBalance = ethBalance * ethToUsd;
      
      setWalletBalance({
        eth: ethBalance,
        usd: usdBalance
      });
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress('');
    setWalletBalance({ eth: 0, usd: 0 });
    showToast('success', 'Wallet disconnected');
    navigate('/');
  };

  const stats = [
    {
      title: 'Total Patients',
      value: patients.length,
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Appointments Today',
      value: appointments.filter(apt => 
        new Date(apt.date).toDateString() === new Date().toDateString() &&
        apt.doctorName === 'Dr. Sarah Wilson'
      ).length,
      icon: <Calendar className="h-6 w-6" />,
      color: 'bg-green-500',
      change: '+5%'
    },
    {
      title: 'ETH Balance',
      value: `${walletBalance.eth.toFixed(4)} ETH`,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-purple-500',
      change: `$${walletBalance.usd.toFixed(2)}`
    },
    {
      title: 'Average Rating',
      value: doctorProfile?.rating || 4.8,
      icon: <Star className="h-6 w-6" />,
      color: 'bg-yellow-500',
      change: '+0.2'
    }
  ];

  const handleAcceptAppointment = (appointmentId: string) => {
    updateAppointment(appointmentId, { status: 'upcoming' });
    showToast('success', 'Appointment accepted');
  };

  const handleDeclineAppointment = (appointmentId: string) => {
    updateAppointment(appointmentId, { status: 'cancelled' });
    showToast('success', 'Appointment declined');
  };

  const handleAddPrescription = (patientId: string, patientName: string) => {
    const newPrescription: Prescription = {
      id: Date.now().toString(),
      patientId,
      patientName,
      medication: 'New Medication',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '7 days',
      notes: 'Take with food',
      date: new Date()
    };
    setPrescriptions(prev => [newPrescription, ...prev]);
    showToast('success', `Prescription added for ${patientName}`);
  };

  const handleReceivePayment = async (amount: number) => {
    if (!isConnected) {
      showToast('error', 'Wallet not connected');
      return;
    }
    
    try {
      setIsLoading(true);
      // Simulate receiving payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      await getWalletBalance(walletAddress);
      showToast('success', `Received ${amount} ETH payment`);
    } catch (error) {
      showToast('error', 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartConsultation = (appointmentId: string) => {
    showToast('success', 'Starting consultation...');
    navigate(`/doctor/consultation/${appointmentId}`);
  };

  const handleViewPatient = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      navigate(`/doctor/patients/${patientId}`);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Wallet Connection Required</h2>
          <p className="text-gray-600">Please connect your MetaMask wallet to access the doctor dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Dr. {doctorProfile?.name || 'Sarah Wilson'}
              </h1>
              <p className="text-xs text-gray-500 font-mono">
                {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="h-6 w-6 text-gray-600" />
            <button
              onClick={handleDisconnect}
              className="p-2 rounded-md text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-screen lg:h-auto">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 bg-white border-r border-gray-200">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Dr. {doctorProfile?.name || 'Sarah Wilson'}
                </h1>
                <p className="text-sm text-gray-500 font-mono mt-1">
                  {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
                </p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-green-600">Connected</span>
                </div>
              </div>
              <button
                onClick={handleDisconnect}
                className="p-2 rounded-md text-red-600 hover:bg-red-50"
                title="Disconnect Wallet"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'patients', label: 'Patients', icon: Users },
                { id: 'appointments', label: 'Appointments', icon: Calendar },
                { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
                { id: 'payments', label: 'Payments', icon: DollarSign },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              </div>
              <nav className="p-4 space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: TrendingUp },
                  { id: 'patients', label: 'Patients', icon: Users },
                  { id: 'appointments', label: 'Appointments', icon: Calendar },
                  { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
                  { id: 'payments', label: 'Payments', icon: DollarSign },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, Dr. {doctorProfile?.name?.split(' ').pop() || 'Wilson'}!
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Here's what's happening with your practice today.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Wallet Balance</p>
                    <p className="font-semibold text-gray-900">{walletBalance.eth.toFixed(4)} ETH</p>
                  </div>
                  <Bell className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        
          {/* Dashboard Content */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-2 lg:p-3 rounded-lg`}>
                        <span className="text-white">{stat.icon}</span>
                      </div>
                    </div>
                    <div className="mt-3 lg:mt-4 flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                      <span className="text-sm text-gray-500 ml-1 hidden sm:inline">from last month</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                  {/* Upcoming Appointments */}
                  <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
                    <div className="p-4 lg:p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
                        <button
                          onClick={() => setActiveTab('appointments')}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View all
                        </button>
                      </div>
                    </div>
                    <div className="p-4 lg:p-6">
                      {appointments.filter(apt => apt.doctorName === 'Dr. Sarah Wilson' && apt.status === 'upcoming').length > 0 ? (
                        <div className="space-y-4">
                          {appointments.filter(apt => apt.doctorName === 'Dr. Sarah Wilson' && apt.status === 'upcoming').slice(0, 3).map((appointment) => (
                            <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg space-y-3 sm:space-y-0">
                              <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Calendar className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                                  <p className="text-sm text-gray-600">
                                    {appointment.date.toLocaleDateString()} at {appointment.time}
                                  </p>
                                  <p className="text-xs text-gray-500">{appointment.service}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  appointment.status === 'upcoming' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {appointment.status}
                                </span>
                                <button
                                  onClick={() => handleStartConsultation(appointment.id)}
                                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-200"
                                >
                                  Start
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No upcoming appointments</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recent Patients */}
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-4 lg:p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Patients</h2>
                        <button
                          onClick={() => setActiveTab('patients')}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View all
                        </button>
                      </div>
                    </div>
                    <div className="p-4 lg:p-6">
                      {recentPatients.length > 0 ? (
                        <div className="space-y-4">
                          {recentPatients.slice(0, 4).map((patient) => (
                            <div key={patient.id} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-sm font-medium text-gray-600">
                                    {patient.name.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-900">{patient.name}</h4>
                                  <p className="text-xs text-gray-500">
                                    Last visit: {new Date(patient.lastConsultation).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleViewPatient(patient.id)}
                                className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                              >
                                View
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No recent patients</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Patients Tab */}
              {activeTab === 'patients' && (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 lg:p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Patient List</h2>
                  </div>
                  <div className="p-4 lg:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {patients.map((patient) => (
                        <div key={patient.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="font-medium text-blue-600">{patient.name.charAt(0)}</span>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{patient.name}</h3>
                              <p className="text-sm text-gray-500">Age: {patient.age}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{patient.medicalHistory}</p>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleAddPrescription(patient.id, patient.name)}
                              className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition duration-200"
                            >
                              Add Prescription
                            </button>
                            <button
                              onClick={() => handleViewPatient(patient.id)}
                              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition duration-200"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Appointments Tab */}
              {activeTab === 'appointments' && (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 lg:p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Appointment Management</h2>
                  </div>
                  <div className="p-4 lg:p-6">
                    <div className="space-y-4">
                      {appointments.filter(apt => apt.doctorName === 'Dr. Sarah Wilson').map((appointment) => (
                        <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Calendar className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                                <p className="text-sm text-gray-600">
                                  {appointment.date.toLocaleDateString()} at {appointment.time}
                                </p>
                                <p className="text-xs text-gray-500">{appointment.service}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                appointment.status === 'upcoming' 
                                  ? 'bg-green-100 text-green-800'
                                  : appointment.status === 'completed'
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {appointment.status}
                              </span>
                              {appointment.status === 'upcoming' && (
                                <>
                                  <button
                                    onClick={() => handleAcceptAppointment(appointment.id)}
                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition duration-200 flex items-center space-x-1"
                                  >
                                    <Check className="h-4 w-4" />
                                    <span>Accept</span>
                                  </button>
                                  <button
                                    onClick={() => handleDeclineAppointment(appointment.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition duration-200 flex items-center space-x-1"
                                  >
                                    <X className="h-4 w-4" />
                                    <span>Decline</span>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Prescriptions Tab */}
              {activeTab === 'prescriptions' && (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 lg:p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Prescriptions</h2>
                  </div>
                  <div className="p-4 lg:p-6">
                    <div className="space-y-4">
                      {prescriptions.map((prescription) => (
                        <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Pill className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{prescription.patientName}</h3>
                                <p className="text-sm text-gray-600">{prescription.medication} - {prescription.dosage}</p>
                                <p className="text-xs text-gray-500">
                                  {prescription.frequency} for {prescription.duration}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{prescription.notes}</p>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {prescription.date.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 lg:p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Payment Management</h2>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Current Balance</p>
                        <p className="text-lg font-bold text-gray-900">{walletBalance.eth.toFixed(4)} ETH</p>
                        <p className="text-sm text-gray-500">${walletBalance.usd.toFixed(2)} USD</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 lg:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      <button
                        onClick={() => handleReceivePayment(0.1)}
                        disabled={isLoading}
                        className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-50"
                      >
                        <DollarSign className="h-6 w-6 mx-auto mb-2" />
                        <p className="font-medium">Receive 0.1 ETH</p>
                        <p className="text-sm opacity-90">Consultation Fee</p>
                      </button>
                      <button
                        onClick={() => handleReceivePayment(0.05)}
                        disabled={isLoading}
                        className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                      >
                        <DollarSign className="h-6 w-6 mx-auto mb-2" />
                        <p className="font-medium">Receive 0.05 ETH</p>
                        <p className="text-sm opacity-90">Follow-up Fee</p>
                      </button>
                      <button
                        onClick={() => handleReceivePayment(0.02)}
                        disabled={isLoading}
                        className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
                      >
                        <DollarSign className="h-6 w-6 mx-auto mb-2" />
                        <p className="font-medium">Receive 0.02 ETH</p>
                        <p className="text-sm opacity-90">Prescription Fee</p>
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">Payment Instructions</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Your wallet address: <span className="font-mono">{walletAddress}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Patients can send payments directly to this address on Arbitrum Sepolia testnet.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
