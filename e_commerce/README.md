# E-commerce Backend API

## Description

A RESTful E-commerce API built with Node.js, Express.js, and PostgreSQL. The application supports user authentication, product management, and order processing with role-based access control.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- `pg` — PostgreSQL client
- `bcryptjs` — password hashing
- `jsonwebtoken` — JWT authentication
- `dotenv` — environment variable management
- EJS — server-rendered login and registration pages

## Features

### Authentication
- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Token expiration
- Role-based authorization (`customer`, `admin`)

### Products
- Retrieve all products
- Retrieve a product by ID
- Create, update, and delete products
- Validate product data
- Restrict product modifications to administrators

### Orders
- Create orders for authenticated users
- Retrieve a user's orders with their items
- Check product availability and stock
- Calculate order totals using current product prices
- Update stock when an order is placed
- Use database transactions to maintain data consistency

### Error Handling
- Centralized error-handling middleware
- Appropriate HTTP status codes
- Validation and resource-not-found errors

## Project Structure

```text
.
├── app.js
├── server.js
├── config.js
├── controllers/
│   ├── authController.js
│   ├── orderController.js
│   └── productController.js
├── data/
│   └── db.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── queries/
│   ├── orders.queries.js
│   ├── products.queries.js
│   └── users.queries.js
├── routes/
│   ├── auth.js
│   ├── orders.js
│   └── products.js
├── services/
│   ├── authService.js
│   ├── orders.service.js
│   └── products.service.js
├── utils/
│   └── AppError.js
└── views/
    ├── login.ejs
    └── register.ejs
```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root.

5. Configure the environment variables:

   ```env
   PORT=3000
   JWT_SECRET=your_secure_secret

   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_DATABASE=e_commerce
   DB_DEFAULT_DATABASE=postgres
   ```

6. Create the PostgreSQL database and configure the required tables: `users`, `products`, `orders`, and `order_items`.

7. Start the server using the configured start script, or run:

   ```bash
   node server.js
   ```

The API will be available at `http://localhost:3000`.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| GET | `/auth/register` | Display registration page |
| POST | `/auth/register` | Register a new customer |
| GET | `/auth/login` | Display login page |
| POST | `/auth/login` | Log in and receive a JWT |

### Products

| Method | Endpoint | Access |
|---|---|---|
| GET | `/products` | Public |
| GET | `/products/:id` | Public |
| POST | `/products` | Admin |
| PUT | `/products/:id` | Admin |
| DELETE | `/products/:id` | Admin |

### Orders

| Method | Endpoint | Access |
|---|---|---|
| GET | `/orders/page` | Authenticated users |
| POST | `/orders` | Authenticated users |

## Authentication

For protected endpoints, include the JWT in the request header:

```http
Authorization: Bearer <your-jwt-token>
```

Only users with the `admin` role can create, update, or delete products.

## Order Request Example

`POST /orders`

```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 3,
      "quantity": 1
    }
  ]
}
```

The server validates the items, checks stock, calculates the total, updates inventory, and saves the order and its items in a database transaction.

## Error Responses

The API uses standard HTTP status codes, including:

- `200 OK` — successful request
- `201 Created` — resource created
- `204 No Content` — resource deleted
- `400 Bad Request` — invalid input
- `401 Unauthorized` — missing or invalid authentication
- `403 Forbidden` — insufficient permissions
- `404 Not Found` — resource or route not found
- `409 Conflict` — duplicate username
- `500 Internal Server Error` — unexpected server error

## Architecture

The application follows a layered architecture:

- **Routes** define API endpoints and middleware.
- **Controllers** handle HTTP requests and responses.
- **Services** contain business logic and validation.
- **Queries** execute parameterized SQL statements.
- **Middleware** handles authentication, authorization, and errors.
- **Data** manages the PostgreSQL connection pool.

This separation improves maintainability, readability, and testability.

## Security

- Passwords are stored as bcrypt hashes.
- JWTs protect authenticated endpoints.
- Role-based authorization restricts administrative actions.
- Parameterized SQL queries help prevent SQL injection.
- Sensitive configuration is stored in environment variables.

## License

This project was created for educational purposes.