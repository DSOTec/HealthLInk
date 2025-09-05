import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Stethoscope, Shield, Brain, Users } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';

interface HeroProps {
  className?: string;
}

const TelemedicineHero: React.FC<HeroProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { connectWallet, isLoading } = useWallet();

  const handlePatientStart = async () => {
    try {
      localStorage.setItem('marpelink_user_type', 'patient');
      await connectWallet();
      navigate('/dashboard');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDoctorStart = async () => {
    try {
      localStorage.setItem('marpelink_user_type', 'doctor');
      await connectWallet();
      navigate('/doctor/dashboard');
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <section id="telemedicine-hero" className={`bg-gray-50 dark:bg-gray-800 py-12 lg:py-20 transition-colors duration-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left Content */}
          <motion.div 
            className="mb-12 lg:mb-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Decentralized{' '}
              <br className="hidden sm:block" />
              Telemedicine:{' '}
              <span className="text-blue-500">Secure</span>,{' '}
              <br className="hidden sm:block" />
              <span className="text-green-500">Smart</span>, Accessible{' '}
              <br className="hidden sm:block" />
              Healthcare
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              AI-powered symptom triage with blockchain-secured payments. 
              Connect with verified doctors instantly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <motion.button 
                onClick={handlePatientStart}
                disabled={isLoading}
                className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-5 h-5" />
                <span>{isLoading ? 'Connecting...' : 'Get Started as Patient'}</span>
              </motion.button>
              <motion.button 
                onClick={handleDoctorStart}
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Stethoscope className="w-5 h-5" />
                <span>{isLoading ? 'Connecting...' : 'Join as Doctor'}</span>
              </motion.button>
            </motion.div>

            {/* Feature highlights */}
            <motion.div 
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Blockchain Secure</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">End-to-end encryption</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">AI-Powered</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Smart symptom analysis</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Verified Doctors</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Licensed professionals</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div 
              className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-3xl p-8 lg:p-12 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background bubbles */}
              <div className="absolute top-4 right-4 w-4 h-4 bg-white opacity-20 rounded-full"></div>
              <div className="absolute top-12 right-12 w-2 h-2 bg-white opacity-30 rounded-full"></div>
              <div className="absolute bottom-8 left-8 w-3 h-3 bg-white opacity-25 rounded-full"></div>
              <div className="absolute bottom-20 right-6 w-6 h-6 bg-white opacity-15 rounded-full"></div>

              {/* Doctor Character */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Chat bubbles */}
                <div className="absolute -top-2 right-4 bg-white rounded-lg p-3 shadow-lg mb-4 max-w-xs">
                  <div className="w-16 h-2 bg-gray-200 rounded mb-2"></div>
                  <div className="w-12 h-2 bg-gray-200 rounded"></div>
                </div>
                <div className="absolute top-8 right-8 bg-white rounded-lg p-3 shadow-lg mb-4 max-w-xs">
                  <div className="w-20 h-2 bg-gray-200 rounded mb-2"></div>
                  <div className="w-16 h-2 bg-gray-200 rounded"></div>
                </div>

                {/* Doctor Avatar */}
                <div className="relative mt-8">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-b from-green-400 to-green-500 rounded-full flex items-end justify-center overflow-hidden">
                    {/* Doctor's head and upper body */}
                    <div className="relative">
                      {/* Face */}
                      <div className="w-20 h-24 bg-orange-200 rounded-t-full relative">
                        {/* Hair */}
                        <div className="absolute -top-4 left-2 right-2 h-8 bg-gray-300 rounded-t-full"></div>
                        
                        {/* Glasses */}
                        <div className="absolute top-6 left-2 right-2 flex justify-center">
                          <div className="w-12 h-6 border-2 border-teal-600 rounded-full bg-white bg-opacity-30 flex">
                            <div className="w-5 h-5 border border-teal-600 rounded-full bg-white bg-opacity-20 m-0.5"></div>
                            <div className="w-5 h-5 border border-teal-600 rounded-full bg-white bg-opacity-20 m-0.5"></div>
                          </div>
                        </div>

                        {/* Beard */}
                        <div className="absolute bottom-0 left-3 right-3 h-4 bg-gray-300 rounded-b-lg"></div>
                      </div>

                      {/* Stethoscope */}
                      <div className="absolute top-16 left-1 w-6 h-12 border-l-4 border-gray-700 rounded-bl-full">
                        <div className="absolute -bottom-1 -left-2 w-4 h-4 bg-gray-700 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Tablet/Phone */}
                  <div className="absolute -bottom-4 -right-4 w-16 h-24 bg-gray-800 rounded-lg shadow-xl">
                    <div className="w-full h-full bg-white m-1 rounded-md p-2">
                      <div className="w-full h-2 bg-blue-200 rounded mb-1"></div>
                      <div className="w-3/4 h-2 bg-gray-200 rounded mb-1"></div>
                      <div className="w-full h-2 bg-gray-200 rounded mb-1"></div>
                      <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="mt-6 bg-white rounded-full px-4 py-2 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">Online</span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div 
                className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-500 rounded-full opacity-80"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-4 -right-4 w-6 h-6 bg-green-500 rounded-full opacity-80"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TelemedicineHero;