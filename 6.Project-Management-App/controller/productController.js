const Product = require('../model/Product'); // Import the Product model

// Function to get all products
const getAllProducts = async (req, res) => {
    try {
        // Wait until all products are retrieved from the database
        const products = await Product.find();   
        // Send the products as a JSON response with a 200 status code
        res.status(200).json(products);
    } catch (error) {
        // Handle any errors and respond with a 500 status code
        res.status(500).json({ error: 'Error fetching products', details: error });
    }
};


// Function to create a new product
const createProduct = async (req, res) => {
    try {
        // Create a new product instance with the data from the request body
        const product = new Product(req.body); 
        // Wait until the product is saved to the database
        await product.save();
        // Respond with a 201 status code and a success message along with the created product
        res.status(201).json({ message: 'Product created successfully', product }); 
    } catch (error) {
        // Handle any errors related to product creation and respond with a 400 status code
        res.status(400).json({ error: 'Error creating product', details: error });
    }
};

// Function to delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // Get the product ID from the request parameters
        await Product.findByIdAndDelete(id); // Delete the product by ID
        // Respond with a 204 status code indicating successful deletion with no content
        res.status(204).send({ message: 'Product deleted successfully' });
    } catch (error) {
        // Handle any errors related to product deletion and respond with a 400 status code
        res.status(400).json({ error: 'Error deleting product', details: error });
    }
};

// Export the functions for use in the product routes
module.exports = { getAllProducts, createProduct, deleteProduct };
