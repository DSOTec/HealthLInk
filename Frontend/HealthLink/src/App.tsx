
import { Routes, Route } from 'react-router'
import { Suspense, lazy } from 'react'
import { WalletProvider } from './contexts/WalletContext'
import { Web3Provider } from './contexts/Web3Context'
import { DoctorProvider } from './contexts/DoctorContext'
import { AppointmentProvider } from './contexts/AppointmentContext'
import { ThemeProvider } from './contexts/ThemeContext'
import ToastContainer from './components/ToastContainer'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'

// Lazy load patient pages
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Symptoms = lazy(() => import('./pages/Symptoms'))
const Doctors = lazy(() => import('./pages/Doctors'))
const HealthRecords = lazy(() => import('./pages/HealthRecords'))
const Settings = lazy(() => import('./pages/Settings'))
const Payments = lazy(() => import('./pages/Payments'))

// Lazy load doctor pages
const DoctorDashboard = lazy(() => import('./pages/doctor/DoctorDashboard'))
const DoctorPatients = lazy(() => import('./pages/doctor/DoctorPatients'))
const DoctorAppointments = lazy(() => import('./pages/doctor/DoctorAppointments'))
const DoctorRecords = lazy(() => import('./pages/doctor/DoctorRecords'))
const DoctorConsultations = lazy(() => import('./pages/doctor/DoctorConsultations'))
const DoctorPaymentsPage = lazy(() => import('./pages/doctor/DoctorPaymentsPage'))
const DoctorSettingsPage = lazy(() => import('./pages/doctor/DoctorSettingsPage'))

const App = () => {
  return (
    <ThemeProvider>
      <WalletProvider>
        <Web3Provider>
          <DoctorProvider>
            <AppointmentProvider>
              <ToastContainer>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <Dashboard />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/symptoms" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <Symptoms />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctors" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <Doctors />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/records" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <HealthRecords />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <Settings />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/payments" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <Payments />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            {/* Removed Web3Demo route - keeping only actual wallet + payments logic */}
            
            {/* Doctor Routes */}
            <Route 
              path="/doctor/dashboard" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <DoctorDashboard />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/patients" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <DoctorPatients />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/appointments" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <DoctorAppointments />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/records" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <DoctorRecords />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/consultations" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <DoctorConsultations />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/payments" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <DoctorPaymentsPage />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor/settings" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <DoctorSettingsPage />
                  </Suspense>
                </ProtectedRoute>
              } 
            />
          </Routes>
              </ToastContainer>
            </AppointmentProvider>
          </DoctorProvider>
        </Web3Provider>
      </WalletProvider>
    </ThemeProvider>
  )
}

export default App