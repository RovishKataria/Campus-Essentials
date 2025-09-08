const express = require('express');
const router = express.Router();
const { isAdmin, authenticate } = require('../middleware/auth');
const Product = require('../models/Product');
const User = require('../models/User');

router.get('/users', authenticate, isAdmin, async (_req, res) => {
  const users = await User.find({}, 'name email role');
  res.json(users);
});

router.get('/products', authenticate, isAdmin, async (_req, res) => {
  const products = await Product.find({});
  res.json(products);
});

router.delete('/products/:id', authenticate, isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

router.patch('/products/:id/mark-sold', authenticate, isAdmin, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { isSold: true });
  res.json({ message: 'Product marked as sold by admin' });
});

module.exports = router;


