import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';

const toastTypes = {
  success: {
    icon: 'CheckCircle',
    className: 'bg-success/10 border-success/20 text-success',
  },
  error: {
    icon: 'XCircle',
    className: 'bg-error/10 border-error/20 text-error',
  },
  warning: {
    icon: 'AlertTriangle',
    className: 'bg-warning/10 border-warning/20 text-warning',
  },
  info: {
    icon: 'Info',
    className: 'bg-primary/10 border-primary/20 text-primary',
  },
};

const Toast = ({ message, type = 'info', onClose, id }) => {
  const { icon, className } = toastTypes[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`flex items-center space-x-3 p-4 rounded-lg border ${className}`}
    >
      <Icon name={icon} size={20} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="text-current opacity-60 hover:opacity-100 transition-opacity"
      >
        <Icon name="X" size={16} />
      </button>
    </motion.div>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 min-w-[320px] max-w-[420px]">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;