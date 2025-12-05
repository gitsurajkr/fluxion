# Fluxion - Template Marketplace Platform

A full-stack template marketplace platform with separate client and admin interfaces.

## Project Structure

```
fluxion/
├── backend/          # Express.js API server
├── client/           # Next.js 15 client application
├── admin/            # Next.js 16 admin dashboard
└── README.md         # This file
```

## Tech Stack

### Backend
- **Framework:** Express.js with TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT with httpOnly cookies
- **Email:** Nodemailer (Gmail SMTP)
- **Security:** Rate limiting, XSS protection, bcrypt hashing
- **Port:** 8080 (default)

### Client Application
- **Framework:** Next.js 15 (App Router)
- **UI:** React 18, Tailwind CSS, Framer Motion
- **State Management:** Context API
- **HTTP Client:** Axios
- **Port:** 4040 (default)

### Admin Dashboard
- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS, Framer Motion
- **Charts:** Recharts
- **Port:** 3001 (default)

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Gmail account for email service (optional)

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure .env with your database URL and JWT secret
# DATABASE_URL="postgresql://user:password@localhost:5432/fluxion"
# JWT_SECRET="your-secret-key"
# EMAIL_USER="your-email@gmail.com" (optional)
# EMAIL_PASSWORD="your-app-password" (optional)

# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Seed admin user (optional)
npx tsx prisma/seedAdmin.ts

# Start server
npm run dev
```

Backend will run on `http://localhost:8080`

### 2. Client Setup

```bash
cd client

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Configure .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8080

# Start development server
npm run dev
```

Client will run on `http://localhost:4040`

### 3. Admin Setup

```bash
cd admin

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Configure .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8080

# Start development server
npm run dev
```

Admin will run on `http://localhost:3001`

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/fluxion
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
CLIENT_URL=http://localhost:4040
ADMIN_URL=http://localhost:3001
PORT=8080
NODE_ENV=development
```

### Client (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Admin (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Features

### Client Application
- User registration and authentication
- Email verification with OTP
- Password reset functionality
- Browse and view templates
- Shopping cart management
- Order checkout and history
- User profile management

### Admin Dashboard
- Secure admin-only access
- Dashboard with real-time statistics
- User management (view, role assignment)
- Order tracking and management
- Revenue analytics by date
- Template CRUD operations
- Recent users and orders views

### Backend API
- RESTful API design
- JWT authentication with httpOnly cookies
- Email verification system
- Password reset with secure tokens
- Rate limiting (general, auth, password reset)
- XSS sanitization
- Role-based access control (USER, ADMIN)
- Comprehensive error handling

## API Documentation

Full API documentation is available in `backend/docs/`:
- [API Testing Guide](backend/API_TESTING_GUIDE.md) - Complete testing guide
- [User API](backend/docs/api-tests/user-api.md) - Authentication, profiles, email
- [Admin API](backend/docs/api-tests/admin-api.md) - Dashboard, analytics
- [Template API](backend/docs/api-tests/template-api.md) - Template management
- [Cart API](backend/docs/api-tests/cart-api.md) - Shopping cart
- [Order API](backend/docs/api-tests/order-api.md) - Order management

## Database Schema

Key models:
- **User:** Authentication, profiles, email verification, password reset
- **Template (Tempelate):** Basic template information
- **TemplateDetail (TempelateDetail):** Extended template details
- **Cart:** Shopping cart items
- **Order:** Order tracking
- **OrderItem:** Order line items

See `backend/prisma/schema.prisma` for complete schema.

## Security Features

- ✅ JWT tokens in httpOnly cookies (prevents XSS token theft)
- ✅ Password hashing with bcrypt (12 rounds)
- ✅ OTP hashing with bcrypt (10 rounds)
- ✅ Password reset tokens hashed (1-hour expiry)
- ✅ Rate limiting (3 tiers: general, auth, password reset)
- ✅ XSS input sanitization
- ✅ CORS configuration for multiple origins
- ✅ Email enumeration prevention (timing delays)
- ✅ Role-based access control

## Development Workflow

1. Start backend server (required for both apps)
2. Start client app (for customer-facing features)
3. Start admin app (for administrative tasks)

All three can run simultaneously on different ports.

## Production Deployment

### Backend
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET`
- Configure production database
- Set up email service
- Update `CLIENT_URL` and `ADMIN_URL` to production URLs

### Client & Admin
- Build with `npm run build`
- Deploy to Vercel, Netlify, or your hosting provider
- Set `NEXT_PUBLIC_API_URL` to production backend URL

## Monorepo Benefits

- **Shared types:** Consistent interfaces across apps
- **Independent deployment:** Each app can be deployed separately
- **Clear separation:** Client and admin code completely isolated
- **Scalability:** Easy to add more apps (mobile, etc.)

## License

MIT

## Support

For issues, please check:
1. Environment variables are correctly set
2. Database migrations are up to date
3. All dependencies are installed
4. Backend is running before starting client/admin

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
