const Listings = require("../modules/listings");
const Review = require("../modules/review.js");
const {isLoggedIn} = require("../middleware.js");

module.exports.review = async (req, res) => {
    try {
        // Find the listing by ID
        let listing = await Listings.findById(req.params.id);

        let newReview = new Review(req.body.review);

        // Set the author model dynamically based on admin status
        newReview.authorModel = req.user.licenseNumber ? 'Admin' : 'User';
        
        // Assign the ObjectId of the user/admin to the new review
        newReview.author = req.user._id;  // Assuming req.user._id is the ObjectId

        console.log(newReview);
        // Add the new review to the listing's reviews
        listing.review.push(newReview);

        // Save the new review
        await newReview.save();

        // Save the updated listing
        await listing.save();

        // Flash success message
        req.flash("success", "New review added successfully");

        // Redirect to the listing page
        res.redirect(`/hr/listing/${listing._id}`);
    } catch (error) {
        console.error("Error adding review:", error);
        req.flash("error", "Something went wrong");
        res.redirect(`/hr/listing/${req.params.id}`);
    }
};


//delete 
module.exports.delete = async(req, res)=>{
    let {id, reviewId} = req.params;

    await Listings.findByIdAndUpdate(id, {$pull: {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted succefully");
    res.redirect(`/hr/listing/${id}`);
};