# Quick Start: Deploy to Vercel

This is a quick reference guide. For detailed instructions, see `VERCEL_DEPLOYMENT.md`.

## 🚀 Quick Deployment Steps

### 1. Set Up MongoDB Atlas (5 minutes)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free M0 cluster
3. Create database user (save credentials!)
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/uraerotech`

### 2. Import Your Backup (10 minutes)

**Option A: MongoDB Compass (Easiest)**
- Download: https://www.mongodb.com/try/download/compass
- Connect with Atlas connection string
- Import each collection JSON file

**Option B: Command Line**
```bash
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net/uraerotech" --drop /path/to/backup
```

See `MONGODB_ATLAS_IMPORT.md` for details.

### 3. Deploy to Vercel (5 minutes)

1. Push code to GitHub/GitLab
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables:

```
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/uraerotech?retryWrites=true&w=majority
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=https://your-project.vercel.app
```

5. Click "Deploy"

### 4. Verify (2 minutes)

- ✅ Products page shows data
- ✅ User registration works
- ✅ User login works

## 📋 Environment Variables Checklist

Add these in Vercel project settings:

| Variable | How to Get |
|----------|------------|
| `DATABASE_URL` | MongoDB Atlas → Connect → Connection String |
| `NEXTAUTH_SECRET` | Generate: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your Vercel URL: `https://project.vercel.app` |
| `NEXT_PUBLIC_APP_URL` | Same as NEXTAUTH_URL |

## 🔧 Common Issues

**"Database connection failed"**
- Check `DATABASE_URL` is correct
- Verify Atlas Network Access allows all IPs
- Check user permissions

**"Products not showing"**
- Verify data imported to Atlas
- Check collection names match (User, Product, Category)
- Check Vercel function logs

**"Build fails"**
- Ensure `package.json` has all dependencies
- Check build logs in Vercel dashboard

## 📚 Full Guides

- **Detailed Deployment**: See `VERCEL_DEPLOYMENT.md`
- **Import Data**: See `MONGODB_ATLAS_IMPORT.md`
- **Environment Setup**: See `.env.example`

---

**Need help?** Check the detailed guides or Vercel/MongoDB Atlas documentation.

