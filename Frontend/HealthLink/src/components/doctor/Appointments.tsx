import React, { useState } from 'react';
import { useDoctor } from '../../contexts/DoctorContext';
import { useToast } from '../../components/ToastContainer';
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  Phone, 
  MessageSquare,
  Plus
} from 'lucide-react';

const Appointments: React.FC = () => {
  const { appointments, updateAppointmentStatus } = useDoctor();
  const { showToast } = useToast();
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [filterStatus, setFilterStatus] = useState('all');
  // Removed unused selectedDate state

  const filteredAppointments = appointments.filter(appointment => {
    if (filterStatus === 'all') return true;
    return appointment.status === filterStatus;
  });

  const handleStartConsultation = (appointmentId: string, type: 'video' | 'phone' | 'chat') => {
    updateAppointmentStatus(appointmentId, 'completed');
    showToast('success', `Starting ${type} consultation...`);
  };

  const handleUpdateStatus = (appointmentId: string, status: 'confirmed' | 'cancelled') => {
    updateAppointmentStatus(appointmentId, status);
    showToast('success', `Appointment ${status} successfully`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return <User className="h-4 w-4" />;
      case 'follow-up': return <Clock className="h-4 w-4" />;
      case 'emergency': return <MessageSquare className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const formatDateTime = (date: Date) => {
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isTomorrow = (date: Date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.toDateString() === tomorrow.toDateString();
  };

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return formatDateTime(date).date;
  };

  // Group appointments by date for calendar view
  const groupedAppointments = filteredAppointments.reduce((groups, appointment) => {
    const dateKey = appointment.date.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(appointment);
    return groups;
  }, {} as Record<string, typeof appointments>);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Appointments</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage your upcoming and past appointments
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm ${
                  viewMode === 'list' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-2 text-sm border-l border-gray-300 ${
                  viewMode === 'calendar' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Calendar
              </button>
            </div>

            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
              <Plus className="h-4 w-4" />
              <span>New Appointment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600">
              {filterStatus === 'all' 
                ? 'No appointments scheduled yet' 
                : `No ${filterStatus} appointments found`}
            </p>
          </div>
        ) : viewMode === 'list' ? (
          /* List View */
          <div className="space-y-4">
            {filteredAppointments
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((appointment) => {
                const { time } = formatDateTime(appointment.date);
                return (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          {getTypeIcon(appointment.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              {appointment.patientName}
                            </h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full capitalize">
                              {appointment.type}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{getDateLabel(appointment.date)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>{appointment.duration} min</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-700 mb-4">
                            <span className="font-medium">Symptoms:</span> {appointment.symptoms}
                          </p>
                          
                          {appointment.notes && (
                            <p className="text-sm text-gray-600 mb-4">
                              <span className="font-medium">Notes:</span> {appointment.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        {appointment.status === 'confirmed' && new Date(appointment.date) <= new Date() && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleStartConsultation(appointment.id, 'video')}
                              className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition duration-200"
                            >
                              <Video className="h-4 w-4" />
                              <span>Video</span>
                            </button>
                            <button
                              onClick={() => handleStartConsultation(appointment.id, 'phone')}
                              className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-200"
                            >
                              <Phone className="h-4 w-4" />
                              <span>Call</span>
                            </button>
                          </div>
                        )}
                        
                        {appointment.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUpdateStatus(appointment.id, 'confirmed')}
                              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition duration-200"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(appointment.id, 'cancelled')}
                              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition duration-200"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          /* Calendar View */
          <div className="space-y-6">
            {Object.entries(groupedAppointments)
              .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
              .map(([dateKey, dayAppointments]) => (
                <div key={dateKey} className="border border-gray-200 rounded-lg">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                      {getDateLabel(new Date(dateKey))}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {dayAppointments.length} appointment{dayAppointments.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    {dayAppointments
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              {getTypeIcon(appointment.type)}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span>{formatDateTime(appointment.date).time}</span>
                                <span>•</span>
                                <span>{appointment.duration} min</span>
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                                  {appointment.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            {appointment.status === 'confirmed' && new Date(appointment.date) <= new Date() && (
                              <>
                                <button
                                  onClick={() => handleStartConsultation(appointment.id, 'video')}
                                  className="flex items-center space-x-1 bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition duration-200"
                                >
                                  <Video className="h-3 w-3" />
                                  <span>Start</span>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
