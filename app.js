 var express = require("express");
 var app = express();
 var bodyParser = require("body-parser");
 var mongoose = require("mongoose");
 var flash = require("connect-flash");
 var Campground = require("./models/campground");
 var passport = require("passport")
 var LocalStrategy = require("passport-local");
//  var Comment = require("./models/Comment");
 var methodOverride = require("method-override");
 var User = require("./models/user");
 //  var passportLocalMongoose = require("passport-local-mongoose");
//  var seed = require("./seeds");


 var commentRoutes = require("./routes/comments"),
     campgroundRoutes = require("./routes/campgrounds"),
     indexRoutes = require("./routes/index");

//  mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect("mongodb+srv://ankit9905:ankit@yelpcamp.df7rx.mongodb.net/yelp_camp?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).catch ((error)=>{console.log(error)});

//  mongodb+srv://ankit9905:<password>@yelpcamp.df7rx.mongodb.net/<dbname>?retryWrites=true&w=majority

 app.use(bodyParser.urlencoded({ extended: true }));
 app.set("view engine", "ejs");
 app.use(express.static(__dirname + "/public"))
 app.use(methodOverride("_method"));
 app.use(flash());
 //seed();// seed the database
 // =============================================================        PASSPORT CONFIGURATION       ========================================================

 app.use(require("express-session")({
     secret: "Hi my name is Ankit",
     resave: false,
     saveUninitialized: false
 }));

 app.use(passport.initialize());
 app.use(passport.session());

 passport.use(new LocalStrategy(User.authenticate()));

 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());


 app.use(function(req, res, next) {
     res.locals.currentUser = req.user;
     res.locals.error = req.flash("error");
     res.locals.success = req.flash("success");
     next();
 });






 /*=======================================================================  Creating new Campground  ===================================================*/
 //  Campground.create({
 //      name: "Ankit",
 //      image: "https://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg",
 //      description: "This is a huge granite hill.Please visit once. you will love it!"
 //  }, function(err, campground) {
 //      if (err)
 //          console.log("There are errors " + err);
 //      else
 //          console.log("New CampGround created"), console.log(campground);
 //  })
 /* =======================================================================    Campground array       =================================================================*/
 //  var campgrounds = [
 //      { name: "Ankit", image: "https://media.istockphoto.com/photos/camping-tent-in-a-camping-in-a-forest-by-the-river-picture-id911995140?k=6&m=911995140&s=612x612&w=0&h=U-yG-2eR8pOxLX_G8Eg9fDI1SOWYifxbb4BiiOhNNiI=" },
 //      { name: "Abhinav", image: "https://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg" },
 //      { name: "Mohit", image: "https://wordpress.accuweather.com/wp-content/uploads/2019/03/camping-thumbnail.11.4920AM-1.png?w=632" },
 //      { name: "Ankit", image: "https://media.istockphoto.com/photos/camping-tent-in-a-camping-in-a-forest-by-the-river-picture-id911995140?k=6&m=911995140&s=612x612&w=0&h=U-yG-2eR8pOxLX_G8Eg9fDI1SOWYifxbb4BiiOhNNiI=" },
 //      { name: "Gunjan", image: "https://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg" },
 //      { name: "Mohit", image: "https://wordpress.accuweather.com/wp-content/uploads/2019/03/camping-thumbnail.11.4920AM-1.png?w=632" },
 //      { name: "Ankit", image: "https://media.istockphoto.com/photos/camping-tent-in-a-camping-in-a-forest-by-the-river-picture-id911995140?k=6&m=911995140&s=612x612&w=0&h=U-yG-2eR8pOxLX_G8Eg9fDI1SOWYifxbb4BiiOhNNiI=" },
 //      { name: "Mukul", image: "https://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg" },
 //      { name: "Mohit", image: "https://wordpress.accuweather.com/wp-content/uploads/2019/03/camping-thumbnail.11.4920AM-1.png?w=632" }
 //  ]

 app.get("/", function(req, res) {
     res.render("landing");
 });
 // campgrounds===================================================================================

 app.use("/", indexRoutes);
 app.use("/campgrounds", campgroundRoutes);
 app.use("/campgrounds/:id/comments", commentRoutes);


//  app.listen(3000, process.env.IP, function() {
//      console.log("Server Started ");
//  });
 
 app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server Started ");
});