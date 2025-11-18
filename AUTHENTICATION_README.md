# Authentication System - Handcrafted Haven

## Overview

This authentication system includes:
- ✅ User registration with password hashing (bcrypt)
- ✅ User login with JWT tokens
- ✅ Protected dashboard route
- ✅ Automatic redirect after login/registration
- ✅ Logout functionality

## Features Implemented

### 1. Frontend Components
- **LoginForm**: User login interface with email/password
- **RegisterForm**: User registration with name, email, password, and confirmation
- **Auth Page**: Combined login/register page with toggle
- **Dashboard**: Protected page showing user info with logout

### 2. Backend API Routes
- **POST /api/auth/register**: Register new users
- **POST /api/auth/login**: Login existing users

### 3. Security Features
- Password hashing with bcrypt (10 salt rounds)
- JWT token generation and verification
- Client-side password validation
- Password confirmation matching
- Protected routes with authentication check

### 4. User Flow
1. User visits `/auth` page
2. Can toggle between login and registration
3. After successful login/registration:
   - JWT token stored in localStorage
   - User data stored in localStorage
   - Automatically redirected to `/dashboard`
4. Dashboard checks for authentication
5. User can logout, which clears tokens and redirects to `/auth`

## File Structure

```
my-project/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── login/
│   │   │       │   └── route.ts          # Login API endpoint
│   │   │       └── register/
│   │   │           └── route.ts          # Registration API endpoint
│   │   ├── auth/
│   │   │   ├── page.tsx                  # Auth page (login/register)
│   │   │   └── auth.module.css
│   │   └── dashboard/
│   │       ├── page.tsx                  # Protected dashboard
│   │       └── dashboard.module.css
│   ├── components/
│   │   ├── LoginForm.tsx                 # Login form component
│   │   ├── RegisterForm.tsx              # Registration form component
│   │   └── AuthForm.module.css           # Shared form styles
│   └── lib/
│       ├── auth.ts                       # Auth utilities (bcrypt, JWT)
│       └── db.ts                         # Mock database (in-memory)
└── .env.local                            # Environment variables
```

## How to Use

### 1. Start the Development Server

```powershell
cd my-project
pnpm dev
```

### 2. Access the Authentication Pages

- **Login/Register**: http://localhost:3000/auth
- **Dashboard** (protected): http://localhost:3000/dashboard

### 3. Test the Flow

**Registration:**
1. Go to http://localhost:3000/auth
2. Fill in name, email, password, and confirm password
3. Click "Register"
4. You'll be redirected to the dashboard

**Login:**
1. Go to http://localhost:3000/auth
2. Click "Login here" to switch to login form
3. Enter your email and password
4. Click "Login"
5. You'll be redirected to the dashboard

**Logout:**
1. From the dashboard, click "Logout"
2. You'll be redirected back to the auth page

## API Endpoints

### POST /api/auth/register

Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "Registration successful",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "token": "jwt-token-here"
}
```

### POST /api/auth/login

Login an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "token": "jwt-token-here"
}
```

## Security Notes

### Current Implementation (Development)
- In-memory database (data lost on server restart)
- JWT secret in environment variable
- Tokens stored in localStorage

### Production Recommendations

1. **Database**: Replace in-memory storage with a real database:
   - PostgreSQL with Prisma
   - MongoDB with Mongoose
   - MySQL with TypeORM

2. **JWT Secret**: Use a strong, random secret:
   ```bash
   # Generate a secure secret:
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Token Storage**: Consider using httpOnly cookies instead of localStorage:
   - More secure against XSS attacks
   - Implement refresh token rotation
   - Add CSRF protection

4. **Password Policy**: Implement stronger requirements:
   - Minimum 8-12 characters
   - Require uppercase, lowercase, numbers, special chars
   - Check against common password lists

5. **Rate Limiting**: Add rate limiting to prevent brute force:
   - Limit login attempts per IP
   - Add CAPTCHA after failed attempts
   - Implement account lockout

6. **HTTPS**: Always use HTTPS in production

7. **Environment Variables**: 
   - Never commit `.env.local` to git
   - Use different secrets for each environment
   - Consider using secret management services

## Environment Variables

Create or update `.env.local`:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
NODE_ENV=development
```

## Dependencies

- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT token generation/verification
- `jose`: Additional JWT utilities
- `@types/bcryptjs`: TypeScript types for bcryptjs
- `@types/jsonwebtoken`: TypeScript types for jsonwebtoken

## Next Steps

1. **Database Integration**: Replace mock database with real database
2. **Email Verification**: Add email verification on registration
3. **Password Reset**: Implement forgot password functionality
4. **OAuth**: Add social login (Google, GitHub, etc.)
5. **Middleware**: Create Next.js middleware for route protection
6. **Session Management**: Add refresh tokens
7. **User Profile**: Create user profile edit page
8. **Admin Panel**: Add role-based access control

## Troubleshooting

**Issue: "Invalid credentials" error**
- Make sure you're using the exact email/password you registered with
- Passwords are case-sensitive

**Issue: Redirected to /auth when accessing /dashboard**
- This means you're not authenticated
- Try logging in again

**Issue: "User already exists"**
- The email is already registered
- Try logging in instead or use a different email

**Issue: Server restart loses all users**
- This is expected with the in-memory database
- Implement a real database for persistence
