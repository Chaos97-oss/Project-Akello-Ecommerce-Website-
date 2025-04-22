🛒 Simple E-Commerce API

A RESTful API built with Node.js, Express, and MongoDB to support a simple e-commerce backend. Features include user authentication, product management, cart functionality, order creation, and admin-level controls.

📦 Features

✅ 1. User Authentication

JWT-based login and registration

Role-based access control with isAdmin middleware

🔐 Routes

|  Method  |       Route           |           Description                       |
|----------|-----------------------|---------------------------------------------|
|  POST    |/api/users/signup      |Register a new user                          |
|  POST    |/api/users/login       |User login and JWT verification              |
|  POST    |/api/users/admin/login |**Admin only** route to create another admin |

🛍️ 2. Product Management

Admins can create, update, and delete products

Users can view all products or single product by ID

📦 Routes

|  Method  |       Route          |           Description                 |
|----------|----------------------|---------------------------------------|
|  GET     |/api/products         |View all products                      |
|  GET     |/api/products/:id     |View a specific product                |
|  POST    |/api/products/        |Create new product (**Admin only**)    |
|  PUT     |/api/products/:id     |Update a product                       |
|  DELETE  |/api/products/:id     |Delete a product                       |

🛒 3. Cart Functionality

Authenticated users can manage their cart

🛒 Routes

|  Method  |       Route                |           Description                 |
|----------|----------------------------|---------------------------------------|
|  POST    |/api/cart/add               |Add product to cart                    |
|  DELETE  |/api/cart/remove/:id        |Remove product from cart               |
|  GET     |/api/cart/my-cart           |View current user's cart               |


📦 4. Order System

Authenticated users can place orders from their cart

Admins can update or delete any order

Optional: Users can cancel orders before payment (TBD)

📦 Routes
|  Method  |       Route                       |           Description                 |
|----------|-----------------------------------|---------------------------------------|
|  POST    |/api/orders                        |Create new order from cart             |
|  GET     |/api/orders/user/:userId           |Get orders for specific user           |
|  GET     |/api/orders                        |Get all orders (**Admin only**)        |
|  PUT     |/api/orders/update-status/:orderId |Update order status(**Admin only**)    |
|  DELETE  |/api/order/:orderId                |Delete a product(**Admin only**)       |


🔐 Middleware

protect — Verifies JWT and user authentication

isAdmin — Allows access only to admin users

🧰 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT for auth

Bcrypt for password hashing

✍️ Author

Crafted with ❤️ by [Chaos].

