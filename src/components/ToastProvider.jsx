import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
        },
        success: {
          icon: '✓',
          style: {
            border: '1px solid hsl(var(--success))',
          },
        },
        error: {
          icon: '✕',
          style: {
            border: '1px solid hsl(var(--destructive))',
          },
        },
      }}
    />
  );
};

export default ToastProvider;