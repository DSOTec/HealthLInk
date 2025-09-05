import React, { useState } from 'react';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import DoctorSidebar from '../../components/doctor/DoctorSidebar';
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  Calendar,
  Plus
} from 'lucide-react';

const DoctorRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock health records data
  const healthRecords = [
    {
      id: '1',
      patientId: '1',
      patientName: 'John Smith',
      type: 'Lab Results',
      title: 'Blood Work - Complete Panel',
      date: new Date('2024-01-15'),
      description: 'Complete blood count, lipid panel, glucose levels',
      status: 'completed'
    },
    {
      id: '2',
      patientId: '2',
      patientName: 'Sarah Johnson',
      type: 'Prescription',
      title: 'Antibiotic Treatment',
      date: new Date('2024-01-12'),
      description: 'Amoxicillin 500mg for respiratory infection',
      status: 'active'
    },
    {
      id: '3',
      patientId: '1',
      patientName: 'John Smith',
      type: 'Consultation Notes',
      title: 'Follow-up Visit',
      date: new Date('2024-01-10'),
      description: 'Patient reports improvement in symptoms',
      status: 'completed'
    },
    {
      id: '4',
      patientId: '3',
      patientName: 'Mike Davis',
      type: 'Imaging',
      title: 'Chest X-Ray',
      date: new Date('2024-01-08'),
      description: 'Chest X-ray for persistent cough',
      status: 'pending'
    }
  ];

  const filteredRecords = healthRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    return matchesSearch && record.type.toLowerCase() === filterType.toLowerCase();
  });

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lab results': return 'bg-blue-100 text-blue-800';
      case 'prescription': return 'bg-green-100 text-green-800';
      case 'consultation notes': return 'bg-purple-100 text-purple-800';
      case 'imaging': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Health Records</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      View and manage patient health records
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search records..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      <option value="lab results">Lab Results</option>
                      <option value="prescription">Prescriptions</option>
                      <option value="consultation notes">Consultation Notes</option>
                      <option value="imaging">Imaging</option>
                    </select>

                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                      <Plus className="h-4 w-4" />
                      <span>Add Record</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {filteredRecords.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
                    <p className="text-gray-600">
                      {searchTerm ? 'Try adjusting your search criteria' : 'No health records available yet'}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Patient
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Record
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
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
                        {filteredRecords
                          .sort((a, b) => b.date.getTime() - a.date.getTime())
                          .map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-medium text-blue-700">
                                      {record.patientName.charAt(0)}
                                    </span>
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">
                                      {record.patientName}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {record.title}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {record.description}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(record.type)}`}>
                                  {record.type}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center text-sm text-gray-900">
                                  <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                                  {formatDate(record.date)}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(record.status)}`}>
                                  {record.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                                    <Eye className="h-4 w-4" />
                                    <span>View</span>
                                  </button>
                                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm">
                                    <Download className="h-4 w-4" />
                                    <span>Download</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
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

export default DoctorRecords;
