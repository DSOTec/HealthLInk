import React from 'react';
import DoctorNavbar from '../../components/doctor/DoctorNavbar';
import DoctorSidebar from '../../components/doctor/DoctorSidebar';
import DoctorPayments from '../../components/doctor/DoctorPayments';

const DoctorPaymentsPage: React.FC = () => {
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
            <DoctorPayments />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorPaymentsPage;
