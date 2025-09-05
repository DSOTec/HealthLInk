import React from 'react';
import { motion } from 'framer-motion';
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
    <section id="how-it-works" className={`py-12 sm:py-16 lg:py-24 bg-white dark:bg-gray-900 transition-colors duration-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How MarpeLink Works
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Experience the future of healthcare with our three-step process
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            
            return (
              <motion.div 
                key={step.id} 
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Connection line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2 z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  </div>
                )}

                <motion.div 
                  className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Icon */}
                  <motion.div 
                    className={`w-12 h-12 sm:w-16 sm:h-16 ${step.iconBg} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 ${step.iconColor}`} />
                  </motion.div>

                  {/* Step number */}
                  <div className="text-center mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-semibold">
                      {step.id}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-700 ${step.durationColor} text-sm font-medium`}>
                      {step.duration}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button 
              className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Health Journey
            </motion.button>
            <motion.button 
              className="w-full sm:w-auto border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div 
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-12 text-sm text-gray-500 dark:text-gray-400">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Shield className="w-4 h-4" />
              <span>HIPAA Compliant</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Users className="w-4 h-4" />
              <span>1000+ Verified Doctors</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>24/7 AI Support</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;