# 🔄 Registration Flow - Visual Diagram

## Complete User Registration Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER VISITS REGISTRATION PAGE                 │
│                  http://localhost:5173/student-registration      │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                         STEP 1: PERSONAL INFO                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ • First Name, Last Name                                   │  │
│  │ • Email Address                                           │  │
│  │ • Phone Number (+233 format)                              │  │
│  │ • Password ⭐ NEW                                         │  │
│  │ • Confirm Password ⭐ NEW                                 │  │
│  │ • Date of Birth                                           │  │
│  │ • Region, City                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
│  Validation:                                                      │
│  ✓ Email format                                                  │
│  ✓ Phone format (+233XXXXXXXXX)                                  │
│  ✓ Password: 8+ chars, uppercase, lowercase, number, special    │
│  ✓ Passwords match                                               │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                         STEP 2: EDUCATION                        │
│  • Education Level                                               │
│  • School Name                                                   │
│  • Field of Study                                                │
│  • Completion Status                                             │
│  • English Level                                                 │
│  • Computer Skills                                               │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                       STEP 3: CAREER GOALS                       │
│  • Career Field                                                  │
│  • Experience Level                                              │
│  • Job Types (multiple)                                          │
│  • Learning Preferences (multiple)                               │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                        STEP 4: COMPLETION                        │
│  ☑ Agree to Terms & Conditions (required)                       │
│  ☐ Receive Updates (optional)                                   │
│  ☐ Interested in Mentorship (optional)                          │
│                                                                   │
│              [Complete Registration Button]                      │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND VALIDATION                           │
│  validateCurrentStep() checks all fields                         │
│  Returns true if valid, shows errors if not                      │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PREPARE API REQUEST                           │
│  const payload = {                                               │
│    email: "john.doe@test.com",                                   │
│    password: "Test@1234",                                        │
│    name: "John Doe",                                             │
│    mobileNumber: "+233501234567"                                 │
│  }                                                               │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CALL BACKEND API ⭐ NEW                       │
│  POST http://localhost:5000/api/auth/register                   │
│  Headers: { Content-Type: application/json }                    │
│  Body: payload                                                   │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND PROCESSING                            │
│  1. Validate request data                                        │
│  2. Check if email already exists                                │
│  3. Hash password with bcrypt                                    │
│  4. Create user in MongoDB                                       │
│  5. Generate JWT tokens (access + refresh)                       │
│  6. Return response                                              │
└─────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
          ┌─────────────────┐         ┌─────────────────┐
          │   SUCCESS (201)  │         │   ERROR (400)   │
          └─────────────────┘         └─────────────────┘
                    │                           │
                    │                           ▼
                    │                 ┌─────────────────┐
                    │                 │  Show Error     │
                    │                 │  Message        │
                    │                 └─────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND RESPONSE                              │
│  {                                                               │
│    user: {                                                       │
│      _id: "...",                                                 │
│      email: "john.doe@test.com",                                 │
│      name: "John Doe",                                           │
│      role: "user",                                               │
│      status: "active"                                            │
│    },                                                            │
│    tokens: {                                                     │
│      accessToken: "eyJhbGc...",                                  │
│      refreshToken: "eyJhbGc..."                                  │
│    }                                                             │
│  }                                                               │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    STORE CREDENTIALS ⭐ NEW                      │
│  1. dispatch(setCredentials(result))                            │
│     → Stores user in Redux state                                │
│     → Stores token in Redux state                               │
│     → Sets isAuthenticated = true                               │
│                                                                   │
│  2. localStorage.setItem('token', accessToken)                  │
│     → Persists token for future sessions                        │
│                                                                   │
│  3. localStorage.setItem('refreshToken', refreshToken)          │
│     → Persists refresh token                                    │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REDIRECT TO DASHBOARD                         │
│  navigate('/student-dashboard')                                 │
│                                                                   │
│  User is now:                                                    │
│  ✅ Registered in database                                       │
│  ✅ Authenticated                                                │
│  ✅ Can access protected routes                                  │
│  ✅ Can login again later                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Components Interaction

```
┌──────────────────┐
│  PersonalInfo    │  ← Password fields added here
│  Step Component  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Registration    │  ← Main form logic
│  Index Component │  ← Validation
└────────┬─────────┘  ← API call
         │
         ▼
┌──────────────────┐
│  RTK Query API   │  ← useRegisterMutation hook
│  (api.js)        │  ← Handles HTTP request
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Backend API     │  ← Express.js server
│  /auth/register  │  ← Validation & DB operations
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  MongoDB Atlas   │  ← User data stored here
│  Users Collection│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Response Back   │  ← { user, tokens }
│  to Frontend     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Redux Store     │  ← User & token stored
│  (authSlice)     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  localStorage    │  ← Tokens persisted
│                  │
└──────────────────┘
```

---

## State Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    REDUX STATE (authSlice)                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Initial State:                                              │
│  {                                                           │
│    user: null,                                               │
│    token: null,                                              │
│    isAuthenticated: false                                    │
│  }                                                           │
│                                                              │
│                          ↓                                   │
│                                                              │
│  After Registration (setCredentials action):                 │
│  {                                                           │
│    user: {                                                   │
│      _id: "...",                                             │
│      email: "john.doe@test.com",                             │
│      name: "John Doe",                                       │
│      role: "user"                                            │
│    },                                                        │
│    token: "eyJhbGc...",                                      │
│    isAuthenticated: true                                     │
│  }                                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Password Validation Flow

```
User types password → Real-time validation
                            │
                            ▼
                    ┌───────────────┐
                    │ Check length  │ → Min 8 chars
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Check pattern │ → Uppercase?
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Check pattern │ → Lowercase?
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Check pattern │ → Number?
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Check pattern │ → Special char?
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Compare       │ → Passwords match?
                    └───────┬───────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
         ┌──────────┐           ┌──────────┐
         │  Valid   │           │  Invalid │
         │  ✅      │           │  ❌      │
         └──────────┘           └────┬─────┘
                                     │
                                     ▼
                            ┌────────────────┐
                            │ Show error     │
                            │ message        │
                            └────────────────┘
```

---

## Error Handling Flow

```
API Call
    │
    ├─→ Network Error → Show: "Registration failed. Please try again."
    │
    ├─→ 400 Bad Request → Show: Backend error message
    │   (e.g., "User already exists")
    │
    ├─→ 500 Server Error → Show: "Server error. Please try again later."
    │
    └─→ 201 Success → Continue to store credentials
```

---

## Token Storage Strategy

```
Backend Returns Tokens
         │
         ▼
┌────────────────────┐
│  Access Token      │ → Short-lived (7 days)
│  eyJhbGc...        │ → Used for API requests
└────────┬───────────┘
         │
         ├─→ localStorage.setItem('token', accessToken)
         │
         └─→ Redux: state.auth.token = accessToken
         
┌────────────────────┐
│  Refresh Token     │ → Long-lived (30 days)
│  eyJhbGc...        │ → Used to get new access token
└────────┬───────────┘
         │
         └─→ localStorage.setItem('refreshToken', refreshToken)
```

---

## 🎯 Summary

**Before:** Mock registration → No data saved  
**After:** Real registration → Data in MongoDB → User authenticated → Can login

**Key Changes:**
1. ⭐ Added password fields
2. ⭐ Connected to backend API
3. ⭐ Store tokens in localStorage
4. ⭐ Store user in Redux
5. ⭐ Full authentication flow

**Result:** Complete, functional registration system! 🎉
