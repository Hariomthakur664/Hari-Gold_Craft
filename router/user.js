const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsyn.js");
const passport = require("passport");

const usersControllers  = require("../controllers/users.js");
const {  saveRedirectUser } = require("../middleware.js");


router.get("/signup", usersControllers.get);

router.post("/signup", wrapAsync(usersControllers.post));

router.get("/login",  usersControllers.loginGet);

router.post('/login',
    saveRedirectUser,
    passport.authenticate('user-local', { failureRedirect: '/login', failureFlash: true }),
    usersControllers.loginPost    
);


router.get("/verify", wrapAsync( usersControllers.verify));


router.get("/logout", (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "logged out successfuly");
        res.redirect("/hr/listing");
    })
})

module.exports = router;
