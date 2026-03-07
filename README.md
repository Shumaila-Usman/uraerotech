# UR Aerotech - Aircraft Structural Repair Platform

Production-ready aviation company platform for aircraft structural repair, parts sales, and tool rentals.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma ORM**
- **MongoDB**
- **NextAuth (Auth.js)**
- **Stripe** (Payment Integration)

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or MongoDB Atlas)
- Stripe account (for payments)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your:
- Database connection string
- NextAuth secret (generate with: `openssl rand -base64 32`)
- Stripe API keys

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app              - Next.js App Router pages
/components       - Reusable React components
/lib              - Utility libraries and configurations
/prisma           - Database schema and migrations
/types            - TypeScript type definitions
/utils            - Helper functions
/hooks            - Custom React hooks
/middleware       - Next.js middleware
```

## Features

- 🏠 Marketing homepage with hero section
- 🔧 Services system with dynamic routes
- 🛒 Product catalog with filtering and search
- 👤 Customer portal (B2B & B2C)
- 👨‍💼 Admin dashboard
- 💰 Quote request system
- 💳 Stripe payment integration
- 🔐 Role-based authentication

## Default Credentials

- Admin: `admin@uraerotech.com` / `admin123`
- B2B User: `b2b@example.com` / `admin123`

## License

Proprietary - UR Aerotech

