import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';

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
  const { isConnected } = useWallet();

  const handleButtonClick = (doctorId: number) => {
    if (!isConnected) {
      // Scroll to TelemedicineHero section if wallet not connected
      const element = document.getElementById('telemedicine-hero');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Handle connected user logic (could navigate to booking/consultation page)
      console.log(`Connecting to doctor ${doctorId}`);
      // TODO: Add actual routing logic for connected users
    }
  };
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
        return 'bg-cyan-500 hover:bg-cyan-600 hover:shadow-lg transform hover:scale-105 text-white transition-all duration-200';
      case 'in2h':
        return 'bg-orange-500 hover:bg-orange-600 hover:shadow-lg transform hover:scale-105 text-white transition-all duration-200';
      default:
        return 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg transform hover:scale-105 text-white transition-all duration-200';
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
    <section className={`py-12 sm:py-16 lg:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Verified Healthcare Providers
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Connect with licensed doctors worldwide
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {doctors.map((doctor, index) => (
            <motion.div 
              key={doctor.id} 
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Doctor Avatar and Info */}
              <div className="flex items-start space-x-3 sm:space-x-4 mb-4">
                <motion.div 
                  className={`w-12 h-12 sm:w-16 sm:h-16 ${getAvatarColor(doctor.name)} rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {doctor.avatar}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1 truncate">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-2">
                    {doctor.specialty}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            i < Math.floor(doctor.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                      {doctor.rating}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
                      ({doctor.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Availability Status */}
              <div className={`flex items-center space-x-2 mb-4 ${getAvailabilityColor(doctor.availability)}`}>
                {getAvailabilityIcon(doctor.availability)}
                <span className="text-xs sm:text-sm font-medium">
                  {doctor.availabilityText}
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  ${doctor.price} <span className="text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400">{doctor.currency}</span>
                </div>
              </div>

              {/* Connect Button */}
              <motion.button
                onClick={() => handleButtonClick(doctor.id)}
                className={`w-full px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base ${getButtonStyle(doctor.availability)}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
              >
                {getButtonText(doctor.availability)}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button 
            onClick={() => handleButtonClick(0)}
            className="w-full sm:w-auto bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            View All Providers
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="mt-12 sm:mt-16 bg-white dark:bg-gray-700 rounded-2xl p-6 sm:p-8 shadow-sm transition-colors duration-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">1000+</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Verified Doctors</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">4.9</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Average Rating</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">24/7</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Availability</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">50+</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Countries</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VerifiedHealthcareProviders;