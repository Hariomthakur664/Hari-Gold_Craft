const mongoose = require('mongoose');

// Define the schema for a jewelry item
const jewelrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  images: {
    url: String,
    filename:String,
},

  basePricePerGram: {
    type: Number,
    default : 70000
  },

  weightInGrams: {
    type: Number,
    required: true,
  },

  jewellerName: {
    type: String,
    required: true,
    default: 'AG Jewellers',
  },

  calculatedPrice: {
    type: Number,
    required: true,
    default: function () {
      return this.basePricePerGram * this.weightInGrams;
    },
  },

  material: {
    type: String,
    required: true,
  },

  availability: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});

// Pre-save middleware to calculate the price based on weight before saving
jewelrySchema.pre('save', function (next) {
  this.calculatedPrice = this.basePricePerGram * this.weightInGrams;
  next();
});

module.exports = mongoose.model('List', jewelrySchema);

