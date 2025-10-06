import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const CompletionStep = ({ formData, setFormData, errors }) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-4 mx-auto">
          <Icon name="CheckCircle" size={40} className="text-success" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Almost Done!</h2>
        <p className="text-muted-foreground">Review and complete your registration</p>
      </div>
      {/* Registration Summary */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-foreground mb-4">Registration Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Name:</span>
            <p className="font-medium">{formData?.firstName} {formData?.lastName}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Email:</span>
            <p className="font-medium">{formData?.email}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Location:</span>
            <p className="font-medium">{formData?.city}, {formData?.region}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Education:</span>
            <p className="font-medium">{formData?.educationLevel}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Career Field:</span>
            <p className="font-medium">{formData?.careerField}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Experience:</span>
            <p className="font-medium">{formData?.experienceLevel}</p>
          </div>
        </div>
      </div>
      {/* Trust Signals */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-primary" />
          Ghana-Certified Platform
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>Data Protection Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>Local Employer Network</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>Ghana Education Standards</span>
          </div>
        </div>
      </div>
      {/* Testimonial */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <Icon name="Quote" size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-foreground italic mb-2">
              "Pathfinders helped me transition from university to my dream job in tech. 
              The personalized learning paths made all the difference!"
            </p>
            <p className="text-sm text-muted-foreground">
              - Akosua M., Software Developer, Accra
            </p>
          </div>
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          description="By checking this, you agree to our Ghana-specific data handling practices"
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="I want to receive updates about job opportunities and learning resources"
          description="Get notified about relevant opportunities in Ghana (you can unsubscribe anytime)"
          checked={formData?.receiveUpdates}
          onChange={(e) => handleInputChange('receiveUpdates', e?.target?.checked)}
        />

        <Checkbox
          label="I'm interested in mentorship opportunities"
          description="Connect with experienced professionals in your field"
          checked={formData?.interestedInMentorship}
          onChange={(e) => handleInputChange('interestedInMentorship', e?.target?.checked)}
        />
      </div>
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-warning mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Next Steps</p>
            <p className="text-muted-foreground">
              After registration, you'll receive a welcome email with your personalized 
              learning path recommendations and access to our job matching system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionStep;