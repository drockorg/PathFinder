import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated, logout } from '../store/slices/authSlice';
import LoadingState from './LoadingState';

const AppProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(state => state.auth.loading);

  useEffect(() => {
    // Check token expiry on mount and setup refresh token logic
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
          dispatch(logout());
          navigate('/login');
        }
      } catch (error) {
        dispatch(logout());
        navigate('/login');
      }
    }
  }, [dispatch, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingState size="large" message="Loading Pathfinders..." />
      </div>
    );
  }

  return children;
};

export default AppProvider;