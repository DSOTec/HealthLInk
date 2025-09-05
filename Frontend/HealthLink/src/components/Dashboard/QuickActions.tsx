import React from 'react';
import type { QuickAction } from '../../types/dashboard';

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action) => (
        <div
          key={action.id}
          onClick={action.action}
          className={`${action.color} p-6 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-200 hover:shadow-xl`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">{action.icon}</div>
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">→</span>
            </div>
          </div>
          <h3 className="text-white font-bold text-lg mb-2">{action.title}</h3>
          <p className="text-white text-opacity-90 text-sm">{action.description}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;
