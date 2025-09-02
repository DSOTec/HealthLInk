import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface CTAProps {
  className?: string;
}

const CallToActionSection: React.FC<CTAProps> = ({ className = '' }) => {
  return (
    <section className={`py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Ready to Experience the Future of Healthcare?
        </h2>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-12">
          Join thousands of patients and doctors already using HealthLink for secure, 
          intelligent healthcare.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-16">
          <button className="group bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            <span>Get Started Today</span>
          </button>
          
          <button className="group border-2 border-cyan-500 hover:border-cyan-600 text-cyan-600 hover:text-cyan-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 flex items-center space-x-2 hover:bg-cyan-50">
            <Play className="w-5 h-5" />
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 mb-16">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-cyan-600 mb-2">10,000+</div>
            <div className="text-gray-600">Active Patients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">1,500+</div>
            <div className="text-gray-600">Verified Doctors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Instant Access</div>
                <div className="text-sm text-gray-600">Connect in seconds</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">AI Diagnosis</div>
                <div className="text-sm text-gray-600">Smart health analysis</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-purple-500 rounded-lg"></div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Secure Payments</div>
                <div className="text-sm text-gray-600">Blockchain protected</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">24/7 Support</div>
                <div className="text-sm text-gray-600">Always available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-12 flex flex-wrap justify-center items-center space-x-8 text-gray-500 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>End-to-End Encrypted</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Blockchain Secured</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;