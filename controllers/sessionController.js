var Users = require("../models/userModel.js");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");
var secrets = require("../config/secrets");

var saltRounds = 10;
var bPassword = secrets.bcrypt.password;


module.exports = function(app, passport){

  app.post("/login", function(req, res, next){
    console.log(req.body);
    passport.authenticate("local", function(err, user, info){
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({err: "Couldn't find user"});
      }
      res.status(200).json({status: "login successful"});
    })(req, res, next);
  });


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

  app.post("/oauthregister", function(req, res){
    // create a hashed password from the fb id.
    var newPassword = bcrypt.hashSync(req.body.id, saltRounds);
    var newUser = Users({
      name: req.body.id,
      email: req.body.email,
      password: newPassword
    });
    console.log(newUser);
    newUser.save()
    .then(function(success){
      res.status(200).send(success);
    })
    .catch(function(err){
      res.status(500).send(err);
    });
  });

  app.post("/oauthlogin", function(req, res){
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
