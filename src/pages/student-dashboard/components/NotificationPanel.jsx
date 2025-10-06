import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications }) => {
  const [expandedNotification, setExpandedNotification] = useState(null);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'job_match':
        return 'Briefcase';
      case 'learning_reminder':
        return 'BookOpen';
      case 'achievement':
        return 'Award';
      case 'system_update':
        return 'Bell';
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'job_match':
        return 'text-secondary bg-secondary/10';
      case 'learning_reminder':
        return 'text-primary bg-primary/10';
      case 'achievement':
        return 'text-success bg-success/10';
      case 'system_update':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const handleNotificationClick = (notificationId) => {
    setExpandedNotification(
      expandedNotification === notificationId ? null : notificationId
    );
  };

  const handleMarkAsRead = (notificationId, event) => {
    event?.stopPropagation();
    // Handle mark as read logic
    console.log('Marking notification as read:', notificationId);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            <p className="text-sm text-muted-foreground">Stay updated</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="Settings"
          iconSize={16}
        >
          Settings
        </Button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notifications?.map((notification, index) => (
          <motion.div
            key={notification?.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`border border-border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
              !notification?.read ? 'bg-primary/5 border-primary/20' : 'bg-background'
            }`}
            onClick={() => handleNotificationClick(notification?.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                getNotificationColor(notification?.type)
              }`}>
                <Icon name={getNotificationIcon(notification?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm mb-1">
                      {notification?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notification?.message}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatTimeAgo(notification?.timestamp)}
                    </span>
                    {!notification?.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleMarkAsRead(notification?.id, e)}
                        iconName="Check"
                        iconSize={12}
                        className="w-6 h-6 p-0 text-muted-foreground hover:text-primary"
                      />
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedNotification === notification?.id && notification?.details && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 pt-3 border-t border-border"
                    >
                      <p className="text-sm text-muted-foreground">
                        {notification?.details}
                      </p>
                      {notification?.actionUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          iconName="ExternalLink"
                          iconPosition="right"
                          iconSize={12}
                        >
                          View Details
                        </Button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {notifications?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-muted-foreground">No new notifications</p>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;