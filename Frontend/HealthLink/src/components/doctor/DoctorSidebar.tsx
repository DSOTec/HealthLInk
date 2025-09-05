import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { 
  Users, 
  Calendar, 
  FileText, 
  CreditCard, 
  Settings, 
  Activity,
  Stethoscope
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  count?: number;
}

const DoctorSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarItems: SidebarItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <Activity className="h-5 w-5" />,
      path: '/doctor/dashboard'
    },
    {
      id: 'patients',
      label: 'Patients',
      icon: <Users className="h-5 w-5" />,
      path: '/doctor/patients',
      count: 12
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: <Calendar className="h-5 w-5" />,
      path: '/doctor/appointments',
      count: 5
    },
    {
      id: 'records',
      label: 'Health Records',
      icon: <FileText className="h-5 w-5" />,
      path: '/doctor/records'
    },
    {
      id: 'consultations',
      label: 'Consultations',
      icon: <Stethoscope className="h-5 w-5" />,
      path: '/doctor/consultations'
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: <CreditCard className="h-5 w-5" />,
      path: '/doctor/payments'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      path: '/doctor/settings'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Doctor Portal</h2>
        
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={isActive(item.path) ? 'text-blue-700' : 'text-gray-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              
              {item.count && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  isActive(item.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3">
          <h3 className="text-sm font-medium text-gray-800 mb-2">Today's Stats</h3>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Appointments</span>
              <span className="font-medium text-gray-900">3</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Consultations</span>
              <span className="font-medium text-gray-900">2</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Earnings</span>
              <span className="font-medium text-green-600">$450</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSidebar;
