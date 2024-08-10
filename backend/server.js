import express from 'express';
// import products from './Data/products.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookiParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000; // run on this port

connectDB();

// initialize express
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware

app.use(cookiParser());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
