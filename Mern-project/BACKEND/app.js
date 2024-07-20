const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');


// creating a middleware so that the post req can be identified and convert onto json
app.use(express.json());  // this will convert the unidentified post req to a json format
app.use(morgan('tiny'));  // morga library tells the type of request and the date and time 

// acessing .env file
require("dotenv/config");
const api = process.env.API_URL;


// /api/v1
app.get(api+'/products', (req, res)=>{
    const product ={
        id : 1,
        name : "moon",
        image: "sone_url",
    }
    console.log(product)
    res.send(product);
})

//post req will be send by the user from frontend
app.post(api+'/products', (req, res)=>{
    const newProduct = req.body;
    console.log(newProduct);
    res.send(newProduct);
})

mongoose.connect('mongodb://localhost:27017')
.then(()=>{
    console.log("Database connected")
})
.catch((err)=>{
    console.log(err);
})

app.listen(4000, ()=>{
    console.log(api);
    console.log('Server Started');
})