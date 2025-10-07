import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../../store/services/api';
import { setCredentials, selectIsAuthenticated, selectAuthError } from '../../../store/slices/authSlice';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authError = useSelector(selectAuthError);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  // Mock credentials for authentication
  const mockCredentials = {
    student: { email: 'student@pathfinders.gh', password: 'student123' },
    employer: { email: 'employer@pathfinders.gh', password: 'employer123' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // Only send email and password (backend doesn't need rememberMe)
      const result = await login({
        email: formData.email,
        password: formData.password
      }).unwrap();
      
      console.log('Login successful:', result);
      
      dispatch(setCredentials(result));
      console.log('Credentials dispatched');
      
      // Redirect immediately after successful login
      const from = location.state?.from?.pathname || '/student-dashboard';
      console.log('Navigating to:', from);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setErrors({
        general: err.data?.message || 'Login failed. Please try again.'
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
            <Icon name="Compass" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors?.general && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
                <p className="text-sm text-error">{errors?.general}</p>
              </div>
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            className="mb-4"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            className="mb-4"
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
            />
            
            <Button
              variant="link"
              size="sm"
              onClick={() => navigate('/forgot-password')}
              className="text-primary hover:text-primary/80 p-0 h-auto"
            >
              Forgot password?
            </Button>          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            loading={isLoading}
            fullWidth
            className="mt-6"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            iconName="Mail"
            iconPosition="left"
            onClick={() => {/* Handle Google login */}}
          >
            Continue with Google
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            fullWidth
            iconName="Facebook"
            iconPosition="left"
            onClick={() => {/* Handle Facebook login */}}
          >
            Continue with Facebook
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-8 pt-6 border-t border-border">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <Button
              variant="link"
              onClick={() => navigate('/student-registration')}
              className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
            >
              Sign up now
            </Button>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Join thousands of Ghanaian youth building their future
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;