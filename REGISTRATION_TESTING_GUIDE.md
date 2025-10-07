# Registration Flow Testing Guide

## ✅ Changes Completed

### 1. **Password Fields Added**
- Added password and confirm password fields to Step 1 (Personal Information)
- Password validation includes:
  - Minimum 8 characters
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number
  - At least 1 special character (!@#$%^&*)
  - Passwords must match

### 2. **Backend Integration**
- Connected registration form to backend API
- Uses `useRegisterMutation` from RTK Query
- Stores user credentials in Redux and localStorage
- Redirects to dashboard on success
- Shows error messages on failure

### 3. **API Configuration**
- Updated `.env` to use correct API URL: `http://localhost:5000/api`

---

## 🧪 Testing Steps

### Prerequisites
1. **Backend must be running**
   ```bash
   cd backend
   npm run dev
   ```
   Server should be at: `http://localhost:5000`

2. **Frontend must be running**
   ```bash
   npm run dev
   ```
   App should be at: `http://localhost:5173`

---

### Test Case 1: Successful Registration

1. Navigate to `http://localhost:5173/student-registration`

2. **Step 1 - Personal Information:**
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john.doe@example.com`
   - Phone: `+233 50 123 4567`
   - Password: `Test@1234`
   - Confirm Password: `Test@1234`
   - Date of Birth: `2000-01-01`
   - Region: `Greater Accra Region`
   - City: `Accra`
   - Click **Next**

3. **Step 2 - Education:**
   - Fill in education details
   - Click **Next**

4. **Step 3 - Career Goals:**
   - Fill in career preferences
   - Click **Next**

5. **Step 4 - Completion:**
   - Check "I agree to the terms and conditions"
   - Click **Complete Registration**

**Expected Result:**
- ✅ Loading state shows
- ✅ User is created in MongoDB
- ✅ Token stored in localStorage
- ✅ User data stored in Redux
- ✅ Redirected to `/student-dashboard`

---

### Test Case 2: Password Validation

1. Try weak password: `test123`
   - ❌ Should show: "Password must include uppercase, lowercase, number, and special character"

2. Try short password: `Test@1`
   - ❌ Should show: "Password must be at least 8 characters"

3. Try mismatched passwords:
   - Password: `Test@1234`
   - Confirm: `Test@5678`
   - ❌ Should show: "Passwords do not match"

---

### Test Case 3: Duplicate Email

1. Register with same email twice
   - First registration: ✅ Success
   - Second registration: ❌ Should show error from backend

**Expected Error:**
```
User with this email already exists
```

---

### Test Case 4: Invalid Phone Format

1. Try phone without +233: `0501234567`
   - Should auto-format to: `+233 0501234567`

2. Try invalid format: `123456`
   - ❌ Should show: "Please enter a valid Ghana phone number (+233 XX XXX XXXX)"

---

### Test Case 5: Backend Connection Error

1. Stop the backend server
2. Try to register
   - ❌ Should show: "Registration failed. Please try again."

---

## 🔍 Verification Checklist

After successful registration, verify:

1. **MongoDB Atlas:**
   - Check if user exists in database
   - Password should be hashed (not plain text)
   - Email should be lowercase

2. **Browser localStorage:**
   ```javascript
   // Open DevTools Console
   localStorage.getItem('token')
   localStorage.getItem('refreshToken')
   ```
   - Both should have JWT tokens

3. **Redux State:**
   - Open Redux DevTools
   - Check `auth` slice
   - Should have: `user`, `token`, `isAuthenticated: true`

4. **Network Tab:**
   - Check POST request to `/api/auth/register`
   - Response should be 201 Created
   - Response body should have `user` and `tokens`

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot read properties of undefined"
**Solution:** Make sure backend is running on port 5000

### Issue 2: CORS Error
**Solution:** Backend should have CORS enabled for `http://localhost:5173`

### Issue 3: "User already exists"
**Solution:** Use a different email or delete the user from MongoDB

### Issue 4: Token not stored
**Solution:** Check Redux DevTools and browser console for errors

### Issue 5: Password validation not working
**Solution:** Clear form and try again, check console for errors

---

## 📝 Backend API Reference

### Register Endpoint
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "Test@1234",
  "name": "John Doe",
  "mobileNumber": "+233501234567"
}
```

**Success Response (201):**
```json
{
  "user": {
    "_id": "...",
    "email": "john.doe@example.com",
    "name": "John Doe",
    "role": "user",
    "status": "active"
  },
  "tokens": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

**Error Response (400):**
```json
{
  "message": "User with this email already exists"
}
```

---

## ✅ Next Steps After Testing

Once registration works:
1. Test login flow with registered credentials
2. Verify protected routes work with token
3. Test token refresh mechanism
4. Implement password reset flow
5. Add email verification (optional)

---

## 🎉 Success Criteria

Registration flow is complete when:
- ✅ User can fill all 4 steps
- ✅ Password validation works correctly
- ✅ Data is saved to MongoDB
- ✅ Tokens are stored in localStorage
- ✅ User is redirected to dashboard
- ✅ Can login with registered credentials
