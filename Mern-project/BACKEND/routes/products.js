const express = require('express');
const router =  express.Router();
const Product = require('../models/products');
const Category = require('../models/category');

router.get('/', async (req, res) => {
    const productList = await Product.find();
    res.send(productList);
});

router.post('/', async (req, res) => {
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(500).send('Invalid Category');

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    });
    const savedProduct = await product.save();
    if(!savedProduct)
        return res.status(500).send('The product cannot be created')
    res.send(savedProduct);
});

module.exports = router;
