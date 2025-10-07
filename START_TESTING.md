# 🚀 Quick Start - Test Registration Flow

## Option 1: Manual Start (Recommended)

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
**Wait for:** `✓ Server running on port 5000`

### Terminal 2 - Frontend
```bash
npm run dev
```
**Wait for:** `Local: http://localhost:5173`

### Browser
Open: `http://localhost:5173/student-registration`

---

## Option 2: PowerShell Script

Save this as `start-dev.ps1` and run it:

```powershell
# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

# Wait 3 seconds for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

# Wait 3 seconds for frontend to start
Start-Sleep -Seconds 3

# Open browser
Start-Process "http://localhost:5173/student-registration"
```

---

## Test Data

Use this data for quick testing:

### Step 1 - Personal Information
```
First Name: John
Last Name: Doe
Email: john.doe@test.com
Phone: +233 50 123 4567
Password: Test@1234
Confirm Password: Test@1234
Date of Birth: 2000-01-01
Region: Greater Accra Region
City: Accra
```

### Step 2 - Education
```
Education Level: Bachelor's Degree
School Name: University of Ghana
Field of Study: Computer Science
Completion Status: Completed
Graduation Year: 2022
English Level: Fluent
Computer Skills: Advanced
```

### Step 3 - Career Goals
```
Career Field: Technology
Experience Level: Entry Level
Job Types: [Select any]
Learning Preferences: [Select any]
```

### Step 4 - Completion
```
☑ I agree to the terms and conditions
☑ Receive updates (optional)
☑ Interested in mentorship (optional)
```

---

## Expected Behavior

1. **After clicking "Complete Registration":**
   - Loading spinner appears
   - Form submits to backend
   - Success! Redirects to dashboard

2. **Check Browser Console:**
   - No errors
   - Should see successful API response

3. **Check localStorage:**
   ```javascript
   localStorage.getItem('token') // Should have JWT token
   localStorage.getItem('refreshToken') // Should have refresh token
   ```

4. **Check Redux DevTools:**
   - `auth.user` should have user data
   - `auth.token` should have token
   - `auth.isAuthenticated` should be `true`

---

## Quick Verification

### Test Login
1. Logout (if logged in)
2. Go to `/login`
3. Enter:
   - Email: `john.doe@test.com`
   - Password: `Test@1234`
4. Click "Sign In"
5. Should redirect to dashboard

### Test Password Validation
Try these invalid passwords to see validation:
- `test123` → Missing uppercase, special char
- `TEST123` → Missing lowercase, special char
- `Test@12` → Too short (< 8 chars)
- `TestPass` → Missing number, special char

---

## Troubleshooting

### Backend won't start
```bash
cd backend
npm install
npm run dev
```

### Frontend won't start
```bash
npm install
npm run dev
```

### Port already in use
**Backend (5000):**
```bash
# Find process using port 5000
netstat -ano | findstr :5000
# Kill process (replace PID)
taskkill /PID <PID> /F
```

**Frontend (5173):**
```bash
# Find process using port 5173
netstat -ano | findstr :5173
# Kill process (replace PID)
taskkill /PID <PID> /F
```

### MongoDB connection error
Check `backend/.env` has correct `MONGODB_URI`

### Redis connection error
Redis is optional for testing. If you see Redis errors, you can:
1. Install Redis: `choco install redis-64`
2. Start Redis: `redis-server`
3. Or ignore the errors (won't affect registration)

---

## Success Indicators

✅ Backend console shows:
```
✓ MongoDB Connected
✓ Server running on port 5000
✓ Environment: development
```

✅ Frontend console shows:
```
VITE ready in X ms
➜ Local: http://localhost:5173/
```

✅ Registration works:
```
POST /api/auth/register 201 Created
```

✅ User can login:
```
POST /api/auth/login 200 OK
```

---

## 🎉 You're Ready!

Everything is set up and ready to test. Just start both servers and navigate to the registration page!
