# Login Debug Guide

## What Backend Expects

### Login Endpoint: `POST /api/auth/login`

**Required Fields:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Validation:**
- `email`: Must be valid email format
- `password`: Must not be empty

**Success Response (200):**
```json
{
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "name": "User Name",
    "role": "user"
  },
  "tokens": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

---

## What Frontend Sends

**From LoginForm.jsx line 70:**
```javascript
const result = await login(formData).unwrap();
```

**formData contains:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "rememberMe": false  // ← EXTRA FIELD!
}
```

---

## Potential Issue

The frontend is sending `rememberMe` field which the backend doesn't expect. This might cause validation errors.

---

## How to Debug

### Step 1: Open Browser DevTools
1. Press F12
2. Go to **Network** tab
3. Try to login
4. Look for the request to `/api/auth/login`

### Step 2: Check Request
Click on the `/api/auth/login` request and check:

**Request Payload:**
```json
{
  "email": "...",
  "password": "...",
  "rememberMe": false
}
```

### Step 3: Check Response
Look at the response:

**If 200 OK:**
- Login succeeded
- Check if `tokens` object exists
- Check if `user` object exists

**If 400 Bad Request:**
- Validation error
- Check error message

**If 401 Unauthorized:**
- Wrong email/password
- User doesn't exist

**If 500 Internal Server Error:**
- Backend error
- Check backend terminal logs

---

## Quick Fix

### Option 1: Remove rememberMe from Request

**File:** `src/pages/login/components/LoginForm.jsx`

Change line 70 from:
```javascript
const result = await login(formData).unwrap();
```

To:
```javascript
const result = await login({
  email: formData.email,
  password: formData.password
}).unwrap();
```

This sends only the fields backend expects.

---

## Test Steps

1. **Clear everything:**
   ```javascript
   localStorage.clear();
   location.reload();
   ```

2. **Try login with:**
   - Email: `john.doe@test.com`
   - Password: `Test@1234`

3. **Check Network tab:**
   - Status code?
   - Response body?

4. **Check Console:**
   - Any errors?
   - Does `dispatch(setCredentials(result))` run?

5. **Check localStorage:**
   ```javascript
   localStorage.getItem('token')
   ```

---

## Expected Flow

1. User enters email/password
2. Click "Sign In"
3. Frontend sends: `{ email, password }`
4. Backend validates
5. Backend returns: `{ user, tokens }`
6. Frontend calls: `dispatch(setCredentials(result))`
7. Frontend stores token in localStorage
8. Frontend redirects: `navigate('/student-dashboard')`

---

## If Still Not Redirecting

### Check 1: Is token stored?
```javascript
console.log('Token:', localStorage.getItem('token'));
console.log('Auth state:', store.getState().auth);
```

### Check 2: Is setCredentials working?
Add console.log in handleSubmit:
```javascript
const result = await login(formData).unwrap();
console.log('Login result:', result);

dispatch(setCredentials(result));
console.log('After dispatch');

navigate('/student-dashboard');
console.log('After navigate');
```

### Check 3: Is navigate working?
The navigate might be blocked by something. Try:
```javascript
window.location.href = '/student-dashboard';
```

---

## Quick Test Commands

Run these in browser console after login attempt:

```javascript
// Check if login succeeded
localStorage.getItem('token')

// Check Redux state
window.__REDUX_DEVTOOLS_EXTENSION__ ? 'Redux available' : 'No Redux DevTools'

// Manual redirect
window.location.href = '/student-dashboard'
```

---

## Most Likely Issue

Based on the symptoms:
1. ✅ Login API call succeeds (you said it works)
2. ❌ Redirect doesn't happen

**Possible causes:**
- Navigate is being called but something blocks it
- There's an error after dispatch but before navigate
- The dashboard route has an issue

**Solution:**
Add error handling and logging to see exactly where it fails.
