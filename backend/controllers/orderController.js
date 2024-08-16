import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// @desc create new order
// @route post /api/order
// @acess private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order item');
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        Product: x._id,
        _id: undefined,
      })),
      user: req.user_id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

// @desc get logged in user order
// @route get /api/order
// @acess private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user_id });
  res.status(200).json(orders);
});

// @desc get logged in by id
// @route get /api/order/:id
// @acess private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error('order not found');
  }
});

// @desc getupdate order to paid
// @route get /api/orders
// @acess private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('add order items');
});

// @desc getupdate order to deliver
// @route get /api/orders
// @acess private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('add order deliver');
});

// @desc get orders
// @route get /api/orders
// @acess private/admin
const getOrders = asyncHandler(async (req, res) => {
  res.send('get all Orders');
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
