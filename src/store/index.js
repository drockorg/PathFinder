import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import assessmentReducer from './slices/assessmentSlice';
import { api } from './services/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    assessment: assessmentReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);