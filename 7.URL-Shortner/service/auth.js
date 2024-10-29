//const sessionIdToUserMap = new Map();  // we were trying to maintain our state but now we will use jwt

const jwt = require("jsonwebtoken");
const secret = "moon123_678";

function setUser(user){
    //sessionIdToUserMap.set(id, user);
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}

function getUser(token){
    // return sessionIdToUserMap.get(id);
    if(!token) return null;
    try{
     return jwt.verify(token, secret);    
    } catch{
        return null; 
    }
       
}

module.exports = {setUser, getUser};