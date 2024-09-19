const express = require ("express");
const router = express.Router();

router.get("/privacy", (req, res)=>{
    res.render("./listings/privacy");
})

router.get("/terms", (req, res)=>{
    res.render("./listings/services");
})
module.exports= router;