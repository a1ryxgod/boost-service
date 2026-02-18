# Boost Service Backend API

Production-ready NestJS backend for a game boosting service platform.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with access/refresh tokens, role-based access control (Customer, Booster, Admin)
- **User Management**: User profiles, password management, session management, status system (Active/Suspended/Banned)
- **Order System**: Complete order lifecycle, status tracking, assignment to boosters, commission calculation
- **Games & Services**: Dynamic game and service catalog with pricing
- **Payment Integration**: Stripe integration ready (checkout, webhooks, refunds)
- **Reviews & Ratings**: Customer reviews for boosters, automatic rating calculation
- **Admin Panel**: Full administrative control over users, orders, transactions
- **Notifications**: Email notification system (SendGrid ready)
- **API Documentation**: Comprehensive Swagger/OpenAPI documentation

## 📦 Tech Stack

- **Framework**: NestJS 11.1.13
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT (Passport)
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Security**: CORS, Security Headers, Input Validation

## 🏗️ Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── guards/          # JWT guards, roles guard
│   ├── strategies/      # Passport strategies
│   ├── decorators/      # Custom decorators
│   └── dto/             # Auth DTOs
├── users/               # Users module (basic CRUD)
├── profile/             # Profile management module
├── orders/              # Orders module
├── games/               # Games catalog module
├── services/            # Boosting services module
├── payments/            # Payment processing module
├── reviews/             # Reviews & ratings module
├── admin/               # Admin operations module
├── notifications/       # Email notifications module
├── entities/            # Shared entities
│   ├── session.entity.ts
│   ├── game.entity.ts
│   ├── service.entity.ts
│   ├── transaction.entity.ts
│   └── review.entity.ts
├── common/              # Shared utilities
│   ├── filters/         # Exception filters
│   ├── interceptors/    # Response interceptors
│   └── helpers/         # Helper utilities
├── config/              # Configuration files
│   ├── database.config.ts
│   ├── jwt.config.ts
│   └── app.config.ts
├── enums/               # Shared enums
├── app.module.ts        # Root module
└── main.ts              # Application entry point
```

## 🛠️ Installation

### Prerequisites

- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   cd BackEnd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Setup PostgreSQL database**
   ```sql
   CREATE DATABASE boost_service;
   ```

5. **Run migrations (optional, using synchronize in dev)**
   TypeORM will auto-create tables in development mode.

## 🚀 Running the Application

### Development
```bash
npm run start:dev
```

### Production Build
```bash
npm run build
npm run start:prod
```

### Access Points

- **API Server**: http://localhost:4001/api/v1
- **Swagger Docs**: http://localhost:4001/docs

## 📚 API Modules

### Authentication (`/api/v1/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /refresh` - Refresh access token
- `POST /logout` - Logout user

### Profile (`/api/v1/profile`)
- `GET /` - Get current user profile
- `PATCH /` - Update profile
- `PATCH /change-password` - Change password
- `GET /sessions` - Get active sessions
- `DELETE /sessions/:id` - Revoke session
- `GET /orders` - Get user orders
- `GET /statistics` - Get user statistics

### Orders (`/api/v1/orders`)
- `POST /` - Create order
- `GET /` - Get orders (filtered by role)
- `GET /:id` - Get order by ID
- `PATCH /:id/status` - Update order status
- `GET /stats` - Get order statistics (admin)
- `GET /booster/available` - Get available orders (booster)
- `PATCH /:id/assign` - Self-assign order (booster)

### Games (`/api/v1/games`)
- `GET /` - Get all games
- `GET /:id` - Get game by ID
- `GET /slug/:slug` - Get game by slug
- `POST /` - Create game (admin)
- `PATCH /:id` - Update game (admin)
- `DELETE /:id` - Delete game (admin)

### Services (`/api/v1/services`)
- `GET /` - Get all services
- `GET /by-game/:slug` - Get services by game
- `GET /:id` - Get service by ID
- `POST /` - Create service (admin)
- `PATCH /:id` - Update service (admin)
- `DELETE /:id` - Delete service (admin)

### Payments (`/api/v1/payments`)
- `POST /checkout` - Create checkout session
- `POST /webhook` - Stripe webhook handler
- `GET /transactions` - Get user transactions
- `GET /transactions/:id` - Get transaction by ID
- `POST /refund/:id` - Refund transaction (admin)

### Reviews (`/api/v1/reviews`)
- `POST /` - Create review (customer)
- `GET /` - Get all reviews
- `GET /booster/:id` - Get booster reviews
- `GET /:id` - Get review by ID
- `PATCH /:id` - Update review
- `DELETE /:id` - Delete review

### Admin (`/api/v1/admin`)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id/status` - Update user status
- `GET /orders` - Get all orders
- `PATCH /orders/:id/status` - Update order status
- `POST /orders/:id/assign` - Assign order to booster
- `GET /statistics` - Get platform statistics
- `GET /transactions` - Get all transactions
- `GET /reviews` - Get all reviews

## 🔐 Authentication & Authorization

### JWT Tokens

The API uses two types of JWT tokens:

- **Access Token**: Short-lived (30 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), stored in database, used to obtain new access tokens

### User Roles

- **CUSTOMER**: Can create orders, write reviews
- **BOOSTER**: Can view and accept available orders
- **ADMIN**: Full access to all endpoints

### Making Authenticated Requests

Include the access token in the Authorization header:

```
Authorization: Bearer <your_access_token>
```

## 💳 Payment Integration

The payment module is structured for Stripe integration. To enable:

1. Install Stripe SDK:
   ```bash
   npm install stripe
   ```

2. Set environment variables:
   ```
   STRIPE_SECRET_KEY=sk_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

3. Uncomment Stripe code in `payments.service.ts`

## 📧 Email Notifications

The notification module is ready for SendGrid integration:

1. Install SendGrid:
   ```bash
   npm install @sendgrid/mail
   ```

2. Set environment variable:
   ```
   SENDGRID_API_KEY=SG....
   ```

3. Uncomment email code in `notifications.service.ts`

## 🗄️ Database Schema

### Core Entities

- **users**: User accounts with roles and profiles
- **sessions**: Active user sessions
- **orders**: Boosting orders
- **games**: Game catalog
- **services**: Boosting services per game
- **transactions**: Payment transactions
- **reviews**: Customer reviews for boosters

### Relationships

- User → Orders (1:N)
- User → Reviews (1:N as customer, 1:N as booster)
- User → Sessions (1:N)
- User → Transactions (1:N)
- Game → Services (1:N)
- Order → Transaction (1:1)
- Order → Review (1:1)

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Build

```bash
npm run build
```

Builds to `dist/` directory.

## 🔧 Configuration

All configuration is centralized in `src/config/`:

- `database.config.ts` - Database connection
- `jwt.config.ts` - JWT secrets and expiration
- `app.config.ts` - App settings, CORS, rate limiting

## 🚦 Environment Variables

See `.env.example` for all available environment variables.

## 📝 API Response Format

### Success Response
```json
{
  "data": { ... },
  "message": "Success"
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": ["Error message"],
  "error": "Bad Request",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔒 Security Features

- **CORS**: Configurable origins
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, etc.
- **Input Validation**: DTO validation with class-validator
- **SQL Injection Protection**: TypeORM parameterized queries
- **Rate Limiting**: Configurable (ready for implementation)
- **Password Hashing**: bcrypt with salt rounds

## 📈 Scalability Considerations

- **Modular Architecture**: Easy to extract modules into microservices
- **Database Indexing**: Strategic indexes on frequently queried fields
- **Pagination**: Implemented on list endpoints
- **Caching**: Ready for Redis integration
- **Load Balancing**: Stateless design supports horizontal scaling

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DB credentials in .env
- Ensure database exists

### Build Errors
- Clear dist: `rm -rf dist`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript version compatibility

## 📄 License

Private - All rights reserved

## 👥 Contributors

Backend development team

---

**For API documentation, visit**: http://localhost:4001/docs
