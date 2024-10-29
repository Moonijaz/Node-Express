const {getUser} = require("../service/auth");   // we were trying to maintain our state but now we will use jwt


async function restrictToLoggedInUserOnly(req, res, next){
    const userUid = req.cookies?.uid;

    if(!userUid) return res.redirect("/login");
    const user = getUser(userUid);

    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    const userUid =  req.cookies?.uid;
    const user = getUser(userUid);
    // const token =  req.cookies.uid;
    // const user = getUser(token);
    req.user = user;
    next();
}




module.exports = {restrictToLoggedInUserOnly,checkAuth};