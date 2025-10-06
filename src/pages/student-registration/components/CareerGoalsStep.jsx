import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CareerGoalsStep = ({ formData, setFormData, errors }) => {
  const careerFields = [
    { value: 'technology', label: 'Technology & IT' },
    { value: 'healthcare', label: 'Healthcare & Medicine' },
    { value: 'education', label: 'Education & Training' },
    { value: 'business', label: 'Business & Finance' },
    { value: 'agriculture', label: 'Agriculture & Food' },
    { value: 'construction', label: 'Construction & Engineering' },
    { value: 'hospitality', label: 'Hospitality & Tourism' },
    { value: 'manufacturing', label: 'Manufacturing & Production' },
    { value: 'media', label: 'Media & Communications' },
    { value: 'government', label: 'Government & Public Service' },
    { value: 'nonprofit', label: 'Non-profit & Social Work' },
    { value: 'other', label: 'Other' }
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-1 years)' },
    { value: 'junior', label: 'Junior Level (1-3 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (5+ years)' }
  ];

  const jobTypes = [
    { value: 'full-time', label: 'Full-time Employment' },
    { value: 'part-time', label: 'Part-time Employment' },
    { value: 'contract', label: 'Contract Work' },
    { value: 'freelance', label: 'Freelance/Consulting' },
    { value: 'internship', label: 'Internship' },
    { value: 'remote', label: 'Remote Work' }
  ];

  const learningPreferences = [
    'Online courses',
    'In-person training',
    'Mentorship programs',
    'Hands-on workshops',
    'Self-paced learning',
    'Group study sessions'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLearningPreferenceChange = (preference, checked) => {
    setFormData(prev => ({
      ...prev,
      learningPreferences: checked
        ? [...(prev?.learningPreferences || []), preference]
        : (prev?.learningPreferences || [])?.filter(p => p !== preference)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Career Goals</h2>
        <p className="text-muted-foreground">Let us know what you're aiming for in your career</p>
      </div>
      <Select
        label="Preferred Career Field"
        placeholder="Select your career interest"
        options={careerFields}
        value={formData?.careerField}
        onChange={(value) => handleInputChange('careerField', value)}
        error={errors?.careerField}
        description="Choose the field you're most interested in pursuing"
        required
      />
      <Select
        label="Current Experience Level"
        placeholder="Select your experience level"
        options={experienceLevels}
        value={formData?.experienceLevel}
        onChange={(value) => handleInputChange('experienceLevel', value)}
        error={errors?.experienceLevel}
        required
      />
      <Select
        label="Preferred Job Types"
        placeholder="Select job types you're interested in"
        options={jobTypes}
        value={formData?.jobTypes}
        onChange={(value) => handleInputChange('jobTypes', value)}
        error={errors?.jobTypes}
        multiple
        description="You can select multiple options"
        required
      />
      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">
          Learning Preferences
          <span className="text-destructive ml-1">*</span>
        </label>
        <p className="text-sm text-muted-foreground mb-4">
          Select your preferred ways of learning new skills
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {learningPreferences?.map((preference) => (
            <Checkbox
              key={preference}
              label={preference}
              checked={(formData?.learningPreferences || [])?.includes(preference)}
              onChange={(e) => handleLearningPreferenceChange(preference, e?.target?.checked)}
            />
          ))}
        </div>
        {errors?.learningPreferences && (
          <p className="text-sm text-destructive mt-1">{errors?.learningPreferences}</p>
        )}
      </div>
      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-2">Why This Information Helps</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• We'll recommend personalized learning paths</li>
          <li>• Match you with relevant job opportunities</li>
          <li>• Connect you with suitable mentors and peers</li>
          <li>• Suggest skills that are in demand in Ghana</li>
        </ul>
      </div>
    </div>
  );
};

export default CareerGoalsStep;