// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const List = require("./listingJewellery");
const { ref, number } = require("joi");

const listingSchema = new Schema({
    name: {
        type : String,
        require : true
    },
    address : {
        type : String,
        require : true
    },
    country : String,

    city    : String,

    specification : String,

    description : String,

    image  : {
        url: String,
        filename:String,
    },

    number : Number,

    review : [
        {
            type : Schema.Types.ObjectId,
            ref  : "Review",
        }
    ],

    lists : [
        {
            type : Schema.Types.ObjectId,
            ref : "List"
        }
    ],

    owner:{
        type : Schema.Types.ObjectId,
        ref  : "Admin"
    }
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in : listing.review}});
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
