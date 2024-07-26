const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv/config");

app.use(cors());
app.options('*', cors());

const api = process.env.API_URL;

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Routers
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

app.use(api + '/categories', categoriesRoutes);
app.use(api + '/products', productsRoutes);
app.use(api + '/users', usersRoutes);
app.use(api + '/orders', ordersRoutes);

mongoose.connect('mongodb://localhost:27017/eshop-database')
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(4000, () => {
    console.log(api);
    console.log('Server Started');
});
