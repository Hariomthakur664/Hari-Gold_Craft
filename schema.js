
const joi = require('joi');

module.exports.ListingSchema = joi.object({
    jewelleryschemas: joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    country: joi.string().required(),
    city: joi.string().required(),
    address: joi.string().required(),
    image: joi.string().required(),

}).required(),
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required(),

    }).required(),
});

module.exports.listSchema = joi.object({
    list: joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
        material: joi.string().required(),
        category: joi.string().required(),
        basePricePerGram: joi.number().required().min(0),
        weightInGrams: joi.number().required().min(0),
        jewellerName: joi.string().required(),
        images: joi.string().optional() // Add the 'images' field here
    }).required(),
});

