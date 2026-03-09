# File Storage Setup Guide

## ✅ Migration Complete: MongoDB → File Storage

Your project has been successfully migrated from MongoDB/Prisma to file-based storage. All data is now stored in JSON files in the `data/db/` directory.

## 📁 Data Storage Location

All data is stored in: `data/db/`

Files created:
- `Category.json` - Product categories
- `Product.json` - Products
- `User.json` - User accounts
- `Quote.json` - Quote requests
- `Order.json` - Orders
- `OrderItem.json` - Order items
- `Service.json` - Services

## 🚀 Quick Start

### 1. Seed the Database

Run the seed script to create sample data:

```bash
npm run db:seed
```

This will create:
- ✅ 10 product categories
- ✅ 6 sample products
- ✅ Admin user: `admin@uraerotech.com` / `admin123`
- ✅ B2B user: `b2b@example.com` / `admin123`

### 2. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 🔧 Environment Variables

Your `.env` file now only needs:

```env
# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**No database connection string needed!** All data is stored in files.

## 📝 What Changed

### Removed:
- ❌ MongoDB database connection
- ❌ Prisma ORM
- ❌ Stripe payment integration
- ❌ All Stripe dependencies

### Added:
- ✅ File-based database system (`lib/file-db.ts`)
- ✅ JSON file storage in `data/db/`
- ✅ Simple checkout (creates order directly, no payment processing)
- ✅ Type definitions (`types/file-db.d.ts`)

### Updated:
- ✅ All API routes now use `fileDb` instead of `prisma`
- ✅ All pages updated to use file storage
- ✅ Authentication uses file storage
- ✅ Checkout creates orders directly (no Stripe)

## 🗂️ File Structure

```
data/
  db/
    Category.json    # Product categories
    Product.json      # Products
    User.json         # User accounts
    Quote.json        # Quote requests
    Order.json        # Orders
    OrderItem.json    # Order line items
    Service.json      # Services
```

## 💾 How It Works

1. **Data Storage**: All data is stored as JSON files
2. **Operations**: Use `fileDb` helper functions:
   - `fileDb.findMany()` - Get all items
   - `fileDb.findUnique()` - Find one item
   - `fileDb.create()` - Create new item
   - `fileDb.update()` - Update item
   - `fileDb.delete()` - Delete item
   - `fileDb.count()` - Count items

3. **Automatic IDs**: IDs are auto-generated
4. **Timestamps**: `createdAt` and `updatedAt` are automatically added

## 🔄 Backup & Restore

### Backup:
Simply copy the `data/db/` directory:

```bash
# Windows
xcopy data\db backup\db /E /I

# Or manually copy the folder
```

### Restore:
Copy the backup files back to `data/db/`

## ⚠️ Important Notes

1. **File Permissions**: Make sure the `data/db/` directory is writable
2. **Git**: The `data/db/` directory should be in `.gitignore` (data is local)
3. **Production**: For production, consider using a proper database or cloud storage
4. **Concurrency**: File storage works fine for single-server deployments

## 🐛 Troubleshooting

### "Cannot find module '@/lib/file-db'"
- Make sure `lib/file-db.ts` exists
- Restart your dev server

### "Data not persisting"
- Check if `data/db/` directory exists and is writable
- Check file permissions

### "Products not showing"
- Run `npm run db:seed` to create sample data
- Check if `data/db/Product.json` exists

## 📚 Next Steps

1. Run `npm run db:seed` to populate initial data
2. Start the dev server: `npm run dev`
3. Test the application:
   - View products
   - Register a user
   - Create a quote
   - Place an order

---

**Your project now uses file storage instead of MongoDB! 🎉**


