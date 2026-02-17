# Authentication Module

Production-ready JWT authentication system for the boost service backend.

## Features

- ✅ User registration with email/password
- ✅ Login with JWT access and refresh tokens
- ✅ Token refresh mechanism (7-day refresh tokens)
- ✅ Logout (single session or all sessions)
- ✅ Session management with device tracking
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Role-based access control (CUSTOMER, BOOSTER, ADMIN)
- ✅ Passport JWT strategies for access and refresh tokens
- ✅ Swagger/OpenAPI documentation

## Architecture

```
src/
├── auth/
│   ├── dto/
│   │   ├── register.dto.ts          # Registration payload validation
│   │   ├── login.dto.ts              # Login payload validation
│   │   ├── refresh-token.dto.ts      # Refresh token payload
│   │   └── auth-response.dto.ts      # Response format
│   ├── guards/
│   │   ├── jwt-auth.guard.ts         # Main JWT access guard (updated)
│   │   ├── jwt-access-auth.guard.ts  # Alternative access guard
│   │   └── jwt-refresh-auth.guard.ts # Refresh token guard
│   ├── strategies/
│   │   ├── jwt-access.strategy.ts    # Validates access tokens
│   │   └── jwt-refresh.strategy.ts   # Validates refresh tokens
│   ├── auth.controller.ts            # HTTP endpoints
│   ├── auth.service.ts               # Business logic
│   └── auth.module.ts                # Module definition
├── entities/
│   └── session.entity.ts             # Sessions table for refresh tokens
└── users.entity.ts                   # User table (already existed)
```

## API Endpoints

### Base URL: `/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/refresh` | Refresh access token | Yes (Refresh token) |
| POST | `/auth/logout` | Logout current session | Yes (Access token) |
| POST | `/auth/logout-all` | Logout all sessions | Yes (Access token) |
| GET | `/auth/me` | Get current user | Yes (Access token) |
| GET | `/auth/sessions` | Get active sessions | Yes (Access token) |

## Setup

### 1. Environment Variables

Create a `.env` file in the `BackEnd` directory:

```env
# Server
PORT=4001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=admin
DB_NAME=boost_service

# JWT Secrets (CHANGE IN PRODUCTION!)
JWT_SECRET=your-secret-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production
```

**⚠️ IMPORTANT:** Generate secure secrets for production:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Database Migration

The session table will be auto-created when you start the server (TypeORM synchronize is enabled in development).

**Session Entity Schema:**
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  refresh_token TEXT NOT NULL,
  user_agent VARCHAR(500),
  ip_address VARCHAR(45),
  expires_at TIMESTAMP NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Start the Server

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Server runs on `http://localhost:4001` (or your configured PORT)

Swagger docs available at: `http://localhost:4001/docs`

## Usage Examples

### Register a New User

```bash
POST http://localhost:4001/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "role": "CUSTOMER"  # Optional, defaults to CUSTOMER
}
```

**Response (201 Created):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "role": "CUSTOMER"
  }
}
```

### Login

```bash
POST http://localhost:4001/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "role": "CUSTOMER"
  }
}
```

### Refresh Access Token

```bash
POST http://localhost:4001/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "accessToken": "NEW_ACCESS_TOKEN",
  "refreshToken": "NEW_REFRESH_TOKEN",
  "user": { ... }
}
```

### Get Current User

```bash
GET http://localhost:4001/auth/me
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "role": "CUSTOMER"
  }
}
```

### Logout (Current Session)

```bash
POST http://localhost:4001/auth/logout
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "refreshToken": "REFRESH_TOKEN_TO_INVALIDATE"  # Optional
}
```

**Response (200 OK):**
```json
{
  "message": "Successfully logged out"
}
```

### Logout from All Devices

```bash
POST http://localhost:4001/auth/logout-all
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response (200 OK):**
```json
{
  "message": "Successfully logged out from all devices"
}
```

### Get Active Sessions

```bash
GET http://localhost:4001/auth/sessions
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response (200 OK):**
```json
{
  "sessions": [
    {
      "id": "session-uuid",
      "userAgent": "Mozilla/5.0...",
      "ipAddress": "192.168.1.1",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "expiresAt": "2024-01-08T00:00:00.000Z",
      "isActive": true
    }
  ]
}
```

## Protecting Routes

### Using the JWT Guard

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getProtectedData(@Request() req) {
    // req.user contains the authenticated user
    return { user: req.user };
  }
}
```

### Combining with Roles Guard

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../enums';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Get('users')
  @Roles(UserRole.ADMIN)
  getAllUsers() {
    // Only admins can access this
    return { users: [] };
  }
}
```

## Token Lifecycle

### Access Token
- **Validity:** 30 minutes
- **Purpose:** Authenticate API requests
- **Storage:** Client-side (memory, localStorage, or sessionStorage)
- **Refresh:** Use refresh token to get new access token

### Refresh Token
- **Validity:** 7 days
- **Purpose:** Obtain new access tokens
- **Storage:** Secure httpOnly cookie (recommended) or client storage
- **Rotation:** New refresh token issued on each refresh
- **Tracking:** Stored in `sessions` table with device info

## Security Features

1. **Password Hashing:** bcrypt with 10 salt rounds
2. **Token Rotation:** New refresh token on each refresh request
3. **Session Tracking:** Device fingerprinting via user-agent and IP
4. **Token Expiration:** Automatic expiry enforcement
5. **Multi-Device Support:** Multiple active sessions per user
6. **Logout All:** Invalidate all user sessions at once
7. **Inactive Session Cleanup:** Old refresh tokens marked as inactive

## Error Handling

| Status | Error | Description |
|--------|-------|-------------|
| 400 | Bad Request | Invalid input data (validation failed) |
| 401 | Unauthorized | Invalid credentials or expired token |
| 409 | Conflict | User already exists (email duplicate) |

**Example Error Response:**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:4001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123456"}'
```

### Login
```bash
curl -X POST http://localhost:4001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123456"}'
```

### Access Protected Route
```bash
curl -X GET http://localhost:4001/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Integration with Orders Module

The Orders controller already uses `@UseGuards(RolesGuard)` and `@Roles(UserRole.CUSTOMER)`.

**Now it will work properly** because:
1. The JWT guard attaches the authenticated user to the request
2. The RolesGuard checks the user's role
3. Only users with the required role can access the endpoint

Example:
```typescript
@Post()
@UseGuards(JwtAuthGuard, RolesGuard)  // Add JwtAuthGuard
@Roles(UserRole.CUSTOMER)
async create(@Request() req, @Body() dto: CreateOrderDto) {
  // req.user.id contains the authenticated user ID
  return this.ordersService.create({
    ...dto,
    userId: req.user.id,  // Attach user ID from token
  });
}
```

## Next Steps

1. **Frontend Integration:** Store tokens in localStorage or httpOnly cookies
2. **Email Verification:** Add email confirmation flow
3. **Password Reset:** Implement forgot password functionality
4. **Rate Limiting:** Add rate limiting to auth endpoints
5. **2FA:** Implement two-factor authentication
6. **OAuth:** Add social login (Google, Discord, etc.)

## Troubleshooting

### "Invalid or expired access token"
- Access token expired (30 minutes) → Use refresh token
- Invalid JWT secret → Check `JWT_SECRET` env variable
- Malformed token → Ensure `Bearer ` prefix in Authorization header

### "Invalid or expired refresh token"
- Refresh token expired (7 days) → User must login again
- Session invalidated → User logged out
- Invalid JWT secret → Check `JWT_REFRESH_SECRET` env variable

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database `boost_service` exists

---

**Auth Module Version:** 1.0.0
**Last Updated:** 2024
