import React, { useState } from 'react';
import { useDoctor } from '../../contexts/DoctorContext';
import { useWallet } from '../../contexts/WalletContext';
import { useToast } from '../../components/ToastContainer';
import { 
  User, 
  Clock, 
  DollarSign,
  Bell,
  Shield,
  Wallet,
  Save,
  Camera
} from 'lucide-react';

const DoctorSettings: React.FC = () => {
  const { doctorProfile, updateDoctorProfile } = useDoctor();
  const { walletAddress } = useWallet();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'availability' | 'rates' | 'notifications' | 'security'>('profile');

  const [profileForm, setProfileForm] = useState({
    name: doctorProfile?.name || '',
    specialty: doctorProfile?.specialty || '',
    email: 'dr.smith@healthlink.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Center Dr, City, State 12345',
    bio: 'Experienced physician with over 10 years in family medicine. Specialized in preventive care and chronic disease management.',
    education: 'MD from Harvard Medical School',
    certifications: 'Board Certified in Family Medicine'
  });

  const [availabilityForm, setAvailabilityForm] = useState({
    monday: { enabled: true, start: '09:00', end: '17:00' },
    tuesday: { enabled: true, start: '09:00', end: '17:00' },
    wednesday: { enabled: true, start: '09:00', end: '17:00' },
    thursday: { enabled: true, start: '09:00', end: '17:00' },
    friday: { enabled: true, start: '09:00', end: '17:00' },
    saturday: { enabled: false, start: '09:00', end: '13:00' },
    sunday: { enabled: false, start: '09:00', end: '13:00' }
  });

  const [ratesForm, setRatesForm] = useState({
    consultationRate: 150,
    followUpRate: 100,
    emergencyRate: 250,
    currency: 'USDC'
  });

  const [notificationForm, setNotificationForm] = useState({
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    paymentAlerts: true,
    newPatientAlerts: true
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateDoctorProfile({
      name: profileForm.name,
      specialty: profileForm.specialty
    });
    showToast('success', 'Profile updated successfully');
  };

  const handleAvailabilitySave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Availability updated successfully');
  };

  const handleRatesSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Consultation rates updated successfully');
  };

  const handleNotificationsSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Notification preferences updated successfully');
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="h-4 w-4" /> },
    { id: 'availability', label: 'Availability', icon: <Clock className="h-4 w-4" /> },
    { id: 'rates', label: 'Rates', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage your profile, availability, and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
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
      <div className="p-6">
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSave} className="space-y-6">
            {/* Profile Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Profile Photo</label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-medium text-blue-700">
                    {profileForm.name.charAt(0)}
                  </span>
                </div>
                <button
                  type="button"
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200"
                >
                  <Camera className="h-4 w-4" />
                  <span>Change Photo</span>
                </button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty *
                </label>
                <input
                  type="text"
                  value={profileForm.specialty}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, specialty: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                value={profileForm.address}
                onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={profileForm.bio}
                onChange={(e) => setProfileForm(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell patients about your experience and expertise..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Education
                </label>
                <input
                  type="text"
                  value={profileForm.education}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, education: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certifications
                </label>
                <input
                  type="text"
                  value={profileForm.certifications}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, certifications: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              <Save className="h-4 w-4" />
              <span>Save Profile</span>
            </button>
          </form>
        )}

        {activeTab === 'availability' && (
          <form onSubmit={handleAvailabilitySave} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Schedule</h3>
              <div className="space-y-4">
                {Object.entries(availabilityForm).map(([day, schedule]) => (
                  <div key={day} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={schedule.enabled}
                        onChange={(e) => setAvailabilityForm(prev => ({
                          ...prev,
                          [day]: { ...schedule, enabled: e.target.checked }
                        }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-900 capitalize w-20">
                        {day}
                      </span>
                    </div>
                    
                    {schedule.enabled && (
                      <div className="flex items-center space-x-2">
                        <input
                          type="time"
                          value={schedule.start}
                          onChange={(e) => setAvailabilityForm(prev => ({
                            ...prev,
                            [day]: { ...schedule, start: e.target.value }
                          }))}
                          className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="time"
                          value={schedule.end}
                          onChange={(e) => setAvailabilityForm(prev => ({
                            ...prev,
                            [day]: { ...schedule, end: e.target.value }
                          }))}
                          className="px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              <Save className="h-4 w-4" />
              <span>Save Availability</span>
            </button>
          </form>
        )}

        {activeTab === 'rates' && (
          <form onSubmit={handleRatesSave} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Consultation Rates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Standard Consultation
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      value={ratesForm.consultationRate}
                      onChange={(e) => setRatesForm(prev => ({ ...prev, consultationRate: Number(e.target.value) }))}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Follow-up Consultation
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      value={ratesForm.followUpRate}
                      onChange={(e) => setRatesForm(prev => ({ ...prev, followUpRate: Number(e.target.value) }))}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Emergency Consultation
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      value={ratesForm.emergencyRate}
                      onChange={(e) => setRatesForm(prev => ({ ...prev, emergencyRate: Number(e.target.value) }))}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <select
                    value={ratesForm.currency}
                    onChange={(e) => setRatesForm(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="USDC">USDC (Stablecoin)</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              <Save className="h-4 w-4" />
              <span>Save Rates</span>
            </button>
          </form>
        )}

        {activeTab === 'notifications' && (
          <form onSubmit={handleNotificationsSave} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                  { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive notifications via SMS' },
                  { key: 'appointmentReminders', label: 'Appointment Reminders', description: 'Get reminded about upcoming appointments' },
                  { key: 'paymentAlerts', label: 'Payment Alerts', description: 'Notifications when payments are received' },
                  { key: 'newPatientAlerts', label: 'New Patient Alerts', description: 'Notifications when new patients register' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{item.label}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationForm[item.key as keyof typeof notificationForm]}
                      onChange={(e) => setNotificationForm(prev => ({
                        ...prev,
                        [item.key]: e.target.checked
                      }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              <Save className="h-4 w-4" />
              <span>Save Preferences</span>
            </button>
          </form>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Wallet Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Wallet & Security</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Connected Wallet</h4>
                    <p className="text-sm text-gray-600 font-mono">
                      {walletAddress ? formatAddress(walletAddress) : 'Not connected'}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Your wallet is used for receiving payments and authenticating your identity on the platform.
                </p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Change Wallet
                </button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">2FA Status</h4>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    Disabled
                  </span>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                  Enable 2FA
                </button>
              </div>
            </div>

            {/* Session Management */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Active Sessions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Current Session</h4>
                    <p className="text-sm text-gray-600">Chrome on Windows • Active now</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Current
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSettings;
