var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


// CAMPGROUND ALL DISPLAY PAGE
router.get("/", function(req, res) {
    Campground.find({}, function(err, allcampgrounds) {
        if (err)
            console.log(err);
        else
            res.render("campgrounds/index", { camp: allcampgrounds, currentUser: req.user });
    })

});
// CREATE NEW CAMPGROUNDS TO DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = { name: name,price:price, image: image, description: description, author: author };
    Campground.create(newCampground, function(err, newCampground) {
        if (err)
            console.log(err);
        else
            res.redirect("/campgrounds");
    });

});
// NEW CAMPGROUND ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// COMMENT DISPLAY ROUTE
router.get("/:id", function(req, res) {

    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err)
            console.log(err)
        else
        //  console.log(foundCampground);
            res.render("campgrounds/show", { camp: foundCampground });

    });

});
//Edit campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err)
            res.redirect("/campgrounds")
        else
            res.render("campgrounds/edit", { campground: foundCampground });
    });

});
//Update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, { useFindAndModify: false }, function(err, updated) {
        if (err)
            res.redirect("/campgrounds");
        else{
            req.flash("success", "Updated Campground Succesfully");
            res.redirect("/campgrounds/" + req.params.id);}
    });
})



//Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, { useFindAndModify: false }, function(err) {
        if (err)
            res.redirect("/camgrounds");
        else {
                req.flash("success", "Deleted Campground Succesfully");
                res.redirect("/campgrounds");
            }
    });

});


module.exports = router;