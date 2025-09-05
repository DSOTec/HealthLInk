import React, { useState } from 'react';
import Layout from '../components/Layout';
import type { HealthRecord } from '../types/pages';

const HealthRecords: React.FC = () => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const mockHealthRecords: HealthRecord[] = [
    {
      id: '1',
      date: new Date('2024-01-15'),
      type: 'consultation',
      title: 'General Health Checkup',
      doctorName: 'Dr. Sarah Wilson',
      description: 'Annual physical examination with blood work and vital signs assessment. All parameters within normal range.',
      status: 'completed',
      fileUrl: 'https://example.com/record1.pdf'
    },
    {
      id: '2',
      date: new Date('2024-01-10'),
      type: 'lab_result',
      title: 'Blood Test Results',
      doctorName: 'Dr. Michael Chen',
      description: 'Complete blood count, lipid panel, and glucose levels. Cholesterol slightly elevated.',
      status: 'completed',
      fileUrl: 'https://example.com/bloodtest.pdf'
    },
    {
      id: '3',
      date: new Date('2024-01-05'),
      type: 'prescription',
      title: 'Medication Prescription',
      doctorName: 'Dr. Emily Rodriguez',
      description: 'Prescribed antibiotics for respiratory infection. 7-day course of Amoxicillin 500mg.',
      status: 'completed'
    },
    {
      id: '4',
      date: new Date('2023-12-20'),
      type: 'imaging',
      title: 'Chest X-Ray',
      doctorName: 'Dr. James Thompson',
      description: 'Chest X-ray examination for persistent cough. No abnormalities detected.',
      status: 'completed',
      fileUrl: 'https://example.com/xray.jpg'
    },
    {
      id: '5',
      date: new Date('2023-12-15'),
      type: 'vaccination',
      title: 'Annual Flu Vaccination',
      doctorName: 'Dr. Lisa Park',
      description: 'Seasonal influenza vaccine administered. No adverse reactions observed.',
      status: 'completed'
    },
    {
      id: '6',
      date: new Date('2024-01-20'),
      type: 'consultation',
      title: 'Follow-up Appointment',
      doctorName: 'Dr. Robert Kumar',
      description: 'Follow-up consultation scheduled for next week to review test results.',
      status: 'pending'
    }
  ];

  const recordTypes = ['all', 'consultation', 'prescription', 'lab_result', 'imaging', 'vaccination'];

  const filteredRecords = mockHealthRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || record.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate file upload
      setTimeout(() => {
        console.log('File uploaded:', file.name);
        setIsUploading(false);
        // Reset file input
        event.target.value = '';
      }, 2000);
    }
  };

  const getTypeIcon = (type: HealthRecord['type']) => {
    switch (type) {
      case 'consultation':
        return '👨‍⚕️';
      case 'prescription':
        return '💊';
      case 'lab_result':
        return '🧪';
      case 'imaging':
        return '📷';
      case 'vaccination':
        return '💉';
      default:
        return '📄';
    }
  };

  const getTypeColor = (type: HealthRecord['type']) => {
    switch (type) {
      case 'consultation':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'prescription':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'lab_result':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'imaging':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'vaccination':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: HealthRecord['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const RecordCard: React.FC<{ record: HealthRecord }> = ({ record }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getTypeIcon(record.type)}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{record.title}</h3>
            <p className="text-sm text-gray-600">by {record.doctorName}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
          {record.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Date:</span>
          <span className="text-sm font-medium text-gray-900">
            {record.date.toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Type:</span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getTypeColor(record.type)}`}>
            {record.type.replace('_', ' ')}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-700">{record.description}</p>
        </div>

        {record.fileUrl && (
          <div className="pt-3 border-t border-gray-200">
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download File</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-full bg-gray-50 py-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Health Records</h1>
          <p className="mt-2 text-gray-600">
            Manage your medical records securely on the blockchain
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Upload New Record</h2>
            {isUploading && (
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">Uploading...</span>
              </div>
            )}
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Upload medical records, test results, or prescriptions
                </span>
                <span className="mt-1 block text-sm text-gray-500">
                  PNG, JPG, PDF up to 10MB
                </span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </label>
            </div>
            <button
              onClick={() => document.getElementById('file-upload')?.click()}
              disabled={isUploading}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Choose File
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search records
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, doctor, or description..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Record Type
              </label>
              <select
                id="type"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {recordTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredRecords.length} of {mockHealthRecords.length} records
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">View:</span>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded-md ${viewMode === 'cards' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Records Display */}
        {filteredRecords.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No records found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria or upload a new record.</p>
          </div>
        ) : viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map(record => (
              <RecordCard key={record.id} record={record} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Record
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-lg mr-3">{getTypeIcon(record.type)}</span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{record.title}</div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">{record.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getTypeColor(record.type)}`}>
                          {record.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.doctorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.date.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {record.fileUrl ? (
                          <button className="text-blue-600 hover:text-blue-700">
                            Download
                          </button>
                        ) : (
                          <span className="text-gray-400">No file</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      </div>
    </Layout>
  );
};

export default HealthRecords;
