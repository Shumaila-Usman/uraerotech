# Quick Fix for DATABASE_URL Error

## Steps to Resolve:

### 1. Stop the Development Server
Press `Ctrl+C` in the terminal where `npm run dev` is running to stop the server.

### 2. Create `.env` File

Create a file named `.env` in the root directory (`d:\New folder (7)\.env`) with the following content:

```env
# Database (MongoDB)
# For local MongoDB:
DATABASE_URL="mongodb://localhost:27017/uraerotech?retryWrites=true&w=majority"

# For MongoDB Atlas (cloud), use this format instead:
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/uraerotech?retryWrites=true&w=majority"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32

# Stripe (optional for now)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: 
- If you have MongoDB running locally, use the first `DATABASE_URL`
- If you're using MongoDB Atlas (cloud), replace with your connection string
- Generate a secret for `NEXTAUTH_SECRET` using: `openssl rand -base64 32` (or use any random string for development)

### 3. Regenerate Prisma Client

After creating the `.env` file, run:

```bash
npm run db:generate
```

### 4. Push Schema to Database

If you have MongoDB running, push the schema:

```bash
npm run db:push
```

### 5. Seed Database (Optional)

To populate with initial data:

```bash
npm run db:seed
```

### 6. Restart Development Server

```bash
npm run dev
```

## If You Don't Have MongoDB Yet:

### Option 1: Install Local MongoDB
- Download from: https://www.mongodb.com/try/download/community
- Or use Docker: `docker run -d -p 27017:27017 --name mongodb mongo`

### Option 2: Use MongoDB Atlas (Free Cloud)
1. Sign up at: https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `DATABASE_URL` in `.env`

## Troubleshooting

**If you still get the error:**
1. Make sure the dev server is completely stopped
2. Delete `node_modules/.prisma` folder: `rmdir /s node_modules\.prisma`
3. Run `npm run db:generate` again
4. Restart the dev server

**If MongoDB connection fails:**
- Verify MongoDB is running (if local): `mongosh` or check services
- Check connection string format
- For Atlas: Ensure IP whitelist allows your IP address






