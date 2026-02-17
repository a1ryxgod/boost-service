# Orders Module

Production-ready order management system for the game boost service backend.

## Features

- ✅ Create orders with game-specific boost details
- ✅ Order status state machine with validation
- ✅ Payment status tracking
- ✅ Role-based access control (Customer, Booster, Admin)
- ✅ Booster assignment and self-assignment
- ✅ Pagination and filtering for order lists
- ✅ Order statistics and analytics (admin only)
- ✅ Available orders marketplace for boosters
- ✅ Automatic commission calculation (10%)
- ✅ Entity relationships with User model
- ✅ Swagger/OpenAPI documentation
- ✅ Soft delete support

## Architecture

```
src/
├── orders/
│   ├── dto/
│   │   ├── create-order.dto.ts         # Order creation payload
│   │   ├── update-order.dto.ts         # Order status update payload
│   │   ├── query-orders.dto.ts         # Filtering and pagination
│   │   └── order-response.dto.ts       # Response formats
│   ├── orders.entity.ts                # Order entity with relationships
│   ├── orders.service.ts               # Business logic
│   ├── orders.controller.ts            # REST API endpoints
│   └── orders.module.ts                # Module definition
├── enums/
│   └── index.ts                        # OrderStatus, PaymentStatus, GameCode, ServiceType
└── users.entity.ts                     # User entity (relationship)
```

## API Endpoints

### Base URL: `/api/v1/orders`

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| POST | `/api/v1/orders` | Create new order | CUSTOMER |
| GET | `/api/v1/orders` | List orders with filters | CUSTOMER, BOOSTER, ADMIN |
| GET | `/api/v1/orders/stats` | Get order statistics | ADMIN |
| GET | `/api/v1/orders/booster/available` | Get available orders | BOOSTER |
| GET | `/api/v1/orders/:id` | Get order by ID | Any (with authorization) |
| PATCH | `/api/v1/orders/:id/status` | Update order status | ADMIN, BOOSTER |
| PATCH | `/api/v1/orders/:id/assign` | Self-assign order | BOOSTER |

## Order Status State Machine

```
PENDING ──────┐
              ├──> PAID ──────┐
              │                ├──> ASSIGNED ──> IN_PROGRESS ──> COMPLETED
              │                │
              └────────────────┴──> CANCELLED
```

**State Transitions:**

- `PENDING` → `PAID` | `CANCELLED`
- `PAID` → `ASSIGNED` | `CANCELLED`
- `ASSIGNED` → `IN_PROGRESS` | `CANCELLED`
- `IN_PROGRESS` → `COMPLETED`
- `COMPLETED` → *(terminal)*
- `CANCELLED` → *(terminal)*

## Enums

### OrderStatus
- `PENDING` - Order created, awaiting payment
- `PAID` - Payment received, ready for assignment
- `ASSIGNED` - Assigned to a booster
- `IN_PROGRESS` - Booster is working on it
- `COMPLETED` - Order finished
- `CANCELLED` - Order cancelled

### PaymentStatus
- `PENDING` - Awaiting payment
- `PAID` - Payment successful
- `REFUNDED` - Payment refunded
- `FAILED` - Payment failed

### GameCode
- `CS2` - Counter-Strike 2
- `DOTA2` - Dota 2
- `LOL` - League of Legends
- `VALORANT` - Valorant

### ServiceType
- `RANK_BOOST` - Rank boosting
- `PLACEMENT` - Placement matches
- `WIN_GAMES` - Win X games
- `COACHING` - Coaching sessions
- `DUO_BOOST` - Duo queue boost

## Usage Examples

### 1. Create Order (Customer)

```bash
POST http://localhost:4001/api/v1/orders
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "gameCode": "CS2",
  "serviceType": "RANK_BOOST",
  "currentRank": "Gold Nova 1",
  "targetRank": "Legendary Eagle",
  "price": 49.99,
  "currency": "USD",
  "notes": "Please stream all games"
}
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "550e8400-e29b-41d4-a716-446655440001",
  "boosterId": null,
  "gameCode": "CS2",
  "serviceType": "RANK_BOOST",
  "status": "PENDING",
  "paymentStatus": "PENDING",
  "currentRank": "Gold Nova 1",
  "targetRank": "Legendary Eagle",
  "price": 49.99,
  "currency": "USD",
  "commission": 4.99,
  "notes": "Please stream all games",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "deletedAt": null
}
```

### 2. Get Orders with Filters

```bash
GET http://localhost:4001/api/v1/orders?status=IN_PROGRESS&gameCode=CS2&page=1&limit=20
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response (200 OK):**
```json
{
  "orders": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "userId": "550e8400-e29b-41d4-a716-446655440001",
      "boosterId": "550e8400-e29b-41d4-a716-446655440002",
      "gameCode": "CS2",
      "serviceType": "RANK_BOOST",
      "status": "IN_PROGRESS",
      "paymentStatus": "PAID",
      "currentRank": "Gold Nova 1",
      "targetRank": "Legendary Eagle",
      "price": 49.99,
      "currency": "USD",
      "commission": 4.99,
      "notes": "Please stream all games",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z",
      "deletedAt": null
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 20
}
```

### 3. Get Available Orders (Booster)

```bash
GET http://localhost:4001/api/v1/orders/booster/available
Authorization: Bearer BOOSTER_ACCESS_TOKEN
```

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "userId": "550e8400-e29b-41d4-a716-446655440004",
    "boosterId": null,
    "gameCode": "VALORANT",
    "serviceType": "RANK_BOOST",
    "status": "PAID",
    "paymentStatus": "PAID",
    "currentRank": "Gold 1",
    "targetRank": "Diamond 3",
    "price": 79.99,
    "currency": "USD",
    "commission": 7.99,
    "notes": null,
    "createdAt": "2024-01-02T00:00:00.000Z",
    "updatedAt": "2024-01-02T01:00:00.000Z",
    "deletedAt": null
  }
]
```

### 4. Self-Assign Order (Booster)

```bash
PATCH http://localhost:4001/api/v1/orders/550e8400-e29b-41d4-a716-446655440003/assign
Authorization: Bearer BOOSTER_ACCESS_TOKEN
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "userId": "550e8400-e29b-41d4-a716-446655440004",
  "boosterId": "YOUR_BOOSTER_ID",
  "status": "ASSIGNED",
  "...": "..."
}
```

### 5. Update Order Status

```bash
PATCH http://localhost:4001/api/v1/orders/550e8400-e29b-41d4-a716-446655440000/status
Authorization: Bearer BOOSTER_OR_ADMIN_TOKEN
Content-Type: application/json

{
  "status": "IN_PROGRESS"
}
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "IN_PROGRESS",
  "...": "..."
}
```

### 6. Get Order Statistics (Admin)

```bash
GET http://localhost:4001/api/v1/orders/stats
Authorization: Bearer ADMIN_ACCESS_TOKEN
```

**Response (200 OK):**
```json
{
  "total": 150,
  "pending": 10,
  "inProgress": 25,
  "completed": 100,
  "cancelled": 15,
  "totalRevenue": 7499.50
}
```

### 7. Get Order by ID

```bash
GET http://localhost:4001/api/v1/orders/550e8400-e29b-41d4-a716-446655440000
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "550e8400-e29b-41d4-a716-446655440001",
  "boosterId": "550e8400-e29b-41d4-a716-446655440002",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "email": "customer@example.com",
    "role": "CUSTOMER"
  },
  "booster": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "email": "booster@example.com",
    "role": "BOOSTER"
  },
  "gameCode": "CS2",
  "serviceType": "RANK_BOOST",
  "status": "IN_PROGRESS",
  "paymentStatus": "PAID",
  "currentRank": "Gold Nova 1",
  "targetRank": "Legendary Eagle",
  "price": 49.99,
  "currency": "USD",
  "commission": 4.99,
  "notes": "Please stream all games",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z",
  "deletedAt": null
}
```

## Query Parameters for GET /orders

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `status` | OrderStatus | Filter by order status | `?status=IN_PROGRESS` |
| `paymentStatus` | PaymentStatus | Filter by payment status | `?paymentStatus=PAID` |
| `gameCode` | GameCode | Filter by game | `?gameCode=CS2` |
| `serviceType` | ServiceType | Filter by service type | `?serviceType=RANK_BOOST` |
| `userId` | UUID | Filter by user ID (admin only) | `?userId=550e8400...` |
| `boosterId` | UUID | Filter by booster ID (admin only) | `?boosterId=550e8400...` |
| `page` | number | Page number (min: 1) | `?page=1` |
| `limit` | number | Items per page (1-100) | `?limit=20` |

**Example:**
```
GET /api/v1/orders?status=IN_PROGRESS&gameCode=CS2&page=1&limit=10
```

## Role-Based Access Control

### Customer
- ✅ Create orders
- ✅ View their own orders
- ❌ Cannot see other users' orders
- ❌ Cannot update order status
- ❌ Cannot access statistics

### Booster
- ✅ View available orders (PAID status, unassigned)
- ✅ Self-assign orders
- ✅ View their assigned orders
- ✅ Update status of their assigned orders
- ❌ Cannot see orders assigned to other boosters
- ❌ Cannot access statistics

### Admin
- ✅ View all orders
- ✅ Filter by any user or booster
- ✅ Update any order status
- ✅ Assign orders to specific boosters
- ✅ Access order statistics
- ✅ Full control over order lifecycle

## Database Schema

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  booster_id UUID REFERENCES users(id) ON DELETE SET NULL,
  game_code VARCHAR(20) NOT NULL,
  service_type VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  payment_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  current_rank VARCHAR(64) NOT NULL,
  target_rank VARCHAR(64) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  commission NUMERIC(10, 2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE INDEX idx_orders_user_status ON orders(user_id, status);
CREATE INDEX idx_orders_booster_status ON orders(booster_id, status);
```

## Business Logic

### Commission Calculation
- Automatically calculated as **10% of the order price**
- Set when order is created
- Example: `$49.99 order → $4.99 commission`

### Payment Flow
1. Customer creates order → `PENDING` status, `PENDING` payment
2. Customer pays → Admin updates to `PAID` status (auto-updates `paymentStatus`)
3. Booster assigns → `ASSIGNED` status
4. Booster starts → `IN_PROGRESS` status
5. Booster completes → `COMPLETED` status

### Booster Assignment
- **Marketplace model:** Boosters browse `PAID` orders and self-assign
- **Admin assignment:** Admins can manually assign via status update
- Order must be in `PAID` status to be assigned
- Once assigned, no other booster can take it

### Authorization Rules
- Customers can only view their own orders
- Boosters can only view and update their assigned orders
- Admins have full access
- Order access checked on GET by ID

## Error Handling

| Status | Error | Description |
|--------|-------|-------------|
| 400 | Bad Request | Invalid status transition or missing boosterId |
| 401 | Unauthorized | Invalid or expired token |
| 403 | Forbidden | Insufficient permissions for this order |
| 404 | Not Found | Order does not exist |
| 409 | Conflict | Order already assigned to another booster |

**Example Error Response:**
```json
{
  "statusCode": 400,
  "message": "Transition \"IN_PROGRESS\" → \"PENDING\" is not allowed",
  "error": "Bad Request"
}
```

## Integration with Auth Module

All endpoints require authentication via JWT access token:

```typescript
@Controller({ path: 'orders', version: '1' })
@UseGuards(JwtAuthGuard)  // All routes protected
export class OrdersController {
  // Specific routes also use RolesGuard for role-based access
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER)
  async create() { ... }
}
```

## Testing with cURL

### Create Order
```bash
curl -X POST http://localhost:4001/api/v1/orders \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "gameCode": "CS2",
    "serviceType": "RANK_BOOST",
    "currentRank": "Gold Nova 1",
    "targetRank": "Legendary Eagle",
    "price": 49.99,
    "currency": "USD"
  }'
```

### Get Orders with Filters
```bash
curl -X GET "http://localhost:4001/api/v1/orders?status=IN_PROGRESS&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Self-Assign Order (Booster)
```bash
curl -X PATCH http://localhost:4001/api/v1/orders/ORDER_ID/assign \
  -H "Authorization: Bearer BOOSTER_TOKEN"
```

### Update Status (Admin/Booster)
```bash
curl -X PATCH http://localhost:4001/api/v1/orders/ORDER_ID/status \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "COMPLETED"
  }'
```

## Next Steps

1. **Payment Integration:** Integrate payment gateway (Stripe, PayPal)
2. **Webhooks:** Add payment webhook handlers
3. **Notifications:** Email/push notifications for status changes
4. **Refund Logic:** Implement refund workflow
5. **Order Reviews:** Add rating/review system after completion
6. **Dispute Resolution:** Add dispute handling for problematic orders
7. **Booster Verification:** Add booster verification before assignment
8. **Live Tracking:** WebSocket integration for real-time order updates

## Troubleshooting

### "Transition not allowed"
- Check the state machine diagram
- Ensure current status can transition to target status
- Example: Cannot go from `IN_PROGRESS` to `PENDING`

### "You do not have access to this order"
- Customers can only access their own orders
- Boosters can only access their assigned orders
- Check user role and order ownership

### "Order already assigned"
- Order is already assigned to another booster
- Contact admin to reassign if needed

### "Order must be in PAID status to be assigned"
- Order payment must be confirmed first
- Admin needs to update order to `PAID` status

---

**Orders Module Version:** 1.0.0
**Last Updated:** 2024

## Swagger Documentation

Access full API documentation at: `http://localhost:4001/docs`

All endpoints are documented with:
- Request/response examples
- Parameter descriptions
- Status codes
- Authentication requirements
- Role permissions
