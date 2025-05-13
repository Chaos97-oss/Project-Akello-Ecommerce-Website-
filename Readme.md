🛒 An E-Commerce API called Project Akello

A RESTful API built with Node.js, Express, and MongoDB to support a simple e-commerce backend. Features include user authentication, product management, cart functionality, order creation, and admin-level controls.

📦 Features

✅ 1. User Authentication

JWT-based login and registration

Role-based access control with isAdmin middleware

Forgot password for user account recovery

MFA with OTP implementation for login (TBD)

🔐 Routes

|  Method  |       Route              |           Description                       |
|----------|--------------------------|---------------------------------------------|
|  POST    |/api/auth/signup          |Register a new user                          |
|  POST    |/api/auth/login           |User login and JWT verification              |
|  POST    |/api/auth/admin/login     |**Admin only** route to create another admin |
|  POST    |/api/auth/forgot-password |General route for user account recovery      |
|  POST    |/api/auth/send-otp        |Generate OTP for login (TBD)                 |
|  POST    |/api/auth/verify-otp      |Verify OTP for login (TBD)                   |

🛍️ 2. Product Management

Admins can create, update, and delete products

Users can view all products or single product by ID

📦 Routes

|  Method  |       Route          |           Description                 |
|----------|----------------------|---------------------------------------|
|  GET     |/api/products         |View all products                      |
|  GET     |/api/products/:id     |View a specific product                |
|  POST    |/api/products/        |Create new product (**Admin only**)    |
|  PUT     |/api/products/:id     |Update a product   (**Admin only**)    |
|  DELETE  |/api/products/:id     |Delete a product   (**Admin only**)    |

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

MFA implementation using OTP in order creation system 

Optional: Users can cancel orders before payment (TBD)

📦 Routes
|  Method  |       Route                       |           Description                 |
|----------|-----------------------------------|---------------------------------------|
|  POST    |/api/orders                        |Create new order from cart             |
|  GET     |/api/orders/user/:userId           |Get orders for specific user           |
|  GET     |/api/orders                        |Get all orders (**Admin only**)        |
|  PUT     |/api/orders/update-status/:orderId |Update order status(**Admin only**)    |
|  DELETE  |/api/order/:orderId                |Delete an order(**Admin only**)        |
|  PATCH   |/api//orders/cancel/:orderId       |Cancel an order(soft delete for users) |
|  POST    |/api/order/send-otp                |Generate OTP before order creation     |
|  POST    |/api/order/verify-otp              |Verify OTP before order                |

🔐 Middleware

protect — Verifies JWT and user authentication

isAdmin — Allows access only to admin users

🧰 Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT for auth

Bcrypt for password hashing

Nodemailer for sending OTPs & transactional emails 

Node-cache for temporary in-memory storage for OTPs 

Dotenv for managing enviromental variables securely 

Morgan for logging requests during developments

✍️ Author

Crafted with ❤️ by [Chaos](https://github.com/Chaos97-oss)


