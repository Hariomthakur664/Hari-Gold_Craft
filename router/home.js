const express = require ("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyn.js");
const ExpressError = require("../utils/ExpessError.js");
const {ListingSchema} = require("../schema.js");
const Listings = require("../modules/listings.js");

//home 
router.get("/", (req, res)=>{
    res.render("./listings/homePage");
})

module.exports = router;