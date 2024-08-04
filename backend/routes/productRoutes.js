import express from 'express';
const router = express.Router();
// import products from '../data/products.js';
import {
  getProducts,
  getProductsByID,
} from '../controllers/productController.js';

router.route('/').get(getProducts);

router.route('/:id').get(getProductsByID);

export default router;
