const mongoose = require("mongoose");
const initData = require("./data.js"); // Import the array directly
const Listings = require("../modules/listings.js");
const { Body } = require("twilio/lib/twiml/MessagingResponse.js");

// MongoDB connection URL
const mongoDb_url = "mongodb://127.0.0.1/jewellery";

main()
.then(()=>{
    console.log("connection succesful");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
        await mongoose.connect(mongoDb_url);
        console.log("Mongoose connection successful");  
}

const initDB = async (req, res) => {
        await Listings.deleteMany({});
       
         initData.data = initData.data.map((obj) => ({ ...obj, owner: '66e15514e73a2a612d7d5c68' }));
        await Listings.insertMany(initData.data);
        console.log("Data was initialized");
     
}

initDB();

