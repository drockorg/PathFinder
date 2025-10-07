import { useEffect, useRef } from 'react';

const useFocusTrap = (active = true) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const element = elementRef.current;
    if (!element) return;

    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    };

    const handleFocus = (e) => {
      if (!element.contains(e.target)) {
        firstFocusableElement.focus();
      }
    };

    element.addEventListener('keydown', handleTabKey);
    document.addEventListener('focus', handleFocus, true);

    // Set initial focus
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }

    return () => {
      element.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('focus', handleFocus, true);
    };
  }, [active]);

  return elementRef;
}

export default useFocusTrap;