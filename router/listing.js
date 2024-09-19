const express = require ("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyn.js");
const ExpressError = require("../utils/ExpessError.js");
const {ListingSchema} = require("../schema.js");
const listingControllers = require("../controllers/listing.js");
const {isLoggedIn, isLoggedIn_user} = require("../middleware.js");

const multer  = require('multer');
const { storage } = require("../cloudanaryConfig.js");
const upload = multer({storage});


const validateListing = (req, res, next)=>{
    let {error} = ListingSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errmsg);
    }
    else{
        next();
    }
};

//index rout
router.get("/", wrapAsync(listingControllers.index));
  
  //new rout
  router.get("/new", isLoggedIn, listingControllers.new);
  
  //show rout
  router.get("/:id", isLoggedIn_user || isLoggedIn ,  wrapAsync(listingControllers.show));
  

  //create rout
  router.post("/",  upload.single('listing[image]'), wrapAsync(listingControllers.create));
  
  //edit rout
  router.get("/:id/edit",  wrapAsync(listingControllers.edit));

  // Update route
  router.put("/:id", upload.single('listing[image]'), listingControllers.update);


  //specific lists
  router.get("/:id/listShow", wrapAsync(listingControllers.itemsShow));



  //delete rout
  router.delete("/:id", wrapAsync(listingControllers.delete));
  
  module.exports = router;