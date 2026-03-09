# MongoDB Atlas Import Guide

This guide explains how to import your local MongoDB backup into MongoDB Atlas for production deployment.

## Prerequisites

- MongoDB backup/export file (JSON, BSON, or directory)
- MongoDB Atlas account and cluster set up
- MongoDB connection string from Atlas

## Understanding Your Backup Format

MongoDB backups can be in different formats:

1. **JSON files** - Individual collection exports (`.json`)
2. **BSON files** - Binary format exports (`.bson`)
3. **Directory structure** - Full database backup with multiple files

## Method 1: Using MongoDB Compass (Easiest - GUI)

### Step 1: Install MongoDB Compass

1. Download from: https://www.mongodb.com/try/download/compass
2. Install and open MongoDB Compass

### Step 2: Connect to MongoDB Atlas

1. Open MongoDB Compass
2. Paste your MongoDB Atlas connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/uraerotech
   ```
3. Click **"Connect"**

### Step 3: Import Collections

For each collection in your backup:

1. **Select your database** (`uraerotech`) in the left sidebar
2. **Click on a collection** (or create new if it doesn't exist)
3. **Click "Add Data"** → **"Import File"**
4. **Select your backup file** (JSON or CSV)
5. **Choose import options:**
   - File type: JSON or CSV
   - Input file type: Array of documents or Single JSON object
6. **Click "Import"**

**Repeat for each collection:**
- User
- Product
- Category
- Service
- Quote
- Order
- OrderItem
- Account (NextAuth)
- Session (NextAuth)
- VerificationToken (NextAuth)

## Method 2: Using mongorestore (Command Line - Recommended for Full Backups)

### Step 1: Install MongoDB Database Tools

**macOS:**
```bash
brew install mongodb-database-tools
```

**Windows:**
1. Download from: https://www.mongodb.com/try/download/database-tools
2. Extract and add to PATH

**Linux:**
```bash
# Ubuntu/Debian
wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2204-x86_64-100.9.4.tgz
tar -xzf mongodb-database-tools-*.tgz
export PATH=$PATH:$(pwd)/mongodb-database-tools-ubuntu2204-x86_64-100.9.4/bin
```

### Step 2: Prepare Your Backup

If your backup is a directory structure like:
```
backup/
  uraerotech/
    User.bson
    User.metadata.json
    Product.bson
    Product.metadata.json
    ...
```

### Step 3: Restore to MongoDB Atlas

```bash
mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net/uraerotech" \
  --drop \
  /path/to/your/backup/uraerotech
```

**Parameters:**
- `--uri`: Your MongoDB Atlas connection string
- `--drop`: Drops existing collections before importing (optional, be careful!)
- Last argument: Path to your backup directory

**Example:**
```bash
mongorestore --uri="mongodb+srv://myuser:mypass@cluster0.xxxxx.mongodb.net/uraerotech" \
  --drop \
  ./mongodb-backup/uraerotech
```

### Step 4: Verify Import

After import, verify in MongoDB Compass or using mongosh:

```bash
mongosh "mongodb+srv://username:password@cluster.mongodb.net/uraerotech"

# Check collections
show collections

# Count documents
db.User.countDocuments()
db.Product.countDocuments()
db.Category.countDocuments()
```

## Method 3: Using mongoimport (For Individual JSON Files)

If you have individual JSON files for each collection:

```bash
# Import Users
mongoimport --uri="mongodb+srv://username:password@cluster.mongodb.net/uraerotech" \
  --collection=User \
  --file=User.json \
  --jsonArray

# Import Products
mongoimport --uri="mongodb+srv://username:password@cluster.mongodb.net/uraerotech" \
  --collection=Product \
  --file=Product.json \
  --jsonArray

# Import Categories
mongoimport --uri="mongodb+srv://username:password@cluster.mongodb.net/uraerotech" \
  --collection=Category \
  --file=Category.json \
  --jsonArray

# Continue for other collections...
```

**Parameters:**
- `--uri`: MongoDB Atlas connection string
- `--collection`: Collection name
- `--file`: Path to JSON file
- `--jsonArray`: If JSON file contains array of documents

## Method 4: Using MongoDB Atlas Data Import (Web Interface)

### Step 1: Access Atlas Data Import

1. Go to your MongoDB Atlas cluster
2. Click **"Browse Collections"**
3. Click **"Add My Own Data"**
4. Create database: `uraerotech`

### Step 2: Import Collections

1. For each collection:
   - Click **"Create Collection"**
   - Enter collection name (e.g., `User`, `Product`)
   - Click **"Create"**
   - Click on the collection
   - Click **"Import File"**
   - Upload your JSON/CSV file
   - Configure import settings
   - Click **"Import"**

**Note:** This method is slower for large datasets but doesn't require CLI tools.

## Method 5: Using Script (For Programmatic Import)

Create a Node.js script to import data:

```javascript
// import-data.js
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

async function importData() {
  try {
    await client.connect();
    const db = client.db('uraerotech');

    // Import Users
    const users = JSON.parse(fs.readFileSync('./backup/User.json', 'utf8'));
    await db.collection('User').insertMany(users);
    console.log(`✅ Imported ${users.length} users`);

    // Import Products
    const products = JSON.parse(fs.readFileSync('./backup/Product.json', 'utf8'));
    await db.collection('Product').insertMany(products);
    console.log(`✅ Imported ${products.length} products`);

    // Continue for other collections...
    
  } catch (error) {
    console.error('Import error:', error);
  } finally {
    await client.close();
  }
}

importData();
```

Run with:
```bash
DATABASE_URL="mongodb+srv://..." node import-data.js
```

## Verifying Your Import

### Check Document Counts

```javascript
// In MongoDB Compass or mongosh
use uraerotech

db.User.countDocuments()
db.Product.countDocuments()
db.Category.countDocuments()
db.Service.countDocuments()
db.Quote.countDocuments()
db.Order.countDocuments()
```

### Check Sample Documents

```javascript
// View sample documents
db.User.findOne()
db.Product.findOne()
db.Category.findOne()
```

### Verify Relationships

```javascript
// Check if products have valid category references
db.Product.aggregate([
  {
    $lookup: {
      from: "Category",
      localField: "categoryId",
      foreignField: "_id",
      as: "category"
    }
  },
  {
    $match: {
      category: { $size: 0 }
    }
  }
])
```

## Common Issues and Solutions

### Issue: "Authentication failed"

**Solution:**
- Verify username and password in connection string
- Check database user has correct permissions
- Ensure IP address is whitelisted in Network Access

### Issue: "Collection already exists"

**Solution:**
- Use `--drop` flag with mongorestore
- Or manually drop collections before import:
  ```javascript
  db.User.drop()
  db.Product.drop()
  ```

### Issue: "Invalid ObjectId format"

**Solution:**
- Ensure `_id` fields are valid ObjectIds
- If using string IDs, convert them:
  ```javascript
  const { ObjectId } = require('mongodb');
  const id = new ObjectId(stringId);
  ```

### Issue: "Connection timeout"

**Solution:**
- Check network connectivity
- Verify MongoDB Atlas cluster is running
- Check firewall settings
- Try from different network

### Issue: "Data type mismatch"

**Solution:**
- Verify data types match Prisma schema
- Check dates are in ISO format
- Ensure numbers are not strings

## Post-Import Checklist

After importing your data:

- [ ] Verify all collections imported
- [ ] Check document counts match backup
- [ ] Verify relationships (foreign keys)
- [ ] Test queries in MongoDB Compass
- [ ] Update indexes if needed:
  ```javascript
  db.User.createIndex({ email: 1 }, { unique: true })
  db.Product.createIndex({ slug: 1 }, { unique: true })
  ```
- [ ] Test application connection
- [ ] Verify products appear on website
- [ ] Test user registration and login

## Best Practices

1. **Backup before import**: Always backup existing data before importing
2. **Test in staging first**: Import to a test database first
3. **Verify data integrity**: Check relationships and constraints
4. **Monitor performance**: Watch for slow queries after import
5. **Set up regular backups**: Configure MongoDB Atlas automated backups

## Next Steps

After successful import:

1. Update your Vercel environment variables with MongoDB Atlas connection string
2. Deploy your application to Vercel
3. Test all functionality (products, users, orders)
4. Monitor application logs for any issues

---

**Your data is now in MongoDB Atlas! 🎉**


