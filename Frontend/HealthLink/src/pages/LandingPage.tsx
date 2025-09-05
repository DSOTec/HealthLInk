import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useWallet } from '../contexts/WalletContext';
import Navbar from '../components/LandingPage/Navbar'
import TelemedicineHero from '../components/LandingPage/TelemedicineHero'
import HowItWorksSection from '../components/LandingPage/HowItWorksSection'
import VerifiedHealthcareProviders from '../components/LandingPage/VerifiedHealthcareProviders'
import Footer from '../components/LandingPage/Footer'
import CallToActionSection from '../components/LandingPage/CallToActionSection'

const LandingPage = () => {
  const { isConnected, walletAddress, connectWallet, isLoading } = useWallet();
  const navigate = useNavigate();

  // Redirect to dashboard if wallet is already connected
  useEffect(() => {
    if (isConnected && walletAddress) {
      // Check if user prefers doctor dashboard (could be based on localStorage or user preference)
      const isDoctorMode = localStorage.getItem('healthlink_user_type') === 'doctor';
      navigate(isDoctorMode ? '/doctor/dashboard' : '/dashboard');
    }
  }, [isConnected, walletAddress, navigate]);

  const handleConnectWallet = async (userType: 'patient' | 'doctor' = 'patient') => {
    try {
      // Store user type preference
      localStorage.setItem('healthlink_user_type', userType);
      await connectWallet();
      // Navigation will happen automatically via useEffect
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Wallet Connection Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Connect Your Wallet to Get Started
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Secure, decentralized healthcare powered by blockchain technology
          </p>
          
          {!isConnected ? (
            <div className="space-y-4">
              <p className="text-lg text-blue-100 mb-6">Choose your role to get started:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleConnectWallet('patient')}
                  disabled={isLoading}
                  className="bg-blue-600 text-white rounded px-8 py-4 text-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      I'm a Patient
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleConnectWallet('doctor')}
                  disabled={isLoading}
                  className="bg-green-600 text-white rounded px-8 py-4 text-lg font-semibold hover:bg-green-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      I'm a Doctor
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-green-500 text-white rounded px-8 py-4 text-lg font-semibold inline-flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Wallet Connected - Redirecting...
            </div>
          )}
          
          <p className="text-sm text-blue-200 mt-4">
            Make sure you have MetaMask installed and connected to Arbitrum Sepolia testnet
          </p>
        </div>
      </div>

      <TelemedicineHero />
      <HowItWorksSection />
      <VerifiedHealthcareProviders />
      <CallToActionSection />
      <Footer />
    </>
  )
}

export default LandingPage
