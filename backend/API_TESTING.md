# PathFinders Backend API Testing Guide

## 🚀 Getting Started

### Prerequisites
1. MongoDB Atlas connection (already configured)
2. Redis server running locally or use cloud Redis
3. Node.js installed

### Installation
```bash
cd backend
npm install
```

### Start the Server
```bash
npm run dev
```

The server will run on `http://localhost:5000`

---

## 🔐 Authentication Endpoints

### 1. Register New User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "student@example.com",
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
    "email": "student@example.com",
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

**Error Responses:**
- `400` - Validation errors or user already exists
- `500` - Server error

---

### 2. Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "Test@1234"
}
```

**Success Response (200):**
```json
{
  "user": {
    "_id": "...",
    "email": "student@example.com",
    "name": "John Doe",
    "role": "user"
  },
  "tokens": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  }
}
```

**Error Responses:**
- `401` - Invalid credentials
- `429` - Too many login attempts (rate limited)
- `500` - Server error

---

### 3. Get Current User
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Success Response (200):**
```json
{
  "_id": "...",
  "email": "student@example.com",
  "name": "John Doe",
  "role": "user",
  "location": {
    "city": "",
    "region": "",
    "country": "Ghana"
  },
  "preferences": {
    "language": "english",
    "notifications": {
      "email": true,
      "push": true,
      "sms": false
    }
  }
}
```

---

### 4. Refresh Token
**POST** `/api/auth/refresh-token`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Success Response (200):**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

---

### 5. Logout
**POST** `/api/auth/logout`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Success Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

### 6. Forgot Password
**POST** `/api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "student@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "If an account exists, a password reset email has been sent"
}
```

---

### 7. Reset Password
**POST** `/api/auth/reset-password`

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "password": "NewPass@1234",
  "confirmPassword": "NewPass@1234"
}
```

**Success Response (200):**
```json
{
  "message": "Password has been reset successfully"
}
```

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@pathfinders.gh",
    "password": "Test@1234",
    "name": "Test User",
    "mobileNumber": "+233501234567"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@pathfinders.gh",
    "password": "Test@1234"
  }'
```

### Get Current User (replace TOKEN with actual token)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

---

## 🧪 Testing with Postman

1. **Import Collection**: Create a new collection called "PathFinders API"
2. **Set Environment Variables**:
   - `baseUrl`: `http://localhost:5000`
   - `accessToken`: (will be set after login)
   - `refreshToken`: (will be set after login)

3. **Create Requests**:
   - Register: POST `{{baseUrl}}/api/auth/register`
   - Login: POST `{{baseUrl}}/api/auth/login`
   - Get Me: GET `{{baseUrl}}/api/auth/me` (with Bearer token)

4. **Auto-save tokens**: In Login request, add to Tests tab:
```javascript
const response = pm.response.json();
pm.environment.set("accessToken", response.tokens.accessToken);
pm.environment.set("refreshToken", response.tokens.refreshToken);
```

---

## ⚠️ Important Notes

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (!@#$%^&*)

### Phone Number Format
- Must be Ghana format: `+233XXXXXXXXX`
- Example: `+233501234567`

### Rate Limiting
- Login attempts: 5 per 15 minutes per IP
- General API: 100 requests per 15 minutes per IP

### Token Expiry
- Access Token: 7 days
- Refresh Token: 30 days

---

## 🔍 Health Check

**GET** `/health`

```bash
curl http://localhost:5000/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-07T01:44:09.000Z",
  "environment": "development"
}
```

---

## 🐛 Troubleshooting

### Redis Connection Error
If you see "Redis Client Error", install and start Redis:

**Windows:**
```bash
# Install Redis via Chocolatey
choco install redis-64

# Start Redis
redis-server
```

**Or use cloud Redis:**
Update `.env`:
```
REDIS_URL=redis://your-cloud-redis-url
```

### MongoDB Connection Error
Check your `.env` file has correct `MONGODB_URI`

### Port Already in Use
Change port in `.env`:
```
PORT=5001
```

---

## 📝 Next Steps

After authentication is working:
1. ✅ Test all endpoints
2. ✅ Connect frontend to backend
3. ✅ Implement user profile management
4. ✅ Add assessment endpoints
5. ✅ Build job scraping service
