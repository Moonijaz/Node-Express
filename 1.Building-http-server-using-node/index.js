// creating server using http

const http = require("http");
const fs = require("fs");  // using fs for file handling
const url = require("url");

const myServer = http.createServer((req, res) =>{
    if (req.url === "/favicon.ico") return res.end();
    const log = '${Date.now()} : ${req.url} New Req Received \n';     // input data into log file
    const myUrl = url.parse(req.url, true);

    fs.appendFile("log.txt", log, (err, data) =>{   //creating and appending data in log.txt
        switch(myUrl.pathname){
            case "/": 
                if (req.method === "GET") res.end("Home Page")
                break;
             case "/about":
                const username = myUrl.query.myname;
                 res.end('hi, ${username}');
                break ;
            default: res.end("404 Not Found");
        }
    })
});

myServer.listen(8000, ()=> console.log("Server Started!"));