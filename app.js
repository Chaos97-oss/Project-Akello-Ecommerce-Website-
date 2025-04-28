import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/db.js';
import userRoute from './routes/userRoute/userRoute.js';
import authRoute from './routes/authRoute/authRoute.js';
import cartRoute from './routes/cartRoute/cartRoute.js';
import productRoute from "./routes/productRoute/productRoute.js";
import orderRoute from "./routes/orderRoute/orderRoute.js";
import morgan from 'morgan';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDatabase();

// Create an express application
const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(morgan('dev'));
app.use(cors('*'))

// Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/cart', cartRoute);
app.use('/api/products',productRoute);
app.use('/api/orders', orderRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is Active`);
});

