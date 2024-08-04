import express from 'express';
// import products from './Data/products.js';
import productRoutes from './routes/productRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000; // run on this port

connectDB();

// initialize express
const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
