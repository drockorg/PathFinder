import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RegistrationHeader from './components/RegistrationHeader';
import ProgressIndicator from './components/ProgressIndicator';
import PersonalInfoStep from './components/PersonalInfoStep';
import EducationStep from './components/EducationStep';
import CareerGoalsStep from './components/CareerGoalsStep';
import CompletionStep from './components/CompletionStep';
import NavigationButtons from './components/NavigationButtons';

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    region: '',
    city: '',
    
    // Education
    educationLevel: '',
    schoolName: '',
    fieldOfStudy: '',
    completionStatus: '',
    graduationYear: '',
    additionalQualifications: '',
    englishLevel: '',
    computerSkills: '',
    
    // Career Goals
    careerField: '',
    experienceLevel: '',
    jobTypes: [],
    learningPreferences: [],
    
    // Completion
    agreeToTerms: false,
    receiveUpdates: false,
    interestedInMentorship: false
  });

  // Validation functions for each step
  const validatePersonalInfo = () => {
    let stepErrors = {};
    
    if (!formData?.firstName?.trim()) stepErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) stepErrors.lastName = 'Last name is required';
    if (!formData?.email?.trim()) {
      stepErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      stepErrors.email = 'Please enter a valid email address';
    }
    if (!formData?.phone?.trim()) {
      stepErrors.phone = 'Phone number is required';
    } else if (!/^\+233\s?\d{2}\s?\d{3}\s?\d{4}$/?.test(formData?.phone?.replace(/\s/g, ''))) {
      stepErrors.phone = 'Please enter a valid Ghana phone number (+233 XX XXX XXXX)';
    }
    if (!formData?.dateOfBirth) stepErrors.dateOfBirth = 'Date of birth is required';
    if (!formData?.region) stepErrors.region = 'Region is required';
    if (!formData?.city?.trim()) stepErrors.city = 'City is required';
    
    return stepErrors;
  };

  const validateEducation = () => {
    let stepErrors = {};
    
    if (!formData?.educationLevel) stepErrors.educationLevel = 'Education level is required';
    if (!formData?.schoolName?.trim()) stepErrors.schoolName = 'School name is required';
    if (!formData?.fieldOfStudy) stepErrors.fieldOfStudy = 'Field of study is required';
    if (!formData?.completionStatus) stepErrors.completionStatus = 'Completion status is required';
    if (!formData?.englishLevel?.trim()) stepErrors.englishLevel = 'English proficiency is required';
    if (!formData?.computerSkills?.trim()) stepErrors.computerSkills = 'Computer skills level is required';
    
    if (formData?.completionStatus === 'completed' && !formData?.graduationYear) {
      stepErrors.graduationYear = 'Graduation year is required';
    }
    
    return stepErrors;
  };

  const validateCareerGoals = () => {
    let stepErrors = {};
    
    if (!formData?.careerField) stepErrors.careerField = 'Career field is required';
    if (!formData?.experienceLevel) stepErrors.experienceLevel = 'Experience level is required';
    if (!formData?.jobTypes || formData?.jobTypes?.length === 0) {
      stepErrors.jobTypes = 'Please select at least one job type';
    }
    if (!formData?.learningPreferences || formData?.learningPreferences?.length === 0) {
      stepErrors.learningPreferences = 'Please select at least one learning preference';
    }
    
    return stepErrors;
  };

  const validateCompletion = () => {
    let stepErrors = {};
    
    if (!formData?.agreeToTerms) {
      stepErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    return stepErrors;
  };

  const validateCurrentStep = () => {
    let stepErrors = {};
    
    switch (currentStep) {
      case 1:
        stepErrors = validatePersonalInfo();
        break;
      case 2:
        stepErrors = validateEducation();
        break;
      case 3:
        stepErrors = validateCareerGoals();
        break;
      case 4:
        stepErrors = validateCompletion();
        break;
      default:
        break;
    }
    
    setErrors(stepErrors);
    return Object.keys(stepErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration data:', formData);
      
      // Navigate to student dashboard
      navigate('/student-dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCurrentStep = () => {
    const stepProps = { formData, setFormData, errors };
    
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep {...stepProps} />;
      case 2:
        return <EducationStep {...stepProps} />;
      case 3:
        return <CareerGoalsStep {...stepProps} />;
      case 4:
        return <CompletionStep {...stepProps} />;
      default:
        return null;
    }
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return Object.keys(validatePersonalInfo())?.length === 0;
      case 2:
        return Object.keys(validateEducation())?.length === 0;
      case 3:
        return Object.keys(validateCareerGoals())?.length === 0;
      case 4:
        return Object.keys(validateCompletion())?.length === 0;
      default:
        return false;
    }
  };

  // Auto-format phone number
  useEffect(() => {
    if (formData?.phone && !formData?.phone?.startsWith('+233')) {
      const cleaned = formData?.phone?.replace(/\D/g, '');
      if (cleaned?.length > 0 && !cleaned?.startsWith('233')) {
        setFormData(prev => ({
          ...prev,
          phone: `+233 ${cleaned}`
        }));
      }
    }
  }, [formData?.phone]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <RegistrationHeader />
        
        <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-8">
          <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderCurrentStep()}
            </motion.div>
          </AnimatePresence>
          
          {errors?.submit && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{errors?.submit}</p>
            </div>
          )}
          
          <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isValid={isCurrentStepValid()}
          />
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© {new Date()?.getFullYear()} Pathfinders. Connecting Ghana's youth to opportunities.</p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <span>🇬🇭 Made for Ghana</span>
            <span>•</span>
            <span>Secure & Private</span>
            <span>•</span>
            <span>Local Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;