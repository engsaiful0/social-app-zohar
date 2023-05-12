import React, { useState, useEffect } from 'react';

const Notification = ({ message }) => {
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    if (showNotification) {
      const notification = new Notification('Navigation Notification', {
        body: message,
      });
      notification.onshow = () => {
        setTimeout(() => {
          notification.close();
        }, 3000); // Close the notification after 3 seconds
      };
      return () => {
        notification.close();
      };
    }
  }, [showNotification, message]);

  return null;
};

export default Notification;
