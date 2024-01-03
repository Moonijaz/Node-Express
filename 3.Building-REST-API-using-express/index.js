const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

//Middleware - Pluggin
app.use(express.urlencoded({extended: false}));

// sending json as html
// app.get("/users", (req, res) =>{
//     const html = "<ul>${users.map((user) => '<li>$
//     {users.first_name}</li>')}</ul>";
//     res.send(html);
// });

//getting data as json
app.get("/api/users", (req, res) =>{
    return res.json(users);
});

//getting data as id
app.get("/api/users/:id", (req, res) =>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

app.post("/api/users", (req, res) =>{   //using postman to check req, this will add new users in json file on localhost
    //TODO : Create a nerw user
    const body = req.body;
    users.push({...body, id: users.length +1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) =>{
     return res.json({status : "success", id: users.length });    
    })
   
});

app.patch("/api/users/:id", (req, res) =>{
    //TODO : Edit the user with id
    return res.json({status : "pending"});
});

app.delete("/api/users/:id", (req, res) =>{
    //TODO : delete the user with id
    return res.json({status : "pending"});
});

// for the api which use same path we can also write it as

// app.route("/api/users/:id")
// .get((req, res) =>{

// })
// .post((req, res) =>{

// })
// .patch((req, res) =>{

// });

app.listen(PORT, () => console.log("Server Started!"));