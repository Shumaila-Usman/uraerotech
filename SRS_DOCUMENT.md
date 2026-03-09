# Software Requirements Specification (SRS)
## UR Aerotech - Aircraft Structural Repair Platform

**Document Version:** 1.0  
**Date:** 2024  
**Prepared For:** UR Aerotech  
**Prepared By:** Development Team

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [System Features](#3-system-features)
4. [External Interface Requirements](#4-external-interface-requirements)
5. [System Requirements](#5-system-requirements)
6. [Functional Requirements](#6-functional-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Database Requirements](#8-database-requirements)
9. [Security Requirements](#9-security-requirements)
10. [User Roles and Permissions](#10-user-roles-and-permissions)
11. [API Specifications](#11-api-specifications)
12. [User Interface Requirements](#12-user-interface-requirements)
13. [Performance Requirements](#13-performance-requirements)
14. [Deployment Requirements](#14-deployment-requirements)
15. [Future Enhancements](#15-future-enhancements)

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) document provides a comprehensive description of the UR Aerotech Aircraft Structural Repair Platform. It details the functional and non-functional requirements, system architecture, user interfaces, and technical specifications necessary for the development, deployment, and maintenance of the platform.

### 1.2 Scope
The UR Aerotech platform is a comprehensive web-based system designed to facilitate:
- Aircraft structural repair services management
- Aircraft parts and tools sales
- Quote request and management system
- Customer portal for B2B and B2C users
- Administrative dashboard for business operations
- Payment processing integration
- Service catalog management

### 1.3 Definitions, Acronyms, and Abbreviations
- **SRS**: Software Requirements Specification
- **B2B**: Business-to-Business
- **B2C**: Business-to-Consumer
- **OEM**: Original Equipment Manufacturer
- **FAA**: Federal Aviation Administration
- **API**: Application Programming Interface
- **JWT**: JSON Web Token
- **RBAC**: Role-Based Access Control
- **ORM**: Object-Relational Mapping
- **UI/UX**: User Interface/User Experience

### 1.4 References
- Next.js 14 Documentation
- Prisma ORM Documentation
- NextAuth.js Documentation
- Stripe API Documentation
- MongoDB Documentation
- TypeScript Documentation

### 1.5 Overview
This document is organized into sections covering system overview, functional requirements, technical specifications, security requirements, and deployment guidelines. Each section provides detailed information necessary for understanding, developing, and maintaining the system.

---

## 2. Overall Description

### 2.1 Product Perspective
The UR Aerotech platform is a standalone web application built using modern web technologies. It integrates with:
- **MongoDB Database**: For data persistence
- **Stripe Payment Gateway**: For payment processing
- **NextAuth.js**: For authentication and session management
- **File Storage System**: For JSON-based data storage (alternative to database)

### 2.2 Product Functions
The platform provides the following major functions:

1. **Public Website**
   - Marketing homepage with company information
   - Services catalog and detailed service pages
   - Product catalog with filtering and search
   - About and contact pages
   - Quote request functionality

2. **User Authentication**
   - User registration and login
   - Role-based access control (Admin, B2B, B2C)
   - Session management
   - Password protection

3. **Customer Portal**
   - Order history and tracking
   - Quote request history
   - Account management
   - Dashboard with statistics

4. **Admin Dashboard**
   - Product management
   - Quote review and approval
   - Order management
   - User management
   - Analytics and reporting

5. **E-Commerce**
   - Product browsing and search
   - Shopping cart functionality
   - Checkout process
   - Payment processing
   - Order creation and tracking

6. **Quote Management**
   - Quote request submission
   - Admin review and approval
   - Status tracking
   - Admin notes and communication

### 2.3 User Classes and Characteristics

#### 2.3.1 Public Users (Unauthenticated)
- **Purpose**: Browse services, products, and company information
- **Access**: Public pages only
- **Characteristics**: General public, potential customers

#### 2.3.2 B2C Customers
- **Purpose**: Individual customers purchasing parts and tools
- **Access**: Customer portal, product catalog, order management
- **Characteristics**: Individual consumers, occasional buyers

#### 2.3.3 B2B Customers
- **Purpose**: Business clients with bulk purchasing needs
- **Access**: Customer portal, product catalog, order management, quote requests
- **Characteristics**: Business entities, frequent buyers, bulk orders

#### 2.3.4 Administrators
- **Purpose**: Manage platform operations, products, quotes, and orders
- **Access**: Full system access including admin dashboard
- **Characteristics**: Internal staff, technical users, business managers

### 2.4 Operating Environment
- **Server**: Node.js 18+ runtime environment
- **Database**: MongoDB (local or MongoDB Atlas)
- **Hosting**: Cloud platforms (Vercel recommended)
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile**: Responsive design for mobile devices

### 2.5 Design and Implementation Constraints
- Built using Next.js 14 App Router architecture
- TypeScript for type safety
- Server Components for optimal performance
- File-based database as fallback option
- RESTful API design
- Responsive design requirements
- Accessibility standards compliance

### 2.6 Assumptions and Dependencies
- MongoDB database is available and accessible
- Stripe account is configured with API keys
- Environment variables are properly configured
- Node.js and npm are installed on deployment server
- SSL certificate is available for HTTPS
- Email service provider for notifications (future enhancement)

---

## 3. System Features

### 3.1 Marketing Homepage (FR-001)
**Priority**: High  
**Description**: Public-facing homepage showcasing company services and capabilities.

**Functional Requirements**:
- Display hero section with company branding
- Showcase featured services (3+ services)
- Display parts and tools section
- Include "About Us" section
- Display call-to-action sections
- Show statistics and company achievements
- Responsive navigation bar with search functionality
- Footer with company links and information

**Components**:
- Hero component with animated elements
- ServicesSection component
- PartsToolsSection component
- AboutUsSection component
- CTASection component
- StatsSection component
- WhyChooseUs component

### 3.2 Services Management (FR-002)
**Priority**: High  
**Description**: System for managing and displaying aircraft services.

**Functional Requirements**:
- Services listing page (`/services`)
- Dynamic service detail pages (`/services/[slug]`)
- Service categories and filtering
- SEO-optimized metadata for each service
- Service images and content management
- Active/inactive service status

**Services Offered**:
1. Aircraft Structural Repair
2. Aircraft Structure Modifications
3. Aircraft Service Bulletin Compliance
4. Aircraft Parts Supply
5. Aviation Tools Sales
6. Aviation Tool Rental

**Data Model**:
- Service ID, name, slug, description
- Full content (markdown support)
- Images (primary and gallery)
- Active status flag
- Creation and update timestamps

### 3.3 Product Catalog (FR-003)
**Priority**: High  
**Description**: E-commerce product catalog with browsing, filtering, and search capabilities.

**Functional Requirements**:
- Product listing page with pagination
- Product detail pages (`/products/[slug]`)
- Category-based filtering
- Search functionality (name and description)
- Product images (multiple images per product)
- Stock management
- Featured products section
- Price display and formatting
- Category browsing

**Product Information**:
- Product name, description, slug
- Category association
- Price (floating point)
- Stock quantity
- Multiple images
- Featured status
- Creation and update timestamps

### 3.4 User Authentication (FR-004)
**Priority**: High  
**Description**: Secure user authentication and session management.

**Functional Requirements**:
- User registration (`/auth/signup`)
- User login (`/auth/signin`)
- Password hashing (bcrypt)
- Session management (NextAuth.js)
- Role-based access control
- Protected route middleware
- Logout functionality
- Email verification (future enhancement)

**User Roles**:
- ADMIN: Full system access
- B2B: Business customer access
- B2C: Consumer customer access

**Security Features**:
- Password encryption
- JWT token-based sessions
- CSRF protection
- Secure cookie handling

### 3.5 Customer Portal (FR-005)
**Priority**: High  
**Description**: Dashboard for authenticated customers to manage orders and quotes.

**Functional Requirements**:
- Dashboard overview (`/dashboard`)
- Order history with status tracking
- Quote request history
- Account information display
- Statistics (pending quotes, account type)
- Recent orders and quotes display
- Order detail view
- Quote detail view

**Dashboard Features**:
- Pending quotes count
- Account type display
- Recent orders (last 5)
- Recent quotes (last 5)
- Order status indicators
- Quote status indicators

### 3.6 Admin Dashboard (FR-006)
**Priority**: High  
**Description**: Administrative interface for managing platform operations.

**Functional Requirements**:
- Admin dashboard overview (`/admin`)
- Product management interface
- Quote management and review (`/admin/quotes`)
- Order management (`/admin/orders`)
- User management
- Analytics and statistics
- Quick action links

**Admin Features**:
- Total products count
- Total orders count
- Pending quotes count
- Total revenue calculation
- Recent orders display
- Pending quotes display
- Product CRUD operations
- Quote approval/rejection
- Order status updates

### 3.7 Quote Management System (FR-007)
**Priority**: High  
**Description**: System for customers to request quotes and admins to review them.

**Functional Requirements**:
- Quote request form (`/quote`)
- Quote submission with validation
- Quote storage in database
- Admin quote review interface
- Quote status management (Pending, Approved, Rejected)
- Admin notes functionality
- User quote history
- Email notifications (future enhancement)

**Quote Information**:
- Customer name, email, phone
- Company name (optional)
- Service type (Service or Product)
- Item ID reference
- Message/description
- Status (PENDING, APPROVED, REJECTED)
- Admin notes
- User association
- Timestamps

**Quote Workflow**:
1. Customer submits quote request
2. Quote saved with PENDING status
3. Admin reviews quote
4. Admin approves/rejects with notes
5. Customer views updated status

### 3.8 E-Commerce Functionality (FR-008)
**Priority**: High  
**Description**: Shopping cart, checkout, and order processing.

**Functional Requirements**:
- Add to cart functionality
- Checkout process (`/checkout`)
- Order creation
- Stock decrement on purchase
- Order confirmation page (`/checkout/success`)
- Order history
- Order status tracking

**Order Information**:
- User association
- Order items (products and quantities)
- Total amount
- Order status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- Shipping address
- Stripe session ID (for payment tracking)
- Timestamps

**Order Workflow**:
1. User adds product to cart
2. User proceeds to checkout
3. Order created with PENDING status
4. Stock decremented
5. Order confirmation displayed
6. Admin can update order status

### 3.9 Payment Integration (FR-009)
**Priority**: Medium  
**Description**: Integration with Stripe payment gateway (prepared for future implementation).

**Functional Requirements**:
- Stripe checkout session creation
- Payment processing
- Webhook handling for payment events
- Order creation on successful payment
- Payment confirmation

**Note**: Current implementation creates orders directly without payment processing. Stripe integration is prepared but not fully implemented.

### 3.10 Search and Filtering (FR-010)
**Priority**: Medium  
**Description**: Search and filter functionality for products and services.

**Functional Requirements**:
- Product search by name and description
- Category filtering
- Search results pagination
- Filter persistence in URL
- Real-time search (client-side)

**Search Features**:
- Case-insensitive search
- Partial match support
- Category-based filtering
- Combined search and filter

### 3.11 Responsive Design (FR-011)
**Priority**: High  
**Description**: Mobile-responsive design for all pages.

**Functional Requirements**:
- Responsive layout for mobile, tablet, and desktop
- Touch-friendly interface elements
- Mobile-optimized navigation
- Responsive images
- Adaptive typography

**Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 4. External Interface Requirements

### 4.1 User Interfaces
- **Web Browser Interface**: Modern, responsive web interface
- **Mobile Interface**: Responsive design for mobile devices
- **Admin Interface**: Dedicated admin dashboard

### 4.2 Hardware Interfaces
- Standard web server hardware
- Database server (MongoDB)
- CDN for static assets (optional)

### 4.3 Software Interfaces
- **Node.js Runtime**: Version 18 or higher
- **MongoDB**: Database server
- **Stripe API**: Payment processing (prepared)
- **NextAuth.js**: Authentication service
- **Prisma ORM**: Database access layer

### 4.4 Communication Interfaces
- **HTTP/HTTPS**: Web protocol
- **REST API**: API endpoints
- **WebSocket**: Future enhancement for real-time updates

---

## 5. System Requirements

### 5.1 Functional Requirements

#### FR-001: Public Website Access
- **Description**: Users can access public pages without authentication
- **Input**: HTTP request to public routes
- **Processing**: Server renders public pages
- **Output**: HTML page with content
- **Priority**: High

#### FR-002: User Registration
- **Description**: New users can create accounts
- **Input**: Name, email, password, role
- **Processing**: Validate input, hash password, create user record
- **Output**: User account created, redirect to dashboard
- **Priority**: High

#### FR-003: User Login
- **Description**: Authenticated users can log in
- **Input**: Email and password
- **Processing**: Verify credentials, create session
- **Output**: JWT token, redirect to dashboard
- **Priority**: High

#### FR-004: Product Browsing
- **Description**: Users can browse product catalog
- **Input**: Category filter, search query, page number
- **Processing**: Query database, filter results, paginate
- **Output**: Product list with pagination
- **Priority**: High

#### FR-005: Product Purchase
- **Description**: Authenticated users can purchase products
- **Input**: Product ID, quantity
- **Processing**: Check stock, create order, decrement stock
- **Output**: Order created, confirmation page
- **Priority**: High

#### FR-006: Quote Submission
- **Description**: Users can submit quote requests
- **Input**: Quote form data
- **Processing**: Validate input, create quote record
- **Output**: Quote created with PENDING status
- **Priority**: High

#### FR-007: Quote Review (Admin)
- **Description**: Admins can review and manage quotes
- **Input**: Quote ID, action (approve/reject), notes
- **Processing**: Update quote status and notes
- **Output**: Quote status updated
- **Priority**: High

#### FR-008: Order Management (Admin)
- **Description**: Admins can view and update orders
- **Input**: Order ID, new status
- **Processing**: Update order status in database
- **Output**: Order status updated
- **Priority**: High

#### FR-009: Product Management (Admin)
- **Description**: Admins can create, update, and delete products
- **Input**: Product data
- **Processing**: CRUD operations on product records
- **Output**: Product created/updated/deleted
- **Priority**: Medium

### 5.2 Non-Functional Requirements

#### NFR-001: Performance
- Page load time: < 2 seconds
- API response time: < 500ms
- Database query time: < 200ms
- Support for 1000+ concurrent users

#### NFR-002: Security
- All passwords encrypted (bcrypt)
- HTTPS required for production
- Input validation on all forms
- SQL injection protection (Prisma ORM)
- XSS protection (React)
- CSRF protection (NextAuth)

#### NFR-003: Reliability
- 99.9% uptime target
- Error handling for all operations
- Graceful degradation
- Data backup and recovery

#### NFR-004: Usability
- Intuitive navigation
- Clear error messages
- Responsive design
- Accessibility compliance (WCAG 2.1 Level AA)

#### NFR-005: Scalability
- Support for 10,000+ products
- Horizontal scaling capability
- Database indexing on key fields
- Pagination for large datasets

#### NFR-006: Maintainability
- TypeScript for type safety
- Modular code structure
- Comprehensive documentation
- Code comments and documentation

---

## 6. Functional Requirements

### 6.1 User Management

#### 6.1.1 User Registration
- **FR-USER-001**: System shall allow new users to register with email and password
- **FR-USER-002**: System shall validate email format and uniqueness
- **FR-USER-003**: System shall enforce password strength requirements
- **FR-USER-004**: System shall hash passwords using bcrypt before storage
- **FR-USER-005**: System shall assign default role (B2C) to new users

#### 6.1.2 User Authentication
- **FR-AUTH-001**: System shall authenticate users with email and password
- **FR-AUTH-002**: System shall create secure session tokens (JWT)
- **FR-AUTH-003**: System shall maintain session state
- **FR-AUTH-004**: System shall provide logout functionality
- **FR-AUTH-005**: System shall redirect unauthenticated users to login

#### 6.1.3 Role-Based Access
- **FR-RBAC-001**: System shall enforce role-based access control
- **FR-RBAC-002**: System shall restrict admin routes to ADMIN role
- **FR-RBAC-003**: System shall allow B2B and B2C access to customer portal
- **FR-RBAC-004**: System shall allow public access to marketing pages

### 6.2 Product Management

#### 6.2.1 Product Display
- **FR-PROD-001**: System shall display product catalog with pagination
- **FR-PROD-002**: System shall show product details on detail page
- **FR-PROD-003**: System shall display product images
- **FR-PROD-004**: System shall show product price and stock status
- **FR-PROD-005**: System shall support product search functionality

#### 6.2.2 Product Filtering
- **FR-FILTER-001**: System shall filter products by category
- **FR-FILTER-002**: System shall search products by name and description
- **FR-FILTER-003**: System shall combine search and category filters
- **FR-FILTER-004**: System shall maintain filter state in URL

#### 6.2.3 Product Administration
- **FR-ADMIN-PROD-001**: System shall allow admins to create products
- **FR-ADMIN-PROD-002**: System shall allow admins to update products
- **FR-ADMIN-PROD-003**: System shall allow admins to delete products
- **FR-ADMIN-PROD-004**: System shall validate product data on create/update

### 6.3 Order Management

#### 6.3.1 Order Creation
- **FR-ORDER-001**: System shall create orders when users purchase products
- **FR-ORDER-002**: System shall check product stock before order creation
- **FR-ORDER-003**: System shall decrement stock on successful order
- **FR-ORDER-004**: System shall associate orders with users
- **FR-ORDER-005**: System shall calculate order totals

#### 6.3.2 Order Display
- **FR-ORDER-DISP-001**: System shall display user's order history
- **FR-ORDER-DISP-002**: System shall show order status
- **FR-ORDER-DISP-003**: System shall display order items and quantities
- **FR-ORDER-DISP-004**: System shall show order totals and dates

#### 6.3.3 Order Administration
- **FR-ADMIN-ORDER-001**: System shall allow admins to view all orders
- **FR-ADMIN-ORDER-002**: System shall allow admins to update order status
- **FR-ADMIN-ORDER-003**: System shall display order statistics

### 6.4 Quote Management

#### 6.4.1 Quote Submission
- **FR-QUOTE-001**: System shall allow users to submit quote requests
- **FR-QUOTE-002**: System shall validate quote form data
- **FR-QUOTE-003**: System shall store quotes with PENDING status
- **FR-QUOTE-004**: System shall associate quotes with users (if authenticated)

#### 6.4.2 Quote Review
- **FR-QUOTE-REV-001**: System shall allow admins to view all quotes
- **FR-QUOTE-REV-002**: System shall allow admins to approve quotes
- **FR-QUOTE-REV-003**: System shall allow admins to reject quotes
- **FR-QUOTE-REV-004**: System shall allow admins to add notes to quotes

#### 6.4.3 Quote Display
- **FR-QUOTE-DISP-001**: System shall display user's quote history
- **FR-QUOTE-DISP-002**: System shall show quote status
- **FR-QUOTE-DISP-003**: System shall display quote details and admin notes

### 6.5 Service Management

#### 6.5.1 Service Display
- **FR-SERVICE-001**: System shall display services listing page
- **FR-SERVICE-002**: System shall show service detail pages
- **FR-SERVICE-003**: System shall display service images and content
- **FR-SERVICE-004**: System shall support SEO metadata for services

### 6.6 Dashboard Features

#### 6.6.1 Customer Dashboard
- **FR-DASH-001**: System shall display customer dashboard with statistics
- **FR-DASH-002**: System shall show recent orders
- **FR-DASH-003**: System shall show recent quotes
- **FR-DASH-004**: System shall display account information

#### 6.6.2 Admin Dashboard
- **FR-ADMIN-DASH-001**: System shall display admin dashboard with statistics
- **FR-ADMIN-DASH-002**: System shall show total products, orders, quotes
- **FR-ADMIN-DASH-003**: System shall display revenue statistics
- **FR-ADMIN-DASH-004**: System shall show recent orders and pending quotes

---

## 7. Non-Functional Requirements

### 7.1 Performance Requirements
- **NFR-PERF-001**: Homepage shall load within 2 seconds
- **NFR-PERF-002**: Product listing shall load within 1.5 seconds
- **NFR-PERF-003**: API endpoints shall respond within 500ms
- **NFR-PERF-004**: Database queries shall execute within 200ms
- **NFR-PERF-005**: System shall support 1000+ concurrent users
- **NFR-PERF-006**: Images shall be optimized and lazy-loaded

### 7.2 Security Requirements
- **NFR-SEC-001**: All passwords shall be hashed using bcrypt
- **NFR-SEC-002**: HTTPS shall be enforced in production
- **NFR-SEC-003**: All user inputs shall be validated
- **NFR-SEC-004**: SQL injection protection via Prisma ORM
- **NFR-SEC-005**: XSS protection via React sanitization
- **NFR-SEC-006**: CSRF protection via NextAuth
- **NFR-SEC-007**: Session tokens shall expire after inactivity
- **NFR-SEC-008**: API routes shall verify authentication

### 7.3 Reliability Requirements
- **NFR-REL-001**: System uptime target: 99.9%
- **NFR-REL-002**: Error handling for all operations
- **NFR-REL-003**: Graceful error messages to users
- **NFR-REL-004**: Database backup and recovery procedures
- **NFR-REL-005**: Logging for error tracking

### 7.4 Usability Requirements
- **NFR-USE-001**: Intuitive navigation structure
- **NFR-USE-002**: Clear and helpful error messages
- **NFR-USE-003**: Responsive design for all devices
- **NFR-USE-004**: Accessibility compliance (WCAG 2.1 Level AA)
- **NFR-USE-005**: Consistent UI/UX across all pages
- **NFR-USE-006**: Loading states for async operations

### 7.5 Scalability Requirements
- **NFR-SCAL-001**: Support for 10,000+ products
- **NFR-SCAL-002**: Horizontal scaling capability
- **NFR-SCAL-003**: Database indexing on frequently queried fields
- **NFR-SCAL-004**: Pagination for large datasets
- **NFR-SCAL-005**: Efficient database queries

### 7.6 Maintainability Requirements
- **NFR-MAIN-001**: TypeScript for type safety
- **NFR-MAIN-002**: Modular code structure
- **NFR-MAIN-003**: Comprehensive code documentation
- **NFR-MAIN-004**: Consistent coding standards
- **NFR-MAIN-005**: Version control with Git

---

## 8. Database Requirements

### 8.1 Database Schema

#### 8.1.1 User Model
```typescript
- id: ObjectId (Primary Key)
- name: String (Optional)
- email: String (Unique, Required)
- emailVerified: DateTime (Optional)
- image: String (Optional)
- role: UserRole (ADMIN | B2B | B2C, Default: B2C)
- password: String (Hashed, Optional)
- createdAt: DateTime
- updatedAt: DateTime
```

#### 8.1.2 Category Model
```typescript
- id: ObjectId (Primary Key)
- name: String (Required)
- slug: String (Unique, Required)
- description: String (Optional)
- createdAt: DateTime
- updatedAt: DateTime
```

#### 8.1.3 Product Model
```typescript
- id: ObjectId (Primary Key)
- name: String (Required)
- slug: String (Unique, Required)
- description: String (Required)
- categoryId: ObjectId (Foreign Key to Category)
- price: Float (Required)
- stock: Integer (Default: 0)
- images: String[] (Array of image URLs)
- isFeatured: Boolean (Default: false)
- createdAt: DateTime
- updatedAt: DateTime
```

#### 8.1.4 Service Model
```typescript
- id: ObjectId (Primary Key)
- name: String (Required)
- slug: String (Unique, Required)
- description: String (Required)
- content: String (Optional, Full page content)
- image: String (Optional)
- isActive: Boolean (Default: true)
- createdAt: DateTime
- updatedAt: DateTime
```

#### 8.1.5 Quote Model
```typescript
- id: ObjectId (Primary Key)
- userId: ObjectId (Foreign Key to User, Optional)
- name: String (Required)
- email: String (Required)
- phone: String (Optional)
- company: String (Optional)
- serviceType: String (Service | Product)
- itemId: String (Optional, Service ID or Product ID)
- message: String (Required)
- status: QuoteStatus (PENDING | APPROVED | REJECTED, Default: PENDING)
- adminNotes: String (Optional)
- createdAt: DateTime
- updatedAt: DateTime
```

#### 8.1.6 Order Model
```typescript
- id: ObjectId (Primary Key)
- userId: ObjectId (Foreign Key to User, Required)
- stripeSessionId: String (Unique, Optional)
- status: OrderStatus (PENDING | PROCESSING | SHIPPED | DELIVERED | CANCELLED, Default: PENDING)
- total: Float (Required)
- shippingAddress: String (Optional)
- createdAt: DateTime
- updatedAt: DateTime
```

#### 8.1.7 OrderItem Model
```typescript
- id: ObjectId (Primary Key)
- orderId: ObjectId (Foreign Key to Order, Required)
- productId: ObjectId (Foreign Key to Product, Required)
- quantity: Integer (Required)
- price: Float (Required, Price at time of purchase)
```

#### 8.1.8 Account Model (NextAuth)
```typescript
- id: ObjectId (Primary Key)
- userId: ObjectId (Foreign Key to User, Required)
- type: String
- provider: String
- providerAccountId: String
- refresh_token: String (Optional)
- access_token: String (Optional)
- expires_at: Integer (Optional)
- token_type: String (Optional)
- scope: String (Optional)
- id_token: String (Optional)
- session_state: String (Optional)
```

#### 8.1.9 Session Model (NextAuth)
```typescript
- id: ObjectId (Primary Key)
- sessionToken: String (Unique, Required)
- userId: ObjectId (Foreign Key to User, Required)
- expires: DateTime (Required)
```

### 8.2 Database Indexes
- User.email (Unique Index)
- Product.slug (Unique Index)
- Product.categoryId (Index)
- Product.isFeatured (Index)
- Category.slug (Unique Index)
- Service.slug (Unique Index)
- Quote.userId (Index)
- Quote.status (Index)
- Order.userId (Index)
- Order.status (Index)
- OrderItem.orderId (Index)
- OrderItem.productId (Index)

### 8.3 Data Storage
- **Primary**: MongoDB database
- **Alternative**: File-based JSON storage (for development/testing)
- **Location**: `data/db/` directory for file storage

### 8.4 Data Relationships
- User → Orders (One-to-Many)
- User → Quotes (One-to-Many)
- Category → Products (One-to-Many)
- Order → OrderItems (One-to-Many)
- OrderItem → Product (Many-to-One)
- User → Account (One-to-Many, NextAuth)
- User → Session (One-to-Many, NextAuth)

---

## 9. Security Requirements

### 9.1 Authentication Security
- **SEC-AUTH-001**: Passwords must be hashed using bcrypt with salt rounds ≥ 10
- **SEC-AUTH-002**: Session tokens must be JWT-based with expiration
- **SEC-AUTH-003**: Session tokens must be stored in HTTP-only cookies
- **SEC-AUTH-004**: Password reset functionality (future enhancement)
- **SEC-AUTH-005**: Email verification (future enhancement)

### 9.2 Authorization Security
- **SEC-AUTHZ-001**: Role-based access control (RBAC) must be enforced
- **SEC-AUTHZ-002**: Admin routes must verify ADMIN role
- **SEC-AUTHZ-003**: User data must be isolated by user ID
- **SEC-AUTHZ-004**: API routes must verify authentication
- **SEC-AUTHZ-005**: Middleware must protect protected routes

### 9.3 Input Validation
- **SEC-INPUT-001**: All user inputs must be validated using Zod schemas
- **SEC-INPUT-002**: Email format must be validated
- **SEC-INPUT-003**: Phone numbers must be validated (if provided)
- **SEC-INPUT-004**: File uploads must be validated (future enhancement)
- **SEC-INPUT-005**: SQL injection protection via Prisma ORM

### 9.4 Data Protection
- **SEC-DATA-001**: Sensitive data must not be logged
- **SEC-DATA-002**: Passwords must never be returned in API responses
- **SEC-DATA-003**: User data must be encrypted in transit (HTTPS)
- **SEC-DATA-004**: Database connection must use secure connection string
- **SEC-DATA-005**: Environment variables must be secured

### 9.5 API Security
- **SEC-API-001**: API routes must verify authentication for protected endpoints
- **SEC-API-002**: API routes must validate request data
- **SEC-API-003**: Rate limiting (future enhancement)
- **SEC-API-004**: CORS must be properly configured
- **SEC-API-005**: Error messages must not expose sensitive information

---

## 10. User Roles and Permissions

### 10.1 Public User (Unauthenticated)
**Permissions**:
- ✅ View homepage
- ✅ Browse services
- ✅ Browse products
- ✅ View service detail pages
- ✅ View product detail pages
- ✅ Submit quote requests
- ✅ View about page
- ✅ View contact page
- ❌ Access customer portal
- ❌ Access admin dashboard
- ❌ Purchase products
- ❌ View order history

### 10.2 B2C Customer (Authenticated)
**Permissions**:
- ✅ All public user permissions
- ✅ Access customer dashboard
- ✅ Purchase products
- ✅ View own order history
- ✅ View own quote history
- ✅ Update account information
- ❌ Access admin dashboard
- ❌ View other users' data
- ❌ Manage products
- ❌ Manage quotes

### 10.3 B2B Customer (Authenticated)
**Permissions**:
- ✅ All B2C customer permissions
- ✅ Submit bulk quote requests
- ✅ View business-specific features
- ❌ Access admin dashboard
- ❌ View other users' data
- ❌ Manage products
- ❌ Manage quotes

### 10.4 Administrator
**Permissions**:
- ✅ All public and customer permissions
- ✅ Access admin dashboard
- ✅ Manage products (Create, Read, Update, Delete)
- ✅ Manage quotes (View, Approve, Reject, Add Notes)
- ✅ Manage orders (View, Update Status)
- ✅ View all users
- ✅ View analytics and statistics
- ✅ Manage categories
- ✅ Manage services
- ❌ Delete user accounts (future enhancement)

---

## 11. API Specifications

### 11.1 Authentication APIs

#### POST /api/auth/signup
**Description**: Register a new user  
**Authentication**: Not required  
**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
**Response**: 201 Created
```json
{
  "success": true,
  "user": { ... }
}
```

#### POST /api/auth/signin
**Description**: Authenticate user (handled by NextAuth)  
**Authentication**: Not required  
**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

### 11.2 Quote APIs

#### POST /api/quotes
**Description**: Create a new quote request  
**Authentication**: Optional (authenticated users have quotes associated)  
**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "company": "string (optional)",
  "serviceType": "Service | Product",
  "itemId": "string (optional)",
  "message": "string"
}
```
**Response**: 201 Created
```json
{
  "success": true,
  "quote": { ... }
}
```

#### GET /api/quotes
**Description**: Get quotes (user's own quotes or all quotes for admin)  
**Authentication**: Required  
**Response**: 200 OK
```json
{
  "quotes": [ ... ]
}
```

#### PATCH /api/quotes/[id]
**Description**: Update quote status (admin only)  
**Authentication**: Required (Admin)  
**Request Body**:
```json
{
  "status": "APPROVED | REJECTED",
  "adminNotes": "string (optional)"
}
```
**Response**: 200 OK
```json
{
  "success": true,
  "quote": { ... }
}
```

### 11.3 Checkout APIs

#### POST /api/checkout
**Description**: Create an order  
**Authentication**: Required  
**Request Body**:
```json
{
  "productId": "string",
  "quantity": "number"
}
```
**Response**: 200 OK
```json
{
  "success": true,
  "orderId": "string",
  "message": "Order created successfully"
}
```

### 11.4 Webhook APIs

#### POST /api/webhooks/stripe
**Description**: Handle Stripe webhook events  
**Authentication**: Stripe signature verification  
**Request Body**: Stripe webhook payload

---

## 12. User Interface Requirements

### 12.1 Design System

#### 12.1.1 Color Scheme
- **Primary**: Aviation blue gradient (#1e3a8a to #3b82f6)
- **Background**: Dark theme with gradients
- **Text**: White with opacity variations
- **Accents**: Blue (#3b82f6), Green (success), Red (error), Yellow (warning)

#### 12.1.2 Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, large sizes
- **Body**: Regular weight, readable sizes
- **Responsive**: Scales appropriately for mobile

#### 12.1.3 Components
- **Cards**: Glassmorphism effect (backdrop blur, white/5 opacity)
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: White/10 background with borders
- **Navigation**: Fixed glassmorphism navbar
- **Footer**: Multi-column layout with links

### 12.2 Page Layouts

#### 12.2.1 Homepage
- Hero section with company branding
- About Us section
- Services section (3+ featured services)
- Why Choose Us section
- Parts & Tools showcase
- Call-to-action section
- Footer

#### 12.2.2 Product Pages
- Product listing with grid layout
- Category filters
- Search bar
- Pagination
- Product cards with images
- Product detail page with full information

#### 12.2.3 Service Pages
- Services listing page
- Service detail pages with full content
- Service images gallery
- Contact form for services

#### 12.2.4 Dashboard Pages
- Customer dashboard with statistics
- Order history section
- Quote history section
- Account information

#### 12.2.5 Admin Dashboard
- Statistics overview
- Recent orders section
- Pending quotes section
- Quick action links
- Management interfaces

### 12.3 Responsive Design
- **Mobile First**: Design optimized for mobile devices
- **Breakpoints**: 
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- **Touch Targets**: Minimum 44x44px for mobile
- **Navigation**: Hamburger menu on mobile
- **Images**: Responsive with Next.js Image component

### 12.4 Accessibility
- **WCAG 2.1 Level AA**: Compliance target
- **Keyboard Navigation**: All interactive elements accessible
- **Screen Readers**: Proper ARIA labels
- **Color Contrast**: Minimum 4.5:1 ratio
- **Focus Indicators**: Visible focus states

---

## 13. Performance Requirements

### 13.1 Page Load Times
- **Homepage**: < 2 seconds
- **Product Listing**: < 1.5 seconds
- **Product Detail**: < 1 second
- **Dashboard**: < 1.5 seconds
- **Admin Dashboard**: < 2 seconds

### 13.2 API Response Times
- **GET Requests**: < 500ms
- **POST Requests**: < 1 second
- **Database Queries**: < 200ms
- **Image Loading**: Lazy loading with Next.js Image

### 13.3 Optimization Techniques
- Server Components for better performance
- Code splitting (automatic with App Router)
- Image optimization (Next.js Image component)
- Database indexing on key fields
- Pagination for large datasets
- Caching strategies (future enhancement)

### 13.4 Scalability Targets
- Support 1000+ concurrent users
- Handle 10,000+ products
- Process 100+ orders per hour
- Support 50+ quote requests per day

---

## 14. Deployment Requirements

### 14.1 Environment Setup

#### 14.1.1 Required Environment Variables
```env
DATABASE_URL=mongodb://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...
STRIPE_PUBLIC_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
```

#### 14.1.2 Prerequisites
- Node.js 18 or higher
- MongoDB database (local or Atlas)
- npm or yarn package manager
- Git for version control

### 14.2 Build Process
1. Install dependencies: `npm install`
2. Generate Prisma client: `npx prisma generate`
3. Run database migrations: `npx prisma db push`
4. Seed database: `npm run db:seed`
5. Build application: `npm run build`
6. Start production server: `npm start`

### 14.3 Deployment Platforms
- **Recommended**: Vercel (optimized for Next.js)
- **Alternative**: AWS, Azure, Google Cloud
- **Requirements**: Node.js runtime, MongoDB connection

### 14.4 Database Setup
- **Production**: MongoDB Atlas (recommended)
- **Development**: Local MongoDB or MongoDB Atlas
- **Backup**: Regular automated backups
- **Migration**: Prisma migrations for schema changes

### 14.5 Monitoring and Logging
- Error logging (future enhancement)
- Performance monitoring (future enhancement)
- User analytics (future enhancement)
- Database monitoring (future enhancement)

---

## 15. Future Enhancements

### 15.1 Planned Features
1. **Email Notifications**
   - Quote status updates
   - Order confirmations
   - Password reset emails
   - Marketing emails

2. **Payment Processing**
   - Full Stripe integration
   - Multiple payment methods
   - Payment history
   - Refund processing

3. **Advanced Features**
   - Shopping cart persistence
   - Wishlist functionality
   - Product reviews and ratings
   - Order tracking with shipping
   - Inventory management alerts
   - Advanced analytics dashboard
   - Multi-language support
   - Mobile app API

4. **Admin Enhancements**
   - Bulk product import/export
   - Advanced reporting
   - User management interface
   - Email template management
   - Content management system

5. **User Features**
   - Profile picture upload
   - Address book management
   - Saved payment methods
   - Order tracking
   - Product comparison
   - Advanced search filters

### 15.2 Technical Improvements
- Redis caching layer
- CDN for static assets
- WebSocket for real-time updates
- GraphQL API (optional)
- Microservices architecture (if needed)
- Docker containerization
- CI/CD pipeline

---

## Appendix A: Glossary

- **B2B**: Business-to-Business transactions
- **B2C**: Business-to-Consumer transactions
- **JWT**: JSON Web Token for authentication
- **RBAC**: Role-Based Access Control
- **ORM**: Object-Relational Mapping
- **SEO**: Search Engine Optimization
- **API**: Application Programming Interface
- **CRUD**: Create, Read, Update, Delete operations
- **HTTPS**: Hypertext Transfer Protocol Secure
- **CSRF**: Cross-Site Request Forgery
- **XSS**: Cross-Site Scripting
- **WCAG**: Web Content Accessibility Guidelines

---

## Appendix B: Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2024 | Initial SRS document | Development Team |

---

## Document Approval

**Prepared By**: Development Team  
**Reviewed By**: _________________  
**Approved By**: _________________  
**Date**: _________________

---

**End of Document**

