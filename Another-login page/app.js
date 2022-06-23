//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");



const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));



mongoose.connect("mongodb://localhost:27017/OurAppDB", {useNewUrlParser: true});

const UserSchema = {
    username: String,
    email: String,
    password: String
};


const feedSchema = {
    title: String,
    content: String
};


const User = new mongoose.model("User", UserSchema);

const feed = new mongoose.model("feed", feedSchema);


app.get("/", function(req,res){
    res.render("login");
});

app.get("/login", function(req,res){
    res.redirect("/");
});


app.get("/:signup", function(req,res){
    res.render("signup");
});


app.post("/signup", function(req,res){

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save(function(err){
        if (!err){
            res.redirect("/");
        }
    });
});

app.post("/login", function(req,res){

    

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}, function(err, foundUser){
        if(err){
            alert("wrong email ID! Try signing up first.")
        } else{
            if(foundUser){
                if(foundUser.password === password){
                    res.render("home");
                }
            }
        }
    }); 
})




// app.get("/login", function(req,res){
//     res.render("login");
// });

// app.get("/register", function(req,res){
//     res.render("register");
// });


// app.get("/logout", function(req, res){
//     req.logout();
//     res.redirect("/");
// });




app.listen(3000, function(){
    console.log("Server started on port 3000");
});
