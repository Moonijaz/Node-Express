const express = require('express');
const router =  express.Router();
const Product = require('../models/products');
const Category = require('../models/category');

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



module.exports = router;
