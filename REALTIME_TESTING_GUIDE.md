# 🧪 Real-Time Features Testing Guide

## 🎯 What to Test

1. **Theme Switching** - Instant visual change
2. **Notification Toggles** - Instant feedback
3. **Avatar Upload** - Immediate display
4. **Profile Updates** - Save and persist
5. **Form Validation** - Real-time errors

---

## 1️⃣ Theme Switching (Real-Time)

### **Test Steps:**

1. **Open the app:** http://localhost:5173
2. **Login** to your account
3. **Go to:** Profile → Settings tab
4. **Find the "Theme" dropdown**

### **Test Light → Dark:**
1. Select "🌙 Dark" from dropdown
2. **Watch:** Page instantly turns dark!
   - Background: Light → Dark slate
   - Text: Dark → Light
   - Cards: White → Dark
3. **See:** Toast notification "Theme changed to Dark"

### **Test Dark → Light:**
1. Select "☀️ Light" from dropdown
2. **Watch:** Page instantly turns light!
3. **See:** Toast notification "Theme changed to Light"

### **Test System:**
1. Select "💻 System Default"
2. **Watch:** Follows your OS theme
3. **Try:** Change your OS theme (Windows/Mac settings)
4. **Watch:** App theme changes automatically!

### **Verify Persistence:**
1. Change theme to Dark
2. **Refresh the page** (F5)
3. **Expected:** Theme stays dark ✅
4. **Close browser** completely
5. **Reopen** and go back to the app
6. **Expected:** Theme still dark ✅

---

## 2️⃣ Notification Toggles (Real-Time)

### **Test Steps:**

1. **Go to:** Profile → Settings tab
2. **Scroll to:** Notifications section

### **Test Email Toggle:**
1. **Click** the Email toggle switch (turn OFF)
2. **See immediately:** 
   - Toast: "Email notifications disabled" 🔕
   - Switch turns gray
3. **Click again** (turn ON)
4. **See immediately:**
   - Toast: "Email notifications enabled" ✅
   - Switch turns blue

### **Test Push Toggle:**
1. Toggle Push notifications OFF
2. **See:** Toast "Push notifications disabled"
3. Toggle back ON
4. **See:** Toast "Push notifications enabled"

### **Test SMS Toggle:**
1. Toggle SMS notifications ON
2. **See:** Toast "SMS notifications enabled"
3. Toggle OFF
4. **See:** Toast "SMS notifications disabled"

### **All Changes Happen Instantly!** ⚡

---

## 3️⃣ Avatar Upload (Real-Time)

### **Test Steps:**

1. **Go to:** Profile → Personal Info tab
2. **Click:** "Edit Profile" button
3. **Click:** "Upload Photo" or camera icon

### **Test Upload:**
1. **Select an image** (jpg, png, gif)
2. **Watch:** 
   - Loading spinner appears
   - Toast: "Avatar uploaded successfully!" ✅
   - **Image displays immediately!** (no refresh needed)
3. **Verify:** Avatar shows in the circle

### **Test Validation:**
1. **Try uploading** a text file (.txt)
2. **See:** Toast error "Please select an image file" ❌
3. **Try uploading** a large file (>5MB)
4. **See:** Toast error "Image size must be less than 5MB" ❌

### **Test Delete:**
1. **Click:** "Remove" button
2. **See:** Toast "Avatar removed successfully!"
3. **Watch:** Avatar disappears, initials show instead

---

## 4️⃣ Profile Updates (Real-Time)

### **Test Education:**

1. **Go to:** Profile → Education tab
2. **Click:** "Add Education"
3. **Fill in:**
   - Institution: "University of Ghana"
   - Degree: "Bachelor of Science"
   - Field: "Computer Science"
   - Dates: Sep 2018 - Jun 2022
4. **Click:** "Add Education"
5. **See immediately:**
   - Toast: "Education added successfully!" ✅
   - New education card appears
   - Dates formatted: "Sep 2018 - Jun 2022"

### **Test Experience:**

1. **Go to:** Profile → Experience tab
2. **Click:** "Add Experience"
3. **Fill in:**
   - Company: "Tech Ghana Ltd"
   - Position: "Software Developer"
   - Description: "Built web applications"
   - Check "Currently working here"
4. **Click:** "Add Experience"
5. **See immediately:**
   - Toast: "Experience added successfully!" ✅
   - New experience card appears
   - Shows "Present" for end date

### **Test Skills:**

1. **Go to:** Profile → Skills tab
2. **Click:** "Add Skill"
3. **Fill in:**
   - Name: "JavaScript"
   - Level: "Advanced"
4. **Click:** "Add Skill"
5. **See immediately:**
   - Toast: "Skill added successfully!" ✅
   - New skill badge appears (blue color)

---

## 5️⃣ Form Validation (Real-Time)

### **Test Required Fields:**

1. **Go to:** Profile → Education tab
2. **Click:** "Add Education"
3. **Leave fields empty**
4. **Click:** "Add Education"
5. **See immediately:**
   - Toast: "Please fill in all required fields" ❌
   - No card added

### **Test Password Validation:**

1. **Go to:** Login or Registration page
2. **Type a weak password:** "123"
3. **See immediately:**
   - Error message appears
   - "Password must be at least 8 characters"

---

## 6️⃣ Data Persistence Test

### **Test Profile Data:**

1. **Add education, experience, skills**
2. **Upload avatar**
3. **Change theme to Dark**
4. **Refresh page** (F5)
5. **Expected:**
   - ✅ All data still there
   - ✅ Avatar still shows
   - ✅ Theme still dark

### **Test Across Sessions:**

1. **Make changes** (add education, change theme)
2. **Close browser completely**
3. **Reopen browser**
4. **Login again**
5. **Expected:**
   - ✅ All data persists
   - ✅ Theme persists

---

## 7️⃣ Network Test (Real-Time Updates)

### **Test with DevTools:**

1. **Open DevTools** (F12)
2. **Go to:** Network tab
3. **Add education**
4. **Watch Network tab:**
   - See `POST /api/profile/education` request
   - Status: 200 OK
   - Response shows new education data

5. **Change theme**
6. **Check Console:**
   - No API call (localStorage only)
   - Theme changes instantly

---

## 8️⃣ Multi-Tab Test

### **Test Real-Time Sync:**

1. **Open app** in two browser tabs
2. **Tab 1:** Change theme to Dark
3. **Tab 2:** Refresh page
4. **Expected:** Tab 2 also shows dark theme ✅

---

## ✅ Success Checklist

Test each feature and check off:

### Theme Switching:
- [ ] Light → Dark (instant)
- [ ] Dark → Light (instant)
- [ ] System preference (follows OS)
- [ ] Persists on refresh
- [ ] Toast notifications show

### Notifications:
- [ ] Email toggle (instant feedback)
- [ ] Push toggle (instant feedback)
- [ ] SMS toggle (instant feedback)
- [ ] Toast shows for each

### Avatar:
- [ ] Upload shows immediately
- [ ] Delete works instantly
- [ ] Validation errors show
- [ ] Image persists on refresh

### Profile Updates:
- [ ] Education adds instantly
- [ ] Experience adds instantly
- [ ] Skills add instantly
- [ ] Toast notifications show
- [ ] Data persists on refresh

### Form Validation:
- [ ] Required field errors show
- [ ] Password validation works
- [ ] File type validation works
- [ ] File size validation works

---

## 🎯 Expected Results

**All changes should:**
- ✅ Happen **instantly** (no page reload)
- ✅ Show **toast notification**
- ✅ **Persist** after refresh
- ✅ **Persist** after closing browser
- ✅ Show **loading states** during API calls
- ✅ Show **error messages** if something fails

---

## 🐛 If Something Doesn't Work

### Theme not changing?
1. Check browser console for errors
2. Verify `<html>` class changes (inspect element)
3. Check localStorage: `localStorage.getItem('theme')`

### Avatar not showing?
1. Check Network tab for upload request
2. Verify CORS is configured
3. Check backend is running

### Data not persisting?
1. Check Network tab for API calls
2. Verify backend is running
3. Check MongoDB connection

---

## 🎊 All Real-Time Features

- ⚡ Theme switching
- ⚡ Notification toggles
- ⚡ Avatar upload
- ⚡ Profile updates
- ⚡ Form validation
- ⚡ Toast notifications
- ⚡ Data persistence

**Everything updates in real-time with no page reloads!** 🚀
