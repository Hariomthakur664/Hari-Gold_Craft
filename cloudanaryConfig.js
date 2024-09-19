const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const crypto = require('crypto');

const apiSecret = 'your_cloudinary_api_secret';
const folder = 'Hari-GoldCraft';
const timestamp = Math.floor(Date.now() / 1000);  // Current timestamp in seconds

// Create the string to sign
const stringToSign = `folder=${folder}&timestamp=${timestamp}`;

// Generate the signature using SHA-1 hashing
const signature = crypto.createHash('sha1')
                        .update(stringToSign + apiSecret)
                        .digest('hex');



cloudinary.config({
    cloud_name: process.env.CLOUDANRY_NAME,
    api_key: process.env.CLOUDANRY_API_KEY,
    api_secret: process.env.CLOUDANRY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Hari-GoldCraft',
      allowerdFormats: ["jpg", "png", "jpeg"],
    },
  });

  module.exports = {
    cloudinary,
    storage
  }