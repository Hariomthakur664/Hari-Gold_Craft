const User = require("../modules/user.js");
const sendVerifyMail = require("../public/js/verifiedMail.js");
const router = require("../router/listing.js");
const { route } = require("../router/listing.js");


//sing up
module.exports.get =  (req, res) => {
    res.render("./users/signup.ejs");
};

module.exports.post = async (req, res) => {
    try {
        let { email, username, is_varified, password } = req.body;
        const newUser = new User({ email, username, is_varified });
        const result = await User.register(newUser, password);
        await sendVerifyMail(username, email, result._id); // Await the mail sending function
        req.flash("success", "Registration successful. Please verify your email.");
        res.redirect("/login");
    } catch (err) {
        if (err.keyPattern && err.keyPattern.email === 1) {
            req.flash("error", "Email ID already registered");
            res.redirect("/signup");
        } else {
            req.flash("error", err.message || "An unknown error occurred");
            res.redirect("/signup");
        }
    }
};

//login
module.exports.loginGet = (req, res) => {
    
    res.render("./users/login.ejs");
};

module.exports.loginPost = async (req, res) => {
    // Check if the user is logged in and verified
    
    if (req.user && req.user.is_varified === 1) {
        req.flash("success", "Welcome to Hari-GoldCraft, successfully logged in.");
        let redirectUrl = res.locals.redirectUrl || '/hr/listing' ;
        return res.redirect(redirectUrl);
    } else {
        req.flash("error", "Please verify your email.");
        return res.redirect("/login"); // Redirect back to login if not verified
    }
};


//verify
module.exports.verify = async (req, res) => {
    try {
        const updateInfo = await User.updateOne({_id: req.query.id }, { $set: { is_varified: 1 } }); // Updated field name to _id
        if (updateInfo) {
            req.flash("success", "Email verified successfully. Registration complete.");
        } else {
            req.flash("error", "Verification failed. Please try again.");
        }
        res.redirect("/login");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};
