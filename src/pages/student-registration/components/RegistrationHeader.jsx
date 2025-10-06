import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg">
          <Icon name="Compass" size={32} color="white" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Join Pathfinders
      </h1>
      <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
        Start your journey to connect education with employment opportunities in Ghana
      </p>
      
      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <span>Already have an account?</span>
        <Button
          variant="link"
          size="sm"
          onClick={() => navigate('/login')}
          className="p-0 h-auto text-primary hover:text-primary/80"
        >
          Sign in here
        </Button>
      </div>
    </div>
  );
};

export default RegistrationHeader;