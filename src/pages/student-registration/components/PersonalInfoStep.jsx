import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoStep = ({ formData, setFormData, errors }) => {
  const ghanaRegions = [
    { value: 'greater-accra', label: 'Greater Accra Region' },
    { value: 'ashanti', label: 'Ashanti Region' },
    { value: 'western', label: 'Western Region' },
    { value: 'central', label: 'Central Region' },
    { value: 'eastern', label: 'Eastern Region' },
    { value: 'volta', label: 'Volta Region' },
    { value: 'northern', label: 'Northern Region' },
    { value: 'upper-east', label: 'Upper East Region' },
    { value: 'upper-west', label: 'Upper West Region' },
    { value: 'brong-ahafo', label: 'Brong-Ahafo Region' }
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
        <h2 className="text-2xl font-semibold text-foreground mb-2">Personal Information</h2>
        <p className="text-muted-foreground">Tell us about yourself to get started</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData?.firstName}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
        />

        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData?.lastName}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        placeholder="your.email@example.com"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        description="We'll use this to send you important updates"
        required
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+233 XX XXX XXXX"
        value={formData?.phone}
        onChange={(e) => handleInputChange('phone', e?.target?.value)}
        error={errors?.phone}
        description="Ghana mobile number format"
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Date of Birth"
          type="date"
          value={formData?.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          error={errors?.dateOfBirth}
          required
        />

        <Select
          label="Region"
          placeholder="Select your region"
          options={ghanaRegions}
          value={formData?.region}
          onChange={(value) => handleInputChange('region', value)}
          error={errors?.region}
          required
        />
      </div>
      <Input
        label="City/Town"
        type="text"
        placeholder="Enter your city or town"
        value={formData?.city}
        onChange={(e) => handleInputChange('city', e?.target?.value)}
        error={errors?.city}
        required
      />
    </div>
  );
};

export default PersonalInfoStep;