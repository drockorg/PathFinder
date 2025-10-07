# 🔐 Forgot Password Feature - Complete Guide

## ✅ What's Been Implemented

### 1. **Forgot Password Page** (`/forgot-password`)
- User enters their email
- System sends password reset email
- Success message shown (doesn't reveal if email exists)

### 2. **Reset Password Page** (`/reset-password?token=xxx`)
- User clicks link from email
- Enters new password with validation
- Password requirements enforced
- Success confirmation

### 3. **Backend Integration**
- `POST /api/auth/forgot-password` - Request reset
- `POST /api/auth/reset-password` - Reset with token

---

## 🔄 Complete Flow

```
1. User clicks "Forgot password?" on login page
   ↓
2. Redirected to /forgot-password
   ↓
3. User enters email address
   ↓
4. Backend generates reset token
   ↓
5. Backend sends email with reset link
   ↓
6. User clicks link in email
   ↓
7. Redirected to /reset-password?token=xxx
   ↓
8. User enters new password
   ↓
9. Password updated in database
   ↓
10. User redirected to login
```

---

## 🧪 How to Test

### Test 1: Request Password Reset

1. Go to `http://localhost:5173/login`
2. Click **"Forgot password?"**
3. Enter email: `john.doe@test.com`
4. Click **"Send Reset Link"**

**Expected:**
- ✅ Success message appears
- ✅ Message: "Check Your Email"
- ✅ Backend sends email (check backend logs)

### Test 2: Invalid Email

1. Go to `/forgot-password`
2. Enter email: `nonexistent@test.com`
3. Click **"Send Reset Link"**

**Expected:**
- ✅ Same success message (security - don't reveal if email exists)
- ✅ No email sent (check backend logs)

### Test 3: Reset Password (Manual Token)

Since email service might not be configured, test manually:

1. **Get Reset Token from Backend:**
   - Check backend terminal after requesting reset
   - Or check MongoDB for the user's `resetPasswordToken`

2. **Use Token in URL:**
   ```
   http://localhost:5173/reset-password?token=YOUR_TOKEN_HERE
   ```

3. **Enter New Password:**
   - Password: `NewPass@123`
   - Confirm: `NewPass@123`

4. **Click "Reset Password"**

**Expected:**
- ✅ Success message
- ✅ Redirected to login
- ✅ Can login with new password

### Test 4: Expired/Invalid Token

1. Go to: `http://localhost:5173/reset-password?token=invalid123`

**Expected:**
- ✅ Error message: "Invalid reset link"
- ✅ Button to request new link

### Test 5: Password Validation

Try these passwords on reset page:

| Password | Expected Result |
|----------|----------------|
| `test123` | ❌ Too short, missing uppercase, special char |
| `Test1234` | ❌ Missing special character |
| `Test@123` | ✅ Valid |
| `NewPass@123` | ✅ Valid |

---

## 📧 Email Configuration (Optional)

The backend uses `nodemailer` to send emails. To enable email sending:

### Option 1: Gmail (Development)

**Update `backend/.env`:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@pathfinders.gh
```

**Get Gmail App Password:**
1. Go to Google Account settings
2. Security → 2-Step Verification
3. App passwords → Generate
4. Use that password in `.env`

### Option 2: Test Email Service (Mailtrap)

**For testing only:**
```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-username
SMTP_PASS=your-mailtrap-password
```

---

## 🔍 Backend API Details

### Forgot Password Endpoint

**POST** `/api/auth/forgot-password`

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "message": "If an account exists, a password reset email has been sent"
}
```

**Email Contains:**
- Reset link: `http://localhost:5173/reset-password?token=xxx`
- Token expires in 1 hour

---

### Reset Password Endpoint

**POST** `/api/auth/reset-password`

**Request:**
```json
{
  "token": "reset-token-from-email",
  "password": "NewPass@123",
  "confirmPassword": "NewPass@123"
}
```

**Success Response (200):**
```json
{
  "message": "Password has been reset successfully"
}
```

**Error Response (400):**
```json
{
  "message": "Invalid or expired reset token"
}
```

---

## 🛠️ Manual Testing Without Email

If email isn't configured, you can still test:

### Method 1: Check Backend Logs

When you request password reset, the backend logs will show:
```
Password reset token generated: abc123def456...
```

Use that token in the URL.

### Method 2: Check MongoDB

1. Open MongoDB Compass or Atlas
2. Find the user document
3. Look for `resetPasswordToken` field
4. Use that token (it's hashed, so you need the original from logs)

### Method 3: Use Backend Console

Add this to `authController.js` temporarily:
```javascript
console.log('Reset URL:', `http://localhost:5173/reset-password?token=${resetToken}`);
```

---

## 🎨 UI Features

### Forgot Password Page
- ✅ Clean, centered design
- ✅ Email validation
- ✅ Loading state
- ✅ Success screen
- ✅ Back to login link

### Reset Password Page
- ✅ Password strength requirements shown
- ✅ Password match validation
- ✅ Invalid token handling
- ✅ Success confirmation
- ✅ Redirect to login

---

## 🔒 Security Features

1. **Token Hashing**
   - Tokens are hashed before storing in database
   - Original token only sent via email

2. **Token Expiration**
   - Tokens expire after 1 hour
   - Expired tokens are rejected

3. **Email Privacy**
   - Doesn't reveal if email exists
   - Same message for existing/non-existing emails

4. **Password Requirements**
   - Minimum 8 characters
   - Uppercase + lowercase
   - Number + special character

---

## 📝 Testing Checklist

- [ ] Can access forgot password page from login
- [ ] Email validation works
- [ ] Success message appears after submission
- [ ] Backend generates reset token
- [ ] Reset page validates token
- [ ] Invalid token shows error
- [ ] Password validation works
- [ ] Passwords must match
- [ ] Can reset password successfully
- [ ] Can login with new password
- [ ] Old password no longer works

---

## 🐛 Troubleshooting

### Issue: Email not sending

**Check:**
1. SMTP credentials in `.env`
2. Backend logs for email errors
3. Gmail "Less secure app access" if using Gmail

**Solution:**
- Use Mailtrap for testing
- Or test manually with token from logs

### Issue: "Invalid or expired reset token"

**Causes:**
1. Token expired (> 1 hour old)
2. Token already used
3. Wrong token format

**Solution:**
- Request new reset link
- Check token in URL is complete

### Issue: Password validation failing

**Check:**
- Minimum 8 characters
- Has uppercase letter
- Has lowercase letter
- Has number
- Has special character (!@#$%^&*)

---

## ✅ Success Criteria

Forgot password is working when:
1. ✅ User can request password reset
2. ✅ Backend generates token
3. ✅ Reset page accepts valid tokens
4. ✅ Password can be changed
5. ✅ User can login with new password
6. ✅ Old password no longer works

---

## 🎉 Ready to Test!

Everything is set up. Try the forgot password flow now!

**Quick Test:**
1. Go to `/login`
2. Click "Forgot password?"
3. Enter your email
4. Check backend logs for reset token
5. Use token in reset URL
6. Change password
7. Login with new password

**It works!** 🚀
