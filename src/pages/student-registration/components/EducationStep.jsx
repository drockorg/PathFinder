import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EducationStep = ({ formData, setFormData, errors }) => {
  const educationLevels = [
    { value: 'jhs', label: 'Junior High School (JHS)' },
    { value: 'shs', label: 'Senior High School (SHS)' },
    { value: 'technical', label: 'Technical/Vocational School' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'degree', label: 'Bachelor\'s Degree' },
    { value: 'masters', label: 'Master\'s Degree' },
    { value: 'other', label: 'Other' }
  ];

  const studyFields = [
    { value: 'science', label: 'Science' },
    { value: 'arts', label: 'Arts' },
    { value: 'business', label: 'Business' },
    { value: 'technical', label: 'Technical/Vocational' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medicine', label: 'Medicine/Health Sciences' },
    { value: 'education', label: 'Education' },
    { value: 'law', label: 'Law' },
    { value: 'other', label: 'Other' }
  ];

  const completionStatus = [
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'Currently Studying' },
    { value: 'dropped-out', label: 'Did not complete' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Educational Background</h2>
        <p className="text-muted-foreground">Help us understand your educational journey</p>
      </div>
      <Select
        label="Highest Level of Education"
        placeholder="Select your education level"
        options={educationLevels}
        value={formData?.educationLevel}
        onChange={(value) => handleInputChange('educationLevel', value)}
        error={errors?.educationLevel}
        required
      />
      <Input
        label="School/Institution Name"
        type="text"
        placeholder="Enter your school or institution name"
        value={formData?.schoolName}
        onChange={(e) => handleInputChange('schoolName', e?.target?.value)}
        error={errors?.schoolName}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Field of Study"
          placeholder="Select your field"
          options={studyFields}
          value={formData?.fieldOfStudy}
          onChange={(value) => handleInputChange('fieldOfStudy', value)}
          error={errors?.fieldOfStudy}
          required
        />

        <Select
          label="Completion Status"
          placeholder="Select status"
          options={completionStatus}
          value={formData?.completionStatus}
          onChange={(value) => handleInputChange('completionStatus', value)}
          error={errors?.completionStatus}
          required
        />
      </div>
      {formData?.completionStatus === 'completed' && (
        <Input
          label="Year of Completion"
          type="number"
          placeholder="2024"
          min="1990"
          max="2024"
          value={formData?.graduationYear}
          onChange={(e) => handleInputChange('graduationYear', e?.target?.value)}
          error={errors?.graduationYear}
        />
      )}
      <Input
        label="Additional Qualifications"
        type="text"
        placeholder="Certificates, courses, or other qualifications (optional)"
        value={formData?.additionalQualifications}
        onChange={(e) => handleInputChange('additionalQualifications', e?.target?.value)}
        description="List any additional certificates or training you have"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="English Proficiency"
          type="text"
          placeholder="e.g., Fluent, Intermediate, Basic"
          value={formData?.englishLevel}
          onChange={(e) => handleInputChange('englishLevel', e?.target?.value)}
          error={errors?.englishLevel}
          required
        />

        <Input
          label="Computer Skills Level"
          type="text"
          placeholder="e.g., Advanced, Intermediate, Basic"
          value={formData?.computerSkills}
          onChange={(e) => handleInputChange('computerSkills', e?.target?.value)}
          error={errors?.computerSkills}
          required
        />
      </div>
    </div>
  );
};

export default EducationStep;