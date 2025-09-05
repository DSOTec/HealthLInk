import { motion } from 'framer-motion';
import Navbar from '../components/LandingPage/Navbar'
import TelemedicineHero from '../components/LandingPage/TelemedicineHero'
import HowItWorksSection from '../components/LandingPage/HowItWorksSection'
import FloatingChatbot from '../components/common/FloatingChatbot';
import VerifiedHealthcareProviders from '../components/LandingPage/VerifiedHealthcareProviders'
import Footer from '../components/LandingPage/Footer'
import CallToActionSection from '../components/LandingPage/CallToActionSection'

const LandingPage = () => {
  // Removed wallet state and navigation - users must manually connect via TelemedicineHero

  return (
    <motion.div 
      className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pt-16 sm:pt-20"> {/* Responsive padding-top for fixed navbar */}
        <Navbar />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <TelemedicineHero />
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HowItWorksSection />
        </motion.div>
        <FloatingChatbot />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <VerifiedHealthcareProviders />
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <CallToActionSection />
        </motion.div>
        <Footer />
      </div>
    </motion.div>
  )
}

export default LandingPage
