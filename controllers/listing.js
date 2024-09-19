const Listings = require("../modules/listings.js");

//index
module.exports.index = async (req, res)=>{
    //for search
    let search = '';
    if(req.query.search){
        search = req.query.search;
    }
   const allListings = await Listings.find({

           name : {$regex: '.*'+search+'.*', $options : 'i'}
       
   });

   res.render("./listings/index", {allListings});
 };

 //new
 module.exports.new = (req, res)=>{
    res.render("./listings/create");
};


//show
module.exports.show = async (req, res)=>{
    let {id} = req.params;
    const listings = await Listings.findById(id)
    .populate({
      path: 'review',
      populate: {
        path: 'author',  // Populate 'author' field inside 'review'
        // Mongoose will automatically resolve 'author' based on 'refPath'
      }
    })
    .populate('lists')  // Populate 'lists' field
    .populate('owner');  // Populate 'owner' field
  
    
    if(!listings){
      req.flash("error", "listing does not exist ");
      res.redirect("/hr/listing");
    }
    res.render("./listings/show", {listings});
};

//create 
module.exports.create = async (req, res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const listing = new Listings(req.body.listing);
    listing.image = {url, filename};
    listing.owner = req.user;
    await listing.save();
    req.flash("success", "succesfully added shop");
    res.redirect("/hr/listing");
};

//edit 
module.exports.edit = async (req, res)=>{
    let {id} = req.params;
    const listing = await Listings.findById(id);
    if(!listing){
      req.flash("error", "listing does not exist ");
      res.redirect("/hr/listing");
    }
    res.render("./listings/edit", {listing});
};

//update
module.exports.update = async (req, res) => {
    const { id } = req.params;
    const updatedListData = { ...req.body.listing };

    // Check if a file was uploaded
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListData.image = { url, filename };
    }

    try {
        // Find the listing by ID and update it with the new data
        const listing = await Listings.findByIdAndUpdate(id, updatedListData, { new: true });

        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect(`/hr/listing/${id}`);
        }

        req.flash("success", "Listing updated successfully");
        res.redirect(`/hr/listing/${id}`);
    } catch (error) {
        console.error(error);
        req.flash("error", "An error occurred while updating the listing");
        res.redirect(`/hr/listing/${id}`);
    }
};


//new specific item list
module.exports.itemsShow = async (req, res) => {
    const { id } = req.params;
    const search = req.query.search || ''; // Get the search query or default to empty string

    // Fetch the listing by id and populate the lists and reviews
    const listings = await Listings.findById(id)
        .populate("lists")  // Populate all lists
        .populate("review"); 
    

    if (!listings) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/hr/listing"); // Redirect if the listing does not exist
    }

    // Filter the lists array based on the search query
    const filteredLists = listings.lists.filter(list =>
        list.name && list.name.toLowerCase().includes(search.toLowerCase())  // Adjust this line if the field is different
    );

    // Render the view with the filtered lists
    res.render("./listings/listShow", { listings: { ...listings.toObject(), lists: filteredLists } });
};


//delete list
module.exports.delete = async (req, res)=>{
    let {id} = req.params;
    const deleteShop = await Listings.findByIdAndDelete(id);
    console.log(deleteShop);
    req.flash("success", "shop deleted successfully");
    
    res.redirect("/hr/listing");  
};
