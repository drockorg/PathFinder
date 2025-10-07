# 🔐 PathFinders - Complete Signup & Login Flow Explanation

## 📊 Current Status

### ✅ What's Working (Backend)
- **Backend API** is ready at `http://localhost:5000/api/auth`
- **Registration endpoint**: `POST /api/auth/register`
- **Login endpoint**: `POST /api/auth/login`
- **JWT authentication** with access & refresh tokens
- **Password validation** (8+ chars, uppercase, lowercase, number, special char)
- **Phone validation** (Ghana format: +233XXXXXXXXX)

### ❌ What's NOT Connected (Frontend)
- **Student Registration page** (`/student-registration`) is NOT calling the backend
- It's just a **mock UI** that collects data but doesn't save it
- **Login page** (`/login`) HAS the API call but expects different response format

---

## 🔄 How It Currently Works (BROKEN FLOW)

### 1. User Goes to `/student-registration`
```
User fills 4-step form:
├── Step 1: Personal Info (name, email, phone, location)
├── Step 2: Education (school, field, completion status)
├── Step 3: Career Goals (field, experience, job types)
└── Step 4: Terms & Conditions

On Submit:
❌ Simulates API call with setTimeout (2 seconds)
❌ Logs data to console
❌ Navigates to /student-dashboard
❌ NO DATA IS SAVED TO DATABASE!
```

### 2. User Goes to `/login`
```
User enters email & password

On Submit:
✅ Calls: POST /api/auth/login
✅ Expects response: { user, tokens: { accessToken, refreshToken } }
❌ But backend returns: { user, tokens: { accessToken, refreshToken } }
✅ Stores token in localStorage
✅ Redirects to /student-dashboard
```

---

## 🛠️ What Needs to Be Fixed

### Issue 1: Registration Page Not Connected
**File**: `src/pages/student-registration/index.jsx`

**Current Code (Line 152-172):**
```javascript
const handleSubmit = async () => {
  if (!validateCurrentStep()) return;
  
  setIsSubmitting(true);
  
  try {
    // ❌ Simulate API call - NOT REAL!
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // ❌ Mock successful registration
    console.log('Registration data:', formData);
    
    // Navigate to student dashboard
    navigate('/student-dashboard');
  } catch (error) {
    console.error('Registration failed:', error);
    setErrors({ submit: 'Registration failed. Please try again.' });
  } finally {
    setIsSubmitting(false);
  }
};
```

**What It SHOULD Do:**
```javascript
const handleSubmit = async () => {
  if (!validateCurrentStep()) return;
  
  setIsSubmitting(true);
  
  try {
    // ✅ Call REAL backend API
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: 'TempPassword@123', // Need to add password field!
        name: `${formData.firstName} ${formData.lastName}`,
        mobileNumber: formData.phone
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    
    // ✅ Store tokens and user data
    localStorage.setItem('token', data.tokens.accessToken);
    
    // Navigate to student dashboard
    navigate('/student-dashboard');
  } catch (error) {
    console.error('Registration failed:', error);
    setErrors({ submit: error.message || 'Registration failed. Please try again.' });
  } finally {
    setIsSubmitting(false);
  }
};
```

### Issue 2: Missing Password Field in Registration
The registration form collects:
- ✅ firstName, lastName
- ✅ email
- ✅ phone
- ✅ dateOfBirth, region, city
- ✅ education details
- ✅ career goals
- ❌ **NO PASSWORD FIELD!**

**Backend requires:**
```javascript
{
  email: "user@example.com",
  password: "Test@1234",  // ❌ MISSING!
  name: "John Doe",
  mobileNumber: "+233501234567"
}
```

### Issue 3: Login Response Format Mismatch
**Frontend expects (Line 77-78 in LoginForm.jsx):**
```javascript
const result = await login(formData).unwrap();
dispatch(setCredentials(result)); // Expects { user, token }
```

**Backend returns:**
```javascript
{
  user: { ...userProfile },
  tokens: {
    accessToken: "...",
    refreshToken: "..."
  }
}
```

**authSlice expects (Line 15):**
```javascript
setCredentials: (state, { payload: { user, token } }) => {
  state.user = user;
  state.token = token; // ❌ But backend sends tokens.accessToken
  // ...
}
```

---

## ✅ Complete Fix Implementation

### Step 1: Add Register Mutation to API
**File**: `src/store/services/api.js`

Add after line 52:
```javascript
register: builder.mutation({
  query: (userData) => ({
    url: '/auth/register',
    method: 'POST',
    body: userData,
  }),
}),
```

Export it (line 63):
```javascript
export const {
  // ... existing exports
  useLoginMutation,
  useRegisterMutation, // ✅ Add this
} = api;
```

### Step 2: Fix authSlice to Handle Backend Response
**File**: `src/store/slices/authSlice.js`

Update setCredentials (line 15):
```javascript
setCredentials: (state, { payload }) => {
  // Handle both formats: { user, token } OR { user, tokens: { accessToken } }
  const token = payload.token || payload.tokens?.accessToken;
  const user = payload.user;
  
  state.user = user;
  state.token = token;
  state.isAuthenticated = true;
  localStorage.setItem('token', token);
  
  // Also store refresh token if available
  if (payload.tokens?.refreshToken) {
    localStorage.setItem('refreshToken', payload.tokens.refreshToken);
  }
},
```

### Step 3: Add Password Field to Registration
**File**: `src/pages/student-registration/components/PersonalInfoStep.jsx`

Add password and confirmPassword fields to the form.

### Step 4: Connect Registration to Backend
**File**: `src/pages/student-registration/index.jsx`

```javascript
import { useRegisterMutation } from '../../store/services/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';

// Inside component:
const dispatch = useDispatch();
const [register, { isLoading: isRegistering }] = useRegisterMutation();

// Add password to formData state (line 20):
const [formData, setFormData] = useState({
  // ... existing fields
  password: '',
  confirmPassword: '',
});

// Update handleSubmit (line 152):
const handleSubmit = async () => {
  if (!validateCurrentStep()) return;
  
  setIsSubmitting(true);
  
  try {
    const result = await register({
      email: formData.email,
      password: formData.password,
      name: `${formData.firstName} ${formData.lastName}`,
      mobileNumber: formData.phone,
    }).unwrap();
    
    // Store credentials
    dispatch(setCredentials(result));
    
    // Navigate to student dashboard
    navigate('/student-dashboard');
  } catch (error) {
    console.error('Registration failed:', error);
    setErrors({ 
      submit: error.data?.message || 'Registration failed. Please try again.' 
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## 🎯 Correct Flow After Fix

### Registration Flow:
```
1. User visits /student-registration
2. Fills 4-step form (including password)
3. Clicks "Complete Registration"
4. ✅ Frontend calls: POST /api/auth/register
5. ✅ Backend validates data
6. ✅ Backend creates user in MongoDB
7. ✅ Backend returns: { user, tokens: { accessToken, refreshToken } }
8. ✅ Frontend stores token in localStorage
9. ✅ Frontend stores user in Redux
10. ✅ Redirects to /student-dashboard
```

### Login Flow:
```
1. User visits /login
2. Enters email & password
3. Clicks "Sign In"
4. ✅ Frontend calls: POST /api/auth/login
5. ✅ Backend validates credentials
6. ✅ Backend returns: { user, tokens: { accessToken, refreshToken } }
7. ✅ Frontend stores token in localStorage
8. ✅ Frontend stores user in Redux
9. ✅ Redirects to /student-dashboard
```

---

## 🔒 Backend Validation Rules

### Email
- Must be valid email format
- Converted to lowercase
- Must be unique

### Password
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (!@#$%^&*)

### Phone Number
- Must match Ghana format: `+233XXXXXXXXX`
- Example: `+233501234567`

### Name
- Required
- 2-50 characters
- Trimmed of whitespace

---

## 🧪 Testing the Complete Flow

### 1. Start Backend
```bash
cd backend
npm run dev
```

### 2. Start Frontend
```bash
cd ..
npm start
```

### 3. Test Registration
1. Go to `http://localhost:5173/student-registration`
2. Fill all 4 steps with valid data
3. Use password: `Test@1234`
4. Use phone: `+233501234567`
5. Submit and check:
   - ✅ User created in MongoDB
   - ✅ Token stored in localStorage
   - ✅ Redirected to dashboard

### 4. Test Login
1. Go to `http://localhost:5173/login`
2. Enter registered email & password
3. Submit and check:
   - ✅ Token stored in localStorage
   - ✅ User data in Redux
   - ✅ Redirected to dashboard

---

## 📝 Summary

**Current Problem:**
- Registration page is just a UI mockup
- No data is saved to database
- Users can't actually sign up

**Solution:**
1. ✅ Add password field to registration form
2. ✅ Create register mutation in RTK Query
3. ✅ Fix authSlice to handle backend response format
4. ✅ Connect registration form to backend API
5. ✅ Store tokens and redirect on success

**Result:**
- Users can register with email/password
- Data is saved to MongoDB
- Users can login with credentials
- Full authentication flow works end-to-end
