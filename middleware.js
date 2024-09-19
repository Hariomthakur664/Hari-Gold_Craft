const flash = require("flash")

//admin
module.exports.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated() && req.user.licenseNumber){  
     next();
    }
    else{
        req.flash("error", "Admin is must be login");
        req.session.redirectUrl = req.originalUrl;
        return res.redirect("/adminLogin");
    }
}

module.exports.saveRedirect = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

//User
module.exports.isLoggedIn_user = (req, res, next)=>{
    if(req.isAuthenticated()){   
     next();
    }
    else{
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "User is must be login");
        return res.redirect("/Login");
    }
}

module.exports.saveRedirectUser = module.exports.saveRedirect = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}



