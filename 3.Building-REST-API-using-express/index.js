const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs"); //for file handling 

const app = express();
const PORT = 8000;

//Middleware - Pluggin
app.use(express.urlencoded({extended: false}));  //getting data from front-end and form it into objectss

app.use((req, res, next) => {   //next is pointing our route
    console.log("hi from middleware 1");
    fs.appendFile('log.txt', `${Date.now()}: ${req.method}: ${req.path} \n`, (err, data)=>{
      next();   
    });
   
})
    // middleware 1 will allow it to go to m-2 and 2 will allow to go to routes
app.use((req, res, next) => {   
    console.log("hi from middleware 2");
    next();
})


//API's

// sending json as html , SERVER SIDE RENDERING
app.get("/users", (req, res) =>{
    const html = `
    <ul>
        ${users.map((user) => `<li> ${user.first_name}</li>`).join('')}
    </ul>
    `
    res.send(html);
});

//getting data as json
app.get("/api/users", (req, res) =>{
    return res.json(users);
});

//getting data as id (DYNAMIC PATH PARAMETERS)
app.get("/api/users/:id", (req, res) =>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

app.post("/api/users", (req, res) =>{   //using postman to check req, this will add new users in json file on localhost
    //TODO : Create a nerw user
    const body = req.body;
    users.push({...body, id: users.length +1}); //(...body) => append body in user file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) =>{
     return res.json({status : "success", id: users.length });    
    })
   console.log(body);
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