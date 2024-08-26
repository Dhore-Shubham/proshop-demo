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

// @desc create Products
// @route post /api/products
// @acess private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'smaple name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'smaple',
    category: 'sample',
    countInStock: 0,
    numReviews: 0,
    description: 'sample Desc',
  });

  const createdProduct = await product.save();
  res.status(200).json(createdProduct);
});

// @desc update the Products
// @route PUT /api/products
// @acess private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc update the Products
// @route PUT /api/products
// @acess private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product deleted' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export {
  getProducts,
  getProductsByID,
  createProduct,
  updateProduct,
  deleteProduct,
};
