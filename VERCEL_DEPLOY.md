# Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Step 1: Commit Your Code to GitHub

```powershell
cd c:\Users\hp\OneDrive\Desktop\WDD430\WDD430-Team-11-Handcrafted-Haven

# Add all changes
git add .

# Commit
git commit -m "Add products, reviews, and database integration"

# Push to GitHub
git push origin main
```

### Step 2: Deploy on Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account
3. **Import Project**:
   - Click "Add New..." → "Project"
   - Select your repository: `WDD430-Team-11-Handcrafted-Haven`
   - Vercel will auto-detect Next.js

4. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `my-project`
   - Build Command: `pnpm build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

### Step 3: Add Environment Variables

**IMPORTANT:** Before deploying, add these environment variables:

1. In Vercel dashboard, go to **Project Settings** → **Environment Variables**
2. Add the following:

| Name | Value | Environment |
|------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://terrywhyte001_db_user:YOUR_PASSWORD@cluster0.pz5imjh.mongodb.net/handcrafted-haven?retryWrites=true&w=majority` | Production, Preview, Development |
| `JWT_SECRET` | `your-super-secret-jwt-key-change-this-in-production-min-32-chars` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

**Note:** Replace `YOUR_PASSWORD` with your actual MongoDB password!

### Step 4: Deploy!

Click **"Deploy"** and Vercel will:
- ✅ Install dependencies
- ✅ Build your Next.js app
- ✅ Deploy your API routes as serverless functions
- ✅ Give you a live URL!

### 🎉 Your App is Live!

After deployment, you'll get:
- **Production URL**: `https://your-app.vercel.app`
- **API Routes**: Automatically deployed as serverless functions
- **Automatic HTTPS**
- **Global CDN**
- **Auto-deployments** on every push to main

## 🔄 Automatic Deployments

Every time you push to GitHub:
- Vercel automatically rebuilds and redeploys
- Preview deployments for pull requests
- Production deployments for main branch

## 📱 Testing Your Deployed App

Once deployed, test these URLs:
- Homepage: `https://your-app.vercel.app`
- Marketplace: `https://your-app.vercel.app/marketplace`
- Auth: `https://your-app.vercel.app/auth`
- API: `https://your-app.vercel.app/api/products`

## ⚙️ Vercel Dashboard Features

- **Deployments**: View all deployments and logs
- **Analytics**: See visitor statistics
- **Domains**: Add custom domain
- **Environment Variables**: Manage secrets
- **Logs**: Debug serverless functions

## 🐛 Troubleshooting

**Build fails?**
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify TypeScript has no errors: `pnpm build` locally

**API routes not working?**
- Verify environment variables are set
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Review function logs in Vercel dashboard

**MongoDB connection fails?**
- MongoDB Atlas → Network Access → Add IP (0.0.0.0/0 for all)
- Double-check MONGODB_URI environment variable
- Ensure password has no special characters that need encoding

## 🔒 Security Checklist

- [x] `.env.local` is in `.gitignore`
- [x] Environment variables set in Vercel dashboard
- [x] MongoDB Atlas Network Access configured
- [x] Strong JWT secret used
- [x] HTTPS enabled (automatic on Vercel)

## 📈 Next Steps After Deployment

1. **Add Custom Domain** (optional)
   - Vercel Settings → Domains
   - Add your domain and follow DNS instructions

2. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor function execution times

3. **Set Up CI/CD**
   - Already done! Every push = deployment

4. **Add More Features**
   - Your app is live and ready to scale!

---

**Ready to deploy?** Follow the steps above! 🚀
