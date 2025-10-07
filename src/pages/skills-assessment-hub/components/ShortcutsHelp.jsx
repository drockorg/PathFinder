import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../../hooks/useMediaQueries';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShortcutsHelp = ({ isOpen, onClose }) => {
  const prefersReducedMotion = useReducedMotion();
  const shortcuts = [
    { key: 'Esc', description: 'Return to overview / Close modal' },
    { key: '←', description: 'Previous question' },
    { key: '→', description: 'Next question' },
    { key: 'Alt + H', description: 'Return to home' },
    { key: 'Alt + R', description: 'Reload page' },
    { key: '?', description: 'Show/hide keyboard shortcuts' },
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
      role="dialog"
      aria-label="Keyboard shortcuts"
    >
      <div
        className="bg-card rounded-lg p-6 max-w-md w-full shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Icon name="Keyboard" className="w-5 h-5 mr-2" />
            Keyboard Shortcuts
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close shortcuts help"
          >
            <Icon name="X" className="w-5 h-5" />
          </Button>
        </div>
        <div className="space-y-3">
          {shortcuts.map(({ key, description }) => (
            <div key={key} className="flex justify-between items-center">
              <code className="bg-muted px-2 py-1 rounded text-sm">{key}</code>
              <span className="text-muted-foreground">{description}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ShortcutsHelp;