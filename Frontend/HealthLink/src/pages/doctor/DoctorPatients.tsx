import React, { useState } from 'react';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import DoctorSidebar from '../../components/doctor/DoctorSidebar';
import PatientsTable from '../../components/doctor/PatientsTable';
import PatientModal from '../../components/doctor/PatientModal';
import { useDoctor } from '../../contexts/DoctorContext';

const DoctorPatients: React.FC = () => {
  const { selectedPatient } = useDoctor();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal when a patient is selected
  React.useEffect(() => {
    if (selectedPatient) {
      setIsModalOpen(true);
    }
  }, [selectedPatient]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DoctorSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <DoctorNavbar />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <PatientsTable />
          </div>
        </main>
      </div>

      {/* Patient Modal */}
      <PatientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default DoctorPatients;
