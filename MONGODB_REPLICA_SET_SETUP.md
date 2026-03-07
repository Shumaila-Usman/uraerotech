# MongoDB Replica Set Setup for Local Development

## The Issue
Prisma requires MongoDB to run as a replica set for write operations. Your local MongoDB is running in standalone mode.

## Solution Options

### Option 1: Configure Local MongoDB as Replica Set (Quick Fix)

1. **Stop your MongoDB service:**
   ```bash
   # Windows (if running as service)
   net stop MongoDB
   
   # Or if running manually, stop the process
   ```

2. **Start MongoDB as a replica set:**
   ```bash
   mongod --replSet rs0 --port 27017 --dbpath "C:\data\db"
   ```
   
   Replace `C:\data\db` with your actual MongoDB data directory path.

3. **In a new terminal, initialize the replica set:**
   ```bash
   mongosh
   ```
   
   Then run:
   ```javascript
   rs.initiate({
     _id: "rs0",
     members: [
       { _id: 0, host: "localhost:27017" }
     ]
   })
   ```
   
   You should see: `{ ok: 1 }`

4. **Verify it's working:**
   ```javascript
   rs.status()
   ```
   
   You should see the replica set status.

5. **Now run the seed command again:**
   ```bash
   npm run db:seed
   ```

### Option 2: Use MongoDB Atlas (Easier - Recommended)

MongoDB Atlas automatically runs as a replica set, so you don't need to configure anything.

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Get your connection string
5. Update your `.env` file:
   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/uraerotech?retryWrites=true&w=majority"
   ```
6. Run:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

### Option 3: Use Docker with Replica Set (Alternative)

If you have Docker installed:

```bash
docker run -d --name mongodb -p 27017:27017 mongo:latest --replSet rs0
docker exec -it mongodb mongosh --eval "rs.initiate()"
```

Then wait a few seconds and run:
```bash
npm run db:seed
```

## After Setting Up Replica Set

Once MongoDB is configured as a replica set, run:

```bash
npm run db:seed
```

This will create:
- ✅ 10 product categories
- ✅ 4 sample products
- ✅ 6 services
- ✅ Admin user (admin@uraerotech.com / admin123)
- ✅ B2B user (b2b@example.com / admin123)


