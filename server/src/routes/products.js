const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {
  getProducts,
  addProduct,
  markProductAsSold,
  getFilteredProducts,
} = require('../controllers/productController');
const { authenticate } = require('../middleware/auth');

router.get('/', getFilteredProducts);
router.post('/', authenticate, upload.single('image'), addProduct);
router.patch('/:id/mark-sold', authenticate, markProductAsSold);

module.exports = router;


