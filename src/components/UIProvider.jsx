import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectToasts, removeToast } from '../store/slices/uiSlice';
import ToastContainer from './ui/Toast';
import Modal from './ui/Modal';

const UIProvider = ({ children }) => {
  const dispatch = useDispatch();
  const toasts = useSelector(selectToasts);

  useEffect(() => {
    // Auto-remove toasts after their duration
    toasts.forEach((toast) => {
      if (toast.duration) {
        const timer = setTimeout(() => {
          dispatch(removeToast(toast.id));
        }, toast.duration);

        return () => clearTimeout(timer);
      }
    });
  }, [toasts, dispatch]);

  return (
    <>
      {children}
      <ToastContainer toasts={toasts} removeToast={(id) => dispatch(removeToast(id))} />
    </>
  );
};

export default UIProvider;