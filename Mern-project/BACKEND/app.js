const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require("dotenv/config");
const api = process.env.API_URL;
const productRouter = require('./routers/products');

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routers
app.use(api + '/products', productRouter);



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
