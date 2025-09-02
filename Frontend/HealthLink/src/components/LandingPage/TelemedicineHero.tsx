import React from 'react';
import { Stethoscope, Shield, Brain, Users } from 'lucide-react';

interface HeroProps {
  className?: string;
}

const TelemedicineHero: React.FC<HeroProps> = ({ className = '' }) => {
  return (
    <section className={`bg-gray-50 py-12 lg:py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left Content */}
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Decentralized{' '}
              <br className="hidden sm:block" />
              Telemedicine:{' '}
              <span className="text-blue-500">Secure</span>,{' '}
              <br className="hidden sm:block" />
              <span className="text-green-500">Smart</span>, Accessible{' '}
              <br className="hidden sm:block" />
              Healthcare
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
              AI-powered symptom triage with blockchain-secured payments. 
              Connect with verified doctors instantly.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Get Started as Patient</span>
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <Stethoscope className="w-5 h-5" />
                <span>Join as Doctor</span>
              </button>
            </div>

            {/* Feature highlights */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Blockchain Secure</h3>
                  <p className="text-sm text-gray-600">End-to-end encryption</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI-Powered</h3>
                  <p className="text-sm text-gray-600">Smart symptom analysis</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Verified Doctors</h3>
                  <p className="text-sm text-gray-600">Licensed professionals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-3xl p-8 lg:p-12 overflow-hidden">
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
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-500 rounded-full opacity-80 animate-bounce"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-green-500 rounded-full opacity-80 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelemedicineHero;