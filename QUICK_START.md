# Authentication System - Quick Start Guide

## 🚀 What Was Built

A complete authentication system with:

### ✅ Frontend (React/Next.js)
- Login form with email/password
- Registration form with validation
- Protected dashboard page
- Automatic redirects after login
- Logout functionality

### ✅ Backend (Next.js API Routes)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- Password hashing with bcrypt
- JWT token generation
- In-memory user storage (replace with database in production)

### ✅ Security Features
- Bcrypt password hashing (10 salt rounds)
- JWT tokens for sessions (7-day expiry)
- Password confirmation validation
- Minimum password length (6 characters)
- Protected routes with auth checks

## 📂 Files Created

```
my-project/src/
├── lib/
│   ├── auth.ts                    # Auth utilities (bcrypt, JWT)
│   └── db.ts                      # Mock database
├── hooks/
│   └── useAuth.ts                 # Custom auth hook
├── components/
│   ├── LoginForm.tsx              # Login form component
│   ├── RegisterForm.tsx           # Registration form
│   └── AuthForm.module.css        # Form styles
├── app/
│   ├── auth/
│   │   ├── page.tsx               # Combined auth page
│   │   └── auth.module.css
│   ├── dashboard/
│   │   ├── page.tsx               # Protected dashboard
│   │   └── dashboard.module.css
│   └── api/auth/
│       ├── login/route.ts         # Login endpoint
│       └── register/route.ts      # Register endpoint
└── middleware.ts                  # Route middleware
```

## 🎯 How to Test

### 1. Start the server
```powershell
cd my-project
pnpm dev
```

### 2. Open your browser
Navigate to: `http://localhost:3000/auth`

### 3. Register a new user
- Fill in: Name, Email, Password, Confirm Password
- Click "Register"
- You'll be automatically redirected to `/dashboard`

### 4. Test logout
- Click "Logout" button on dashboard
- You'll be redirected back to `/auth`

### 5. Test login
- Enter your email and password
- Click "Login"
- You'll be redirected to `/dashboard`

### 6. Test protection
- Try accessing `http://localhost:3000/dashboard` without logging in
- You should be redirected to `/auth`

## 🔑 API Usage Examples

### Register a new user
```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'securepass123'
  })
});
const data = await response.json();
// Returns: { message, user, token }
```

### Login
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'securepass123'
  })
});
const data = await response.json();
// Returns: { message, user, token }
```

## 🎨 Customization

### Change JWT expiry
Edit `src/lib/auth.ts`:
```typescript
const JWT_EXPIRES_IN = '7d'; // Change to '1h', '30d', etc.
```

### Stronger password requirements
Edit `src/components/RegisterForm.tsx`:
```typescript
if (formData.password.length < 8) { // Change from 6 to 8
  setError('Password must be at least 8 characters long');
  return;
}
```

### Custom redirect after login
Edit `src/components/LoginForm.tsx` or `RegisterForm.tsx`:
```typescript
router.push('/dashboard'); // Change to '/home', '/profile', etc.
```

## ⚠️ Important Notes

### Development vs Production

**Current (Development):**
- In-memory database (data lost on restart)
- JWT secret in `.env.local`
- Tokens in localStorage

**For Production:**
- ✅ Replace in-memory DB with PostgreSQL/MongoDB
- ✅ Use strong random JWT secret
- ✅ Consider httpOnly cookies instead of localStorage
- ✅ Add refresh token rotation
- ✅ Implement rate limiting
- ✅ Add email verification
- ✅ Use HTTPS only

### Environment Variables

The `.env.local` file contains:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
```

**NEVER commit this file to Git!** It's in `.gitignore`.

## 🔧 Using the Custom Hook

For easier auth management in any component:

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## 📦 Installed Packages

- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `jose` - JWT utilities
- `@types/jsonwebtoken` - TypeScript types

## 🐛 Troubleshooting

**Build succeeds but app doesn't work?**
- Make sure dev server is running: `pnpm dev`
- Check browser console for errors
- Clear localStorage: Dev Tools > Application > Local Storage > Clear

**Can't log in after registration?**
- Server might have restarted (in-memory DB cleared)
- Re-register the user

**TypeScript errors?**
- Run: `pnpm build` to check for errors
- Make sure all dependencies are installed: `pnpm install`

## ✨ Next Steps

1. **Add a real database**: Use Prisma + PostgreSQL
2. **Email verification**: Send confirmation emails
3. **Password reset**: Forgot password flow
4. **OAuth**: Add Google/GitHub login
5. **Role-based access**: Admin vs user roles
6. **Profile page**: Edit user information
7. **Session management**: Refresh tokens

## 📚 Resources

- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [bcrypt Documentation](https://www.npmjs.com/package/bcryptjs)
- [JWT Best Practices](https://jwt.io/introduction)

---

**Ready to use!** Start your dev server and visit `/auth` to try it out! 🎉
