import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import type { Doctor } from '../types/pages';

const Doctors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const mockDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      specialty: 'Cardiology',
      rating: 4.9,
      reviewCount: 127,
      availability: 'available',
      nextAvailable: new Date(Date.now() + 2 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
      experience: 12,
      consultationFee: 150
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      rating: 4.8,
      reviewCount: 89,
      availability: 'available',
      nextAvailable: new Date(Date.now() + 4 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
      experience: 8,
      consultationFee: 120
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      rating: 4.9,
      reviewCount: 203,
      availability: 'busy',
      nextAvailable: new Date(Date.now() + 24 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1594824804732-ca8db7d1457e?w=300&h=300&fit=crop&crop=face',
      experience: 15,
      consultationFee: 130
    },
    {
      id: '4',
      name: 'Dr. James Thompson',
      specialty: 'Orthopedics',
      rating: 4.7,
      reviewCount: 156,
      availability: 'available',
      nextAvailable: new Date(Date.now() + 6 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face',
      experience: 20,
      consultationFee: 180
    },
    {
      id: '5',
      name: 'Dr. Lisa Park',
      specialty: 'Neurology',
      rating: 4.8,
      reviewCount: 94,
      availability: 'offline',
      nextAvailable: new Date(Date.now() + 48 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&h=300&fit=crop&crop=face',
      experience: 10,
      consultationFee: 200
    },
    {
      id: '6',
      name: 'Dr. Robert Kumar',
      specialty: 'General Medicine',
      rating: 4.6,
      reviewCount: 78,
      availability: 'available',
      nextAvailable: new Date(Date.now() + 1 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300&h=300&fit=crop&crop=face',
      experience: 7,
      consultationFee: 100
    }
  ];

  const specialties = ['all', ...Array.from(new Set(mockDoctors.map(doctor => doctor.specialty)))];

  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
      const matchesAvailability = availabilityFilter === 'all' || doctor.availability === availabilityFilter;
      
      return matchesSearch && matchesSpecialty && matchesAvailability;
    });
  }, [searchTerm, selectedSpecialty, availabilityFilter]);

  const handleBookAppointment = (doctorId: string) => {
    console.log(`Booking appointment with doctor ${doctorId}`);
    // Booking logic would go here
  };

  const getAvailabilityBadge = (availability: Doctor['availability']) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatNextAvailable = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `Available in ${diffInHours}h`;
    } else {
      const diffInDays = Math.ceil(diffInHours / 24);
      return `Available in ${diffInDays}d`;
    }
  };

  const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{doctor.name}</h3>
          <p className="text-sm text-gray-600">{doctor.specialty}</p>
          <div className="flex items-center mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-sm text-gray-600">
                {doctor.rating} ({doctor.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Experience:</span>
          <span className="text-sm font-medium text-gray-900">{doctor.experience} years</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Consultation Fee:</span>
          <span className="text-sm font-medium text-gray-900">${doctor.consultationFee}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status:</span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getAvailabilityBadge(doctor.availability)}`}>
            {doctor.availability}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Next Available:</span>
          <span className="text-sm text-gray-900">{formatNextAvailable(doctor.nextAvailable)}</span>
        </div>
      </div>

      <button
        onClick={() => handleBookAppointment(doctor.id)}
        disabled={doctor.availability === 'offline'}
        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {doctor.availability === 'offline' ? 'Currently Unavailable' : 'Book Appointment'}
      </button>
    </div>
  );

  const DoctorListItem: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="flex items-center">
              <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium">{doctor.rating}</span>
            </div>
            <p className="text-xs text-gray-500">{doctor.reviewCount} reviews</p>
          </div>
          
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">${doctor.consultationFee}</p>
            <p className="text-xs text-gray-500">Consultation</p>
          </div>
          
          <div className="text-center">
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getAvailabilityBadge(doctor.availability)}`}>
              {doctor.availability}
            </span>
            <p className="text-xs text-gray-500 mt-1">{formatNextAvailable(doctor.nextAvailable)}</p>
          </div>
          
          <button
            onClick={() => handleBookAppointment(doctor.id)}
            disabled={doctor.availability === 'offline'}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-full bg-gray-50 py-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find a Doctor</h1>
          <p className="mt-2 text-gray-600">
            Book appointments with verified healthcare providers
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search doctors
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or specialty..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Specialty Filter */}
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
                Specialty
              </label>
              <select
                id="specialty"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty === 'all' ? 'All Specialties' : specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                id="availability"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="available">Available Now</option>
                <option value="busy">Busy</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredDoctors.length} of {mockDoctors.length} doctors
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">View:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Doctors List */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No doctors found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {filteredDoctors.map(doctor => 
              viewMode === 'grid' 
                ? <DoctorCard key={doctor.id} doctor={doctor} />
                : <DoctorListItem key={doctor.id} doctor={doctor} />
            )}
          </div>
        )}
      </div>
      </div>
    </Layout>
  );
};

export default Doctors;
