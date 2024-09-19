const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsyn.js");
const ExpressError = require("../utils/ExpessError.js");
const { reviewSchema} = require("../schema.js");
const Listings = require("../modules/listings.js");
const Review = require("../modules/review.js");
const reviewControllers = require("../controllers/review.js");


const validateReview = (req, res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errmsg);
    }
    else{
        next();
    }
};

//review rout
router.post("/", validateReview, wrapAsync(reviewControllers.review));
//review delete rout
router.delete("/:reviewId", wrapAsync(reviewControllers.delete))

module.exports =  router;
