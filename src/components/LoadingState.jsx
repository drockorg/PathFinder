import React from 'react';
import { motion } from 'framer-motion';
import Icon from './AppIcon';

const LoadingState = ({ size = 'default', message = 'Loading...', className = '' }) => {
  const sizes = {
    small: 'h-4 w-4',
    default: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizes[size]} text-primary`}
      >
        <Icon name="Loader2" size={size === 'small' ? 16 : size === 'large' ? 48 : 32} />
      </motion.div>
      {message && (
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      )}
    </div>
  );
};

export default LoadingState;