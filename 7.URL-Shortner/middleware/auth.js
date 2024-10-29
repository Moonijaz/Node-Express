const {getUser} = require("../service/auth");   // we were trying to maintain our state but now we will use jwt


async function restrictToLoggedInUserOnly(req, res, next){
//    const userUid = req.cookies?.uid;
    const userUid = req.headers['Authorization']; //Adding authorization header instead of cookies

    if(!userUid) return res.redirect("/login");
    const token = userUid.split('Bearer ')[1];
    // const user = getUser(userUid);
    const user = getUser(token);
    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    // const userUid =  req.cookies?.uid;
    // const user = getUser(userUid);
    // // const token =  req.cookies.uid;
    // // const user = getUser(token);
    // req.user = user;
    // next();

    const userUid = req.headers['authorization'];
    const token = userUid.split('Bearer ')[1];
    const user = getUser(token);
    req.user = user;
    next();
}




module.exports = {restrictToLoggedInUserOnly,checkAuth};