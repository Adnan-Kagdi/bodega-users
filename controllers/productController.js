const Product = require('../models/productModel');

// GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: 'Invalid Product Data' });
  }
};
