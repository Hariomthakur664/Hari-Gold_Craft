const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsyn.js"); // Correct file path
const ExpressError = require("../utils/ExpessError"); // Uncommented and corrected file path
const { listSchema } = require("../schema.js"); // Uncommented
const multer  = require('multer')
const { storage } = require("../cloudanaryConfig.js");
const upload = multer({storage});

const jewelleryControllers = require("../controllers/jewelleryItem.js");

// Validate List middleware
const validateList = (req, res, next) => {
    let { error } = listSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};


// jewelleryList route
router.post("/", upload.single('list[images]'), validateList, wrapAsync(jewelleryControllers.post));

// Edit route
router.get("/:listId/edit", jewelleryControllers.edit);

// Update route
router.put("/:listId", upload.single('list[images]'), jewelleryControllers.update);

// jewelleryList delete route
router.delete("/:listId", wrapAsync(jewelleryControllers.delete));

module.exports = router;
