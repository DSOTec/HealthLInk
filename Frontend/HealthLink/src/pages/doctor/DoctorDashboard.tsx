import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDoctor } from '../../contexts/DoctorContext';
import { useToast } from '../../components/ToastContainer';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import DoctorSidebar from '../../components/doctor/DoctorSidebar';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Star,
  Activity,
  FileText
} from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const { 
    doctorProfile, 
    patients, 
    appointments, 
    payments,
    getTotalEarnings,
    getUpcomingAppointments,
    getRecentPatients
  } = useDoctor();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const upcomingAppointments = getUpcomingAppointments();
  const recentPatients = getRecentPatients();
  const totalEarnings = getTotalEarnings();

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
      value: upcomingAppointments.filter(apt => 
        new Date(apt.date).toDateString() === new Date().toDateString()
      ).length,
      icon: <Calendar className="h-6 w-6" />,
      color: 'bg-green-500',
      change: '+5%'
    },
    {
      title: 'Total Earnings',
      value: `$${totalEarnings}`,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-purple-500',
      change: '+18%'
    },
    {
      title: 'Average Rating',
      value: doctorProfile?.rating || 0,
      icon: <Star className="h-6 w-6" />,
      color: 'bg-yellow-500',
      change: '+0.2'
    }
  ];

  const handleStartConsultation = (appointmentId: string) => {
    showToast('success', 'Starting consultation...');
    // Navigate to consultation interface (dummy for now)
    navigate(`/doctor/consultation/${appointmentId}`);
  };

  const handleViewPatient = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      navigate(`/doctor/patients/${patientId}`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DoctorSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <DoctorNavbar />
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, Dr. {doctorProfile?.name.split(' ').pop()}!
              </h1>
              <p className="text-gray-600 mt-2">
                Here's what's happening with your practice today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <span className="text-white">{stat.icon}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Appointments */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
                    <button
                      onClick={() => navigate('/doctor/appointments')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View all
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingAppointments.slice(0, 3).map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                              <p className="text-sm text-gray-600">
                                {new Date(appointment.date).toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-500">{appointment.symptoms}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              appointment.status === 'confirmed' 
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
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Patients</h2>
                    <button
                      onClick={() => navigate('/doctor/patients')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View all
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {recentPatients.length > 0 ? (
                    <div className="space-y-4">
                      {recentPatients.slice(0, 4).map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
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

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => navigate('/doctor/patients')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  <Users className="h-6 w-6 text-blue-600" />
                  <span className="font-medium text-gray-900">View Patients</span>
                </button>
                <button
                  onClick={() => navigate('/doctor/appointments')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  <Calendar className="h-6 w-6 text-green-600" />
                  <span className="font-medium text-gray-900">Schedule Appointment</span>
                </button>
                <button
                  onClick={() => navigate('/doctor/records')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  <FileText className="h-6 w-6 text-purple-600" />
                  <span className="font-medium text-gray-900">Health Records</span>
                </button>
                <button
                  onClick={() => navigate('/doctor/payments')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                  <span className="font-medium text-gray-900">View Payments</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
