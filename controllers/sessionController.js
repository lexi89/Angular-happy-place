var bodyParser = require("body-parser");
var Users = require("../models/userModel.js");

module.exports = function(app){

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));

  app.get("/fblogin", function(req, res){
    passport.authenticate("facebook");
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

};
