import React, { useState } from 'react';
import Layout from '../components/Layout';
import type { UserProfile } from '../types/pages';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: new Date('1990-05-15'),
    gender: 'female',
    address: '123 Main Street, New York, NY 10001',
    emergencyContact: {
      name: 'John Johnson',
      phone: '+1 (555) 987-6543',
      relationship: 'Spouse'
    },
    walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96590c2b02',
    isWalletConnected: true,
    twoFactorEnabled: false
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = (field: keyof UserProfile, value: any) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmergencyContactUpdate = (field: keyof UserProfile['emergencyContact'], value: string) => {
    setUserProfile(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Profile saved:', userProfile);
      setIsSaving(false);
    }, 1500);
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Password changed');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordChange(false);
      setIsSaving(false);
    }, 1500);
  };

  const handleWalletToggle = () => {
    if (userProfile.isWalletConnected) {
      // Disconnect wallet
      setUserProfile(prev => ({
        ...prev,
        isWalletConnected: false,
        walletAddress: undefined
      }));
    } else {
      // Connect wallet (simulate)
      setUserProfile(prev => ({
        ...prev,
        isWalletConnected: true,
        walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96590c2b02'
      }));
    }
  };

  const handle2FAToggle = () => {
    setUserProfile(prev => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled
    }));
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'wallet', name: 'Wallet', icon: '💳' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' }
  ];

  return (
    <Layout>
      <div className="min-h-full bg-gray-50 py-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userProfile.name}
                      onChange={(e) => handleProfileUpdate('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => handleProfileUpdate('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={userProfile.phone}
                      onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={userProfile.dateOfBirth.toISOString().split('T')[0]}
                      onChange={(e) => handleProfileUpdate('dateOfBirth', new Date(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={userProfile.gender}
                      onChange={(e) => handleProfileUpdate('gender', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={userProfile.address}
                    onChange={(e) => handleProfileUpdate('address', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Emergency Contact */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={userProfile.emergencyContact.name}
                        onChange={(e) => handleEmergencyContactUpdate('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={userProfile.emergencyContact.phone}
                        onChange={(e) => handleEmergencyContactUpdate('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Relationship
                      </label>
                      <input
                        type="text"
                        value={userProfile.emergencyContact.relationship}
                        onChange={(e) => handleEmergencyContactUpdate('relationship', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>

                {/* Password Section */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">Password</h3>
                      <p className="text-sm text-gray-600">Change your account password</p>
                    </div>
                    <button
                      onClick={() => setShowPasswordChange(!showPasswordChange)}
                      className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Change Password
                    </button>
                  </div>

                  {showPasswordChange && (
                    <div className="space-y-4 border-t border-gray-200 pt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={handlePasswordChange}
                          disabled={isSaving}
                          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSaving ? 'Updating...' : 'Update Password'}
                        </button>
                        <button
                          onClick={() => setShowPasswordChange(false)}
                          className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Two-Factor Authentication */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button
                      onClick={handle2FAToggle}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        userProfile.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          userProfile.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  {userProfile.twoFactorEnabled && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-700">
                        Two-factor authentication is enabled. You'll receive a code via SMS when logging in.
                      </p>
                    </div>
                  )}
                </div>

                {/* Login Sessions */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Current Session</p>
                        <p className="text-xs text-gray-500">Chrome on Windows • New York, NY</p>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Mobile App</p>
                        <p className="text-xs text-gray-500">iPhone • Last seen 2 hours ago</p>
                      </div>
                      <button className="text-xs text-red-600 hover:text-red-700 font-medium">
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wallet' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Wallet Settings</h2>

                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">Wallet Connection</h3>
                      <p className="text-sm text-gray-600">
                        Connect your wallet to make payments and receive tokens
                      </p>
                    </div>
                    <button
                      onClick={handleWalletToggle}
                      className={`px-4 py-2 rounded-md font-medium ${
                        userProfile.isWalletConnected
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {userProfile.isWalletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
                    </button>
                  </div>

                  {userProfile.isWalletConnected && userProfile.walletAddress && (
                    <div className="border-t border-gray-200 pt-4">
                      <div className="bg-green-50 border border-green-200 rounded-md p-4">
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-green-800">Wallet Connected</p>
                            <p className="text-xs text-green-700 font-mono mt-1">
                              {userProfile.walletAddress}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Wallet Preferences */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Preferences</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Payment Method
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="HLUSD">HLUSD (HealthLink USD)</option>
                        <option value="ETH">Ethereum (ETH)</option>
                        <option value="credit">Credit Card</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="auto-approve"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="auto-approve" className="ml-2 block text-sm text-gray-900">
                        Auto-approve payments under $50
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="payment-notifications"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="payment-notifications" className="ml-2 block text-sm text-gray-900">
                        Send payment confirmation notifications
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Notification Preferences</h2>

                <div className="space-y-4">
                  {/* Email Notifications */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { id: 'appointment-reminders', label: 'Appointment reminders', defaultChecked: true },
                        { id: 'payment-confirmations', label: 'Payment confirmations', defaultChecked: true },
                        { id: 'health-tips', label: 'Weekly health tips', defaultChecked: false },
                        { id: 'new-features', label: 'New feature announcements', defaultChecked: false }
                      ].map((item) => (
                        <div key={item.id} className="flex items-center">
                          <input
                            id={item.id}
                            type="checkbox"
                            defaultChecked={item.defaultChecked}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={item.id} className="ml-2 block text-sm text-gray-900">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Push Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { id: 'urgent-alerts', label: 'Urgent health alerts', defaultChecked: true },
                        { id: 'appointment-updates', label: 'Appointment updates', defaultChecked: true },
                        { id: 'chat-messages', label: 'AI chat responses', defaultChecked: true },
                        { id: 'marketing', label: 'Marketing notifications', defaultChecked: false }
                      ].map((item) => (
                        <div key={item.id} className="flex items-center">
                          <input
                            id={item.id}
                            type="checkbox"
                            defaultChecked={item.defaultChecked}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={item.id} className="ml-2 block text-sm text-gray-900">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SMS Notifications */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">SMS Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { id: 'sms-appointments', label: 'Appointment confirmations', defaultChecked: true },
                        { id: 'sms-2fa', label: 'Two-factor authentication codes', defaultChecked: true },
                        { id: 'sms-emergencies', label: 'Emergency alerts only', defaultChecked: true }
                      ].map((item) => (
                        <div key={item.id} className="flex items-center">
                          <input
                            id={item.id}
                            type="checkbox"
                            defaultChecked={item.defaultChecked}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={item.id} className="ml-2 block text-sm text-gray-900">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => console.log('Notification preferences saved')}
                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Settings;
