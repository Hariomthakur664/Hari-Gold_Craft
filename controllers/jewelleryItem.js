const Listings = require("../modules/listings");
const List   = require("../modules/listingJewellery");

//post 
module.exports.post = async (req, res) => {
    let { path: url, filename } = req.file;
    let listings = await Listings.findById(req.params.id);
    let newList = new List(req.body.list);
    newList.images = {url, filename};
    listings.lists.push(newList);
   
    await newList.save();
    await listings.save();
    req.flash("success", "New list item added successfully");
    res.redirect(`/hr/listing/${listings._id}/listShow`); // Fixed redirection
};

//edit
module.exports.edit = async (req, res) => {
    const { id, listId } = req.params;
    const listing = await Listings.findById(id).populate('lists').exec();

    if (!listing) {
        req.flash("error", "Jewellery list does not exist");
        return res.redirect(`/hr/listing/${id}`);
    }

    // Find the specific list within the listing's lists array
    const list = listing.lists.find(list => list._id.toString() === listId);

    if (!list) {
        req.flash("error", "List not found");
        return res.redirect(`/hr/listing/${id}`);
    }

    res.render("./listings/listEdit", { listing, list });
};

//update
module.exports.update = async (req, res) => {
    const { id, listId } = req.params;
    const updatedListData = req.body.list;
    //if file uploaded
    if(req.file){
        let { path: url, filename } = req.file;
        updatedListData.images = {url, filename};
    }

    // Find the listing by ID and populate its lists
    const listing = await Listings.findById(id).populate('lists').exec();
    

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect(`/hr/listing/${id}`);
    }

    // Find the specific list within the listing's lists array
    const list = listing.lists.find(list => list._id.toString() === listId);

    if (!list) {
        req.flash("error", "List not found");
        return res.redirect(`/hr/listing/${id}`);
    }

    // Update the list fields with the new data
    Object.assign(list, updatedListData);

    // Save the updated listing document
    await listing.save();
    await list.save();

    req.flash("success", "List updated successfully");
    res.redirect(`/hr/listing/${id}/listShow`);
};

module.exports.delete = async (req, res) => {
    let { id, listId } = req.params;
    
    // Remove the list item from the listing
    await Listings.findByIdAndUpdate(id, { $pull: { lists: listId } });
    
    // Delete the list
    await List.findByIdAndDelete(listId);
    
    req.flash("success", "Item deleted successfully");

    // Fetch the updated listing to check if there are any lists left
    const listing = await Listings.findById(id);
    
    // If no lists are available, redirect to the provided path
    if (listing.lists.length === 0) {
        return res.redirect(`/hr/listing/${id}`);
    }

    // Otherwise, redirect to the list show page
    res.redirect(`/hr/listing/${id}/listShow`);
};
