
import { Routes, Route } from 'react-router'
import { WalletProvider } from './contexts/WalletContext'
import { Web3Provider } from './contexts/Web3Context'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Symptoms from './pages/Symptoms'
import Doctors from './pages/Doctors'
import HealthRecords from './pages/HealthRecords'
import Settings from './pages/Settings'
import Payments from './pages/Payments'
import Web3Demo from './pages/Web3Demo'

const App = () => {
  return (
    <WalletProvider>
      <Web3Provider>
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
        </Routes>
      </Web3Provider>
    </WalletProvider>
  )
}

export default App