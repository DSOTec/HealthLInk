import Navbar from '../components/LandingPage/Navbar'
import TelemedicineHero from '../components/LandingPage/TelemedicineHero'
import HowItWorksSection from '../components/LandingPage/HowItWorksSection'
import VerifiedHealthcareProviders from '../components/LandingPage/VerifiedHealthcareProviders'
import Footer from '../components/LandingPage/Footer'
import CallToActionSection from '../components/LandingPage/CallToActionSection'
const LandingPage = () => {
  return (
    <>
    <Navbar />
    <TelemedicineHero />
    <HowItWorksSection />
    <VerifiedHealthcareProviders />
    <CallToActionSection />
    <Footer />
    </>
  )
}

export default LandingPage
