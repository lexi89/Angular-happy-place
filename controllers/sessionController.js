var Users = require("../models/userModel.js");
var bodyParser = require("body-parser");


module.exports = function(app, passport){

  app.post("/register", function(req, res){
    var newUser = Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    newUser.save()
    .then(function(success){
      res.send(success);
    })
    .catch(function(err){
      res.status(500);
      res.send(err);
    });
  });

  app.post("/oauthlogin", function(req, res){
    console.log(req.body);
    Users.findOne({email:req.body.email})
    .then(function(user){
      console.log(user);
      if (user){
        res.status(200).send("logged in!");
      } else {
        res.status(400).send("No user found");
      }
    })
    .catch(function(err){
      console.log(err);
      res.status(400).send("Something went wrong in the lookup...");
    });
  });
};
