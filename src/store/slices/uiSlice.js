import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: [],
  modals: {},
  sidebarOpen: false,
};

let toastId = 0;

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast: (state, action) => {
      const id = toastId++;
      const toast = {
        id,
        duration: 5000,
        ...action.payload,
      };
      state.toasts.push(toast);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
    showModal: (state, action) => {
      const { modalId, props } = action.payload;
      state.modals[modalId] = { isOpen: true, props };
    },
    hideModal: (state, action) => {
      const modalId = action.payload;
      if (state.modals[modalId]) {
        state.modals[modalId].isOpen = false;
      }
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { showToast, removeToast, showModal, hideModal, toggleSidebar } = uiSlice.actions;

export const selectToasts = (state) => state.ui.toasts;
export const selectModal = (modalId) => (state) => state.ui.modals[modalId];
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;

export default uiSlice.reducer;