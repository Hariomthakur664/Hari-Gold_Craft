const Admin = require("../modules/admin.js");
const sendVerifyMail = require("../public/js/verifidMailAd.js");

module.exports.get = (req, res) => {
    res.render("./users/admin.ejs");
};

module.exports.post = async (req, res) => {
    try {
        let { licenseNumber, email, phoneNumber, is_varifiedAdmin, username, password } = req.body;

        // Ensure required fields are not null or empty
        if (!licenseNumber || !phoneNumber || !email || !username) {
            req.flash("error", "All fields are required.");
            return res.redirect("/adminSignup");
        }

        // Create new Admin user
        const newUser = new Admin({ licenseNumber, email, phoneNumber, is_varifiedAdmin, username });

        // Register the new user with the provided password
        const result = await Admin.register(newUser, password);

        // Send verification email
        await sendVerifyMail(username, email, result._id);

        // Provide success feedback
        req.flash("success", "Registration successful. Please verify your email.");
        res.redirect("/adminLogin");
    } catch (err) {
        if (err.code === 11000) { // Handle duplicate key error
            const duplicateField = Object.keys(err.keyPattern)[0];
            req.flash("error", `${duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)} already exists.`);
        } else {
            req.flash("error", err.message || "An unknown error occurred.");
        }
        res.redirect("/adminSignup");
    }
};


module.exports.loginGet =  (req, res) => {
    res.render("./users/adminLogin.ejs");
};

module.exports.loginPost =    async (req, res) => {
    if (req.user && req.user.is_varifiedAdmin == 1) {
        req.flash("success", "Welcome to Hari-GoldCraft, successfully logged in.");
        let redirectUrl = res.locals.redirectUrl || '/hr/listing' ;
        res.redirect(redirectUrl);
    } else {
        req.flash("error", "Please verify your email.");
        res.redirect("/adminLogin");
    }
};

//verification fun
module.exports.verify = async (req, res) => {
    try {
        const updateInfo = await Admin.updateOne({ _id: req.query.id }, { $set: { is_varifiedAdmin: 1 } });

        if (updateInfo.matchedCount > 0 && updateInfo.modifiedCount > 0) {
            req.flash("success", "Email verified successfully. Registration complete.");
        } else {
            req.flash("error", "Verification failed. Please try again.");
        }

        res.redirect("/adminLogin");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};