import React from 'react';
import { MessageCircle, Users, Shield } from 'lucide-react';

interface HowItWorksProps {
  className?: string;
}

const HowItWorksSection: React.FC<HowItWorksProps> = ({ className = '' }) => {
  const steps = [
    {
      id: 1,
      title: "AI Symptom Triage",
      description: "Describe your symptoms to our advanced AI system for instant assessment and urgency classification",
      duration: "2-3 minutes",
      icon: MessageCircle,
      iconBg: "bg-cyan-500",
      iconColor: "text-white",
      durationColor: "text-cyan-500"
    },
    {
      id: 2,
      title: "Connect with Doctors",
      description: "Browse verified healthcare providers and book secure video consultations based on your needs",
      duration: "Available 24/7",
      icon: Users,
      iconBg: "bg-green-500",
      iconColor: "text-white",
      durationColor: "text-green-500"
    },
    {
      id: 3,
      title: "Secure Payments",
      description: "Pay securely using blockchain escrow with stablecoin. Funds released only after consultation",
      duration: "Blockchain Secured",
      icon: Shield,
      iconBg: "bg-purple-500",
      iconColor: "text-white",
      durationColor: "text-purple-500"
    }
  ];

  return (
    <section className={`py-16 lg:py-24 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How HealthLink Works
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of healthcare with our three-step process
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            
            return (
              <div key={step.id} className="relative">
                {/* Connection line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gray-200 transform -translate-y-1/2 z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                )}

                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${step.iconBg} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <IconComponent className={`w-8 h-8 ${step.iconColor}`} />
                  </div>

                  {/* Step number */}
                  <div className="text-center mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold">
                      {step.id}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gray-50 ${step.durationColor} text-sm font-medium`}>
                      {step.duration}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Start Your Health Journey
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>1000+ Verified Doctors</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>24/7 AI Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;