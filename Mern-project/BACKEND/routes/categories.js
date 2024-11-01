const express = require('express'); 
const router = express.Router(); 
const Category = require('../models/category'); 

// Route to handle GET requests for categories
router.get('/', async (req, res) => {
        const categoryList = await Category.find(); 
        res.send(categoryList); 
});


router.get('/:id', async (req, res) => {
        const category = await Category.findById(req.params.id); 
        if (!category) {
            return res.status(200).json({message: 'The category with the given ID was not found' });
        } 
        res.status(200).send(category);
});


router.put('/:id', async (req, res) => {
        const category = await Category.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name, 
                icon: req.body.icon, 
                color: req.body.color                 
            },
            {new : true}
        ); 
        if (!category) {
            return res.status(200).json({message: 'The category with the given ID was not found' });
        } 
        res.status(200).send(category);
});



// Route to handle POST requests for creating a new category
router.post('/', async (req, res) => {
    try {
        let category = new Category({
            name: req.body.name, 
            icon: req.body.icon, 
            color: req.body.color 
        });
        category = await category.save(); 
        res.send(category); 
    } catch (error) {
        res.status(404).send('The category cannot be created'); 
    }
});

// Route to handle DELETE requests for deleting a category by ID
router.delete('/:id', (req, res) => {
    Category.findByIdAndDelete(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({ success: true, message: 'The category is deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
