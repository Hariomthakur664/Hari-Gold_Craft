if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const methodOverride = require('method-override');
const engineMate = require('ejs-mate');
const ExpressError = require("./utils/ExpessError.js");

const homeRouter = require("./router/home.js");
const listingRouter = require("./router/listing.js");
const reviewRouter = require("./router/review.js");
const userRouter = require("./router/user.js");
const adminRouter = require("./router/admin.js");
const listRouter = require("./router/jewelleyList.js");
const privacyRouter = require("./router/privacy.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./modules/user.js");
const Admin = require("./modules/admin.js");
const { error } = require('console');


const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch((err) => {
        console.log(err);
    });


    async function main() {
        await mongoose.connect(dbUrl);
      }
      
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRETE,
      },
    touchAfter: 24*3600,
  });

store.on("error", ()=>{
    console.log(error);
})
  
const sessionOption = {
    store,
    secret: process.env.SECRETE, // Secure this in production (use environment variable)
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.engine('ejs', engineMate);
app.use(express.static(path.join(__dirname, "/public")));

// Session and flash messages
app.use(session(sessionOption));
app.use(flash());

// Passport.js initialization
app.use(passport.initialize());
app.use(passport.session());

// Set up Passport strategies for user and admin
passport.use('user-local', new LocalStrategy(User.authenticate()));
passport.use('admin-local', new LocalStrategy(Admin.authenticate()));

// Serialization and deserialization for both user and admin
passport.serializeUser((entity, done) => {
    done(null, { id: entity.id, type: entity instanceof User ? 'user' : 'admin' });
});

passport.deserializeUser(async (obj, done) => {
    try {
        if (obj.type === 'user') {
            const user = await User.findById(obj.id).exec();
            done(null, user);
        } else {
            const admin = await Admin.findById(obj.id).exec();
            done(null, admin);
        }
    } catch (err) {
        done(err, null);
    }
});

// Middleware to pass flash messages and user data to templates
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    // Only set currAdmin if the user is logged in and is an admin
    if (req.user ) {
        res.locals.currAdmin = req.user.licenseNumber; // Admin identification
    }
    next();
});

// Routing middleware
app.use("/hr", homeRouter);
app.use("/hr/listing", listingRouter);
app.use("/hr/listing/:id/reviews", reviewRouter);
app.use("/hr/listing/:id/List", listRouter);
app.use("/", userRouter);
app.use("/", adminRouter);
app.use("/", privacyRouter);

// Root route
app.get("/", (req, res) => {
    res.send("Hi, I am the root.");
});

// Error handling for undefined routes
app.all("*", (req, res, next) => {
    next(new ExpressError(400, "Page Not Found"));
});

// General error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "__some error__" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

// Server listens on port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
