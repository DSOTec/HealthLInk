import React from 'react';
import type { Notification, HealthTip } from '../../types/dashboard';

interface NotificationsProps {
  notifications: Notification[];
  healthTip: HealthTip;
  onMarkAsRead: (id: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ notifications, healthTip, onMarkAsRead }) => {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return '💡';
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.abs(now.getTime() - date.getTime()) / (1000 * 60);
    
    if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Health Tip of the Day */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-6 text-white">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-lg">💡</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">Health Tip of the Day</h3>
            <h4 className="font-semibold mb-2">{healthTip.title}</h4>
            <p className="text-white text-opacity-90 text-sm leading-relaxed">
              {healthTip.content}
            </p>
            <div className="mt-3">
              <span className="inline-block bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-medium">
                {healthTip.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {notifications.filter(n => !n.isRead).length} unread
            </span>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Mark all read
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🔔</div>
              <p className="text-gray-600">No notifications</p>
              <p className="text-gray-500 text-sm">You're all caught up!</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                  getNotificationColor(notification.type)
                } ${notification.isRead ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-semibold text-gray-800">
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {formatTime(notification.timestamp)}
                      </span>
                      {!notification.isRead && (
                        <button
                          onClick={() => onMarkAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-blue-800">Consultations</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-sm text-green-800">Satisfaction</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">5</div>
            <div className="text-sm text-purple-800">Doctors</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">24/7</div>
            <div className="text-sm text-orange-800">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
