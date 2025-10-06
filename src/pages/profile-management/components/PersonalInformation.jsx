import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInformation = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  // Ghana regions for location selection
  const ghanaRegions = [
    'Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Central', 
    'Northern', 'Upper East', 'Upper West', 'Volta', 'Brong-Ahafo',
    'Western North', 'Ahafo', 'Bono', 'Bono East', 'Oti', 'North East', 'Savannah'
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate?.(updatedData);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Additional save logic could be added here
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Personal Information</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your basic information and contact details
          </p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
          className="flex items-center"
        >
          <Icon name={isEditing ? "X" : "Edit"} size={16} className="mr-2" />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>
      {/* Profile Picture Section */}
      <div className="bg-muted/30 rounded-xl p-6">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center overflow-hidden">
              {formData?.profilePicture ? (
                <img 
                  src={formData?.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-4xl font-bold text-white">
                  {formData?.firstName?.charAt(0) || 'U'}{formData?.lastName?.charAt(0) || ''}
                </span>
              )}
            </div>
            {isEditing && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute bottom-2 right-2 w-10 h-10 bg-white border-2 border-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-lg"
              >
                <Icon name="Camera" size={18} />
              </motion.button>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">Profile Picture</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A professional photo helps employers recognize you and makes your profile more trustworthy.
            </p>
            {isEditing && (
              <div className="flex space-x-3">
                <Button size="sm" variant="outline">
                  <Icon name="Upload" size={14} className="mr-2" />
                  Upload Photo
                </Button>
                <Button size="sm" variant="ghost">
                  <Icon name="Trash2" size={14} className="mr-2" />
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Personal Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          {isEditing ? (
            <Input
              value={formData?.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e?.target?.value)}
              placeholder="Enter your first name"
              required
            />
          ) : (
            <div className="p-3 bg-muted/30 rounded-lg text-foreground">
              {formData?.firstName || 'Not provided'}
            </div>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          {isEditing ? (
            <Input
              value={formData?.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e?.target?.value)}
              placeholder="Enter your last name"
              required
            />
          ) : (
            <div className="p-3 bg-muted/30 rounded-lg text-foreground">
              {formData?.lastName || 'Not provided'}
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          {isEditing ? (
            <Input
              type="email"
              value={formData?.email || ''}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              placeholder="Enter your email address"
              required
            />
          ) : (
            <div className="p-3 bg-muted/30 rounded-lg text-foreground flex items-center justify-between">
              <span>{formData?.email || 'Not provided'}</span>
              <Icon name="Mail" size={16} className="text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Phone Number
          </label>
          {isEditing ? (
            <Input
              type="tel"
              value={formData?.phone || ''}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              placeholder="+233 XX XXX XXXX"
            />
          ) : (
            <div className="p-3 bg-muted/30 rounded-lg text-foreground flex items-center justify-between">
              <span>{formData?.phone || 'Not provided'}</span>
              <Icon name="Phone" size={16} className="text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Date of Birth
          </label>
          {isEditing ? (
            <Input
              type="date"
              value={formData?.dateOfBirth || ''}
              onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
            />
          ) : (
            <div className="p-3 bg-muted/30 rounded-lg text-foreground">
              {formData?.dateOfBirth ? new Date(formData?.dateOfBirth)?.toLocaleDateString() : 'Not provided'}
            </div>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Gender
          </label>
          {isEditing ? (
            <Select
              value={formData?.gender || ''}
              onChange={(value) => handleInputChange('gender', value)}
              options={[
                { value: '', label: 'Select gender' },
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
                { value: 'prefer-not-to-say', label: 'Prefer not to say' }
              ]}
            />
          ) : (
            <div className="p-3 bg-muted/30 rounded-lg text-foreground capitalize">
              {formData?.gender?.replace('-', ' ') || 'Not provided'}
            </div>
          )}
        </div>

        {/* Region */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Region
          </label>
          {isEditing ? (
            <Select
              value={formData?.region || ''}
              onChange={(value) => handleInputChange('region', value)}
              options={[
                { value: '', label: 'Select region' },
                ...ghanaRegions?.map(region => ({ value: region, label: region }))
              ]}
            />
          ) : (
            <div className="p-3 bg-muted/30 rounded-lg text-foreground">
              {formData?.region || 'Not provided'}
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            City/Location
          </label>
          {isEditing ? (
            <Input
              value={formData?.location || ''}
              onChange={(e) => handleInputChange('location', e?.target?.value)}
              placeholder="e.g., Accra, Kumasi, Tamale"
            />
          ) : (
            <div className="p-3 bg-muted/30 rounded-lg text-foreground flex items-center justify-between">
              <span>{formData?.location || 'Not provided'}</span>
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
      {/* Bio Section */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Professional Bio
        </label>
        <p className="text-sm text-muted-foreground mb-3">
          Write a brief description about yourself, your career goals, and what makes you unique.
        </p>
        {isEditing ? (
          <textarea
            value={formData?.bio || ''}
            onChange={(e) => handleInputChange('bio', e?.target?.value)}
            placeholder="Tell employers about your professional background, skills, and career aspirations..."
            rows={4}
            className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        ) : (
          <div className="p-4 bg-muted/30 rounded-lg text-foreground min-h-[100px] leading-relaxed">
            {formData?.bio || 'No bio provided yet. Add a professional bio to help employers understand your background and goals.'}
          </div>
        )}
      </div>
      {/* Social Links */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Professional Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Icon name="Linkedin" size={16} className="inline mr-2" />
              LinkedIn Profile
            </label>
            {isEditing ? (
              <Input
                value={formData?.linkedin || ''}
                onChange={(e) => handleInputChange('linkedin', e?.target?.value)}
                placeholder="linkedin.com/in/your-profile"
              />
            ) : (
              <div className="p-3 bg-muted/30 rounded-lg text-foreground">
                {formData?.linkedin ? (
                  <a href={`https://${formData?.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {formData?.linkedin}
                  </a>
                ) : (
                  'Not provided'
                )}
              </div>
            )}
          </div>

          {/* GitHub */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Icon name="Github" size={16} className="inline mr-2" />
              GitHub Profile
            </label>
            {isEditing ? (
              <Input
                value={formData?.github || ''}
                onChange={(e) => handleInputChange('github', e?.target?.value)}
                placeholder="github.com/your-username"
              />
            ) : (
              <div className="p-3 bg-muted/30 rounded-lg text-foreground">
                {formData?.github ? (
                  <a href={`https://${formData?.github}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {formData?.github}
                  </a>
                ) : (
                  'Not provided'
                )}
              </div>
            )}
          </div>

          {/* Portfolio */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Icon name="Globe" size={16} className="inline mr-2" />
              Portfolio Website
            </label>
            {isEditing ? (
              <Input
                value={formData?.portfolio || ''}
                onChange={(e) => handleInputChange('portfolio', e?.target?.value)}
                placeholder="your-portfolio.com"
              />
            ) : (
              <div className="p-3 bg-muted/30 rounded-lg text-foreground">
                {formData?.portfolio ? (
                  <a href={`https://${formData?.portfolio}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {formData?.portfolio}
                  </a>
                ) : (
                  'Not provided'
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Save Button */}
      {isEditing && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end space-x-4 pt-6 border-t border-border"
        >
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Icon name="Save" size={16} className="mr-2" />
            Save Changes
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default PersonalInformation;