// express is a frameword but internally we use http

// to install express
// 1. npm init -y
// 2. npm i express

const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req, res) =>{
    return res.send("Hello from Home Page");
});

app.get("/about", (req, res) =>{
    return res.send("Hello from About Page");
});

app.listen(8000, () =>  console.log("Server Started!"));
// const myServer = http.createServer(app);
// myServer.listen(8000, ()=> console.log("Server Started!"));