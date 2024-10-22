const {getUser} = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res){
    const userId = req.cookies.uid;

    if(!userUid) return res.redirect("/login");
    const user = getUser(userUid);

    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

module.exports = {restrictToLoggedInUserOnly,};