# Shoppy Globe Backend

Backend API for the Shoppy Globe e-commerce application built with Node.js, Express.js, MongoDB Atlas, and Mongoose.

## Features

- User Authentication (Register/Login)
- JWT-based Authorization
- Product Management
- Cart Management
- Password Hashing with bcryptjs
- Centralized Error Handling
- MongoDB Atlas Integration
- RESTful API Design

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- cors
- morgan

## Project Structure

```text
src/
├── config/
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   ├── cart.controller.js
│   └── product.controller.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
├── models/
│   ├── User.models.js
│   ├── Product.models.js
│   └── Cart.models.js
├── routes/
│   ├── auth.routes.js
│   ├── cart.routes.js
│   └── product.routes.js
└── server.js
```

## Installation

### Clone Repository

```bash
git clone https://github.com/chanduzumba/shoppy-globe-backend.git

cd shoppy-globe-backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_256_bit_secret
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

---

## API Endpoints

### Authentication

#### Register User

```http
POST /register
```

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password@123"
}
```

#### Login User

```http
POST /login
```

Request Body:

```json
{
  "email": "john@example.com",
  "password": "Password@123"
}
```

Response:

```json
{
  "success": true,
  "token": "jwt_token"
}
```

---

### Products

#### Get All Products

```http
GET /products
```

#### Get Product By ID

```http
GET /products/:id
```

Example:

```http
GET /products/1
```

---

### Cart

Requires Authorization Header:

```http
Authorization: Bearer <jwt_token>
```

#### Get Cart

```http
GET /cart
```

#### Add To Cart

```http
POST /cart
```

Request Body:

```json
{
  "productId": "6a39b9ac3d8d29a907b8c18d",
  "quantity": 2
}
```

#### Update Cart Item Quantity

```http
PUT /cart/:productId
```

Request Body:

```json
{
  "quantity": 5
}
```

#### Remove Item From Cart

```http
DELETE /cart/:productId
```

---

## Validation

### User Registration

- Name is required
- Valid email required
- Password must contain:
  - Minimum 8 characters
  - Uppercase letter
  - Lowercase letter
  - Number
  - Special character

### Cart

- Product ID must be valid
- Quantity must be greater than 0
- Quantity cannot exceed available stock

---

## Error Handling

error handler returns:

```json
{
  "success": false,
  "message": "Email and password are required"
}
```

---

## Authentication Flow

1. User registers.
2. Password is hashed using bcryptjs.
3. User logs in.
4. JWT token is generated.
5. Protected routes verify JWT.
6. User information is attached to:

```javascript
req.user = {
  id: userId
};
```

---

## Database

MongoDB Atlas is used for data storage.

Collections:

### Users

```javascript
{
  name,
  email,
  password
}
```

### Products

```javascript
{
  id,
  title,
  description,
  price,
  stock,
  category,
  thumbnail
}
```

### Carts

```javascript
{
  user,
  items: [
    {
      product,
      quantity
    }
  ]
}
```

---

## Future Improvements

- Pagination for products
- Product search and filtering
- Wishlist functionality
- Order management
- Admin dashboard APIs
- Refresh token authentication
- Unit and integration testing

---

## Author

**Chandrika Prakash**

GitHub: : https://github.com/chanduzumba

Project Repository: https://github.com/chanduzumba/shoppy-globe-backend
