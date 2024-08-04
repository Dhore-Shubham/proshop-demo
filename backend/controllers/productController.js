import Product from '../models/productModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc Featch All Products
// @route GET /api/products
// @acess Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc Featch a Product
// @route GET /api/products/:id
// @acess Public
const getProductsByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resourse Not Found');
  }
});

export { getProducts, getProductsByID };
