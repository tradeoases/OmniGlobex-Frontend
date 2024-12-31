import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { 
  ChatBubbleLeftIcon, 
  ShoppingCartIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/solid';
import { BellIcon} from 'lucide-react';
// import XMarkIcon
interface Notification {
  id: string;
  type: 'message' | 'order' | 'status' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  link?: string;
}

const SupplierNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'message',
      title: 'New Message',
      message: 'You have a new message from Buyer regarding RFQ-2024-001',
      timestamp: new Date(),
      isRead: false,
      link: '/messages/123'
    },
    {
      id: '2',
      type: 'order',
      title: 'Order Update',
      message: 'Order #45678 has been confirmed and is awaiting shipment',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      isRead: false,
      link: '/orders/45678'
    },
    {
      id: '3',
      type: 'status',
      title: 'Product Approved',
      message: 'Your product "Industrial Sensors" has been approved and is now live',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      isRead: true,
      link: '/products/789'
    },
    {
      id: '4',
      type: 'alert',
      title: 'Action Required',
      message: 'Please update your shipping information to process pending orders',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      isRead: false
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <ChatBubbleLeftIcon className="h-6 w-6 text-blue-500" />;
      case 'order':
        return <ShoppingCartIcon className="h-6 w-6 text-green-500" />;
      case 'status':
        return <CheckCircleIcon className="h-6 w-6 text-purple-500" />;
      case 'alert':
        return <ExclamationCircleIcon className="h-6 w-6 text-red-500" />;
      default:
        return <BellIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
    // Add API call to update notification status
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    // Add API call to delete notification
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Notifications
            <div className="h-1 w-20 bg-main mt-2 rounded-full"></div>
          </h2>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {notifications.filter(n => !n.isRead).length} New
          </span>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm border-l-4 ${
                  notification.isRead ? 'border-gray-200' : 'border-blue-500'
                } p-4 transition-all hover:shadow-md`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        {notification.link && (
                          <button
                          onClick={()=>alert("under implementation")}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            View Details
                          </button>
                        )}
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-gray-600 hover:text-gray-800"
                          >
                            Mark as Read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierNotifications;
