# Database Setup Guide

## ⚠️ Important: No Database Has Been Created Yet

You need to set up a MongoDB database before products can be displayed. Here are your options:

## Option 1: MongoDB Atlas (Cloud - Recommended for Quick Start)

1. **Create a free MongoDB Atlas account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account
   - Create a new cluster (choose the free tier)

2. **Get your connection string:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

3. **Create a `.env` file in the project root:**
   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/uraerotech?retryWrites=true&w=majority"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

4. **Generate NextAuth secret:**
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and paste it as `NEXTAUTH_SECRET` in your `.env` file.

## Option 2: Local MongoDB

1. **Install MongoDB locally:**
   - Download from: https://www.mongodb.com/try/download/community
   - Or use Docker: `docker run -d -p 27017:27017 --name mongodb mongo`

2. **Create a `.env` file:**
   ```env
   DATABASE_URL="mongodb://localhost:27017/uraerotech?retryWrites=true&w=majority"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

## After Setting Up Database Connection:

1. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

2. **Push the database schema:**
   ```bash
   npx prisma db push
   ```

3. **Seed the database with sample data:**
   ```bash
   npm run db:seed
   ```

4. **Start your development server:**
   ```bash
   npm run dev
   ```

## Verify Database Connection:

After running `npx prisma db push`, you should see:
- ✅ Database schema created
- ✅ Collections created in MongoDB

After running `npm run db:seed`, you should see:
- ✅ Categories created
- ✅ Sample products created
- ✅ Admin user created

## Troubleshooting:

- **"No products found"**: Make sure you've run `npm run db:seed` to add sample products
- **Connection errors**: Check your `DATABASE_URL` in `.env` file
- **Prisma errors**: Make sure you've run `npx prisma generate` first


