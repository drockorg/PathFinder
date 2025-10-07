import { useEffect } from 'react';

const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Don't trigger shortcuts when typing in input fields
      if (['input', 'textarea', 'select'].includes(event.target.tagName.toLowerCase())) {
        return;
      }

      for (const [key, handler] of Object.entries(shortcuts)) {
        const [keyCode, modifiers] = key.split('+').map(k => k.trim());
        const modifierKeys = modifiers ? modifiers.split('.') : [];

        const matchesKey = event.key.toLowerCase() === keyCode.toLowerCase();
        const matchesModifiers = modifierKeys.every(mod => {
          switch (mod) {
            case 'ctrl': return event.ctrlKey;
            case 'shift': return event.shiftKey;
            case 'alt': return event.altKey;
            case 'meta': return event.metaKey;
            default: return true;
          }
        });

        if (matchesKey && matchesModifiers) {
          event.preventDefault();
          handler(event);
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

export default useKeyboardShortcuts;