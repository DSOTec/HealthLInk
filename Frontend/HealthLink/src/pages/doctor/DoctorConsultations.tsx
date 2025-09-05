import React, { useState } from 'react';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import DoctorSidebar from '../../components/doctor/DoctorSidebar';
import { useDoctor } from '../../contexts/DoctorContext';
import { useToast } from '../../components/ToastContainer';
import { 
  Video, 
  Phone, 
  MessageSquare, 
  Clock, 
  User,
  Calendar,
  Mic,
  MicOff,
  VideoIcon,
  VideoOff,
  PhoneOff
} from 'lucide-react';

const DoctorConsultations: React.FC = () => {
  const { appointments } = useDoctor();
  const { showToast } = useToast();
  const [activeConsultation, setActiveConsultation] = useState<string | null>(null);
  const [consultationMode, setConsultationMode] = useState<'video' | 'phone' | 'chat'>('video');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const activeAppointments = appointments.filter(apt => 
    apt.status === 'confirmed' && new Date(apt.date) <= new Date()
  );

  const handleStartConsultation = (appointmentId: string, mode: 'video' | 'phone' | 'chat') => {
    setActiveConsultation(appointmentId);
    setConsultationMode(mode);
    showToast('success', `Starting ${mode} consultation...`);
  };

  const handleEndConsultation = () => {
    setActiveConsultation(null);
    showToast('success', 'Consultation ended successfully');
  };

  const formatDateTime = (date: Date) => {
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const currentConsultation = activeConsultation 
    ? appointments.find(apt => apt.id === activeConsultation)
    : null;

  if (activeConsultation && currentConsultation) {
    return (
      <div className="flex h-screen bg-gray-900">
        {/* Consultation Interface */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-700">
                  {currentConsultation.patientName.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-white font-medium">{currentConsultation.patientName}</h2>
                <p className="text-gray-300 text-sm">
                  {consultationMode === 'video' ? 'Video Call' : 
                   consultationMode === 'phone' ? 'Phone Call' : 'Chat Session'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-sm">● Connected</span>
              <span className="text-gray-300 text-sm">15:30</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex">
            {consultationMode === 'video' && (
              <div className="flex-1 relative bg-black">
                {/* Video placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                    <p className="text-white text-lg">{currentConsultation.patientName}</p>
                    <p className="text-gray-400">Video consultation in progress</p>
                  </div>
                </div>
                
                {/* Doctor's video (small overlay) */}
                <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-sm font-medium text-blue-700">Dr</span>
                    </div>
                    <p className="text-white text-sm">You</p>
                  </div>
                </div>
              </div>
            )}

            {consultationMode === 'phone' && (
              <div className="flex-1 flex items-center justify-center bg-gray-800">
                <div className="text-center">
                  <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Phone className="h-16 w-16 text-green-600" />
                  </div>
                  <h3 className="text-white text-2xl font-medium mb-2">{currentConsultation.patientName}</h3>
                  <p className="text-gray-300 mb-4">Phone consultation in progress</p>
                  <div className="text-green-400 text-lg">15:30</div>
                </div>
              </div>
            )}

            {consultationMode === 'chat' && (
              <div className="flex-1 flex flex-col bg-white">
                {/* Chat messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-700">
                          {currentConsultation.patientName.charAt(0)}
                        </span>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Hello Doctor, I'm experiencing the symptoms we discussed.</p>
                        <span className="text-xs text-gray-500">2 minutes ago</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 justify-end">
                      <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Thank you for joining. Can you describe your current symptoms in detail?</p>
                        <span className="text-xs text-blue-200">1 minute ago</span>
                      </div>
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-green-700">Dr</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Chat input */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="bg-gray-800 p-4">
            <div className="flex items-center justify-center space-x-4">
              {consultationMode === 'video' && (
                <>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-3 rounded-full ${isMuted ? 'bg-red-600' : 'bg-gray-600'} text-white hover:opacity-80 transition duration-200`}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`p-3 rounded-full ${!isVideoOn ? 'bg-red-600' : 'bg-gray-600'} text-white hover:opacity-80 transition duration-200`}
                  >
                    {isVideoOn ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  </button>
                </>
              )}
              
              {consultationMode === 'phone' && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full ${isMuted ? 'bg-red-600' : 'bg-gray-600'} text-white hover:opacity-80 transition duration-200`}
                >
                  {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
              )}
              
              <button
                onClick={handleEndConsultation}
                className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition duration-200"
              >
                <PhoneOff className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DoctorSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <DoctorNavbar />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Consultations</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Start video, phone, or chat consultations with your patients
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No active consultations</h3>
                    <p className="text-gray-600">
                      No confirmed appointments ready for consultation at this time
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeAppointments.map((appointment) => {
                      const { date, time } = formatDateTime(appointment.date);
                      return (
                        <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-lg font-medium text-blue-700">
                                {appointment.patientName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                              <p className="text-sm text-gray-600">{appointment.type}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>{date}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{time}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-700 mb-4">
                            <span className="font-medium">Symptoms:</span> {appointment.symptoms}
                          </p>
                          
                          <div className="space-y-2">
                            <button
                              onClick={() => handleStartConsultation(appointment.id, 'video')}
                              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                            >
                              <Video className="h-4 w-4" />
                              <span>Start Video Call</span>
                            </button>
                            
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => handleStartConsultation(appointment.id, 'phone')}
                                className="flex items-center justify-center space-x-1 bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-700 transition duration-200 text-sm"
                              >
                                <Phone className="h-4 w-4" />
                                <span>Call</span>
                              </button>
                              <button
                                onClick={() => handleStartConsultation(appointment.id, 'chat')}
                                className="flex items-center justify-center space-x-1 bg-purple-600 text-white py-2 px-3 rounded-md hover:bg-purple-700 transition duration-200 text-sm"
                              >
                                <MessageSquare className="h-4 w-4" />
                                <span>Chat</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorConsultations;
