import express from 'express';
const router = express.Router();
// import products from '../data/products.js';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUsers,
  getUsersById,
  updateUsers,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);

router.post('/logout', logoutUser);
router.post('/auth', authUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUsers)
  .get(protect, admin, getUsersById)
  .put(protect, admin, updateUsers);

export default router;
