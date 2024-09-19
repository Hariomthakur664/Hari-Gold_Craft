const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        refPath: 'authorModel'  // Use a reference path
    },
    authorModel: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Review", reviewSchema);
