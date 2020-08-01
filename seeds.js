var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/Comment");
var Data = [{
        name: "Ankit",
        image: "https://wallpaperaccess.com/full/5828.jpg",
        description: "Praesent ac arcu at nisi posuere imperdiet et fringilla ex. Ut volutpat congue nisi, sed vehicula arcu lobortis ac. Vivamus congue dictum enim, quis lacinia augue dictum ac. Cras non nibh ut velit pulvinar volutpat in eu sapien. Etiam hendrerit nisl quis pretium tempor. Vivamus orci ipsum, accumsan eu justo et, faucibus dignissim orci. Nulla et metus at enim facilisis blandit in vitae lacus. Curabitur aliquam lectus vel sapien fermentum consequat. Aenean et lacus viverra, auctor tortor sit amet, luctus justo. Nunc facilisis eget nibh ac tristique."
    },
    {
        name: "Mohit",
        image: "https://wallpaperaccess.com/full/181060.jpg",
        description: "Praesent ac arcu at nisi posuere imperdiet et fringilla ex. Ut volutpat congue nisi, sed vehicula arcu lobortis ac. Vivamus congue dictum enim, quis lacinia augue dictum ac. Cras non nibh ut velit pulvinar volutpat in eu sapien. Etiam hendrerit nisl quis pretium tempor. Vivamus orci ipsum, accumsan eu justo et, faucibus dignissim orci. Nulla et metus at enim facilisis blandit in vitae lacus. Curabitur aliquam lectus vel sapien fermentum consequat. Aenean et lacus viverra, auctor tortor sit amet, luctus justo. Nunc facilisis eget nibh ac tristique."
    },
    {
        name: "Krishna",
        image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        description: "Praesent ac arcu at nisi posuere imperdiet et fringilla ex. Ut volutpat congue nisi, sed vehicula arcu lobortis ac. Vivamus congue dictum enim, quis lacinia augue dictum ac. Cras non nibh ut velit pulvinar volutpat in eu sapien. Etiam hendrerit nisl quis pretium tempor. Vivamus orci ipsum, accumsan eu justo et, faucibus dignissim orci. Nulla et metus at enim facilisis blandit in vitae lacus. Curabitur aliquam lectus vel sapien fermentum consequat. Aenean et lacus viverra, auctor tortor sit amet, luctus justo. Nunc facilisis eget nibh ac tristique."
    },
    {
        name: "Gunjan",
        image: "https://cdn.hipwallpaper.com/i/85/84/6WAh0D.jpg",
        description: "Praesent ac arcu at nisi posuere imperdiet et fringilla ex. Ut volutpat congue nisi, sed vehicula arcu lobortis ac. Vivamus congue dictum enim, quis lacinia augue dictum ac. Cras non nibh ut velit pulvinar volutpat in eu sapien. Etiam hendrerit nisl quis pretium tempor. Vivamus orci ipsum, accumsan eu justo et, faucibus dignissim orci. Nulla et metus at enim facilisis blandit in vitae lacus. Curabitur aliquam lectus vel sapien fermentum consequat. Aenean et lacus viverra, auctor tortor sit amet, luctus justo. Nunc facilisis eget nibh ac tristique."
    }
]

function seedDb() {
    Campground.deleteMany({}, function(err) {
        if (err)
            console.log(err);
        console.log("Removed");
        Data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err)
                    console.log(err)
                else {
                    console.log("Added a Campground");
                    Comment.create({
                        text: "This place is great",
                        author: "Ankit"
                    }, function(err, comment) {
                        if (err)
                            console.log(err);
                        else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment");
                        }
                    });
                }

            })
        });
    })
}

module.exports = seedDb;