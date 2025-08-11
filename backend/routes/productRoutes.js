import express from 'express';
const router = express.Router();
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    // This catch block helps prevent a 500 error on a database failure
    console.error(`Error fetching products: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Fetch a single product by id
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      // This prevents a server crash if the ID is not found
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    // This catch block helps prevent a 500 error on a database failure
    console.error(`Error fetching product by ID: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;