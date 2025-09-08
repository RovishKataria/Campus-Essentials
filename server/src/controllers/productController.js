const fs = require('fs');
const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

exports.getProducts = async (_req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.json(products);
};

exports.getFilteredProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, includeSold } = req.query;
    const filter = {};
    if (!includeSold) filter.isSold = false;
    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const sellerId = req.user._id;
    let imageUrl = '';
    if (req.file?.path) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      imageUrl = upload.secure_url;
      fs.unlink(req.file.path, () => {});
    }
    const product = await Product.create({
      title,
      description,
      price: Number(price),
      category,
      imageUrl,
      seller: sellerId,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

exports.markProductAsSold = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, { isSold: true });
    res.json({ message: 'Product marked as sold.' });
  } catch (err) {
    res.status(500).json({ message: 'Could not mark product as sold' });
  }
};


