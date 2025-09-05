import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries
          'react-vendor': ['react', 'react-dom', 'react-router'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'web3-vendor': ['ethers', '@metamask/detect-provider'],
          
          // Feature-based chunks
          'doctor-features': [
            './src/pages/doctor/DoctorDashboard.tsx',
            './src/pages/doctor/DoctorAppointments.tsx',
            './src/pages/doctor/DoctorPatients.tsx',
            './src/pages/doctor/DoctorRecords.tsx',
            './src/pages/doctor/DoctorConsultations.tsx',
            './src/pages/doctor/DoctorPaymentsPage.tsx',
            './src/pages/doctor/DoctorSettingsPage.tsx'
          ],
          'patient-features': [
            './src/pages/Dashboard.tsx',
            './src/pages/Symptoms.tsx',
            './src/pages/Doctors.tsx',
            './src/pages/HealthRecords.tsx',
            './src/pages/Payments.tsx',
            './src/pages/Settings.tsx'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
