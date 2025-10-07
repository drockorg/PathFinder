import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { useUpdatePreferencesMutation } from '../../../store/services/api';
import { toast } from 'react-hot-toast';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../contexts/LanguageContext';

const SettingsPreferences = ({ data = {}, onUpdate }) => {
  const [updatePreferences, { isLoading: isUpdating }] = useUpdatePreferencesMutation();
  const { theme, changeTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  
  const [preferences, setPreferences] = useState({
    language: data.language || language || 'english',
    theme: data.theme || theme || 'system',
    notifications: {
      email: data.notifications?.email ?? true,
      push: data.notifications?.push ?? true,
      sms: data.notifications?.sms ?? false
    }
  });

  // Sync with context on mount
  useEffect(() => {
    setPreferences(prev => ({
      ...prev,
      language: language,
      theme: theme
    }));
  }, [language, theme]);

  const handleSave = async () => {
    try {
      await updatePreferences(preferences).unwrap();
      toast.success('Settings updated successfully!');
    } catch (error) {
      toast.error('Error updating settings: ' + (error.data?.message || error.message));
    }
  };

  const handleNotificationChange = (type, value) => {
    setPreferences({
      ...preferences,
      notifications: {
        ...preferences.notifications,
        [type]: value
      }
    });
    
    // Show immediate feedback
    const notificationTypes = {
      email: 'Email',
      push: 'Push',
      sms: 'SMS'
    };
    
    if (value) {
      toast.success(`${notificationTypes[type]} notifications enabled`);
    } else {
      toast(`${notificationTypes[type]} notifications disabled`, {
        icon: '🔕',
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings & Preferences</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Customize your account settings and preferences
        </p>
      </div>

      {/* Language Settings */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon name="Globe" size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Language</h3>
            <p className="text-sm text-muted-foreground">Choose your preferred language</p>
          </div>
        </div>
        
        <Select
          label="Interface Language"
          value={preferences.language}
          onChange={(value) => {
            setPreferences({ ...preferences, language: value });
            changeLanguage(value); // Apply immediately
            toast.success(`Language changed to ${value.charAt(0).toUpperCase() + value.slice(1)}`);
          }}
          options={[
            { value: 'english', label: 'English' },
            { value: 'twi', label: 'Twi' },
            { value: 'ga', label: 'Ga' },
            { value: 'ewe', label: 'Ewe' }
          ]}
        />
      </div>

      {/* Theme Settings */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Icon name="Palette" size={20} className="text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Appearance</h3>
            <p className="text-sm text-muted-foreground">Customize how PathFinders looks</p>
          </div>
        </div>
        
        <Select
          label="Theme"
          value={preferences.theme}
          onChange={(value) => {
            setPreferences({ ...preferences, theme: value });
            changeTheme(value); // Apply immediately
            toast.success(`Theme changed to ${value.charAt(0).toUpperCase() + value.slice(1)}`);
          }}
          options={[
            { value: 'light', label: '☀️ Light' },
            { value: 'dark', label: '🌙 Dark' },
            { value: 'system', label: '💻 System Default' }
          ]}
        />
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Notifications</h3>
            <p className="text-sm text-muted-foreground">Manage how you receive updates</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.notifications.email}
                onChange={(e) => handleNotificationChange('email', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Bell" size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive browser notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.notifications.push}
                onChange={(e) => handleNotificationChange('push', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* SMS Notifications */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="MessageSquare" size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates via SMS</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.notifications.sms}
                onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} loading={isUpdating} className="px-8">
          <Icon name="Save" size={16} className="mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPreferences;
