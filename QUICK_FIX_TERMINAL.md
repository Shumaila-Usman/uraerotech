# Quick Fix: Terminal Directory Issue

## Problem
The terminal was in the wrong directory. Your project structure is:
```
D:\uraerotech_website-main\
  └── uraerotech_website-main\  ← Actual project is here
      ├── package.json
      ├── app/
      └── ...
```

## Solution

**Always run commands from the correct directory:**

```powershell
cd "d:\uraerotech_website-main\uraerotech_website-main"
npm run dev
```

## Important: Set Up Environment Variables

Before running the project, you need a `.env` file in the project root:

1. **Create `.env` file** in `d:\uraerotech_website-main\uraerotech_website-main\`

2. **Add these variables:**
```env
# Database (MongoDB)
DATABASE_URL="mongodb://localhost:27017/uraerotech?retryWrites=true&w=majority"
# OR for MongoDB Atlas:
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/uraerotech?retryWrites=true&w=majority"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here-generate-with-openssl-rand-base64-32"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

3. **Generate NextAuth secret:**
```powershell
# In PowerShell:
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Or use: https://generate-secret.vercel.app/32

## Running the Project

1. **Navigate to correct directory:**
   ```powershell
   cd "d:\uraerotech_website-main\uraerotech_website-main"
   ```

2. **Install dependencies (if not done):**
   ```powershell
   npm install
   ```

3. **Set up database:**
   ```powershell
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

4. **Run development server:**
   ```powershell
   npm run dev
   ```

5. **Open browser:**
   Visit: http://localhost:3000

## Common Errors

### "Cannot find module 'next/link'"
- **Fix:** Run `npm install` in the correct directory

### "DATABASE_URL is not set"
- **Fix:** Create `.env` file with `DATABASE_URL` variable

### "NEXTAUTH_SECRET is missing"
- **Fix:** Add `NEXTAUTH_SECRET` to `.env` file

### "npm error ENOENT: no such file or directory"
- **Fix:** Make sure you're in `d:\uraerotech_website-main\uraerotech_website-main\` directory


