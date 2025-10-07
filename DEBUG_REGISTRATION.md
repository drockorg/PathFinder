# 🔍 Debug Registration - What's Being Sent

## 🎯 How to Check

### **Frontend (Browser Console)**

When you submit registration, you'll see:
```
Submitting registration: {
  email: "...",
  name: "...",
  mobileNumber: "+233...",
  dateOfBirth: "...",
  gender: "...",
  location: {
    city: "...",
    region: "...",
    country: "Ghana"
  }
}
```

### **Backend (Terminal)**

In your backend terminal, you'll see:
```
=== REGISTRATION REQUEST ===
Request body: {
  "email": "...",
  "password": "...",
  "name": "...",
  "mobileNumber": "+233...",
  "dateOfBirth": "...",
  "gender": "...",
  "location": {
    "city": "...",
    "region": "...",
    "country": "Ghana"
  }
}

Extracted fields: {
  email: "...",
  name: "...",
  mobileNumber: "+233...",
  dateOfBirth: "...",
  gender: "...",
  location: { city: "...", region: "...", country: "Ghana" }
}
```

---

## 🧪 Test Now

1. **Open Browser Console** (F12 → Console tab)
2. **Open Backend Terminal** (where you ran `pnpm dev`)
3. **Fill registration form** with:
   - Name: Test User
   - Email: test.debug@example.com
   - Phone: +233 24 123 4567
   - Password: Test@1234
   - Date of Birth: 1995-01-15
   - Gender: Male
   - Region: Greater Accra
   - City: Accra
4. **Click Submit**
5. **Check BOTH consoles**

---

## 📊 What to Look For

### ✅ Frontend Should Send:
```javascript
{
  email: "test.debug@example.com",
  password: "Test@1234",
  name: "Test User",
  mobileNumber: "+233241234567",
  dateOfBirth: "1995-01-15",
  gender: "male",
  location: {
    city: "Accra",
    region: "greater-accra",  // or "Greater Accra"
    country: "Ghana"
  }
}
```

### ✅ Backend Should Receive:
Same data structure (shown in terminal)

### ✅ Backend Should Save:
All fields to MongoDB

---

## 🐛 Common Issues

### Issue 1: Missing Fields
**Symptom:** Some fields are `undefined` in backend logs  
**Cause:** Form field names don't match  
**Solution:** Check field names in registration form

### Issue 2: Wrong Format
**Symptom:** Validation errors  
**Cause:** Data format doesn't match backend expectations  
**Solution:** Check data types (Date, String, etc.)

### Issue 3: User Already Exists
**Symptom:** 400 error "User already exists"  
**Solution:** Use a different email address

---

## 📝 Field Mapping

| Frontend Field | Backend Field | Example |
|---------------|---------------|---------|
| `formData.firstName + lastName` | `name` | "John Doe" |
| `formData.email` | `email` | "john@example.com" |
| `formData.phone` | `mobileNumber` | "+233241234567" |
| `formData.password` | `password` | "Test@1234" |
| `formData.dateOfBirth` | `dateOfBirth` | "1995-01-15" |
| `formData.gender` | `gender` | "male" |
| `formData.city` | `location.city` | "Accra" |
| `formData.region` | `location.region` | "Greater Accra" |

---

## 🎯 Next Steps

1. **Try registering** with the logging enabled
2. **Copy the console output** from both frontend and backend
3. **Share the output** if there's an issue
4. **Check if all fields are present**

---

## ✅ Success Looks Like

**Frontend Console:**
```
Submitting registration: { ... all fields ... }
Registration successful: { user: {...}, tokens: {...} }
```

**Backend Terminal:**
```
=== REGISTRATION REQUEST ===
Request body: { ... all fields ... }
Extracted fields: { ... all fields ... }
User created successfully
```

**Then:** Redirected to dashboard ✅

---

**Try registering now and check both consoles!** 🔍
