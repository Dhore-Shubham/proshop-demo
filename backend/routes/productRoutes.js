import express from 'express';
const router = express.Router();
// import products from '../data/products.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsByID,
  updateProduct,
} from '../controllers/productController.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);

router
  .route('/:id')
  .get(getProductsByID)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
