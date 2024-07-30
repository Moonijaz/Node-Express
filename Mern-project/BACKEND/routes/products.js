const express = require('express');
const router =  express.Router();
const Product = require('../models/products');
const Category = require('../models/category');
const mongoose = require("mongoose");

router.get('/', async (req, res) => {
    const productList = await Product.find();
    res.send(productList);
});

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate("category"); 
    if (!product) {
        return res.status(200).json({message: 'The product with the given ID was not found' });
    } 
    res.status(200).send(product);
});


// router.get('/', async (req, res) => {
//     const product = await Product.find().select("name image -_id");  
//     res.status(200).send(product);
// });


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

router.put('/:id', async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(500).send('Invalid Product id');
    }
    const product = await Product.findByIdAndUpdate(req.params.id,
        {
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
        },
        {new : true}
    ); 
    if (!product) {
        return res.status(200).json({message: 'The product cannot be updated'});
    } 
    res.status(200).send(product);
});

router.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'The Product is deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err });
    });
});

router.get('/get/count', async (req, res) => {
    const productCount = await Product.countDocuments(); 
    if (!productCount) {
        return res.status(200).json({message: 'The product with the given ID was not found' });
    } 
    res.status(200).send({productCount});
});


router.get('/get/featured/:count', async (req, res) => {
    const count = req.params.count ? req.params.count : 0 
    const products = await Product.find({isFeatured: true}).limit(count); 
    if (!products) {
        return res.status(200).json({success: false });
    } 
    res.status(200).send({products});
});


module.exports = router;
