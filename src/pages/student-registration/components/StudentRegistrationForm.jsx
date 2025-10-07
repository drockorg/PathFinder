import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../../store/services/api';
import { showToast } from '../../../store/slices/uiSlice';
import { setCredentials } from '../../../store/slices/authSlice';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const steps = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    description: 'Tell us about yourself'
  },
  {
    id: 'education',
    title: 'Educational Background',
    description: 'Your academic history'
  },
  {
    id: 'skills',
    title: 'Skills & Interests',
    description: 'What you know and want to learn'
  },
  {
    id: 'goals',
    title: 'Career Goals',
    description: 'Where you want to go'
  }
];

const StudentRegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    
    // Education
    education: [{
      institution: '',
      degree: '',
      field: '',
      graduationYear: ''
    }],
    
    // Skills & Interests
    currentSkills: [],
    interestedSkills: [],
    preferredLearningStyle: '',
    
    // Career Goals
    desiredRole: '',
    industryPreference: '',
    salaryExpectation: '',
    workPreference: '', // remote, hybrid, onsite
    timeframe: '' // immediate, 3-6 months, 6-12 months
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 0: // Basic Info
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
        
      case 1: // Education
        if (!formData.education[0].institution) {
          newErrors['education.0.institution'] = 'Institution is required';
        }
        if (!formData.education[0].degree) {
          newErrors['education.0.degree'] = 'Degree is required';
        }
        break;
        
      case 2: // Skills
        if (!formData.currentSkills.length) {
          newErrors.currentSkills = 'Please select at least one current skill';
        }
        if (!formData.interestedSkills.length) {
          newErrors.interestedSkills = 'Please select skills you want to learn';
        }
        break;
        
      case 3: // Goals
        if (!formData.desiredRole) {
          newErrors.desiredRole = 'Please specify your desired role';
        }
        if (!formData.timeframe) {
          newErrors.timeframe = 'Please specify your timeframe';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    
    try {
      const result = await register(formData).unwrap();
      dispatch(setCredentials(result));
      dispatch(showToast({
        type: 'success',
        message: 'Registration successful! Welcome to Pathfinders.'
      }));
      navigate('/student-dashboard');
    } catch (err) {
      dispatch(showToast({
        type: 'error',
        message: err.data?.message || 'Registration failed. Please try again.'
      }));
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
                required
              />
            </div>
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
            />
            <Select
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              error={errors.location}
              options={[
                { value: 'accra', label: 'Accra' },
                { value: 'kumasi', label: 'Kumasi' },
                { value: 'tamale', label: 'Tamale' },
                { value: 'takoradi', label: 'Takoradi' },
                { value: 'cape-coast', label: 'Cape Coast' }
              ]}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              required
            />
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index} className="space-y-4 p-4 border border-border rounded-lg">
                <Input
                  label="Institution"
                  name={`education.${index}.institution`}
                  value={edu.institution}
                  onChange={handleInputChange}
                  error={errors[`education.${index}.institution`]}
                  required
                />
                <Select
                  label="Degree"
                  name={`education.${index}.degree`}
                  value={edu.degree}
                  onChange={handleInputChange}
                  error={errors[`education.${index}.degree`]}
                  options={[
                    { value: 'high-school', label: 'High School' },
                    { value: 'diploma', label: 'Diploma' },
                    { value: 'bachelors', label: 'Bachelor\'s Degree' },
                    { value: 'masters', label: 'Master\'s Degree' },
                    { value: 'phd', label: 'PhD' }
                  ]}
                  required
                />
                <Input
                  label="Field of Study"
                  name={`education.${index}.field`}
                  value={edu.field}
                  onChange={handleInputChange}
                  error={errors[`education.${index}.field`]}
                />
                <Input
                  label="Graduation Year"
                  type="number"
                  name={`education.${index}.graduationYear`}
                  value={edu.graduationYear}
                  onChange={handleInputChange}
                  error={errors[`education.${index}.graduationYear`]}
                  min="1950"
                  max="2030"
                />
              </div>
            ))}
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Current Skills</label>
              <div className="grid grid-cols-2 gap-2">
                {['HTML', 'CSS', 'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'UI Design'].map(skill => (
                  <label
                    key={skill}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.currentSkills.includes(skill)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={formData.currentSkills.includes(skill)}
                      onChange={(e) => {
                        const newSkills = e.target.checked
                          ? [...formData.currentSkills, skill]
                          : formData.currentSkills.filter(s => s !== skill);
                        setFormData(prev => ({ ...prev, currentSkills: newSkills }));
                      }}
                    />
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>
              {errors.currentSkills && (
                <p className="text-sm text-error mt-1">{errors.currentSkills}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Skills You Want to Learn</label>
              <div className="grid grid-cols-2 gap-2">
                {['React Native', 'Data Science', 'Machine Learning', 'Cloud Computing', 'DevOps', 'Blockchain', 'Cybersecurity', 'Digital Marketing'].map(skill => (
                  <label
                    key={skill}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.interestedSkills.includes(skill)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={formData.interestedSkills.includes(skill)}
                      onChange={(e) => {
                        const newSkills = e.target.checked
                          ? [...formData.interestedSkills, skill]
                          : formData.interestedSkills.filter(s => s !== skill);
                        setFormData(prev => ({ ...prev, interestedSkills: newSkills }));
                      }}
                    />
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>
              {errors.interestedSkills && (
                <p className="text-sm text-error mt-1">{errors.interestedSkills}</p>
              )}
            </div>

            <Select
              label="Preferred Learning Style"
              name="preferredLearningStyle"
              value={formData.preferredLearningStyle}
              onChange={handleInputChange}
              options={[
                { value: 'visual', label: 'Visual Learning' },
                { value: 'practical', label: 'Hands-on Practice' },
                { value: 'reading', label: 'Reading & Research' },
                { value: 'interactive', label: 'Interactive Discussions' }
              ]}
            />
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <Input
              label="Desired Role"
              name="desiredRole"
              value={formData.desiredRole}
              onChange={handleInputChange}
              error={errors.desiredRole}
              placeholder="e.g., Frontend Developer"
              required
            />
            <Select
              label="Industry Preference"
              name="industryPreference"
              value={formData.industryPreference}
              onChange={handleInputChange}
              options={[
                { value: 'technology', label: 'Technology' },
                { value: 'finance', label: 'Finance & Banking' },
                { value: 'healthcare', label: 'Healthcare' },
                { value: 'education', label: 'Education' },
                { value: 'manufacturing', label: 'Manufacturing' }
              ]}
            />
            <Select
              label="Expected Salary Range (GHS)"
              name="salaryExpectation"
              value={formData.salaryExpectation}
              onChange={handleInputChange}
              options={[
                { value: 'range1', label: '1,000 - 2,000' },
                { value: 'range2', label: '2,000 - 4,000' },
                { value: 'range3', label: '4,000 - 6,000' },
                { value: 'range4', label: '6,000 - 8,000' },
                { value: 'range5', label: '8,000+' }
              ]}
            />
            <Select
              label="Work Preference"
              name="workPreference"
              value={formData.workPreference}
              onChange={handleInputChange}
              options={[
                { value: 'onsite', label: 'On-site' },
                { value: 'hybrid', label: 'Hybrid' },
                { value: 'remote', label: 'Remote' }
              ]}
            />
            <Select
              label="Timeline to Start Working"
              name="timeframe"
              value={formData.timeframe}
              onChange={handleInputChange}
              error={errors.timeframe}
              options={[
                { value: 'immediate', label: 'Immediately' },
                { value: '1-3months', label: '1-3 months' },
                { value: '3-6months', label: '3-6 months' },
                { value: '6-12months', label: '6-12 months' }
              ]}
              required
            />
          </div>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col items-center relative z-10 ${
                index <= currentStep ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium ${
                  index <= currentStep
                    ? 'border-primary bg-primary text-white'
                    : 'border-muted-foreground bg-background'
                }`}
              >
                {index < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  index + 1
                )}
              </div>
              <div className="text-xs mt-2 font-medium">{step.title}</div>
            </div>
          ))}
          
          {/* Progress Line */}
          <div
            className="absolute top-4 left-0 h-[2px] bg-border -translate-y-1/2 transition-all duration-300"
            style={{
              width: '100%',
              zIndex: 0
            }}
          />
          <div
            className="absolute top-4 left-0 h-[2px] bg-primary -translate-y-1/2 transition-all duration-300"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
              zIndex: 1
            }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">{steps[currentStep].title}</h2>
          <p className="text-muted-foreground">{steps[currentStep].description}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStepContent(currentStep)}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            
            <Button
              type={currentStep === steps.length - 1 ? 'submit' : 'button'}
              onClick={currentStep === steps.length - 1 ? undefined : handleNext}
              loading={isLoading}
            >
              {currentStep === steps.length - 1 ? 'Complete Registration' : 'Next Step'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;