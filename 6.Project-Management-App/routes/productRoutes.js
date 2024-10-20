// routes/productRoutes.js
const express = require('express');
const { getAllProducts, createProduct, deleteProduct } = require('../controller/productController');

const router = express.Router();

// Route to get all products
router.get('/products', getAllProducts);

// Route to create a product
router.post('/products', createProduct);

// Route to delete a product
router.delete('/products/:id', deleteProduct);

module.exports = router;
