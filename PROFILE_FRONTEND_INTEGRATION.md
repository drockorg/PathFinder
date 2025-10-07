# 🎨 Profile Frontend Integration Guide

## ✅ What's Been Done

### 1. API Integration Complete
Added all profile endpoints to RTK Query (`src/store/services/api.js`):

```javascript
// Available hooks:
useGetProfileQuery()              // Get user profile
useUpdateProfileMutation()        // Update profile
useUpdatePreferencesMutation()    // Update preferences
useUploadAvatarMutation()         // Upload avatar
useDeleteAvatarMutation()         // Delete avatar
useAddEducationMutation()         // Add education
useUpdateEducationMutation()      // Update education
useDeleteEducationMutation()      // Delete education
useAddExperienceMutation()        // Add experience
useUpdateExperienceMutation()     // Update experience
useDeleteExperienceMutation()     // Delete experience
useAddSkillMutation()             // Add skill
useUpdateSkillMutation()          // Update skill
useDeleteSkillMutation()          // Delete skill
```

### 2. Profile Page Exists
The profile page already exists at:
- `src/pages/profile-management/index.jsx`
- Has all UI components built
- Currently using mock data

---

## 🔄 Integration Steps Needed

### Step 1: Update Profile Page to Use Real API

**File:** `src/pages/profile-management/index.jsx`

Replace mock data loading with:

```javascript
import { useGetProfileQuery, useUpdateProfileMutation } from '../../store/services/api';

const ProfileManagement = () => {
  const { data: profile, isLoading, error } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  
  // Use profile data from API
  useEffect(() => {
    if (profile) {
      setProfileData(transformProfileData(profile));
    }
  }, [profile]);
  
  const handleSaveChanges = async (section, data) => {
    try {
      await updateProfile(data).unwrap();
      // Show success message
    } catch (err) {
      // Show error message
    }
  };
};
```

### Step 2: Update PersonalInformation Component

**File:** `src/pages/profile-management/components/PersonalInformation.jsx`

Add avatar upload:

```javascript
import { useUploadAvatarMutation } from '../../../store/services/api';

const PersonalInformation = ({ data, onUpdate }) => {
  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();
  
  const handleAvatarUpload = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    try {
      const result = await uploadAvatar(formData).unwrap();
      // Update UI with new avatar URL
    } catch (err) {
      // Show error
    }
  };
};
```

### Step 3: Update EducationBackground Component

**File:** `src/pages/profile-management/components/EducationBackground.jsx`

```javascript
import { 
  useAddEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation 
} from '../../../store/services/api';

const EducationBackground = ({ data }) => {
  const [addEducation] = useAddEducationMutation();
  const [updateEducation] = useUpdateEducationMutation();
  const [deleteEducation] = useDeleteEducationMutation();
  
  const handleAdd = async (educationData) => {
    await addEducation(educationData).unwrap();
  };
  
  const handleUpdate = async (id, educationData) => {
    await updateEducation({ educationId: id, ...educationData }).unwrap();
  };
  
  const handleDelete = async (id) => {
    await deleteEducation(id).unwrap();
  };
};
```

### Step 4: Update SkillsInventory Component

**File:** `src/pages/profile-management/components/SkillsInventory.jsx`

```javascript
import { 
  useAddSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation 
} from '../../../store/services/api';

const SkillsInventory = ({ data }) => {
  const [addSkill] = useAddSkillMutation();
  const [updateSkill] = useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();
  
  const handleAddSkill = async (skillData) => {
    await addSkill(skillData).unwrap();
  };
};
```

---

## 🎯 Quick Integration Example

Here's a complete example for the profile page:

```javascript
import React, { useState, useEffect } from 'react';
import { 
  useGetProfileQuery, 
  useUpdateProfileMutation,
  useUploadAvatarMutation 
} from '../../store/services/api';

const ProfileManagement = () => {
  const { data: profile, isLoading, error, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadAvatar] = useUploadAvatarMutation();
  
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        bio: profile.bio,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        location: profile.location,
        socialLinks: profile.socialLinks
      });
    }
  }, [profile]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData).unwrap();
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Error updating profile: ' + err.message);
    }
  };
  
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('avatar', file);
    
    try {
      const result = await uploadAvatar(formData).unwrap();
      alert('Avatar uploaded!');
      refetch(); // Refresh profile data
    } catch (err) {
      alert('Error uploading avatar: ' + err.message);
    }
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  
  return (
    <div>
      <h1>Profile Management</h1>
      
      {/* Avatar Upload */}
      <div>
        <img src={profile.profilePicture || '/default-avatar.png'} alt="Avatar" />
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
      </div>
      
      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        <input 
          value={formData.name || ''} 
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Name"
        />
        <textarea 
          value={formData.bio || ''} 
          onChange={(e) => setFormData({...formData, bio: e.target.value})}
          placeholder="Bio"
        />
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};
```

---

## 🧪 Testing the Integration

### 1. Start Backend
```bash
cd backend
pnpm dev
```

### 2. Start Frontend
```bash
npm run dev
```

### 3. Test Profile Page
1. Login to the app
2. Navigate to `/profile-management`
3. Try updating your profile
4. Try uploading an avatar
5. Check if changes persist after refresh

---

## 📊 Data Transformation

The backend returns data in this format:

```javascript
{
  _id: "...",
  email: "user@example.com",
  name: "John Doe",
  profilePicture: "/uploads/avatars/avatar-123.jpg",
  bio: "Software developer",
  dateOfBirth: "1995-01-15",
  gender: "male",
  location: {
    city: "Accra",
    region: "Greater Accra",
    country: "Ghana"
  },
  socialLinks: {
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    portfolio: "https://johndoe.dev"
  },
  education: [...],
  experience: [...],
  skills: [...],
  preferences: {
    language: "english",
    notifications: {...},
    theme: "system"
  }
}
```

You may need to transform this to match your UI components' expected format.

---

## ✅ Next Steps

1. **Update profile page** to use `useGetProfileQuery()`
2. **Add avatar upload** functionality
3. **Connect education/experience** CRUD operations
4. **Connect skills** management
5. **Test everything** works end-to-end

---

## 🎉 Summary

**Backend:** ✅ 100% Complete  
**Frontend API Integration:** ✅ 100% Complete  
**Frontend UI Updates:** ⏳ Pending

The API hooks are ready to use. Just replace the mock data in the existing UI components with the real API calls!

**Ready to integrate!** 🚀
