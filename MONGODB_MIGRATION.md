# MongoDB Migration Guide

## ✅ Database Converted to MongoDB

The platform has been successfully migrated from PostgreSQL to MongoDB.

## Changes Made

### 1. Prisma Schema Updates

- **Datasource**: Changed from `postgresql` to `mongodb`
- **ID Fields**: All model IDs now use MongoDB ObjectId format:
  ```prisma
  id String @id @default(auto()) @map("_id") @db.ObjectId
  ```
- **Foreign Keys**: All foreign key fields now use `@db.ObjectId`
- **Text Fields**: Removed `@db.Text` annotations (not needed in MongoDB)
- **Relations**: Updated to MongoDB-compatible format
- **Indexes**: Maintained for performance optimization

### 2. Connection String Format

**Local MongoDB:**
```env
DATABASE_URL="mongodb://localhost:27017/uraerotech?retryWrites=true&w=majority"
```

**MongoDB Atlas (Cloud):**
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/uraerotech?retryWrites=true&w=majority"
```

### 3. Database Operations

MongoDB with Prisma uses `db:push` instead of migrations:

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to MongoDB
npm run db:push

# Seed database
npm run db:seed
```

**Note**: Unlike PostgreSQL, MongoDB doesn't use traditional migrations. Use `db:push` to sync your schema.

## Models Converted

All 9 models have been converted:
- ✅ User
- ✅ Account (NextAuth)
- ✅ Session (NextAuth)
- ✅ VerificationToken (NextAuth)
- ✅ Category
- ✅ Product
- ✅ Service
- ✅ Quote
- ✅ Order
- ✅ OrderItem

## Key Differences from PostgreSQL

1. **No Foreign Key Constraints**: MongoDB doesn't enforce referential integrity at the database level
2. **ObjectId IDs**: All IDs are now MongoDB ObjectIds instead of CUIDs
3. **No Migrations**: Use `db:push` to sync schema changes
4. **Flexible Schema**: MongoDB allows schema evolution more easily
5. **No Transactions by Default**: MongoDB transactions require replica sets (Atlas provides this)

## Setup Instructions

1. **Install MongoDB** (if using locally):
   - Download from https://www.mongodb.com/try/download/community
   - Or use Docker: `docker run -d -p 27017:27017 --name mongodb mongo`

2. **Or Use MongoDB Atlas** (recommended for production):
   - Sign up at https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get your connection string

3. **Update Environment Variables**:
   ```env
   DATABASE_URL="your-mongodb-connection-string"
   ```

4. **Initialize Database**:
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

## Benefits of MongoDB

- ✅ **Flexible Schema**: Easy to evolve data models
- ✅ **Horizontal Scaling**: Built for distributed systems
- ✅ **JSON-like Documents**: Natural fit for JavaScript/TypeScript
- ✅ **Atlas Free Tier**: Free cloud hosting option
- ✅ **Rich Query Language**: Powerful aggregation pipeline

## Production Considerations

1. **Use MongoDB Atlas** for production (free tier available)
2. **Enable Authentication** on your MongoDB instance
3. **Use Connection String with Credentials** (not localhost)
4. **Set up Replica Set** for transactions (Atlas provides this)
5. **Configure Indexes** for optimal query performance (already set in schema)

## Troubleshooting

**Connection Issues:**
- Verify MongoDB is running (if local)
- Check connection string format
- Ensure network access is allowed (for Atlas)

**Schema Push Issues:**
- Clear Prisma cache: `rm -rf node_modules/.prisma`
- Regenerate client: `npm run db:generate`
- Try pushing again: `npm run db:push`

**Seed Issues:**
- Ensure database is accessible
- Check that collections don't already exist (or clear them first)

## Next Steps

1. Set up your MongoDB instance (local or Atlas)
2. Update `.env` with your connection string
3. Run `npm run db:push` to create collections
4. Run `npm run db:seed` to populate initial data
5. Start development: `npm run dev`

---

**Migration completed successfully!** 🎉






