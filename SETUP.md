# UR Aerotech Platform - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. Set up MongoDB:
   - **Local MongoDB**: Install MongoDB locally or use Docker
   - **MongoDB Atlas** (Cloud): Create a free cluster at https://www.mongodb.com/cloud/atlas
   
2. Copy `.env.example` to `.env`
3. Update `DATABASE_URL` in `.env`:

   For local MongoDB:
   ```env
   DATABASE_URL="mongodb://localhost:27017/uraerotech?retryWrites=true&w=majority"
   ```

   For MongoDB Atlas:
   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/uraerotech?retryWrites=true&w=majority"
   ```

4. Generate Prisma Client and push schema:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 3. Authentication Setup

Generate a NextAuth secret:

```bash
openssl rand -base64 32
```

Add to `.env`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-here
```

### 4. Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Add to `.env`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...  # For webhook endpoint
```

4. Set up webhook endpoint in Stripe Dashboard:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 📁 Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Customer portal
│   ├── products/          # Product pages
│   ├── services/          # Service pages
│   └── ...
├── components/            # React components
├── lib/                  # Core libraries (Prisma, Auth, Stripe)
├── prisma/               # Database schema and migrations
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── middleware.ts         # Next.js middleware for auth
```

## 🔐 Default Credentials

After seeding:

- **Admin**: `admin@uraerotech.com` / `admin123`
- **B2B User**: `b2b@example.com` / `admin123`

## 🎯 Key Features

✅ **Marketing Homepage** - Hero, services, products showcase
✅ **Services System** - Dynamic service pages with CMS-ready structure
✅ **Product Catalog** - Full product system with filtering, search, pagination
✅ **Customer Portal** - Dashboard, orders, quotes for B2B and B2C users
✅ **Admin Dashboard** - Manage products, orders, quotes, users
✅ **Quote System** - Request quotes, admin review, status tracking
✅ **Stripe Integration** - Secure payment processing with webhooks
✅ **Role-Based Access** - Admin, B2B, B2C user roles
✅ **Authentication** - NextAuth with credentials provider

## 🛠️ Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:migrate   # Create migration
npm run db:seed      # Seed database
```

## 📝 Environment Variables

Required environment variables (see `.env.example`):

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your app URL
- `NEXTAUTH_SECRET` - NextAuth secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `NEXT_PUBLIC_APP_URL` - Your app URL (for redirects)

## 🚢 Production Deployment

1. Set up MongoDB database (MongoDB Atlas recommended for production)
2. Update environment variables in your hosting platform
3. Push schema: `npm run db:push`
4. Seed initial data: `npm run db:seed`
5. Deploy to Vercel, Netlify, or your preferred platform

**Note**: MongoDB with Prisma uses `db:push` instead of migrations. For production, ensure your MongoDB connection string is secure and uses authentication.

## 📚 Next Steps

1. Customize the design to match your brand
2. Add product images to `/public/images/products/`
3. Configure email service for quote notifications
4. Set up analytics (Google Analytics, etc.)
5. Configure CDN for images
6. Set up monitoring and error tracking

## 🆘 Troubleshooting

**Database connection issues:**
- Verify `DATABASE_URL` is correct
- Ensure MongoDB is running (if local) or cluster is accessible (if Atlas)
- Check firewall settings for MongoDB Atlas
- Verify connection string format matches MongoDB requirements

**Authentication not working:**
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain

**Stripe webhooks failing:**
- Verify webhook secret in `.env`
- Check webhook URL in Stripe Dashboard
- Ensure endpoint is publicly accessible

## 📞 Support

For issues or questions, refer to the documentation or contact the development team.

