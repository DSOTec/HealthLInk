import React from 'react';
import { Star, Clock, Calendar } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  availability: 'now' | 'in2h' | 'schedule';
  availabilityText: string;
}

interface ProvidersProps {
  className?: string;
}

const VerifiedHealthcareProviders: React.FC<ProvidersProps> = ({ className = '' }) => {
  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Michael Chen",
      specialty: "Internal Medicine",
      avatar: "MC",
      rating: 4.9,
      reviewCount: 127,
      price: 75,
      currency: "USDC",
      availability: "now",
      availabilityText: "Available Now"
    },
    {
      id: 2,
      name: "Dr. Sarah Williams",
      specialty: "Pediatrics",
      avatar: "SW",
      rating: 4.8,
      reviewCount: 89,
      price: 85,
      currency: "USDC",
      availability: "in2h",
      availabilityText: "Available in 2h"
    },
    {
      id: 3,
      name: "Dr. James Rodriguez",
      specialty: "Cardiology",
      avatar: "JR",
      rating: 5.0,
      reviewCount: 203,
      price: 120,
      currency: "USDC",
      availability: "schedule",
      availabilityText: "Schedule Later"
    }
  ];

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'now':
        return <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />;
      case 'in2h':
        return <Clock className="w-3 h-3 text-orange-500" />;
      default:
        return <Calendar className="w-3 h-3 text-gray-500" />;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'now':
        return 'text-green-600';
      case 'in2h':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getButtonStyle = (availability: string) => {
    switch (availability) {
      case 'now':
        return 'bg-cyan-500 hover:bg-cyan-600 text-white';
      case 'in2h':
        return 'bg-gray-300 hover:bg-gray-400 text-gray-700';
      default:
        return 'bg-cyan-500 hover:bg-cyan-600 text-white';
    }
  };

  const getButtonText = (availability: string) => {
    switch (availability) {
      case 'now':
        return 'Connect Now';
      case 'in2h':
        return 'Schedule Later';
      default:
        return 'Connect Now';
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500'
    ];
    return colors[name.length % colors.length];
  };

  return (
    <section className={`py-16 lg:py-24 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Verified Healthcare Providers
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with licensed doctors worldwide
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
              {/* Doctor Avatar and Info */}
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-16 h-16 ${getAvatarColor(doctor.name)} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {doctor.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {doctor.specialty}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(doctor.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {doctor.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({doctor.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Availability Status */}
              <div className={`flex items-center space-x-2 mb-4 ${getAvailabilityColor(doctor.availability)}`}>
                {getAvailabilityIcon(doctor.availability)}
                <span className="text-sm font-medium">
                  {doctor.availabilityText}
                </span>
              </div>

              {/* Price and Connect Button */}
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    ${doctor.price} {doctor.currency}
                  </div>
                </div>
              </div>

              {/* Connect Button */}
              <button
                className={`w-full mt-4 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${getButtonStyle(doctor.availability)}`}
              >
                {getButtonText(doctor.availability)}
              </button>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
            View All Providers
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Verified Doctors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Availability</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifiedHealthcareProviders;