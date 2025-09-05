
import { Routes, Route } from 'react-router'
import { WalletProvider } from './contexts/WalletContext'
import { Web3Provider } from './contexts/Web3Context'
import { DoctorProvider } from './contexts/DoctorContext'
import ToastContainer from './components/ToastContainer'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Symptoms from './pages/Symptoms'
import Doctors from './pages/Doctors'
import HealthRecords from './pages/HealthRecords'
import Settings from './pages/Settings'
import Payments from './pages/Payments'
import Web3Demo from './pages/Web3Demo'

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import DoctorPatients from './pages/doctor/DoctorPatients'
import DoctorAppointments from './pages/doctor/DoctorAppointments'
import DoctorRecords from './pages/doctor/DoctorRecords'
import DoctorConsultations from './pages/doctor/DoctorConsultations'
import DoctorPaymentsPage from './pages/doctor/DoctorPaymentsPage'
import DoctorSettingsPage from './pages/doctor/DoctorSettingsPage'

const App = () => {
  return (
    <WalletProvider>
      <Web3Provider>
        <DoctorProvider>
          <ToastContainer>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/symptoms" 
              element={
                <ProtectedRoute>
                  <Symptoms />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctors" 
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/records" 
              element={
                <ProtectedRoute>
                  <HealthRecords />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/payments" 
              element={
                <ProtectedRoute>
                  <Payments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/web3-demo" 
              element={
                <ProtectedRoute>
                  <Web3Demo />
                </ProtectedRoute>
              } 
            />
            
            {/* Doctor Routes */}
            <Route 
              path="/doctor/dashboard" 
              element={
                <ProtectedRoute>
                  <DoctorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/patients" 
              element={
                <ProtectedRoute>
                  <DoctorPatients />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/appointments" 
              element={
                <ProtectedRoute>
                  <DoctorAppointments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/records" 
              element={
                <ProtectedRoute>
                  <DoctorRecords />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/consultations" 
              element={
                <ProtectedRoute>
                  <DoctorConsultations />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/payments" 
              element={
                <ProtectedRoute>
                  <DoctorPaymentsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/settings" 
              element={
                <ProtectedRoute>
                  <DoctorSettingsPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
          </ToastContainer>
        </DoctorProvider>
      </Web3Provider>
    </WalletProvider>
  )
}

export default App