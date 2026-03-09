# Vercel Deployment Guide

This guide will help you deploy your UR Aerotech website to Vercel with MongoDB Atlas.

## Prerequisites

1. A GitHub, GitLab, or Bitbucket account
2. A Vercel account (sign up at https://vercel.com)
3. A MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)
4. Your MongoDB backup/export file

## Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new organization (or use default)
4. Create a new project (or use default)

### 1.2 Create a Cluster

1. Click **"Build a Database"**
2. Choose **"M0 FREE"** tier (free forever)
3. Select a cloud provider and region (choose closest to your users)
4. Click **"Create"** (cluster creation takes 3-5 minutes)

### 1.3 Configure Database Access

1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter a username and generate a secure password (save these!)
5. Set user privileges to **"Atlas Admin"** (or "Read and write to any database")
6. Click **"Add User"**

### 1.4 Configure Network Access

1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - **Note**: For production, restrict to Vercel IPs or your specific IPs
4. Click **"Confirm"**

### 1.5 Get Connection String

1. Go to **"Database"** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** and version **"5.5 or later"**
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Replace `<password>` with your actual password
7. Replace `<database>` with `uraerotech` (or your preferred database name)

**Example connection string:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/uraerotech?retryWrites=true&w=majority
```

## Step 2: Import Your Backup Data to MongoDB Atlas

### Option A: Using MongoDB Compass (Recommended)

1. **Download MongoDB Compass** (if you don't have it):
   - https://www.mongodb.com/try/download/compass

2. **Connect to MongoDB Atlas:**
   - Open MongoDB Compass
   - Paste your MongoDB Atlas connection string
   - Click "Connect"

3. **Import Collections:**
   - Select your database (`uraerotech`)
   - For each collection in your backup:
     - Click on the collection name
     - Click "Add Data" → "Import File"
     - Select your JSON/BSON backup file
     - Choose import options and click "Import"

### Option B: Using MongoDB CLI (mongorestore)

1. **Install MongoDB Database Tools:**
   - Download from: https://www.mongodb.com/try/download/database-tools
   - Or use: `brew install mongodb-database-tools` (macOS)

2. **Restore from backup:**
   ```bash
   mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net/uraerotech" --drop /path/to/your/backup
   ```

   Replace:
   - `username` and `password` with your Atlas credentials
   - `cluster.mongodb.net` with your cluster address
   - `/path/to/your/backup` with the path to your backup directory

### Option C: Using MongoDB Atlas Data Import

1. Go to your MongoDB Atlas cluster
2. Click **"Browse Collections"**
3. Click **"Add My Own Data"**
4. Create your database and collections
5. Use the **"Import File"** option for each collection

## Step 3: Prepare Your Project for Vercel

### 3.1 Push Code to Git Repository

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub/GitLab/Bitbucket:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

### 3.2 Verify Project Structure

Ensure your project has:
- ✅ `package.json` with build scripts
- ✅ `next.config.js`
- ✅ `prisma/schema.prisma`
- ✅ All API routes in `app/api/`

## Step 4: Deploy to Vercel

### 4.1 Import Project to Vercel

1. Go to https://vercel.com
2. Sign in with your GitHub/GitLab/Bitbucket account
3. Click **"Add New Project"**
4. Select your repository
5. Click **"Import"**

### 4.2 Configure Build Settings

Vercel should auto-detect Next.js, but verify:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (or your project root)
- **Build Command**: `npm run build` (or `next build`)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

### 4.3 Set Environment Variables

In the Vercel project settings, add these environment variables:

#### Required Variables:

```
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/uraerotech?retryWrites=true&w=majority
```

```
NEXTAUTH_SECRET=your-generated-secret-here
```

Generate a secret:
```bash
openssl rand -base64 32
```

Or use: https://generate-secret.vercel.app/32

```
NEXTAUTH_URL=https://your-project.vercel.app
```

Replace `your-project` with your actual Vercel project name.

#### Optional Variables (if using Stripe):

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

### 4.4 Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 2-5 minutes)
3. Your site will be live at `https://your-project.vercel.app`

## Step 5: Post-Deployment Setup

### 5.1 Verify Database Connection

1. Visit your deployed site
2. Try to:
   - View products page (should show products from database)
   - Register a new user
   - Log in with existing credentials

### 5.2 Run Prisma Commands (if needed)

If you need to update the database schema:

1. Go to Vercel project settings
2. Go to **"Deployments"**
3. Click on the latest deployment
4. Go to **"Functions"** tab
5. You can run commands via Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Run Prisma commands
vercel env pull .env.local
npx prisma generate
npx prisma db push
```

Or add a build script in `package.json`:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### 5.3 Set Up Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

## Step 6: Verify Everything Works

### Checklist:

- [ ] Products page displays products from MongoDB Atlas
- [ ] User registration works
- [ ] User login works
- [ ] User dashboard shows user data
- [ ] Admin panel accessible (if admin user exists)
- [ ] Quote submission works
- [ ] Checkout process works (if Stripe configured)

## Troubleshooting

### Issue: "Database connection failed"

**Solution:**
1. Verify `DATABASE_URL` is correct in Vercel environment variables
2. Check MongoDB Atlas Network Access allows all IPs (0.0.0.0/0)
3. Verify database user has correct permissions
4. Check connection string format (should include `?retryWrites=true&w=majority`)

### Issue: "NEXTAUTH_SECRET is missing"

**Solution:**
1. Add `NEXTAUTH_SECRET` to Vercel environment variables
2. Generate a new secret: `openssl rand -base64 32`
3. Redeploy the application

### Issue: "Products not showing"

**Solution:**
1. Verify data was imported to MongoDB Atlas
2. Check collection names match Prisma schema (User, Product, Category, etc.)
3. Verify `DATABASE_URL` points to correct database
4. Check Vercel function logs for errors

### Issue: "Build fails on Vercel"

**Solution:**
1. Check build logs in Vercel dashboard
2. Ensure `package.json` has all dependencies
3. Verify Node.js version (Vercel uses Node 18.x by default)
4. Check for TypeScript errors locally first

### Issue: "Prisma Client not generated"

**Solution:**
Add to `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

This ensures Prisma Client is generated during Vercel build.

## Environment Variables Summary

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ Yes | MongoDB Atlas connection string |
| `NEXTAUTH_SECRET` | ✅ Yes | Secret for NextAuth session encryption |
| `NEXTAUTH_URL` | ✅ Yes | Your Vercel deployment URL |
| `NEXT_PUBLIC_APP_URL` | ⚠️ Optional | Public app URL (for links) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ⚠️ Optional | Stripe publishable key |
| `STRIPE_SECRET_KEY` | ⚠️ Optional | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | ⚠️ Optional | Stripe webhook secret |

## Next Steps

1. **Set up monitoring**: Use Vercel Analytics to monitor your site
2. **Configure backups**: Set up automated MongoDB Atlas backups
3. **Set up staging**: Create a staging environment in Vercel
4. **Optimize performance**: Enable Vercel Edge Functions if needed
5. **Set up CI/CD**: Configure automatic deployments from main branch

## Support

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs

---

**Your site is now live on Vercel! 🎉**


