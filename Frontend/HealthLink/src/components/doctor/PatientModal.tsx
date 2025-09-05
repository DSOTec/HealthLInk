import React, { useState } from 'react';
import { useDoctor } from '../../contexts/DoctorContext';
import { useToast } from '../../components/ToastContainer';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Plus,
  Save,
  Pill,
  Clock
} from 'lucide-react';

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PatientModal: React.FC<PatientModalProps> = ({ isOpen, onClose }) => {
  const { selectedPatient, addPrescription } = useDoctor();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'prescriptions'>('profile');
  const [prescriptionForm, setPrescriptionForm] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  });

  if (!isOpen || !selectedPatient) return null;

  const handlePrescriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prescriptionForm.medication || !prescriptionForm.dosage || !prescriptionForm.frequency) {
      showToast('error', 'Please fill in all required fields');
      return;
    }

    const newPrescription = {
      id: Date.now().toString(),
      patientId: selectedPatient.id,
      appointmentId: 'temp-' + Date.now(),
      medications: [{
        name: prescriptionForm.medication,
        dosage: prescriptionForm.dosage,
        frequency: prescriptionForm.frequency,
        duration: prescriptionForm.duration,
        instructions: prescriptionForm.instructions
      }],
      diagnosis: 'General consultation',
      notes: prescriptionForm.instructions,
      createdAt: new Date()
    };

    addPrescription(newPrescription);
    showToast('success', 'Prescription added successfully');
    
    // Reset form
    setPrescriptionForm({
      medication: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'discontinued': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-blue-700">
                {selectedPatient.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{selectedPatient.name}</h2>
              <p className="text-sm text-gray-600">
                {selectedPatient.age} years old • {selectedPatient.gender}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
              { id: 'history', label: 'Medical History', icon: <FileText className="h-4 w-4" /> },
              { id: 'prescriptions', label: 'Prescriptions', icon: <Pill className="h-4 w-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedPatient.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Age</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedPatient.age} years</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Gender</label>
                      <p className="mt-1 text-sm text-gray-900 capitalize">{selectedPatient.gender}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Contact</label>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-900">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-900">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{selectedPatient.name.toLowerCase().replace(' ', '.')}@email.com</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Address</label>
                      <div className="mt-1 flex items-center space-x-2 text-sm text-gray-900">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>123 Main St, City, State 12345</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Symptoms */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Current Symptoms</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Blood Type</label>
                    <p className="mt-1 text-sm text-gray-900">O+</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Allergies</label>
                    <p className="mt-1 text-sm text-gray-900">Penicillin, Shellfish</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
                    <p className="mt-1 text-sm text-gray-900">Jane Doe - +1 (555) 987-6543</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Insurance</label>
                    <p className="mt-1 text-sm text-gray-900">Blue Cross Blue Shield</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Medical History</h3>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  <Plus className="h-4 w-4" />
                  <span>Add Record</span>
                </button>
              </div>

              {/* Recent Consultations */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Recent Consultations</h4>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">General Consultation</h5>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatDate(selectedPatient.lastConsultation)}
                        </p>
                        <p className="text-sm text-gray-700 mt-2">
                          Patient complained of persistent headaches and fatigue. Recommended rest and hydration.
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vital Signs */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Latest Vital Signs</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Blood Pressure</p>
                    <p className="text-lg font-semibold text-gray-900">120/80</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Heart Rate</p>
                    <p className="text-lg font-semibold text-gray-900">72 bpm</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Temperature</p>
                    <p className="text-lg font-semibold text-gray-900">98.6°F</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-medium text-gray-600">Weight</p>
                    <p className="text-lg font-semibold text-gray-900">165 lbs</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div className="space-y-6">
              {/* Add New Prescription Form */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Prescription</h3>
                <form onSubmit={handlePrescriptionSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Medication *
                      </label>
                      <input
                        type="text"
                        value={prescriptionForm.medication}
                        onChange={(e) => setPrescriptionForm(prev => ({ ...prev, medication: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Amoxicillin"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dosage *
                      </label>
                      <input
                        type="text"
                        value={prescriptionForm.dosage}
                        onChange={(e) => setPrescriptionForm(prev => ({ ...prev, dosage: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 500mg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Frequency *
                      </label>
                      <select
                        value={prescriptionForm.frequency}
                        onChange={(e) => setPrescriptionForm(prev => ({ ...prev, frequency: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select frequency</option>
                        <option value="Once daily">Once daily</option>
                        <option value="Twice daily">Twice daily</option>
                        <option value="Three times daily">Three times daily</option>
                        <option value="Four times daily">Four times daily</option>
                        <option value="As needed">As needed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={prescriptionForm.duration}
                        onChange={(e) => setPrescriptionForm(prev => ({ ...prev, duration: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., 7 days"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instructions
                    </label>
                    <textarea
                      value={prescriptionForm.instructions}
                      onChange={(e) => setPrescriptionForm(prev => ({ ...prev, instructions: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Additional instructions for the patient..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    <Save className="h-4 w-4" />
                    <span>Add Prescription</span>
                  </button>
                </form>
              </div>

              {/* Current Prescriptions */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Current Prescriptions</h3>
                <div className="space-y-3">
                  {/* Note: Prescriptions would be fetched from context in a real implementation */}
                  {false ? (
                    [].map((prescription: any) => (
                      <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Pill className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{prescription.medication}</h4>
                              <p className="text-sm text-gray-600">
                                {prescription.dosage} • {prescription.frequency}
                              </p>
                              {prescription.duration && (
                                <p className="text-sm text-gray-600">Duration: {prescription.duration}</p>
                              )}
                              {prescription.instructions && (
                                <p className="text-sm text-gray-700 mt-2">{prescription.instructions}</p>
                              )}
                              <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                <span>Prescribed on {formatDate(prescription.prescribedDate)}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(prescription.status)}`}>
                            {prescription.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No prescriptions found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
