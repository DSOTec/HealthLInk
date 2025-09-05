import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { useHealthLink } from '../hooks/useHealthLink';
import WalletConnect from '../components/WalletConnect';
import DoctorRegistration from '../components/DoctorRegistration';
import ConsultationRequest from '../components/ConsultationRequest';

const Web3Demo: React.FC = () => {
  const { isConnected, account, chainId } = useWeb3();
  const { 
    getDoctorInfo, 
    getPatientConsultations, 
    getDoctorConsultations,
    getConsultationDetails,
    getTokenBalance,
    completeConsultation,
    cancelConsultation,
    rateDoctor,
    loading,
    error 
  } = useHealthLink();

  const [activeTab, setActiveTab] = useState<'wallet' | 'doctor' | 'patient' | 'consultations'>('wallet');
  const [doctorInfo, setDoctorInfo] = useState<any>(null);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [balance, setBalance] = useState('0');
  const [lookupAddress, setLookupAddress] = useState('');

  useEffect(() => {
    if (isConnected && account) {
      loadUserData();
    }
  }, [isConnected, account]);

  const loadUserData = async () => {
    try {
      // Load doctor info for current account
      const doctor = await getDoctorInfo(account!);
      setDoctorInfo(doctor);

      // Load token balance
      const userBalance = await getTokenBalance();
      setBalance(userBalance);

      // Load consultations (both as patient and doctor)
      const patientConsults = await getPatientConsultations();
      const doctorConsults = await getDoctorConsultations();
      
      const allConsultationIds = [...new Set([...patientConsults, ...doctorConsults])];
      const consultationDetails = await Promise.all(
        allConsultationIds.map(id => getConsultationDetails(id))
      );
      
      setConsultations(consultationDetails.filter(Boolean));
    } catch (err) {
      console.error('Failed to load user data:', err);
    }
  };

  const handleLookupDoctor = async () => {
    if (!lookupAddress.trim()) return;
    
    try {
      const doctor = await getDoctorInfo(lookupAddress.trim());
      alert(`Doctor Info:\nName: ${doctor?.name || 'Not found'}\nSpecialty: ${doctor?.specialty || 'N/A'}\nRegistered: ${doctor?.isRegistered ? 'Yes' : 'No'}\nRating: ${doctor?.averageRating ? (doctor.averageRating / 100).toFixed(1) : 'No ratings'}/5`);
    } catch (err) {
      console.error('Lookup failed:', err);
    }
  };

  const handleCompleteConsultation = async (consultationId: number) => {
    try {
      await completeConsultation(consultationId);
      loadUserData(); // Refresh data
    } catch (err) {
      console.error('Failed to complete consultation:', err);
    }
  };

  const handleCancelConsultation = async (consultationId: number) => {
    try {
      await cancelConsultation(consultationId);
      loadUserData(); // Refresh data
    } catch (err) {
      console.error('Failed to cancel consultation:', err);
    }
  };

  const handleRateDoctor = async (consultationId: number) => {
    const rating = prompt('Rate the doctor (1-5):');
    if (!rating || isNaN(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
      alert('Please enter a valid rating between 1 and 5');
      return;
    }

    try {
      await rateDoctor(consultationId, Number(rating));
      loadUserData(); // Refresh data
    } catch (err) {
      console.error('Failed to rate doctor:', err);
    }
  };

  const tabs = [
    { id: 'wallet', label: 'Wallet Connection', icon: '🔗' },
    { id: 'doctor', label: 'Doctor Registration', icon: '👨‍⚕️' },
    { id: 'patient', label: 'Request Consultation', icon: '🏥' },
    { id: 'consultations', label: 'My Consultations', icon: '📋' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">HealthLink Web3 Demo</h1>
          <p className="text-lg text-gray-600">
            Decentralized telemedicine platform on Arbitrum Sepolia testnet
          </p>
          {chainId && (
            <p className="text-sm text-blue-600 mt-2">
              Connected to Chain ID: {chainId}
            </p>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg shadow-sm p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 mx-1 my-1 rounded-md font-medium transition duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* User Info Panel */}
        {isConnected && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Address:</span>
                <p className="text-gray-600 break-all">{account}</p>
              </div>
              <div>
                <span className="font-medium">HLUSD Balance:</span>
                <p className="text-gray-600">{balance} HLUSD</p>
              </div>
              <div>
                <span className="font-medium">Doctor Status:</span>
                <p className="text-gray-600">
                  {doctorInfo?.isRegistered ? `✅ ${doctorInfo.name} (${doctorInfo.specialty})` : '❌ Not registered'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              <WalletConnect />
              
              {isConnected && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">Doctor Lookup</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={lookupAddress}
                      onChange={(e) => setLookupAddress(e.target.value)}
                      placeholder="Enter doctor's wallet address"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={handleLookupDoctor}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                      Lookup
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'doctor' && (
            <DoctorRegistration />
          )}

          {activeTab === 'patient' && (
            <ConsultationRequest />
          )}

          {activeTab === 'consultations' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Consultations</h2>
              
              {!isConnected ? (
                <p className="text-gray-600">Please connect your wallet to view consultations.</p>
              ) : consultations.length === 0 ? (
                <p className="text-gray-600">No consultations found.</p>
              ) : (
                <div className="space-y-4">
                  {consultations.map((consultation) => (
                    <div key={consultation.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Consultation #{consultation.id}</h3>
                        <div className="flex gap-2">
                          {consultation.isCompleted && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                              Completed
                            </span>
                          )}
                          {consultation.isCancelled && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                              Cancelled
                            </span>
                          )}
                          {!consultation.isCompleted && !consultation.isCancelled && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                              Active
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><span className="font-medium">Patient:</span> {consultation.patient}</p>
                          <p><span className="font-medium">Doctor:</span> {consultation.doctor}</p>
                        </div>
                        <div>
                          <p><span className="font-medium">Amount:</span> {consultation.amount} HLUSD</p>
                          <p><span className="font-medium">Date:</span> {new Date(consultation.timestamp * 1000).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      {!consultation.isCompleted && !consultation.isCancelled && (
                        <div className="mt-4 flex gap-2">
                          {consultation.patient.toLowerCase() === account?.toLowerCase() && (
                            <button
                              onClick={() => handleCompleteConsultation(consultation.id)}
                              disabled={loading}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() => handleCancelConsultation(consultation.id)}
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      )}

                      {/* Rating button */}
                      {consultation.isCompleted && !consultation.isRated && 
                       consultation.patient.toLowerCase() === account?.toLowerCase() && (
                        <div className="mt-4">
                          <button
                            onClick={() => handleRateDoctor(consultation.id)}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Rate Doctor
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Contract Information */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Smart Contract Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><span className="font-medium">HealthLink Contract:</span></p>
              <p className="text-gray-600 break-all">0x2F0320795EeBeA6D1c2dcBB2aa3330AEb21abca0</p>
            </div>
            <div>
              <p><span className="font-medium">HLUSD Token Contract:</span></p>
              <p className="text-gray-600 break-all">0x17c2dEF403A6c6AdCF64205c0492971A57bcE4b0</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">
              Deployed on Arbitrum Sepolia Testnet. View on{' '}
              <a 
                href="https://sepolia.arbiscan.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Arbiscan
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Web3Demo;
