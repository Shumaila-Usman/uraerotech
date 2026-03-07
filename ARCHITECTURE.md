# UR Aerotech Platform - Architecture Documentation

## 🏗️ System Architecture

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js (Auth.js)
- **Payments**: Stripe
- **Validation**: Zod

### Folder Structure

```
/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   ├── auth/                # NextAuth endpoints
│   │   ├── checkout/            # Stripe checkout
│   │   ├── quotes/              # Quote management
│   │   └── webhooks/            # Stripe webhooks
│   ├── admin/                   # Admin dashboard
│   │   ├── quotes/              # Quote management
│   │   └── [id]/                # Quote detail
│   ├── auth/                    # Authentication
│   │   └── signin/              # Sign in page
│   ├── checkout/                # Checkout flow
│   ├── dashboard/               # Customer portal
│   ├── products/                # Product catalog
│   │   └── [slug]/              # Product detail
│   ├── services/                # Services
│   │   └── [slug]/              # Service detail
│   ├── about/                   # About page
│   ├── contact/                 # Contact page
│   ├── quote/                   # Quote request
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── providers.tsx            # Client providers
├── components/                  # React Components
│   ├── Navbar.tsx               # Navigation bar
│   ├── Footer.tsx               # Footer
│   ├── Hero.tsx                  # Homepage hero
│   ├── ServicesSection.tsx      # Services showcase
│   ├── PartsToolsSection.tsx    # Products showcase
│   ├── CTASection.tsx           # Call-to-action
│   ├── ProductFilters.tsx       # Product filtering
│   ├── AddToCartButton.tsx      # Add to cart
│   └── QuoteActions.tsx         # Quote management
├── lib/                         # Core Libraries
│   ├── prisma.ts                # Prisma client
│   ├── auth.ts                  # NextAuth config
│   └── stripe.ts                # Stripe client
├── prisma/                      # Database
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Seed data
├── types/                       # TypeScript Types
│   ├── index.ts                 # Shared types
│   └── next-auth.d.ts           # NextAuth types
├── utils/                       # Utilities
│   ├── format.ts                # Formatting functions
│   └── validation.ts            # Zod schemas
└── middleware.ts                # Next.js middleware
```

## 🗄️ Database Schema

### Models

1. **User** - User accounts with roles (ADMIN, B2B, B2C)
2. **Account** - OAuth accounts (NextAuth)
3. **Session** - User sessions (NextAuth)
4. **Category** - Product categories
5. **Product** - Products for sale
6. **Service** - Services offered
7. **Quote** - Quote requests
8. **Order** - Customer orders
9. **OrderItem** - Order line items

### Relationships

- User → Orders (one-to-many)
- User → Quotes (one-to-many)
- Category → Products (one-to-many)
- Order → OrderItems (one-to-many)
- OrderItem → Product (many-to-one)

## 🔐 Authentication Flow

1. User submits credentials on `/auth/signin`
2. NextAuth validates with Prisma
3. JWT token created with user role
4. Middleware protects routes based on role
5. Session available via `useSession()` hook

### Role-Based Access

- **ADMIN**: Full access to admin dashboard
- **B2B**: Business client portal
- **B2C**: Customer portal

## 💳 Payment Flow

1. User clicks "Add to Cart" on product
2. Redirected to `/checkout`
3. API creates Stripe checkout session
4. User redirected to Stripe payment page
5. After payment, Stripe webhook fires
6. Webhook handler creates order in database
7. User redirected to success page

## 📋 Quote System Flow

1. User fills quote request form
2. Quote saved to database with PENDING status
3. Admin reviews quote in dashboard
4. Admin can approve/reject with notes
5. Status updated in database
6. User can view status in dashboard

## 🔒 Security Features

- **Input Validation**: Zod schemas for all inputs
- **Role-Based Access**: Middleware protects routes
- **Secure Sessions**: NextAuth with JWT
- **SQL Injection Protection**: Prisma ORM
- **XSS Protection**: React auto-escaping
- **CSRF Protection**: NextAuth built-in

## 🚀 Performance Optimizations

- **Server Components**: Used where possible
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with App Router
- **Database Indexing**: On frequently queried fields
- **Pagination**: For product listings

## 📊 Scalability Considerations

- **Database Indexes**: On slug, category, status fields
- **Pagination**: All list endpoints support pagination
- **Caching**: Can add Redis for session/store caching
- **CDN**: Ready for image CDN integration
- **Horizontal Scaling**: Stateless architecture

## 🔄 API Routes

### Public Routes
- `GET /api/quotes` - Get quotes (auth required)
- `POST /api/quotes` - Create quote

### Protected Routes
- `POST /api/checkout` - Create Stripe session
- `PATCH /api/quotes/[id]` - Update quote (admin only)

### Webhooks
- `POST /api/webhooks/stripe` - Stripe webhook handler

## 🎨 Design System

### Colors
- **Aviation Blue**: Primary brand color
- **Gradient**: Dark blue to purple
- **Glassmorphism**: Translucent cards with blur

### Components
- **Cards**: Rounded-xl with glassmorphism
- **Buttons**: Gradient with glow effects
- **Navbar**: Fixed glassmorphism header
- **Typography**: Bold headlines, clean sans-serif

## 📈 Future Enhancements

- [ ] Email notifications (SendGrid/Resend)
- [ ] Product image upload
- [ ] Shopping cart persistence
- [ ] Order tracking
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Mobile app API
- [ ] Inventory management
- [ ] Supplier integration

