import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import SkillsAssessmentHub from '../index';
import assessmentReducer from '../../../store/slices/assessmentSlice';
import { act } from 'react-dom/test-utils';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    main: ({ children, ...props }) => <main {...props}>{children}</main>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      assessment: assessmentReducer,
    },
    preloadedState: {
      assessment: {
        categories: [],
        activeAssessment: null,
        completedAssessment: null,
        currentProgress: {
          currentQuestionIndex: 0,
          answers: {},
          timeRemaining: null,
          isSubmitting: false,
        },
        ...initialState,
      },
    },
  });
};

const renderWithProviders = (ui, { store = createMockStore() } = {}) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
};

describe('SkillsAssessmentHub', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    renderWithProviders(<SkillsAssessmentHub />);
    expect(screen.getByLabelText('Loading assessment hub content')).toBeInTheDocument();
  });

  test('handles keyboard navigation', () => {
    const store = createMockStore({
      activeAssessment: {
        id: 1,
        title: 'Test Assessment',
      },
    });

    renderWithProviders(<SkillsAssessmentHub />, { store });
    
    // Test Escape key handling
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(store.getState().assessment.activeAssessment).toBeNull();
  });

  test('focus trap works correctly', async () => {
    const store = createMockStore({
      activeAssessment: {
        id: 1,
        title: 'Test Assessment',
      },
    });

    renderWithProviders(<SkillsAssessmentHub />, { store });

    // Get all focusable elements
    const focusableElements = screen.getAllByRole('button');
    
    // Test that focus stays within the component
    act(() => {
      focusableElements[focusableElements.length - 1].focus();
      fireEvent.keyDown(focusableElements[focusableElements.length - 1], { 
        key: 'Tab',
        shiftKey: false 
      });
    });

    await waitFor(() => {
      expect(document.activeElement).toBe(focusableElements[0]);
    });
  });

  test('error boundary catches errors', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    const store = createMockStore({
      activeAssessment: {
        id: 1,
        title: 'Test Assessment',
      },
    });

    renderWithProviders(
      <SkillsAssessmentHub>
        <ThrowError />
      </SkillsAssessmentHub>,
      { store }
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  test('handles assessment completion', async () => {
    const store = createMockStore({
      activeAssessment: {
        id: 1,
        title: 'Test Assessment',
      },
    });

    renderWithProviders(<SkillsAssessmentHub />, { store });

    const mockResults = {
      score: 85,
      completedAt: new Date().toISOString(),
      skillBreakdown: {
        technical: 90,
        communication: 80,
        problemSolving: 85,
      },
    };

    // Simulate assessment completion
    await act(async () => {
      store.dispatch({
        type: 'assessment/completeAssessment',
        payload: mockResults,
      });
    });

    await waitFor(() => {
      expect(store.getState().assessment.completedAssessment).toEqual(mockResults);
    });
  });
});