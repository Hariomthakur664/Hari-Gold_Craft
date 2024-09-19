const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyn.js");
const passport = require("passport");

const adminControllers = require("../controllers/admin.js");
const { saveRedirect } = require("../middleware.js");


router.get("/adminSignup", adminControllers.get);

router.post("/adminSignup", wrapAsync(adminControllers.post));

router.get("/adminLogin", adminControllers.loginGet);

router.post('/adminLogin', saveRedirect,
    passport.authenticate('admin-local', { failureRedirect: '/adminLogin', failureFlash: true }),
    adminControllers.loginPost
 );

 router.get("/verifyAdmin", wrapAsync( adminControllers.verify));

 router.get("/a-logout", (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "logged out successfuly");
        res.redirect("/hr/listing");
    })
})

module.exports = router;
