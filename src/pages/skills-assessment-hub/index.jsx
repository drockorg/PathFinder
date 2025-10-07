import React, { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSaveProgressMutation, useGetProgressQuery } from '../../store/services/assessmentApi';
import DetailedHistory from './components/DetailedHistory';
import ShareAssessment from './components/ShareAssessment';
import { useReducedMotion, useMediaQuery } from '../../hooks/useMediaQueries';
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';
import ErrorBoundary from './components/ErrorBoundary';
import ShortcutsHelp from './components/ShortcutsHelp';
import Header from '../../components/ui/Header';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import AssessmentOverview from './components/AssessmentOverview';
import AssessmentCategories from './components/AssessmentCategories';
import ActiveAssessment from './components/ActiveAssessment';
import AssessmentHistory from './components/AssessmentHistory';
import SkillRecommendations from './components/SkillRecommendations';
import AssessmentResults from './components/AssessmentResults';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { 
  useGetAssessmentCategoriesQuery,
  useGetAssessmentHistoryQuery,
  useGetSkillRecommendationsQuery,
  useStartAssessmentMutation
} from '../../store/services/api';
import { 
  setCategories,
  startAssessment as startAssessmentAction,
  completeAssessment,
  setSubmitting,
  resetAssessment
} from '../../store/slices/assessmentSlice';

const SkillsAssessmentHub = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showShare, setShowShare] = useState(false);
  const [saveProgress] = useSaveProgressMutation();
  
  // Get current assessment progress and state
  const currentAssessment = useSelector((state) => state.assessment.activeAssessment);
  const completedAssessment = useSelector((state) => state.assessment.completedAssessment);
  
  const { data: savedProgress } = useGetProgressQuery(currentAssessment?.id, {
    skip: !currentAssessment?.id,
  });
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');

  useKeyboardShortcuts({
    'Escape': () => {
      if (activeView === 'assessment' || activeView === 'results') {
        handleBackToOverview();
      }
    },
    'ArrowLeft': () => {
      if (activeView === 'assessment') {
        dispatch({ type: 'assessment/previousQuestion' });
      }
    },
    'ArrowRight': () => {
      if (activeView === 'assessment') {
        dispatch({ type: 'assessment/nextQuestion' });
      }
    },
    'h+alt': () => navigate('/'),
    'r+alt': () => window.location.reload(),
    '?': () => setShowShortcuts(prev => !prev),
  });
  
  const activeView = useSelector((state) => {
    if (state.assessment.completedAssessment) return 'results';
    if (state.assessment.activeAssessment) return 'assessment';
    return 'overview';
  });
  
  const { 
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError 
  } = useGetAssessmentCategoriesQuery();
  
  const {
    data: history,
    isLoading: historyLoading
  } = useGetAssessmentHistoryQuery();
  
  const {
    data: recommendations,
    isLoading: recommendationsLoading
  } = useGetSkillRecommendationsQuery();

  const [startAssessment] = useStartAssessmentMutation();

  const isSubmitting = useSelector((state) => state.assessment.currentProgress.isSubmitting);
  const isLoading = categoriesLoading || historyLoading || recommendationsLoading || isSubmitting;

  useEffect(() => {
    if (categories) {
      dispatch(setCategories(categories));
    }
  }, [categories, dispatch]);

  // Auto-save progress
  useEffect(() => {
    if (currentAssessment && currentAssessment.id) {
      const autoSaveInterval = setInterval(async () => {
        try {
          await saveProgress({
            assessmentId: currentAssessment.id,
            progress: currentAssessment.currentProgress
          }).unwrap();
        } catch (error) {
          console.error('Failed to auto-save:', error);
        }
      }, 30000); // Auto-save every 30 seconds

      return () => clearInterval(autoSaveInterval);
    }
  }, [currentAssessment, saveProgress]);

  const handleStartAssessment = async (categoryId) => {
    const loadingToast = toast.loading('Starting assessment...');
    try {
      const result = await startAssessment(categoryId).unwrap();
      dispatch(startAssessmentAction(result));
      toast.success('Assessment started successfully', { id: loadingToast });
    } catch (error) {
      console.error('Failed to start assessment:', error);
      toast.error(error.data?.message || 'Failed to start assessment', { id: loadingToast });
    }
  };

  const handleAssessmentComplete = async (results) => {
    const loadingToast = toast.loading('Submitting assessment...');
    try {
      dispatch(setSubmitting(true));
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      dispatch(completeAssessment(results));
      toast.success('Assessment completed successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Failed to complete assessment:', error);
      toast.error(error.data?.message || 'Failed to complete assessment', { id: loadingToast });
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  const handleBackToOverview = () => {
    dispatch(resetAssessment());
    navigate('/skills-assessment-hub');
  };

  if (categoriesError) {
    return (
      <div className="p-8 text-center">
        <Icon name="AlertTriangle" className="w-12 h-12 mx-auto text-red-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Error Loading Assessments</h3>
        <p className="text-muted-foreground mb-4">{categoriesError.message}</p>
        <Button 
          onClick={() => window.location.reload()}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Icon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : 'Try Again'}
        </Button>
      </div>
    );
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
          role="status"
          aria-busy="true"
          aria-label="Loading assessment hub content"
        >
          <div className="sr-only">Loading assessment hub content...</div>
          {/* Skeleton loaders with improved animation */}
          <div className="space-y-4" aria-hidden="true">
            <div className="h-8 w-1/3 bg-card animate-pulse rounded-lg" />
            <div className="h-48 bg-card animate-pulse rounded-xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="space-y-4 p-6 bg-card rounded-xl">
                <div className="h-6 w-2/3 bg-muted animate-pulse rounded-lg" />
                <div className="h-24 bg-muted animate-pulse rounded-lg" />
                <div className="h-8 w-1/2 bg-muted animate-pulse rounded-lg" />
              </div>
            ))}
          </div>
        </motion.div>
      );
    }

    return (
      <AnimatePresence mode="wait">
import useFocusTrap from '../../hooks/useFocusTrap';

// Add this near your other hooks at the top of the component
const assessmentRef = useFocusTrap(activeView === 'assessment');

// In the render section:
        {activeView === 'assessment' && (
          <motion.div
            ref={assessmentRef}
            key="assessment"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={prefersReducedMotion 
              ? { duration: 0.1 } 
              : { type: 'spring', stiffness: 260, damping: 20 }
            }
            className={`${isMobile ? 'px-2' : 'px-4'}`}
            role="region"
            aria-label="Active Assessment"
          >
            <ActiveAssessment
              assessment={currentAssessment}
              onComplete={handleAssessmentComplete}
              onBack={handleBackToOverview}
            />
          </motion.div>
        )}

// Add this near your other hooks at the top of the component
const resultsRef = useFocusTrap(activeView === 'results');

// In the render section:
        {activeView === 'results' && completedAssessment && (
          <motion.div
            ref={resultsRef}
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            role="region"
            aria-label="Assessment Results"
          >
            <AssessmentResults
              results={completedAssessment}
              onBackToOverview={handleBackToOverview}
            />
          </motion.div>
        )}

        {activeView === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <AssessmentOverview stats={history} />
            <AssessmentCategories
              categories={categories}
              onStartAssessment={handleStartAssessment}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AssessmentHistory history={history} />
              <SkillRecommendations recommendations={recommendations} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const [showShortcuts, setShowShortcuts] = React.useState(false);

  const handleKeyNavigation = useCallback((e) => {
    if (e.key === 'Escape') {
      if (showShortcuts) {
        setShowShortcuts(false);
      } else if (activeView === 'assessment' || activeView === 'results') {
        handleBackToOverview();
      }
    }
  }, [activeView, handleBackToOverview, showShortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [handleKeyNavigation]);

  return (
    <ErrorBoundary onReset={() => dispatch(resetAssessment())}>
      <motion.main
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
        className={`container mx-auto ${isMobile ? 'px-2' : 'px-4'} py-8`}
        role="main"
        aria-live="polite"
      >
      <div className="mb-8">
        <NavigationBreadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Skills Assessment Hub', href: '/skills-assessment-hub' },
          ]}
        />
        <Header
          title="Skills Assessment Hub"
          description="Evaluate your skills, track progress, and get personalized recommendations"
          icon="Brain"
        />
      </div>
      {renderContent()}
      <ShortcutsHelp isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
      <AnimatePresence>
        {showShare && currentAssessment && (
          <ShareAssessment
            assessment={currentAssessment}
            onClose={() => setShowShare(false)}
          />
        )}
      </AnimatePresence>
    </motion.main>
    </ErrorBoundary>
  );
};

export default SkillsAssessmentHub;